const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  // Add more initial data as needed
];

// Get all items
app.get('/api/items', (req, res) => {
  res.json(data);
});

// Get a specific item
app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = data.find(item => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Add a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Update an item
app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  data = data.map(item => (item.id === itemId ? updatedItem : item));

  res.json(updatedItem);
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  data = data.filter(item => item.id !== itemId);

  res.json({ message: 'Item deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});