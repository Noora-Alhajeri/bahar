const express = require('express');
const app = express();
const PORT = 3001;

// Define your API routes here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/messages');
      const data = await response.json();
      console.log('Data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };