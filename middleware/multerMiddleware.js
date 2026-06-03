const multer=require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },

  filename: function (req, file, cb) {
    cb(null, `IMG-${file.originalname}`)
  }
})

function fileFilter(req, file, cb) {

if(
file.mimetype=='image/png'||
file.mimetype=='image/jpeg'||
file.mimetype=='image/jpg'
)
{
  cb(null, true)
}
else{

  cb(null, false)

  return cb(
    new Error(
      "Only image files allowed"
    )
  )
}

}

const multerConfig =
multer({
storage,
fileFilter
})

module.exports =
multerConfig