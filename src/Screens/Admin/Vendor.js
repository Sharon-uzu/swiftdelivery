import React, { useEffect, useState } from 'react';
import Sidebar2 from '../../Components/Sidebar2';
import axios from 'axios'; // Import axios for making HTTP requests
import Modal from 'react-bootstrap/Modal'; // Import Bootstrap Modal
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button
import baseUrl from '../const/baseUrl';

const Vendors = () => {
  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null); // State to store selected client details
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility


  useEffect(() => {
    const fetchClients = async () => {
        try {
            const response = await axios.get(`${baseUrl}users/`);
            console.log('Client list:', response.data);
            // Filter users with role 'client'
            const clients = response.data.filter(user => user.role === 'vendor');
            setClientList(clients);
        } catch (error) {
            console.error('Error fetching clients:', error);
            // Handle error
        }
    };

    fetchClients();
}, []);

  const handleOpenModal = (client) => {
    setSelectedClient(client);
    setShowModal(true);
  };

  // Function to handle closing modal
  const handleCloseModal = () => {
    setSelectedClient(null);
    setShowModal(false);
  };

  return (
    <div className='dashb'>
      <section className='dashboard'>
        <Sidebar2 />
        <main>
          {/* <Header2 /> */}
          <div className='add'>
            <h2>Vendors</h2>
          </div>

          <table>
            <thead>
              <tr className='heading'>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clientList.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td> {/* Assuming name is a field in your client object */}
                  <td>{client.role}</td> {/* Assuming address is a field in your client object */}
                  <td>
                    <Button variant="info" onClick={() => handleOpenModal(client)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for displaying client details */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Client Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedClient && (
                <div>
                  <p><strong>Name:</strong> {selectedClient.name}</p>
                  <p><strong>Email:</strong> {selectedClient.email}</p>
                  <p><strong>Phone:</strong> {selectedClient.phone}</p>
                  <p><strong>Address:</strong> {selectedClient.address}</p>
                  {/* <p><strong>CAC Number:</strong> {selectedClient.cacnumber}</p> */}
                  {/* Add more fields as needed */}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

        </main>
      </section>
    </div>
  );
};

export default Vendors;
