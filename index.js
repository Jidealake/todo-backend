const express = require('express');
const cors = require('cors');
const pool = require('./db'); // PostgreSQL config

const app = express();
const PORT = process.env.PORT || 3001; // Render uses process.env.PORT

// Middleware
app.use(cors());
app.use(express.json());

// ✅ /todos GET route
app.get('/todos', async (req, res) => {
  console.log("🟢 /todos route hit");
  try {
    const result = await pool.query('SELECT * FROM todos');
    console.log("✅ Fetched todos:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error querying DB:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// 🔚 404 route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => 
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

