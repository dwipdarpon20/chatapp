import express from 'express';
import { getAllContacts , getMessagesByUserId , sendMesssages , getChatsPartners} from '../controllers/message.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { arcjetProtection} from '../middlewares/arcjet.middleware.js';


const router = express.Router();
router.use( arcjetProtection,protectedRoute);

router.get ('/contacts', getAllContacts);
router.get ('/chats', getChatsPartners);
router.get ('/:id', getMessagesByUserId);
router.post ('/send/:id', sendMesssages);

export default router;