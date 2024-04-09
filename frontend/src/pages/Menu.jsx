import React, { useState, useEffect } from "react";

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch("/menu");
      if (!response.ok) {
        throw new Error("Failed to fetch menu data");
      }
      const data = await response.json();
      setMenuData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if fetching data fails
  }

  return (
    <section className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4">Menu</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>Menu ID</th>
            <th>Meal Type</th>
            <th>Price</th>
            <th>Item 1</th>
            <th>Item 2</th>
            <th>Item 3</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {menuData.map((menuItem) => (
            <tr key={menuItem.menu_id}>
              <td>{menuItem.menu_id}</td>
              <td>{menuItem.meal_type}</td>
              <td>{menuItem.price}</td>
              <td>{menuItem.item_name_1}</td>
              <td>{menuItem.item_name_2}</td>
              <td>{menuItem.item_name_3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Menu;
