import {create} from 'zustand';
import { axiosInstance } from '../libs/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser : null,
    isCheckingAuth : true,
    isSigningUp : false,

    authCheck : async ()=> {
        try {
            const response = await axiosInstance.get('/auth/check');
            set ({
                authUser : response.data.user,
                isCheckingAuth : false 
            })
        } catch (error) {
            console.error("Auth check failed:", error);
            set ({
                authUser : null ,
                isCheckingAuth : false
            })
        }
    },

    signUp : async (formData) => {
        set ({isSigningUp : true});

        try {
            const response = await axiosInstance.post('/auth/signup', formData);
            set ({authUser : response.data.user});
            toast.success ("Sign up successful! Welcome, " + response.data.user.fullName);
        } catch (error) {
            toast.error (error.response?.data?.message || "Sign up failed. Please try again.");
        }
        finally {
            set ({isSigningUp : false});
        }
    }
}))