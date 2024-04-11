import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuImage = () => {
  const [menuImagePath, setMenuImagePath] = useState("");

  useEffect(() => {
    // Fetch menu image path from backend
    axios
      .get("http://localhost:4000/menu/latest")
      .then((response) => {
        setMenuImagePath(response.data.menuImagePath);
      })
      .catch((error) => {
        console.error("Error fetching menu image path:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      {menuImagePath ? (
        <img
          src={`http://localhost:4000/uploads/${menuImagePath}`}
          alt="Menu"
          style={{ maxWidth: "100%" }}
        />
      ) : (
        <p>Loading menu image...</p>
      )}
    </div>
  );
};

export default MenuImage;
