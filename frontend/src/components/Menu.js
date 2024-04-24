import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Menu.css"; // Import your CSS file for styling

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items from the backend when the component mounts
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      // Make a GET request to fetch menu items from the backend
      const response = await axios.get("http://localhost:4000/menu");

      // If the request is successful, update the menuItems state with the fetched data
      if (response.status === 200) {
        setMenuItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Item 1</th>
            <th>Item 2</th>
            <th>Item 3</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menuItem) => (
            <tr key={menuItem.menu_id}>
              <td>{menuItem.price}</td>
              <td>{menuItem.item_name_1}</td>
              <td>{menuItem.item_name_2}</td>
              <td>{menuItem.item_name_3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
