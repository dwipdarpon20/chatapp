import {create} from 'zustand';
import { axiosInstance } from '../libs/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser : null,
    isCheckingAuth : true,
    isSigningUp : false,
    isLoggingIn : false,
    isUpLoadingProfile : false,

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
    },

    login : async (formData) => {
        set ({isLoggingIn : true});
        try {
            const response = await axiosInstance.post('/auth/login', formData);
            set ({
                authUser : response.data.user
            });
            toast.success ('login successfull ! Welcome back, ' + response.data.user.fullName);
        } catch (error) {
            toast.error (error.response?.data?.message || "Login failed. Please try again.");
        }
        finally {            
            set ({isLoggingIn : false});
        }
    },

    logout : async ()=> {
        try {
            const response = await axiosInstance.post('/auth/logout');
            set ({authUser : null});
            toast.success ("Logged out successfully.");
        } catch (error) {
            toast.error ("Logout failed. Please try again.");
        }
    },

    updateProfile : async (data)=> {
        set ({isUpLoadingProfile : true});
        try {
            const response = await axiosInstance.put('/auth/update-profile', data);
            set ({authUser : response.data.user});
            toast.success ("Profile updated successfully.");
        } catch (error) {
            set({isUpLoadingProfile : false});
            console.error("Profile update failed:", error);
            toast.error ("Profile update failed. Please try again.");
        }
        finally {
            set ({isUpLoadingProfile : false});
        }
    },

}))