import Message from '../models/Messages.js';
import User from '../models/User.js';
import cloudinary from '../libs/cloudinary.js';


export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
    res.status(200).json({ contacts: filteredUsers });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id : otherUserId } = req.params;

    const messages = await Message.find({
      $or : [
        { senderId : myId , receiverId : otherUserId},
        { senderId : otherUserId , receiverId : myId}
      ],
    });
    res.status(200).json ({messages});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const sendMesssages = async (req, res)=> {
  try {
     console.log("USER:", req.user._id); // debug
    const senderId = req.user._id;
    const recieverId = req.params.id;
    const { text, image } = req.body;

    let imageUrl = null;
    if (image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const message = new Message({
      senderId,
      receiverId : recieverId,
      text,
      image : imageUrl
    })
    await message.save();
    res.status(201).json({ message });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getChatsPartners = async (req , res) => {
  try {
    const myId = req.user._id;
    const messages = await Message.find({
      $or : [{ senderId : myId }, { receiverId : myId }]
    });

    const chatPartnersIds = [...new Set(messages.map((msg)=> 
    msg.senderId.toString() === myId.toString() ? 
    msg.receiverId.toString() : msg.senderId.toString()))];

    const chatPartners = await User.find({
      _id : { $in : chatPartnersIds}
    }).select('-password');

    res.status(200).json({ chatPartners });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}