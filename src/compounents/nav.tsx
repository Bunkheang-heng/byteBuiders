import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-blue-600">
          <Link href="/" legacyBehavior>
            <a>ByteBuilder</a>
          </Link>
        </div>
        <div className="space-x-8 hidden md:flex">
          <Link href="/" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</a>
          </Link>
          <Link href="/features" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Features</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-600 transition-colors duration-200">About</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Contact</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
