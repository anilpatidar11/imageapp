const express = require('express');
const router = express.Router();
const multer = require('multer');


const { storage } = require('../cloudinary'); 



const upload = multer({ storage });         



const imageController = require('../controllers/imageController');

router.post('/upload', upload.single('image'), imageController.uploadImage);  //3




router.get('/images', imageController.getImages);
router.delete('/images/:id', imageController.deleteImage);

module.exports = router;


