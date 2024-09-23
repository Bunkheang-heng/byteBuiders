"use client";

import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaGraduationCap, FaUserTag, FaSignOutAlt } from 'react-icons/fa';

interface UserProfile {
  name: string;
  email: string;
  role: string;
  course: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
      if (authUser) {
        setUser({
          name: authUser.displayName || 'N/A',
          email: authUser.email || 'N/A',
          role: 'N/A',
          course: 'N/A'
        });
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-red-600 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-4">We couldn&apos;t find your user profile. This could be because:</p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Your account hasn&apos;t been fully set up</li>
            <li>There was an error retrieving your data</li>
            <li>Your account may have been deleted</li>
          </ul>
          <button 
            onClick={() => router.push('/login')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Profile</div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{user.name}</h1>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-2" />
                <p className="text-gray-600">{user.name}</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-2" />
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="flex items-center">
                <FaUserTag className="text-gray-500 mr-2" />
                <p className="text-gray-600">{user.role}</p>
              </div>
              <div className="flex items-center">
                <FaGraduationCap className="text-gray-500 mr-2" />
                <p className="text-gray-600">{user.course}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-6 flex items-center justify-center w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaSignOutAlt className="mr-2" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
