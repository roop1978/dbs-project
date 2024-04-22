import React, { useState, useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  const [latestMenuImagePath, setLatestMenuImagePath] = useState(null);

  useEffect(() => {
    const fetchLatestMenuImage = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/latest-menu-image"
        );
        const relativePath = response.data.latestMenuImage;
        const absolutePath = `http://localhost:4000/${relativePath.replace(
          /\\/g,
          "/"
        )}`;
        setLatestMenuImagePath(absolutePath);
      } catch (error) {
        console.error("Error fetching latest menu image:", error);
      }
    };

    fetchLatestMenuImage();
  }, []);

  return (
    <div>
      <h1>Welcome to Our Restaurant!</h1>
      {latestMenuImagePath && (
        <img
          src={latestMenuImagePath}
          alt="Latest Menu"
          style={{ maxWidth: "100%", height: "auto", width: "500px" }} // Adjust width as needed
        />
      )}
    </div>
  );
};

export default LandingPage;
