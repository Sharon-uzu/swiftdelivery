import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import baseUrl from '../const/baseUrl';
import Sidebar2 from '../../Components/Sidebar2';

const User = () => {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user details
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cacnumber: '',
    role: ''
  }); // State to manage user edit

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}users/`);
        console.log('User list:', response.data);
        setUserList(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error
      }
    };

    fetchUsers();
  }, []);

  // Function to handle opening modal and setting selected user
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setEditUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      cacnumber: user.cacnumber,
      role: user.role
    });
    setShowModal(true);
  };

  // Function to handle closing modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  // Function to handle user edit
  const handleUserEdit = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.put(`${baseUrl}users/${selectedUser._id}`, editUser, config);
        console.log('Response:', response.data);

        // Check if the status code is 200
        if (response.status === 200) {
            // Assuming successful update, update local state
            const updatedUsers = userList.map(user =>
                user._id === selectedUser._id ? { ...user, ...editUser } : user
            );
            setUserList(updatedUsers);
            handleCloseModal();
            alert(response.data.message); // Display success message
        } else {
            alert('Failed to update user. Please try again.');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update user. Please try again.');
    }
};


  // Function to handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      // Example API endpoint for deleting a user
      await axios.delete(`${baseUrl}users/${userId}`);
      // Assuming successful deletion, update local state
      const updatedUsers = userList.filter(user => user._id !== userId);
      setUserList(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='dashb'>
      <section className='dashboard'>
        <Sidebar2 />
        <main>
          <div className='add'>
            <h2>Users</h2>
          </div>

          <table>
            <thead>
              <tr className='heading'>
                <th>Name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.filter(user => user.role !== 'admin').map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td className="dt">
                    <Button variant="info" onClick={() => handleOpenModal(user)}>
                      View Details
                    </Button>
                  </td>
                  <td className="dt">
                    <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for displaying and editing user details */}
                  
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedUser && (
                <div>
                 {selectedUser && (
                <div>
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Phone:</strong> {selectedUser.phone}</p>
                  <p><strong>Address:</strong> {selectedUser.address}</p>
                  {/* <p><strong>CAC Number:</strong> {selectedUser.cacnumber}</p> */}
                  {/* Add more fields as needed */}
                </div>
              )}
                  <div>
                    <label>Edit Role:</label>
                    <select name="role" value={editUser.role} onChange={handleInputChange}>
                      <option value="">Select Role</option>
                      <option value="vendor">Vendor</option>
                      <option value="client">Client</option>
                    </select>
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUserEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </main>
      </section>
    </div>
  );
};

export default User;