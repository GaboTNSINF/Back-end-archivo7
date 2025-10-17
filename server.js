const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const userRoutes = require('./routes/user.routes');

// Cargar variables de entorno
require('dotenv').config();

// Conectar a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente.' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Usar las rutas de usuario
app.use('/api/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});