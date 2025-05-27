const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB (local o Atlas)
mongoose.connect('mongodb+srv://feliramos:Felipe1993@cluster0.kp6gv7g.mongodb.net/ferremas?retryWrites=true&w=majority&appName=Cluster0', {

  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

// Rutas
const productosRouter = require('./routes/productos');
app.use('/api/productos', productosRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const pedidosRouter = require('./routes/pedidos');
app.use('/api/pedidos', pedidosRouter);

