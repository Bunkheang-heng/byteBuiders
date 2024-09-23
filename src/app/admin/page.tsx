"use client";

import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const AdminPage = () => {
  const [courseName, setCourseName] = useState('');
  const [courses, setCourses] = useState<Array<{ id: string; name: string }>>([]);
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch all teachers from Firebase Firestore
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersRef = collection(db, 'users'); // Assuming 'users' collection contains teachers
        const querySnapshot = await getDocs(teachersRef);
        const teachersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name, // Assuming each teacher document has a 'name' field
        }));
        setTeachers(teachersData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        setError('Failed to load teachers.');
      }
    };

    fetchTeachers();
  }, []);

  // Fetch all courses from Firebase Firestore
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

  // Handle course creation
  const handleCreateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!courseName) {
      setError('Course name is required.');
      return;
    }

    try {
      // Add a new course to Firestore
      const coursesRef = collection(db, 'courses');
      await addDoc(coursesRef, { course: courseName });
      setSuccess('Course successfully created.');
      setCourseName('');
    } catch (error) {
      console.error('Error creating course:', error);
      setError('Failed to create course.');
    }
  };

  // Handle assigning course to a teacher
  const handleAssignCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!teacherId || !selectedCourse) {
      setError('Both teacher and course must be selected.');
      return;
    }

    try {
      // Update the selected teacher's document with the assigned course
      const teacherDocRef = doc(db, 'users', teacherId);
      await updateDoc(teacherDocRef, { course: selectedCourse });
      setSuccess('Course successfully assigned to the teacher.');
      setTeacherId('');
      setSelectedCourse('');
    } catch (error) {
      console.error('Error assigning course:', error);
      setError('Failed to assign course.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Success and Error Messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Create Course Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create a New Course</h2>
        <form onSubmit={handleCreateCourse} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="courseName" className="block text-gray-700 font-semibold mb-2">Course Name:</label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course name"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 rounded-lg w-full hover:bg-blue-700 transition duration-300"
          >
            Create Course
          </button>
        </form>
      </div>

      {/* Assign Course Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Assign Course to a Teacher</h2>
        <form onSubmit={handleAssignCourse} className="bg-white shadow-md rounded-lg p-6">
          {/* Select Course */}
          <div className="mb-4">
            <label htmlFor="selectCourse" className="block text-gray-700 font-semibold mb-2">Select Course:</label>
            <select
              id="selectCourse"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>{course.name}</option>
              ))}
            </select>
          </div>

          {/* Select Teacher */}
          <div className="mb-4">
            <label htmlFor="selectTeacher" className="block text-gray-700 font-semibold mb-2">Select Teacher:</label>
            <select
              id="selectTeacher"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-3 rounded-lg w-full hover:bg-green-700 transition duration-300"
          >
            Assign Course to Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
