const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')

const app = express();

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Swagger options
const options = {
  swaggerDefinition: {
    openapi:'3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'API documentation for the Product API',
    },
    servers:[
      {
      url:'http://localhost:3000'
      }
    ] 
  },
  apis: ['index.js'], // Replace with the actual filename of your Express app file
};

// Serve Swagger API documentation
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


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
/**
 * @swagger
 * /api/health:
 *   get:
 *     description: Health endpoint
 *     responses:
 *       '200':
 *         description: OK
 */

// Health endpoint
app.get('/api/health', (req, res) => {
  res.sendStatus(200);
});

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */


// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /api/product/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

app.get('/api/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const product = products.find((p) => p.productId === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(product);
});


// POST a new product
/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */

app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});


// PUT update a product
/**
 * @swagger
 * /api/product/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */

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
/**
 * @swagger
 * /api/product/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Product not found
 */

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



app.get('/api/products', (req, res) => {
  res.json(products);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
