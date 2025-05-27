const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  sucursal: { type: String, required: true },
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true, min: 1 }
    }
  ],
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
