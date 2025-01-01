import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../../api/axiosInstance';
import React, { useEffect, useState } from 'react';
import { fetchUsersData } from '../../../redux/slices/adminSlice';
import { toast } from 'react-toastify';
import { setSearchTerm } from '../../../redux/slices/adminSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users,filteredUsers,searchTerm ,loading, error } = useSelector((state) => state.admin);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAddUser = async () => {
    try {
      await axiosInstance.post('/admin/add', newUser);
      dispatch(fetchUsersData());
      setModalOpen(false);
      setNewUser({ name: '', email: '', password: '' });
      toast.success('User added successfully');
    } catch (error) {
      toast.error('Error adding user');
    }
  };
  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  }

  const handleUpdateUser = async (userId) => {
    try {
      const response = await axiosInstance.get(`/admin/get-data/${userId}`);
      setSelectedUser(response.data.data);
      setEditModalOpen(true);
    } catch (error) {
      toast.error('Error fetching user data');
    }
  };

  const handleEditUser = async () => {
    try {
      await axiosInstance.put('/admin/editUser', selectedUser);
      dispatch(fetchUsersData());
      setEditModalOpen(false);
      setSelectedUser(null);
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('Error updating user');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete('/admin/delete', { params: { id: userId } });
      dispatch(fetchUsersData());
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
          <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add User
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-gray-400 transition"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
        <div className={`shadow-lg rounded-lg p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <table className="w-full table-auto">
            <thead className={darkMode ? 'bg-gray-600' : 'bg-gray-200'}>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredUsers) && filteredUsers.map((user) => (
                <tr key={user._id} className={`border-b ${darkMode ? 'border-gray-600' : ''}`}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleUpdateUser(user._id)}
                      className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-4">Add New User</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddUser();
            }}>
              <div className="mb-4">
                <label className={`block ${darkMode ? 'text-white' : 'text-gray-700'}`}>Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded-lg mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className={`block ${darkMode ? 'text-white' : 'text-gray-700'}`}>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border rounded-lg mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className={`block ${darkMode ? 'text-white' : 'text-gray-700'}`}>Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border rounded-lg mt-1"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded-lg mr-4 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-lg w-96 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditUser();
            }}>
              <div className="mb-4">
                <label className={`block ${darkMode ? 'text-white' : 'text-gray-700'}`}>Name</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded-lg mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className={`block ${darkMode ? 'text-white' : 'text-gray-700'}`}>Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border rounded-lg mt-1"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded-lg mr-4 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;