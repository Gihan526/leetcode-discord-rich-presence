import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Store the current problem title
let currentProblem = {
  title: '',
  url: '',
  timestamp: null
};

app.use(cors());
app.use(express.json());

// Endpoint to receive problem title from extension
app.post('/api/problem', (req, res) => {
  const { title, url } = req.body;
  currentProblem = {
    title,
    url,
    timestamp: Date.now()
  };
  console.log('Received problem:', title);
  res.json({ success: true, message: 'Problem received' });
});

// Endpoint for Discord RPC to fetch current problem
app.get('/api/problem', (req, res) => {
  res.json(currentProblem);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
