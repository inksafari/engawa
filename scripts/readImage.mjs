// https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp
// bun --bun ./scripts/readImage.mjs
import sharp from 'sharp'
// 測試完已刪exif-reader，需要重新安裝
import exif from 'exif-reader' // exiftool-vendored

async function getMetadata() {
  // https://github.com/ianare/exif-samples/tree/master/jpg/gps
  const metadata = await sharp('./scripts/clean/DSCN0027.jpg').metadata()
  console.log(metadata.exif ? exif(metadata.exif) : metadata.exif)
}

try {
  await getMetadata()
} catch (error) {
  console.error('Error:', error)
}
