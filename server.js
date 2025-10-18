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

// --- INICIO DE LA CORRECCIÓN DE CORS ---

// Opciones de CORS para permitir solo a tu frontend de Vercel
const corsOptions = {
  origin: 'https://front-end-archivo7.vercel.app', // La URL de tu frontend
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions)); // ¡Importante! Usamos las opciones aquí
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- FIN DE LA CORRECCIÓN DE CORS ---


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