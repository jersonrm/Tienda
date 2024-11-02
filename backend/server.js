import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar cors

dotenv.config();
import products from './data/products.js';
const port = process.env.PORT || 5000;

const app = express();

// Usar CORS para permitir solicitudes desde otros orígenes
app.use(cors()); // Permite todas las solicitudes

// O especificar el dominio de tu frontend
// app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (req, res) => {
  res.send('el API está funcionando');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
