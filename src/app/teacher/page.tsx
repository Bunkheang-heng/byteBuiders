"use client";

import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FaDownload, FaUserGraduate } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import Navbar from '../../compounents/nav';
import Footer from '../../compounents/footer';

const TeacherPage = () => {
  const [courses, setCourses] = useState<Array<string>>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [attendanceData, setAttendanceData] = useState<Array<any>>([]);
  const [teacherRole, setTeacherRole] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkTeacherAuth = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        // Fetch teacher data from 'users' collection
        const usersRef = collection(db, 'users');
        const teacherQuery = query(usersRef, where('email', '==', user.email));
        const teacherSnapshot = await getDocs(teacherQuery);

        if (teacherSnapshot.empty) {
          console.error('Teacher data not found');
          router.push('/login');
          return;
        }

        const teacherData = teacherSnapshot.docs[0].data();
        setTeacherRole(teacherData.role);

        // Use the course field from the teacher's data
        setCourses([teacherData.course]); // If there's only one course
      } catch (error) {
        console.error('Error fetching teacher data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkTeacherAuth();
  }, [router]);

  const fetchAttendanceData = async () => {
    if (!selectedCourse) return;

    try {
      const attendanceRef = collection(db, 'attendance');
      const q = query(attendanceRef, where('course', '==', selectedCourse));
      const querySnapshot = await getDocs(q);
      const attendanceData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAttendanceData(attendanceData);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      fetchAttendanceData();
    }
  }, [selectedCourse]);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendanceData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, `attendance_${selectedCourse}.xlsx`);
  };

  if (loading) {
    return <div className="text-center text-lg py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 bg-white text-black">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Teacher Dashboard</h1>
        <p className="mb-4 text-center text-gray-700">Role: <span className="font-semibold">{teacherRole}</span></p>

        <div className="mb-6">
          <label htmlFor="courseSelect" className="block mb-2 font-semibold text-gray-700">Select Course:</label>
          <select
            id="courseSelect"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Attendance Data</h2>
              <button
                onClick={downloadExcel}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 transition duration-300"
              >
                <FaDownload className="mr-2" /> Download Excel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-3 text-left">Student Name</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-100 transition duration-300">
                      <td className="p-3 flex items-center">
                        <FaUserGraduate className="mr-2 text-blue-500" />
                        {record.name}
                      </td>
                      <td className="p-3">{new Date(record.date.seconds * 1000).toLocaleDateString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded ${record.status === 'present' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TeacherPage;
