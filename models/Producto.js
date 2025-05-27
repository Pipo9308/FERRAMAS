const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  codigoProducto: { type: String, required: true },
  marca: String,
  codigo: String,
  nombre: String,
  stock: { type: Number, default: 0 }, // ✅ agregado
  precio: [{
    fecha: Date,
    valor: Number
  }]
});

// Evita error de sobreescritura del modelo en desarrollo
module.exports = mongoose.models.Producto || mongoose.model('Producto', productoSchema);
