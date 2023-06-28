# Viral-Joshi-ecc-dssb-IS21-code-challenge-req101408

This is a simple web application that allows you to manage products using a frontend component and a backend API. The application provides basic CRUD functionality for products.

Technologies Used

Frontend: React
Backend: Node.js with Express
Database: None (Mock data is used for this implementation)
HTTP Requests: Axios
Installation

Clone the repository: git clone <repository-url>
Navigate to the project directory: cd product-management-app
Install dependencies:
Frontend: cd frontend && npm install
Backend: cd backend && npm install
Start the frontend and backend servers:
Frontend: cd frontend && npm start
Backend: cd backend && npm start
Usage

Frontend
Access the frontend application at http://localhost:3000 in your web browser.
The application displays a table with product information.
You can add a new product by filling out the form at the bottom of the page and clicking "Add Product".
To edit a product, click the "Edit" button in the corresponding row of the table. Update the fields in the form and click "Save" to save the changes or "Cancel" to discard them.
To delete a product, click the "Delete" button in the corresponding row of the table.
Backend API
The backend API is accessible at http://localhost:5000/api.
It provides the following endpoints:
GET /api/products: Retrieves all products.
POST /api/products: Adds a new product.
PUT /api/products/:productId: Updates a product with the specified productId.
DELETE /api/products/:productId: Deletes a product with the specified productId.
The API returns the appropriate HTTP response codes for each request.
