import multer from 'multer'
import path from 'path'

const storage1 = multer.diskStorage({
  
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "..", "uploads"))
  },
  filename: (req: any, file, callback) => {
    const name = Date.now() + "-" + file.originalname
    req.body.picture = name
    callback(null, name)
  },
})
export const uploadMain = multer({ storage: storage1, limits: { fileSize: 10 * 1024 * 1024 } })