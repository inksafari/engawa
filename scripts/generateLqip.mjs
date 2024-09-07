// bun --bun ./scripts/generateLqip.mjs
import fs from 'node:fs/promises'
import path from 'node:path'
import prettyBytes from 'pretty-bytes'
import sharp from 'sharp'
import { encode as encodeHash, decode as hashDecoded, isBlurhashValid } from 'blurhash'
import { encode as encode64 } from 'base64-arraybuffer'
import { getPlaiceholder } from 'plaiceholder'
import lqip from 'lqip-modern'
import { rgbaToThumbHash, thumbHashToDataURL } from 'thumbhash'
import { Bitmap, ImageRunner, ShapeTypes, SvgExporter } from 'geometrizejs'

const sourceDirectory = 'src/assets/images/' // Change this to your input directory
const outputDirectory = 'public/assets/images' // Change this to your output directory
// Replace with your desired output JSON file path
const outputJsonPath = path.join(sourceDirectory, 'lqip.json')
const output = new Object

// Ensure target directory exists
async function ensureTargetDir() {
  // remove the target directory and recreate it
  await fs.rm(outputJsonPath, { recursive: true }).catch((error) => {
    console.error('Error removing json file:', error)
  })
  await fs.rmdir(outputDirectory, { recursive: true }).catch((error) => {
    console.error('Error removing target directory:', error)
  })
  await fs.mkdir(outputDirectory, { recursive: true }).catch((error) => {
    // Handle potential errors during directory creation
    console.error('Error creating target directory:', error)
  })
}
// [補充]不適合用在 node:fs/promises：
// if (!fs.existsSync(outputDirectory)) {
// fs.mkdirSync(outputDirectory, { recursive: true })
// }

function showTest(results) {
  results.forEach(([label, image]) => {
    // const formattedSize = (image.byteLength / 1024).toFixed(2)
    // console.log(label, `${formattedSize} kb`)
    console.log(label, prettyBytes(image.byteLength))
  })
}

// https://sharp.pixelplumbing.com/api-output
async function avifConverter(inputImage, outputImage) {
  const sourceFile = path.basename(inputImage)
  const fileName = sourceFile.split('.')[0]
  // console.info(`[${sourceFile}] processing AVIF image...`)

  return await sharp(inputImage)
    // Create a clone to avoid modifying the original image
    .clone()
    // Convert to AVIF format with quality 60
    .toFormat('avif', {
      quality: 60,
      lossless: false,
      bitdepth: 8,
      chromaSubsampling: '4:4:4',
      effort: 1,
      progressive: true,
      // palette: true
    })
    .toFile(outputImage)
    .then(() => { console.info(`[${fileName}.avif] done`) })
    .catch((error) => {
      console.error('Error processing AVIF image:', error)
    })
}

async function webpConverter(inputImage, outputImage) {
  const sourceFile = path.basename(inputImage)
  const fileName = sourceFile.split('.')[0]
  // console.info(`[${sourceFile}] processing WebP image...`)

  return await sharp(inputImage)
    // Create a clone to avoid modifying the original image
    .clone()
    // Convert to WebP format with quality 85
    .toFormat('webp', { 
      quality: 85,
      lossless: false,
      bitdepth: 8,
      chromaSubsampling: '4:2:0',
      progressive: false,
    })
    .toFile(outputImage)
    .then(() => { console.info(`[${fileName}.webp] done`) })
    .catch((error) => {
      console.error('Error processing WebP image:', error)
    })
}

