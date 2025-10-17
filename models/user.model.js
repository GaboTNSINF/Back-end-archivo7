const mongoose = require('mongoose');

// Definir esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  nombreCompleto: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  edad: Number,
  activo: {
    type: Boolean,
    default: true
  },
  fechaCreacion: String
}, {
  timestamps: true // Esto agrega createdAt y updatedAt automáticamente
});

// Crear y exportar el modelo (usando la colección 'usuarios')
const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

module.exports = Usuario;