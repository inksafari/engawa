// @creidt: https://github.com/kexiZeroing/kexiZeroing.github.io/blob/main/scripts/get-updatetime.js
// This file will add or update `updatedDate` attribute to markdown files frontmatter
import fs from 'node:fs'
import path from 'node:path'

const dirPath = 'src/content/then'

async function updateFrontmatter() {
  const files = fs.readdirSync(dirPath).filter((file) => {
    return path.extname(file) === '.mdx'
  })

  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const regex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/gm

    const match = regex.exec(content)
    if (match) {
      const oldFrontmatter = match[1]
      const newDate = new Date().toISOString()
      // new Date(execSync(`git log -1 --format="%aI" ${filePath}`).toString().trim())
      // const newDateString = newDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(',', '')
      const newDateString = newDate.toString()
      const newUpdatedDate = `updatedDate: ${newDateString}`

      let newFrontmatter = oldFrontmatter.replace(
        /(updatedDate:\s*")([^"]*)(")?/,
        newUpdatedDate,
      )

      if (newFrontmatter === oldFrontmatter) {
        newFrontmatter += `\n${newUpdatedDate}`
      }

      const newContent = content.replace(
        oldFrontmatter,
        `${newFrontmatter.trim()}`,
      )
      fs.writeFileSync(filePath, newContent)
    }
  }
}

updateFrontmatter()

console.info('✅ Done!')
// @ref:
// https://github.com/vuejs/vitepress/blob/main/src/node/utils/getGitTimestamp.ts
// https://docs.astro.build/en/recipes/modified-time/