function dataUrlToBuffer(dataUrl) {
  const match = dataUrl.match(/^data:[^;]+;base64,([^"]+)/u)
  if (!match) { throw new Error('Invalid data URL') }
  const [, base64] = match;

  return Buffer.from(base64, 'base64');
}

async function generatePlaceholderDataURI(inputImage) {
  const placeholderBuffer = await sharp(inputImage)
    .clone()
    .resize(100, 100, { fit: 'inside' })
    .toFormat('webp', { quality: 1 })
    .modulate({
      brightness: 1,
      saturation: 1.2,
    })
    .blur()
    .toBuffer({ resolveWithObject: true })

  const imageDataURI = `data:image/webp;base64,${placeholderBuffer.data.toString(
    'base64'
  )}`

  return imageDataURI
}

/* -- https://blurha.sh/ --*/
async function generateBlurHashDataURI(inputImage) {
  const smallImage = sharp(inputImage)
    .clone()
    .ensureAlpha()
    .resize({ width: 100, height: 100, fit: 'fill' })
    .raw()

  const { data, info } = await smallImage.toBuffer({
    resolveWithObject: true,
  })
  const blurhash = encodeHash(
    new Uint8ClampedArray(data),
    info.width,
    info.height,
    4,
    4
  )

  const bitmap = hashDecoded(blurhash, info.width, info.height)
  const blurryImage = sharp(Buffer.from(bitmap), {
    raw: {
      channels: 4,
      width: 100,  // info.width,
      height: 100, // info.height,
    }
  }).webp({
    quality: 40,
  }).toBuffer()
  const imageDataURI = `data:image/webp;base64,${encode64(blurryImage)}`

  return await new Promise(response => {
    if (isBlurhashValid(blurhash)) {
      // return response({ blurryhash, w: info.width, h: info.height })
      return response(imageDataURI)
    } else {
      return response(null)
    }
  })
}

/* -- https://evanw.github.io/thumbhash/ -- */
async function generateThumbHashDataURI(inputImage) {
  const smallImage = sharp(inputImage)
    .clone()
    .ensureAlpha()
    .resize(70)

  const { data, info } = await smallImage
    .raw()
    .toBuffer({ resolveWithObject: true })

  const dataUrl = thumbHashToDataURL(
    rgbaToThumbHash(info.width, info.height, data),
  )

  const placeholderBuffer = await sharp(dataUrlToBuffer(dataUrl))
    .webp()
    .toBuffer()

  const imageDataURI = `data:image/webp;base64,${placeholderBuffer.toString(
    'base64' 
  )}`

  return imageDataURI
}

async function generatePlaceholderSVG(inputImage, geosvgPath) {
  const smallImage = sharp(inputImage)
    .clone()
    .ensureAlpha()
    .resize(100)

  const { data, info } = await smallImage
    .raw()
    .toBuffer({ resolveWithObject: true })

  const bitmap = Bitmap.createFromByteArray(info.width, info.height, data)
  const runner = new ImageRunner(bitmap)
  const options = {
    shapeTypes: [ShapeTypes.TRIANGLE],
    candidateShapesPerStep: 50,
    shapeMutationsPerStep: 100, // this has implication on speed and quality
    alpha: 128
  }
  const iterations = 200 // lower than 200 polygons makes terrible quality. more polygons makes larger svgs
  const svgData = []
  for (let i = 0; i < iterations; i++) {
    svgData.push(SvgExporter.exportShapes(runner.step(options)))
  }
  const hex = decimalNumberAsString => parseInt(decimalNumberAsString)
    .toString(16).padStart(2, '0')
  const svg = SvgExporter.getSvgPrelude() + 
    SvgExporter.getSvgNodeOpen(bitmap.width, bitmap.height).slice(0, -2) +
    ' fill-opacity="0.5">' + 
    svgData
      .join('')
      // steps to make the svg output smaller
      .replace(/ fill-opacity="[^"]*"\/>/g, '/>')
      .replace(/rgb\((\d+),(\d+),(\d+)\)/g, (m,r,g,b) => `#${hex(r)}${hex(g)}${hex(b)}`) + 
    SvgExporter.getSvgNodeClose()

  fs.writeFile(geosvgPath, svg)
}

// Process images
async function processImage(filePath) {
  const sourceFile = path.basename(filePath)
  const outputPath = path.join(outputDirectory, sourceFile)
  const fileName = sourceFile.split('.')[0]
  const avifPath = path.join(outputDirectory, `${fileName}.avif`)
  const webpPath = path.join(outputDirectory, `${fileName}.webp`)
  const geosvgPath = path.join(outputDirectory, `${fileName}.svg`)

  // Remove EXIF/meta data and save to target directory
  const data = await sharp(filePath)
    //.pipelineColorspace('rgb16') // or 'srgb'
    //.withMetadata({ icc: 'p3' })
    .toBuffer()
  await sharp(data).toFile(outputPath)

  // Create low-quality WebP image placeholders
  // [method 1] sharp: base64 encoded image
  // output[sourceFile] = await generatePlaceholderDataURI(filePath)
  // [method 2] plaiceholder(sharp): base64 encoded png
  // https://github.com/joe-bell/plaiceholder/blob/main/packages/plaiceholder/src/index.ts
  const placeHolder = await getPlaiceholder(filePath)
  output[sourceFile] = placeHolder.base64
  // [method 3] lqip-modern(sharp): base64 encoded WebP
  // https://www.npmjs.com/package/lqip-modern
  // const placeHolder = await lqip(filePath)
  // output[sourceFile] = placeHolder.metadata.dataURIBase64
  // <del>
  // [method 4] SQIP: base64 encoded SVG
  // https://www.npmjs.com/package/sqip
  // </del>
  // 在 macOS 測試，遇到 fatal error: runtime: bsdthread_register error
  // 重裝新版本 Go，並且以 `sqip input.jpg` 指令測試依然卡在
  // /usr/local/Cellar/go/1.10/libexec/src/runtime/{ panic, os_darwin, proc, asm_amd64 }.go
  // https://go.dev/wiki/MacOS12BSDThreadRegisterIssue
  // 其他方法(geometric primitives)： { primitive / geometrizejs / archaic } & svgo
  // geometrizejs:
  // https://gist.github.com/Munawwar/6ac51e33e901d89750ee61319d064aa5
  await generatePlaceholderSVG(filePath, geosvgPath)
  // [method 5] BlurHash: base83 encoded hash（需要自己組圖片）
  // https://blurha.sh/
  // output[sourceFile] = await generateBlurHashDataURI(filePath)
  // [method 6] ThumbHash: base64 encoded image
  // https://evanw.github.io/thumbhash/
  // output[sourceFile] = await generateThumbHashDataURI(filePath)

  await avifConverter(outputPath, avifPath)
  await webpConverter(outputPath, webpPath)

  const originalSize = await fs.readFile(filePath)
  const afterSize = await fs.readFile(outputPath)
  const avifSize = await fs.readFile(avifPath)
  const webpSize = await fs.readFile(webpPath)
  // mint background ( https://dev.to/atomikjaye/styling-consolelog-in-the-terminal-25c1 )
  console.log('\x1b[48;5;49m%s\x1b[0m', `✧ ${sourceFile}`)
  showTest([
    ['original:         ', originalSize],
    ['sharp:            ', afterSize],
    ['sharp/avif:       ', avifSize],
    ['sharp/webp:       ', webpSize]
  ])
}

async function main() {
  // Ensure the target directory exists
  await ensureTargetDir()

  // Get all files in the source directory
  const files = await fs.readdir(sourceDirectory)

  for await (const file of files) {
    // Check if the file is an image
    if (!file.match(/\.(jp?g|png|webp|avif|tiff|gif)$/)) {
      console.error(`Error processing file ${file}`)
      // FIXME: 已經安裝libvips，可是Heic/Heif/Hevc轉檔失敗，先擋掉
      // https://github.com/zoellner/sharp-heic-lambda-layer/blob/main/layer/Makefile
      // 在 Linux/x64 安裝 sharp:
      // npm install @img/sharp-libvips-linux-x64
      // SHARP_FORCE_GLOBAL_LIBVIPS=true npm install --cpu=x64 --os=linux --libc=glibc sharp
      if (/\.(hei[cf])$/i.test(file)) {
        console.error('heif: Error while loading plugin: No decoding plugin installed for this compression format')
      }
      continue
    }
    const sourceFile = path.join(sourceDirectory, file)
    await processImage(sourceFile)
  }
  console.log()
  fs.writeFile(outputJsonPath, JSON.stringify(output, null, 2))
  console.log(`Processed: ${outputJsonPath}`)
  console.dir(output)
}

main()
// source:
// https://github.com/hallowebsite/twowithone/blob/main/scripts/generateLqip.js
// https://gist.github.com/acoyfellow/2362bdd2fa5daf49f56546297597fa63
// https://gist.github.com/macrat/0717094e28d0695db0480cb910e46d23
// https://dev.to/lilouartz/optimizing-image-loading-with-avif-placeholders-for-enhanced-performance-556b
// https://css-tricks.com/inline-image-previews-with-sharp-blurhash-and-lambda-functions/
// https://github.com/Vista-NJTECH/vistalab-backend/blob/master/utils/image_utils.js
// https://github.com/lishaobos/magic-img/blob/main/src/core/blurhash.ts