import {create} from 'zustand';
import {axiosInstance} from '../libs/axios';
import toast from 'react-hot-toast';
import {useAuthStore} from './useAuthStore';

export const useChatStore = create ((set, get)=>({
    allContacts : [],
    chats : [],
    messages : [],
    activeTab : "chats",
    selectedUser : null ,
    isUserLoading : false,
    isMessagesLoading : false,
    isSoundEnabled : JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound : ()=> {
        localStorage.setItem("isSoundEnabled", JSON.stringify(!get().isSoundEnabled));
        set({isSoundEnabled : !get().isSoundEnabled})
    },

    setActiveTab : (tab) => set({activeTab : tab}),
    setSelectedUser : (user) => set({selectedUser : user}),
    
    getAllContacts : async () => {
        set({isUserLoading : true});
        try {
            const response = await axiosInstance.get('/messages/contacts');
            set({allContacts : response.data.contacts, isUserLoading : false});
        } catch (error) {
            toast.error("Failed to load contacts");
            set({isUserLoading : false});
        }
    },

    getMyChatPartners : async () => {
        set({isUserLoading : true});
        try {
            const response = await axiosInstance.get('/messages/chats');
            set({chats : response.data.chatPartners, isUserLoading : false});
        } catch (error) {
            toast.error("Failed to load chats");
            set({isUserLoading : false});
        }
    },

    getMessagesByUserId : async (userId)=>{
        set ({isMessagesLoading : true});
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({messages : response.data.messages, isMessagesLoading : false});
        } catch (error) {
            toast.error("Failed to load messages");
            set({isMessagesLoading : false});
        }
    },

    sendMessage : async (messageData)=> {

        const {selectedUser , messages} = get();
        const {authUser} = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`;
        const tempMessage = {
            _id : tempId,
            senderId : authUser._id,
            receiverId : selectedUser._id,
            text : messageData.text,
            image : messageData.image || null,
            createdAt : new Date().toISOString(),
            isOptimistic : true
        }

        set ({messages : [...messages, tempMessage]});

        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set ({messages : [...messages, response.data.message]});
        } catch (error) {
            set ({messages : messages.filter(msg => msg._id !== tempId)});
            toast.error("Failed to send message");
        }
    }
}));