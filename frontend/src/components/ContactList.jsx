import { useEffect } from 'react';
import  { useChatStore } from '../store/useChatStore'
import UserLoadingSkeleton from './UsersLoadingSkeleton';

const ContactList = () => {
  const { allContacts, getAllContacts , setSelectedUser , isUserLoading  } = useChatStore();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) return <UserLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div>
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={contact.profilePic || "/avatar.png"} 
                className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ContactList