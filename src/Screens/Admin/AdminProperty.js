import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../../Components/Sidebar2";
import Modal from "react-modal";
import baseUrl from "../const/baseUrl";

const AdminProperty = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [selectedProperty, setSelectedProperty] = useState(null);
  const token = localStorage.getItem("token");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [rentalPeriod, setRentalPeriod] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [applicationFee, setApplicationFee] = useState("");
  const [securityFee, setSecurityFee] = useState("");
  const [petPolicies, setPetPolicies] = useState("");
  const [utilities, setUtilities] = useState("");
  const [appliances, setAppliances] = useState("");
  const [images, setImages] = useState([]);
  const user = localStorage.getItem("userId");
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % selectedProperty.images.length
    );
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedProperty.images.length) %
        selectedProperty.images.length
    );
  };

  const [editedProperty, setEditedProperty] = useState({
    location: "",
    price: "",
    size: "",
    images: [],
    bedroom: "",
    bathroom: "",
    user: { phone: "" }, // Initialize user with an empty object
    description: "",
    rentalPeriod: "",
    category: "",
    status: "",
    applicationfee: "",
    securityfee: "",
    petPolicies: "",
    utilities: "",
    appliances: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModal1 = (property) => {
    setSelectedProperty(property);
    setIsModalOpen1(!isModalOpen1);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${baseUrl}properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Match Postman request
          },
        });

        console.log(response);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [token, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("location", location);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("bedroom", bedroom);
    formData.append("bathroom", bathroom);
    formData.append("phone", phone);
    formData.append("description", description);
    formData.append("rentalPeriod", rentalPeriod);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("applicationFee", applicationFee);
    formData.append("securityFee", securityFee);
    formData.append("petPolicies", petPolicies);
    formData.append("utilities", utilities);
    formData.append("appliances", appliances);
    formData.append("user", localStorage.getItem("userId"));

    // Append images
    images.forEach((image, i) => {
      formData.append(`images`, image);
    });
    try {
      const response = await fetch(`${baseUrl}properties`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 201) {
        const data = await response.json();
        console.log("Property saved successfully:", data);
        clearForm(); // Clear the form fields
        setIsModalOpen(false); // Close the modal
      } else {
        throw new Error("Failed to save property");
      }
    } catch (error) {
      console.error("Error saving property:", error.message);
    }
  };

  const clearForm = () => {
    setLocation("");
    setPrice("");
    setSize("");
    setBedroom("");
    setBathroom("");
    setPhone("");
    setDescription("");
    setRentalPeriod("");
    setCategory("");
    setStatus("");
    setApplicationFee("");
    setSecurityFee("");
    setPetPolicies("");
    setUtilities("");
    setAppliances("");
    setImages([]);
  };

  const toggleEditModal = (property) => {
    setSelectedProperty(property);
    setEditedProperty({ ...property });
    setIsEditModalOpen(true); // Ensure the modal opens
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const propId = selectedProperty.id; // Use selectedProperty.id here

    if (!selectedProperty || !selectedProperty.id) {
      console.error("Selected property is not defined or missing id");
      return;
    }

    Object.keys(editedProperty).forEach((key) => {
      if (key === "images" && editedProperty.images instanceof FileList) {
        Array.from(editedProperty.images).forEach((file) => {
          formData.append("images", file);
        });
      } else {
        formData.append(key, editedProperty[key]);
      }
    });

    try {
      const response = await axios.put(
        `${baseUrl}properties/${propId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", response.data);

      const updatedProperties = properties.map((property) =>
        property.id === selectedProperty.id ? response.data : property
      );

      setProperties(updatedProperties);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  const handleDelete = async (propertyId) => {
    try {
      const response = await axios.delete(
        `${baseUrl}properties/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property.id !== propertyId
        );
        setProperties(updatedProperties);
        console.log("Property deleted successfully");
      } else {
        throw new Error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = files.map((file) => URL.createObjectURL(file));
    setEditedProperty({
      ...editedProperty,
      images: [...editedProperty.images, ...updatedImages],
    });
  };

  return (
    <div className="dashb">
      <section className="dashboard">
        <SideBar />
        <main>
          <div className="add">
            <h2>Properties</h2>
            <button onClick={toggleModal}>Add Property</button>
          </div>

          <table>
            <thead>
              <tr className="heading">
                <th className="dt">Location</th>
                <th className="dt">Price</th>
                <th className="dt">Category</th>
                <th className="dt">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id}>
                  <td className="dt">{property.location}</td>
                  <td className="dt">${property.price}</td>
                  <td className="dt">{property.category}</td>
                  <td className="dt">
                    <button onClick={() => toggleModal1(property)}>
                      Details
                    </button>
                  </td>
                  <td className="dt">
                    <button onClick={() => toggleEditModal(property)}>
                      Edit
                    </button>
                  </td>
                  <td className="dt">
                    <button onClick={() => handleDelete(property.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </section>
      {/* Add Property Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Add Property"
        className={`bg-transparent`}
        style={{
          overlay: {
            position: "fixed",
            top: "0",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "hsla(0, 0%, 0%, .8)",
            zIndex: 100000,
          },
        }}
      >
        <div className="modal1">
          <div className="modal1-content">
            <div className="close">
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ cursor: "pointer" }}
              >
                X
              </button>
            </div>
            <form className="product-form" onSubmit={handleSubmit}>
              <div>
                <p>Location</p>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <p>Price</p>
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="$32"
                />
              </div>
              <div>
                <p>Size</p>
                <input
                  type="text"
                  name="size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="1,150 Sq. Ft."
                />
              </div>
              <div>
                <p>Images</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <p>Bedroom</p>
                <input
                  type="text"
                  name="bedroom"
                  value={bedroom}
                  onChange={(e) => setBedroom(e.target.value)}
                />
              </div>
              <div>
                <p>Bathroom</p>
                <input
                  type="text"
                  name="bathroom"
                  value={bathroom}
                  onChange={(e) => setBathroom(e.target.value)}
                />
              </div>
              <div>
                <p>Phone</p>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <p>Category</p>
                <select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condominium">Condominium (Condo)</option>
                  <option value="Single-Family Home">Single-Family Home</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Triplex">Triplex</option>
                  <option value="Quadplex">Quadplex</option>
                  <option value="Cottage">Cottage</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Ranch">Ranch</option>
                  <option value="Villa">Villa</option>
                  <option value="Mansion">Mansion</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Loft">Loft</option>
                  <option value="Studio">Studio</option>
                  <option value="Mobile Home">Mobile Home</option>
                  <option value="Tiny House">Tiny House</option>
                  <option value="Row House">Row House</option>
                  <option value="Farmhouse">Farmhouse</option>
                  <option value="Chalet">Chalet</option>
                </select>
              </div>
              <div>
                <p>Status</p>
                <select
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="available">available</option>
                  <option value="sold">sold</option>
                  <option value="rented">rented</option>
                </select>
              </div>
              <div>
                <p>Rental Period</p>
                <select
                  name="rentalPeriod"
                  value={rentalPeriod}
                  onChange={(e) => setRentalPeriod(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div>
                <p>Application fee</p>
                <input
                  type="text"
                  name="applicationFee"
                  value={applicationFee}
                  onChange={(e) => setApplicationFee(e.target.value)}
                />
              </div>
              <div>
                <p>Security fee</p>
                <input
                  type="text"
                  name="securityFee"
                  value={securityFee}
                  onChange={(e) => setSecurityFee(e.target.value)}
                />
              </div>
              <div>
                <p>Pet Policies</p>
                <input
                  type="text"
                  name="petPolicies"
                  value={petPolicies}
                  onChange={(e) => setPetPolicies(e.target.value)}
                />
              </div>
              <div>
                <p>Utilities</p>
                <input
                  type="text"
                  name="utilities"
                  value={utilities}
                  onChange={(e) => setUtilities(e.target.value)}
                />
              </div>
              <div>
                <p>Appliances</p>
                <input
                  type="text"
                  name="appliances"
                  value={appliances}
                  onChange={(e) => setAppliances(e.target.value)}
                  placeholder="A/C Unit, Oven"
                />
              </div>
              <div>
                <button type="submit">SEND</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      {/* Property Details Modal */}
      <Modal
        isOpen={isModalOpen1}
        onRequestClose={toggleModal1}
        contentLabel="Property Details"
        className="bg-transparent"
        style={{
          overlay: {
            position: "fixed",
            top: "0",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "hsla(0, 0%, 0%, .8)",
            zIndex: 100000,
          },
          content: {
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        <div className="modal1">
          <div className="modal1-content">
            <div className="close">
              <button
                onClick={() => toggleModal1(false)}
                style={{ cursor: "pointer" }}
                aria-label="Close"
              >
                X
              </button>
            </div>
            {selectedProperty ? (
              <section className="product-info">
                <div className="product-images">
                  <div className="image-slider">
                    {selectedProperty.images &&
                    selectedProperty.images.length > 0 ? (
                      selectedProperty.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Property ${index + 1}`}
                          style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                          }}
                        />
                      ))
                    ) : (
                      <p>No images available</p>
                    )}
                  </div>
                  <button className="prev" onClick={prevImage}>
                    ‹
                  </button>
                  <button className="next" onClick={nextImage}>
                    ›
                  </button>
                </div>
                <div className="others">
                  {/* Other property details */}
                  <div className="others">
                    <p>
                      Location: <span>{selectedProperty.location}</span>
                    </p>
                    <p>
                      Size: <span>{selectedProperty.size}</span>
                    </p>
                    <p>
                      Bedroom: <span>{selectedProperty.bedroom}</span>
                    </p>
                    <p>
                      Bathroom: <span>{selectedProperty.bathroom}</span>
                    </p>
                    <p>
                      Price: <span>${selectedProperty.price}</span>
                    </p>
                    <p>
                      Category: <span>{selectedProperty.category}</span>
                    </p>
                    {/* <p>
                    Phone: <span>{selectedProperty.phone}</span>
                  </p> */}
                    <p>
                      Description: <span>{selectedProperty.description}</span>
                    </p>
                    <p>
                      Application Fee:{" "}
                      <span>${selectedProperty.applicationfee}</span>
                    </p>
                    <p>
                      Security Fee: <span>${selectedProperty.securityfee}</span>
                    </p>
                    <p>
                      Pet Policies: <span>{selectedProperty.petPolicies}</span>
                    </p>
                    <p>
                      Utilities: <span>{selectedProperty.utilities}</span>
                    </p>
                    <p>
                      Appliances: <span>{selectedProperty.appliances}</span>
                    </p>
                  </div>
                </div>
              </section>
            ) : (
              <p>Loading property details...</p>
            )}
          </div>
        </div>
      </Modal>

      {/* Edit Property Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Property"
        className="bg-transparent"
        style={{
          overlay: {
            position: "fixed",
            top: "0",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "hsla(0, 0%, 0%, .8)",
            zIndex: 100000,
          },
        }}
      >
        <div className="modal1">
          <div className="modal1-content">
            <div className="close">
              <button
                onClick={() => setIsEditModalOpen(false)}
                style={{ cursor: "pointer" }}
              >
                X
              </button>
            </div>
            <form className="product-form" onSubmit={handleEditSubmit}>
              {/* Form inputs */}
              <div>
                <p>Location</p>
                <input
                  type="text"
                  name="location"
                  value={editedProperty.location}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p>Price</p>
                <input
                  type="text"
                  name="price"
                  value={editedProperty.price}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      price: e.target.value,
                    })
                  }
                  placeholder="$32"
                />
              </div>
              <div>
                <p>Size</p>
                <input
                  type="text"
                  name="size"
                  value={editedProperty.size}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      size: e.target.value,
                    })
                  }
                  placeholder="1,150 Sq. Ft."
                />
              </div>
              <div>
                <p>Images</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
              <div>
                <p>Bedroom</p>
                <input
                  type="text"
                  name="bedroom"
                  value={editedProperty.bedroom}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      bedroom: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p>Bathroom</p>
                <input
                  type="text"
                  name="bathroom"
                  value={editedProperty.bathroom}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      bathroom: e.target.value,
                    })
                  }
                />
              </div>
              {editedProperty.user ? (
                <input
                  type="text"
                  name="phone"
                  value={editedProperty.user.phone}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      user: { ...editedProperty.user, phone: e.target.value },
                    })
                  }
                  placeholder="(+234)"
                />
              ) : (
                <p>Loading...</p>
              )}

              <div>
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  value={editedProperty.description}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p>Rental Period</p>
                <input
                  type="text"
                  name="rentalPeriod"
                  value={editedProperty.rentalPeriod}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      rentalPeriod: e.target.value,
                    })
                  }
                  placeholder="12 months"
                />
              </div>
              <div>
                <p>Category</p>
                <input
                  type="text"
                  name="category"
                  value={editedProperty.category}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      category: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p>Status</p>
                <input
                  type="text"
                  name="status"
                  value={editedProperty.status}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      status: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <p>Application Fee</p>
                <input
                  type="text"
                  name="applicationFee"
                  value={editedProperty.applicationfee}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      applicationfee: e.target.value,
                    })
                  }
                  placeholder="$300"
                />
              </div>
              <div>
                <p>Security Fee</p>
                <input
                  type="text"
                  name="securityFee"
                  value={editedProperty.securityfee}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      securityfee: e.target.value,
                    })
                  }
                  placeholder="$300"
                />
              </div>
              <div>
                <p>Pet Policies</p>
                <input
                  type="text"
                  name="petPolicies"
                  value={editedProperty.petPolicies}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      petPolicies: e.target.value,
                    })
                  }
                  placeholder="Pets Allowed"
                />
              </div>
              <div>
                <p>Utilities</p>
                <input
                  type="text"
                  name="utilities"
                  value={editedProperty.utilities}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      utilities: e.target.value,
                    })
                  }
                  placeholder="Electricity, Water, etc."
                />
              </div>
              <div>
                <p>Appliances</p>
                <input
                  type="text"
                  name="appliances"
                  value={editedProperty.appliances}
                  onChange={(e) =>
                    setEditedProperty({
                      ...editedProperty,
                      appliances: e.target.value,
                    })
                  }
                  placeholder="Refrigerator, Washer, etc."
                />
              </div>
              <div>
                <button type="submit">Update Property</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProperty;
