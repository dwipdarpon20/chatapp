import express from 'express';
import { protectedRoute ,check } from '../middlewares/auth.middleware.js';
import { signup , login , logout , updateProfile } from '../controllers/auth.controllers.js';
import { arcjetProtection} from '../middlewares/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection);

router.get('/hello', (req, res) => {
   res.json({ message: "Hello World" });
});

router.post ('/signup' , signup);
router.post ('/login', login);
router.post ('/logout', logout);

router.put ('/update-profile', protectedRoute, updateProfile);
router.get ('/check',  protectedRoute, check);;
export default router;