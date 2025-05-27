const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear nuevo producto con mapeo de campos personalizados
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const nuevoProducto = new Producto({
      codigoProducto: body["Código del producto"],
      marca: body["Marca"],
      codigo: body["Código"],
      nombre: body["Nombre"],
      stock: body["Stock"] || 0,
      precio: body["Precio"].map(p => ({
        fecha: p["Fecha"],
        valor: p["Valor"]
      }))
    });

    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
