"use client";

import { useState, useEffect } from 'react';
import { db } from '../../firebase'; 
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const AttendanceForm = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState<Array<{ id: string; name: string }>>([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch the available courses from Firebase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesRef = collection(db, 'courses'); // Assuming 'courses' collection exists
        const querySnapshot = await getDocs(coursesRef);
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().course, // Assuming each course document has a 'course' field
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses.');
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    // Simple validation
    if (!name || !studentId || !course) {
      setError('All fields are required.');
      return;
    }

    try {
      // Add attendance to Firestore
      const attendanceRef = collection(db, 'attendance'); // Assuming 'attendance' collection exists
      await addDoc(attendanceRef, {
        name,
        studentId,
        course,
        date: new Date(),
        status: 'present', // Default to present
        timestamp: serverTimestamp(), // Adding timestamp for automatic deletion later
      });

      // Clear the form and show success message
      setName('');
      setStudentId('');
      setCourse('');
      setSuccess('Attendance successfully submitted.');
    } catch (err) {
      console.error('Error submitting attendance:', err);
      setError('Failed to submit attendance.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Student Attendance Form</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Student ID */}
        <div className="mb-4">
          <label htmlFor="studentId" className="block text-gray-700 font-semibold mb-2">Student ID:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your student ID"
            required
          />
        </div>

        {/* Course */}
        <div className="mb-4">
          <label htmlFor="course" className="block text-gray-700 font-semibold mb-2">Course:</label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 rounded-lg w-full hover:bg-blue-700 transition duration-300"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
