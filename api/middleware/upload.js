const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) =>{
        const fileName = `${Date.now()}_${file.originalname}`
        cb(null, fileName)
    }
});

// const upload = multer({
//     storage: storage
// }).single('featuredImage');
const upload = multer({storage});



module.exports = {  upload };