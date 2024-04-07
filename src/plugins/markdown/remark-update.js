import { execSync } from 'node:child_process'

// 還沒測試
// https://github.com/alexnguyennz/alexnguyen.co.nz/blob/main/src/lib/remark.mjs
function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0]
    const result = execSync(`git log -1 --pretty="format:%cI" ${filepath}`)
    file.data.astro.frontmatter.updatedDate = result.toString()
  }
}

export default remarkModifiedTime
