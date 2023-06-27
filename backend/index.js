const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Sample JSON schema for product
const products = [
  {
    productId: 1,
    productName: 'Product 1',
    productOwnerName: 'Owner 1',
    developers: ['Developer 1', 'Developer 2'],
    scrumMasterName: 'Scrum Master 1',
    startDate: '2023/01/01',
    methodology: 'Agile',
    location: 'https://github.com/bcgov/project1'
  },
  {
    productId: 2,
    productName: 'Product 2',
    productOwnerName: 'Owner 2',
    developers: ['Developer 3', 'Developer 4'],
    scrumMasterName: 'Scrum Master 2',
    startDate: '2023/02/01',
    methodology: 'Waterfall',
    location: 'https://github.com/bcgov/project2'
  },
  // Add more sample products here
];

// Health endpoint
app.get('/api/health', (req, res) => {
  res.sendStatus(200);
});

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});


app.get('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = products.find((p) => p.productId === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(product);
});


// POST a new product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update a product
app.put('/api/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const updatedProduct = req.body;
  const index = products.findIndex((product) => product.productId === productId);

  if (index !== -1) {
    products[index] = updatedProduct;
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE a product
app.delete('/api/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const index = products.findIndex((product) => product.productId === productId);

  if (index !== -1) {
    products.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Pre-populate the solution with sample products
for (let i = 1; i <= 40; i++) {
  const sampleProduct = {
    productId: i,
    productName: `Product ${i}`,
    productOwnerName: `Product Owner ${i}`,
    developers: [`Developer 1${i}`, `Developer 2${i}`, `Developer 3${i}`],
    scrumMasterName: `Scrum Master ${i}`,
    startDate: 'YYYY/MM/DD',
    methodology: 'Agile',
    location: 'https://github.com/bcgov',
  };
  products.push(sampleProduct);
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
