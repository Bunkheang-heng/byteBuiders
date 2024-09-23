import Head from 'next/head';
import { FaUserTie, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>ByteBuilder - Intelligent Attendance System</title>
        <meta name="description" content="Advanced attendance system for ByteBuilder" />
      </Head>

      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold text-blue-600">
            ByteBuilder
          </div>
          <div className="space-x-8 hidden md:flex">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Features</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-32">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            Revolutionize Your <br className="hidden md:inline" />Attendance Management
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Empower your institution with ByteBuilder's cutting-edge attendance system. Streamline management, enhance productivity, and focus on what truly matters - education.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a href="/login" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Get Started
            </a>
            <a href="#features" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center">
            Powerful Features for Every Role
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FaUserTie className="text-5xl text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard</h3>
              <p className="text-gray-600">
                Comprehensive control over member management and attendance tracking with advanced analytics and reporting.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FaChalkboardTeacher className="text-5xl text-green-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Teacher Portal</h3>
              <p className="text-gray-600">
                Effortlessly manage classes, monitor attendance in real-time, and access detailed student progress reports.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <FaUserGraduate className="text-5xl text-yellow-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Student Access</h3>
              <p className="text-gray-600">
                User-friendly interface for quick check-ins, attendance submissions, and personalized schedule viewing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Institution?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied educators and students. Experience the future of attendance management today.
          </p>
          <a href="/signup" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 inline-block">
            Start Your Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">ByteBuilder</h3>
              <p>Revolutionizing attendance management for educational institutions worldwide.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p>&copy; 2024 ByteBuilder. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
