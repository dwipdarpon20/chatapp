import { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore'; 
import ChatHeader from './ChatHeader';

const ChatContainer = () => {
  const { selectedUser, messages, isMessagesLoading , getMessagesByUserId } = useChatStore();
  const {authuser} = useAuthStore();
  useEffect(() => {
    if (selectedUser) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);
  return (
    <>
    <ChatHeader/>
    </>
  )
}

export default ChatContainer