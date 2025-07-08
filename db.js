const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running on port 3001');
});

app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log('Received:', data);
  res.json({ message: 'Data received successfully', receivedData: data });
});

// This is the line that starts the server — VERY important
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
