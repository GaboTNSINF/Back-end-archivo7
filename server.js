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

// Confiar en el proxy de Render para obtener la IP y el protocolo correctos
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;

// --- INICIO DE LA CORRECCIÓN DE CORS ---

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://front-end-archivo7.vercel.app',
      'http://localhost:4200'
    ];

    // Normaliza el origen eliminando la barra final si existe.
    const normalizedOrigin = origin ? origin.replace(/\/$/, '') : origin;

    // Permite solicitudes de la lista blanca y solicitudes sin origen (como Postman).
    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
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