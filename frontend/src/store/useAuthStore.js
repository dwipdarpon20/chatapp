import { create } from 'zustand';
import { axiosInstance } from '../libs/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpLoadingProfile: false,
    socket: null,
    onlineUsers: [],

    authCheck: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            set({
                authUser: response.data.user,
                isCheckingAuth: false
            })
            get().connectSocket();
        } catch (error) {
            console.error("Auth check failed:", error);
            set({
                authUser: null,
                isCheckingAuth: false
            })
        }
    },

    signUp: async (formData) => {
        set({ isSigningUp: true });

        try {
            const response = await axiosInstance.post('/auth/signup', formData);
            set({ authUser: response.data.user });
            toast.success("Sign up successful! Welcome, " + response.data.user.fullName);
        } catch (error) {
            toast.error(error.response?.data?.message || "Sign up failed. Please try again.");
        }
        finally {
            set({ isSigningUp: false });
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', formData);
            set({
                authUser: response.data.user
            });
            toast.success('login successfull ! Welcome back, ' + response.data.user.fullName);
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
        finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            const response = await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logged out successfully.");
            get().disConnectSocket();
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    },

    updateProfile: async (data) => {
        set({ isUpLoadingProfile: true });
        try {
            const response = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: response.data.user });
            toast.success("Profile updated successfully.");
        } catch (error) {
            set({ isUpLoadingProfile: false });
            console.error("Profile update failed:", error);
            toast.error("Profile update failed. Please try again.");
        }
        finally {
            set({ isUpLoadingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser) return;
        if (get().socket?.connected) return;
        const socket = io(BASE_URL, {
            withCredentials: true,
            auth: {
                token: document.cookie?.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1]
            }
        });

        socket.connect();
        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.log("❌ Socket error:", err.message);
        });

        set({ socket });

        // Listen for online event 
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disConnectSocket: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            set({ socket: null });
        }
    }

}))