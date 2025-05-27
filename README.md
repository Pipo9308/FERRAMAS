# FERREMAS API - Node.js con Express y MongoDB

## Requisitos
- Node.js instalado
- MongoDB corriendo localmente o conexión a MongoDB Atlas

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000/api/productos`

## Endpoints principales

- GET /api/productos : Lista todos los productos
- GET /api/productos/:codigoProducto : Obtiene producto por código
- POST /api/productos : Crea un nuevo producto (enviar JSON en body)

## Ejemplo JSON para crear producto

```json
{
  "codigoProducto": "FER-12345",
  "marca": "Bosch",
  "codigo": "BOS-67890",
  "nombre": "Taladro Percutor Bosch",
  "categoria": "Herramientas Eléctricas",
  "stock": 10,
  "precio": [
    {
      "fecha": "2023-05-10T03:00:00.000Z",
      "valor": 89090.99
    }
  ]
}
```
