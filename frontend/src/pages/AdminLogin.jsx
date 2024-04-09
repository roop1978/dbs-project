// AdminLogin.js
import React, { useState } from 'react';
import "./style.css"
const AdminLogin = () => {
  const [formData, setFormData] = useState({ adminEmail: '', adminPassword: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      // Handle successful login, such as redirecting to admin dashboard
    } catch (error) {
      console.error('Error:', error);
      // Handle error scenario, such as showing an error message to the user
    }
  };

  return (
    <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="adminEmail" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="adminEmail"
            name="adminEmail"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.adminEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="adminPassword" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="adminPassword"
            name="adminPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.adminPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;
