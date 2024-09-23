"use client";

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/teacher');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        router.push('/teacher');
        toast.success('Login successful!');
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <div className="flex justify-center mb-8">
          <FaUserCircle className="text-6xl text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 pr-4 py-3 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-4 py-3 w-full border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:translate-y-[-2px] active:translate-y-[0px]"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-gray-600">Don't have an account? <a href="#" className="text-blue-600 font-semibold hover:underline">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
