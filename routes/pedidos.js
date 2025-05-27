const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');

router.post('/', async (req, res) => {
  try {
    const { sucursal, productos } = req.body;

    if (!sucursal || !productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ message: 'Sucursal y productos son requeridos' });
    }

    // Validar stock
    for (const item of productos) {
      const productoDB = await Producto.findOne({ codigoProducto: item.codigoProducto });
      if (!productoDB) {
        return res.status(404).json({ message: `Producto no encontrado: ${item.codigoProducto}` });
      }
      if (productoDB.stock < item.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para producto ${productoDB.nombre}` });
      }
    }

    // Descontar stock y preparar productos con _id
    const productosConId = [];
    for (const item of productos) {
      const productoDB = await Producto.findOneAndUpdate(
        { codigoProducto: item.codigoProducto },
        { $inc: { stock: -item.cantidad } },
        { new: true }
      );

      productosConId.push({
        producto: productoDB._id,
        cantidad: item.cantidad
      });
    }

    // Crear pedido
    const nuevoPedido = new Pedido({ sucursal, productos: productosConId });
    await nuevoPedido.save();

    res.status(201).json({ message: 'Pedido creado y stock actualizado', pedido: nuevoPedido });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear pedido', error });
  }
});

// Obtener todos los pedidos con detalles de productos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('productos.producto')
      .exec();

    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error });
  }
});

module.exports = router;

