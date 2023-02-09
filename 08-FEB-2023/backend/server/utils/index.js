const multer  = require('multer')


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './server/images')
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const uploadMiddleware = multer({ storage: fileStorageEngine })


module.exports = {
    uploadMiddleware
}