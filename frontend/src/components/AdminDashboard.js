import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = ({ adminDetails }) => {
  const [formDetails, setFormDetails] = useState({
    admin_id: "",
    name: "", // Changed from username to name to match the state update logic
    menuImage: null,
  });

  useEffect(() => {
    if (adminDetails) {
      setFormDetails((prevState) => ({
        ...prevState,
        name: adminDetails.name,
        admin_id: adminDetails.admin_id,
      }));
    }
  }, [adminDetails]);

  const handleAdminDetailsSubmit = (e) => {
    e.preventDefault();
    console.log(formDetails);
  };

  const handleImageChange = (e) => {
    setFormDetails({ ...formDetails, menuImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("admin_id", formDetails.admin_id); // Pass admin ID to the backend
      formData.append("menuImage", formDetails.menuImage);

      const response = await axios.post(
        "http://localhost:4000/menu/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Menu image uploaded successfully!");
      } else {
        alert("Error uploading menu image. Please try again later.");
      }
    } catch (error) {
      alert("Error uploading menu image. Please try again later.");
      console.error("Error uploading menu image:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Admin Dashboard
      </h2>
      {/* Admin details form */}
      <form onSubmit={handleAdminDetailsSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formDetails.name}
            readOnly // Make the name field read-only
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Admin ID:</label>
          <input
            type="text"
            name="admin_id"
            value={formDetails.admin_id}
            readOnly // Make the admin ID field read-only
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </div>
      </form>
      {/* Menu creation form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Menu Image:</label>
          <input
            type="file"
            name="menuImage"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              marginLeft: "10px",
              width: "100%",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#008CBA",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Create Menu
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
