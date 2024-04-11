import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = ({ adminDetails }) => {
  const [formDetails, setFormDetails] = useState({
    admin_id: "",
    username: "",
    mealType: "",
    price: "",
    itemName1: "",
    itemName2: "",
    itemName3: "",
    menuImage: null,
  });

  useEffect(() => {
    if (adminDetails) {
      setFormDetails((prevState) => ({
        ...prevState,
        username: adminDetails.username,
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
      formData.append("menuImage", formDetails.menuImage);
      formData.append("mealType", formDetails.mealType);
      formData.append("price", formDetails.price);
      formData.append("itemName1", formDetails.itemName1);
      formData.append("itemName2", formDetails.itemName2);
      formData.append("itemName3", formDetails.itemName3);

      const response = await axios.post(
        "http://localhost:4000/menu/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Menu created successfully!");
      } else {
        alert("Error creating menu. Please try again later.");
      }
    } catch (error) {
      alert("Error creating menu. Please try again later.");
      console.error("Error creating menu:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
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
            name="username"
            value={formDetails.username}
            onChange={handleChange}
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
            onChange={handleChange}
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
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Meal Type:</label>
          <input
            type="text"
            name="mealType"
            value={formDetails.mealType}
            onChange={handleChange}
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
          <label style={{ fontWeight: "bold" }}>Price:</label>
          <input
            type="number"
            name="price"
            value={formDetails.price}
            onChange={handleChange}
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
          <label style={{ fontWeight: "bold" }}>Item 1:</label>
          <input
            type="text"
            name="itemName1"
            value={formDetails.itemName1}
            onChange={handleChange}
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
          <label style={{ fontWeight: "bold" }}>Item 2:</label>
          <input
            type="text"
            name="itemName2"
            value={formDetails.itemName2}
            onChange={handleChange}
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
          <label style={{ fontWeight: "bold" }}>Item 3:</label>
          <input
            type="text"
            name="itemName3"
            value={formDetails.itemName3}
            onChange={handleChange}
            style={{
              marginLeft: "10px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
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
