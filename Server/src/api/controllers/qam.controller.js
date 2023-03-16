
const archiver = require('archiver')
const apiResponse = require('../helpers/api.response.helper')
const fs = require('fs')
const path = require('path')

module.exports = {
  async downloadFile (req, res) {
    try {
      const folderPath = path.join(__dirname, '../../../upload')
      const timestamp = Date.now()
      const zipPath = path.join(__dirname, `../../../compress/${timestamp}_allFiles.zip`)

      const output = fs.createWriteStream(zipPath)
      const archive = archiver('zip', { zlib: { level: 9 } })
      archive.pipe(output)

      const files = await fs.promises.readdir(folderPath)
      for (const file of files) {
        const filePath = path.join(folderPath, file)
        const stat = await fs.promises.stat(filePath)
        if (stat.isFile()) {
          const ext = path.extname(file)
          if (ext === '.pdf' || ext === '.docx' || ext === '.doc') {
            archive.file(filePath, { name: file })
          }
        }
      }
      await archive.finalize()
      res.download(zipPath)
    } catch (error) {
      return apiResponse.response_error_500(res, error.message)
    }
  }
}
