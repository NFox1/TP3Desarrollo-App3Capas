// app.js
const express = require('express');
const productService = require('./productService');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/products', (req, res) => {
    res.json(productService.listProducts());
});

app.post('/api/products', (req, res) => {
    try {
        const newProduct = productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    const products = productService.listProducts();
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Aplicación de Productos</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                form { margin-bottom: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background-color: #f2f2f2; }
                .error { color: red; margin-top: 10px; }
            </style>
        </head>
        <body>
            <h1>Gestión de Productos</h1>
            
            <h2>Agregar Producto</h2>
            <form id="productForm">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required><br><br>
                
                <label for="price">Precio:</label>
                <input type="number" id="price" name="price" step="0.01" required><br><br>
                
                <button type="submit">Agregar Producto</button>
                <div id="error" class="error"></div>
            </form>
            
            <h2>Lista de Productos</h2>
            <table id="productsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(p => `
                        <tr>
                            <td>${p.id}</td>
                            <td>${p.name}</td>
                            <td>$${p.price.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <script>
                document.getElementById('productForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const errorElement = document.getElementById('error');
                    errorElement.textContent = '';
                    
                    const name = document.getElementById('name').value;
                    const price = parseFloat(document.getElementById('price').value);
                    
                    try {
                        const response = await fetch('/api/products', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ name, price })
                        });
                        
                        if (response.ok) {
                            const newProduct = await response.json();
                            const tableBody = document.querySelector('#productsTable tbody');
                            
                            const newRow = document.createElement('tr');
                            newRow.innerHTML = \`
                                <td>\${newProduct.id}</td>
                                <td>\${newProduct.name}</td>
                                <td>\$\${newProduct.price.toFixed(2)}</td>
                            \`;
                            
                            tableBody.appendChild(newRow);
                            document.getElementById('productForm').reset();
                        } else {
                            const errorData = await response.json();
                            errorElement.textContent = errorData.error || 'Error al agregar el producto';
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        errorElement.textContent = 'Error al comunicarse con el servidor';
                    }
                });
            </script>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Aplicación 3 capas en http://localhost:${port}`);
});