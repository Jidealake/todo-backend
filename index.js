const express = require('express');
const cors = require('cors');
const pool = require('./db'); // db.js file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/app.get('/todos', async (req, res) => {
  console.log("🟢 /todos route was called");
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Optional: Root route fallback
app.get('/', (req, res) => {
  res.send('Backend is running on port 3001');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

