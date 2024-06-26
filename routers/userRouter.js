import express from 'express';
import multer from 'multer';
import UserController from '../controllers/userControler.js';
import path from 'path';
import auth from '../middlewares/auth.js';
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imgs'); // Путь к папке назначения
    },
    filename: function (req, file, cb) {
        // Добавляем расширение к имени файла
        const uniqueFileName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueFileName);
    }
  });
  const upload = multer({ storage: storage });

// User routes
router.post('/signUp', upload.single('avatar'), UserController.createUser);
// router.post('/signUp/img', upload.single('avatar'), UserController.userImgUpload);
// router.get('/getUser', auth, UserController.getUser);
// router.post('/logIn', UserController.logIn);
// router.put('/updateUser', auth, UserController.updateUser);
// router.delete('/deleteUser', auth, UserController.deleteUser);

export default router;
