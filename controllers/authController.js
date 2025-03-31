//authController.js
import { pool } from "../models/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendNewUserEmail } from "../services/mailServices.js";

// Función para registro de usuario
export const registerUser = async (req, res) => {
  const { username, empleado, email, password, rol_user, created_at } =
    req.body; // Añadimos empleadoId

  // Verificar si los campos son válidos
  if (!username || !empleado || !email || !password) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios, incluido el ID del empleado",
    });
  }

  try {
    // Verificar si el nombre de usuario ya existe en la base de datos
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos, incluyendo el `empleadoId`
    const newUser = {
      username,
      empleado: empleado, // Asignamos el ID del empleado creado en el paso anterior
      password: hashedPassword,
      email,
      rol_user,
      created_at,
    };

    const [result] = await pool.query("INSERT INTO users SET ?", newUser);

    // Enviar el correo al usuario con sus credenciales
    await sendNewUserEmail(email, username, password); // Aquí se envía el correo

    // Generar token JWT para el nuevo usuario
    const token = jwt.sign(
      {
        id: result.insertId,
        rol_user: newUser.rol_user,
        empleado: newUser.empleado,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Devolver el token y el rol del usuario
    return res
      .status(201)
      .json({ token, rol_user: newUser.rol_user, empleado: newUser.empleado });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

// Función para login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = users[0];

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Asegurarse de que el rol_user sea un número
    const rolUser = Number(user.rol_user); // Convierte a número si no lo es
    if (isNaN(rolUser)) {
      return res.status(500).json({ message: "Rol de usuario no válido" });
    }

    const empleadoId = user.empleado; // O el campo donde almacenes el ID del empleado
    if (!empleadoId) {
      return res.status(500).json({ message: "ID de empleado no válido" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id_user, rol_user: rolUser, empleado: empleadoId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // El token expirará en 1 hora
    );

    // Enviar el token y el rol de usuario como respuesta
    return res.status(200).json({ token, rol_user: rolUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
