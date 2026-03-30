import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimate';
import { Mail, Lock, MessageCircleIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>

        <BorderAnimatedContainer>

          <div className='w-full flex flex-col md:flex-row'>

            {/* LEFT PANEL */}
            <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
              
              <div className='w-full max-w-md'>

                {/* Heading */}
                <div className='text-center mb-6'>
                  <MessageCircleIcon className='mx-auto mb-4 text-cyan-400' size={48} />
                  <h2 className='text-2xl font-bold text-slate-200 mb-2'>Welcome Back</h2>
                  <p className='text-slate-400'>Login to your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className='space-y-6'>

                  {/* Email */}
                  <div>
                    <label className='auth-input-label'>Email</label>
                    <div className='relative'>
                      <Mail className='auth-input-icon' size={20} color="#94a3b8" />
                      <input
                        type="email"
                        placeholder='you@example.com'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className='input'
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className='auth-input-label'>Password</label>
                    <div className='relative'>
                      <Lock className='auth-input-icon' size={20} color="#94a3b8" />
                      <input
                        type="password"
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className='input'
                      />
                    </div>
                  </div>

                  {/* BUTTON */}
                  <button 
                    className='auth-btn flex items-center justify-center gap-2' 
                    type='submit' 
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className='w-5 h-5 animate-spin' />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                </form>

                <div className='mt-5 text-center'>
                  <Link to="/signup" className='auth-link'>
                    Don’t have an account? Sign Up
                  </Link>
                </div>

              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              
              <div className="w-full max-w-sm text-center">

                {/* IMAGE */}
                <img
                  src="/login.png"
                  alt="Login Illustration"
                  className="w-full max-h-[280px] object-contain mx-auto"
                />

                {/* TEXT */}
                <div className="mt-6">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Welcome Back 👋
                  </h3>
                  <p className="text-slate-400 text-sm mt-2">
                    Continue your conversations and stay connected.
                  </p>
                </div>

                {/* BADGES */}
                <div className="mt-4 flex justify-center gap-3 flex-wrap">
                  <span className="auth-badge">Fast</span>
                  <span className="auth-badge">Secure</span>
                  <span className="auth-badge">Reliable</span>
                </div>

              </div>

            </div>

          </div>

        </BorderAnimatedContainer>

      </div>
    </div>
  );
};

export default LoginPage;