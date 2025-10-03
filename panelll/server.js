const express = require("express");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Configurar MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2006", // tu contraseña
  database: "mi_panel"
});

db.connect(err => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Configurar multer para subir imágenes
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ------------------- RUTAS -------------------

// Guardar producto
app.post("/agregar-producto", upload.single("imagen"), (req, res) => {
  const { titulo, descripcion } = req.body;
  const imagen = req.file ? "/uploads/" + req.file.filename : "";

  const sql = "INSERT INTO productos (imagen, titulo, descripcion) VALUES (?, ?, ?)";
  db.query(sql, [imagen, titulo, descripcion], (err) => {
    if (err) console.error(err);
    res.redirect("/admin.html");
  });
});

// Obtener productos
app.get("/productos", (req, res) => {
  db.query("SELECT * FROM productos ORDER BY id DESC", (err, results) => {
    if (err) console.error(err);
    res.json(results);
  });
});

// Guardar mensaje de contacto
app.post("/enviar-mensaje", (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const sql = "INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)";
  db.query(sql, [nombre, email, mensaje], (err) => {
    if (err) console.error(err);
    res.redirect("/contacto.html?enviado=1");
  });
});

// Obtener mensajes
app.get("/mensajes", (req, res) => {
  db.query("SELECT * FROM mensajes ORDER BY fecha DESC", (err, results) => {
    if (err) console.error(err);
    res.json(results);
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
