import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimate';
import { Mail, MessageCircleIcon, UserIcon, Loader2, LockIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>

        <BorderAnimatedContainer>

          {/* MAIN FLEX */}
          <div className='w-full flex flex-col md:flex-row'>

            {/* LEFT PANEL */}
            <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
              <div className='w-full max-w-md'>

                {/* Heading */}
                <div className='text-center'>
                  <MessageCircleIcon className='mx-auto mb-4' size={48} color="#06b6d4" />
                  <h2 className='text-2xl font-bold text-slate-200 mb-2'>Create Account</h2>
                  <p className='text-slate-400'>Sign up for a new account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className='space-y-6'>

                  {/* Full Name */}
                  <div>
                    <label className='auth-input-label'>Full Name</label>
                    <div className='relative'>
                      <UserIcon className='auth-input-icon' size={20} color="#94a3b8" />
                      <input
                        type="text"
                        placeholder='Satya Prakash'
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className='input'
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className='auth-input-label'>Email</label>
                    <div className='relative'>
                      <Mail className='auth-input-icon' size={20} color="#94a3b8" />
                      <input
                        type="email"
                        placeholder='satya@example.com'
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
                      <LockIcon className='auth-input-icon' size={20} color="#94a3b8" />
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
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className='w-5 h-5 animate-spin' />
                        Signing up...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                </form>

                <div className='mt-5 text-center'>
                  <Link to="/login" className='auth-link'>
                    Already have an account? Login
                  </Link>
                </div>

              </div>
            </div>

            {/* RIGHT PANEL (FIXED) */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              
              <div className="w-full max-w-sm text-center">

                {/* IMAGE */}
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full max-h-[280px] object-contain mx-auto"
                />

                {/* TEXT */}
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Start Your Journey Today
                  </h3>

                  <div className="mt-4 flex justify-center gap-3 flex-wrap">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </BorderAnimatedContainer>

      </div>
    </div>
  );
};

export default SignUpPage;