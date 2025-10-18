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

// Lista de orígenes permitidos
const allowedOrigins = [
  'https://front-end-archivo7.vercel.app', // URL del frontend en Vercel
  'http://localhost:4200' // URL del frontend en local
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir solicitudes sin 'origin' (como las de Postman o apps móviles) y las de la lista blanca
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  optionsSuccessStatus: 200
};


// Middleware
app.use(cors(corsOptions));
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