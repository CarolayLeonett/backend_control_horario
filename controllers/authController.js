//authController.js
const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Función para registro de usuario
exports.registerUser = (req, res) => {
  const { username, email, password, rol_user, created_at } = req.body;

  // Verificar si los campos son válidos
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  // Verificar si el nombre de usuario ya existe en la base de datos
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error en el servidor" });
      }

      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "El nombre de usuario ya está en uso" });
      }

      // Encriptar la contraseña
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error al encriptar la contraseña" });
        }

        // Insertar el nuevo usuario en la base de datos
        const newUser = {
          username,
          password: hashedPassword,
          email,
          rol_user: rol_user,
          created_at,
        };

        db.query("INSERT INTO users SET ?", newUser, (err, results) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al crear el usuario" });
          }

          // Generar token JWT para el nuevo usuario
          const token = jwt.sign(
            { id: results.insertId, rol_user: newUser.rol_user },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          // Devolver el token y el rol del usuario
          return res.status(201).json({ token, rol_user: newUser.role });
        });
      });
    }
  );
};

// Función para login (ya existente)
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error en el servidor" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
          { id: user.id_user, rol_user: user.rol_user },
          process.env.JWT_SECRET
        );

        return res.status(200).json({ token, rol_user: user.rol_user });
      });
    }
  );
};
