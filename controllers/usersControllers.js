import { pool } from "../models/db.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM `users` INNER JOIN roles ON users.rol_user= roles.id_rol;"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const getUnUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM users WHERE id_user = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Usuario no encontrada" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID de los parámetros de la ruta
    const fields = req.body; // Obtener los campos a actualizar

    if (!id) {
      return res.status(400).json({ message: "ID del user no proporcionado" });
    }

    // Verificar que haya al menos un campo para actualizar
    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    // Construir la consulta SQL de forma dinámica
    let query = "UPDATE users SET";
    const values = [];
    let updateFields = [];

    // Iterar sobre los campos que vienen en el body
    for (const [key, value] of Object.entries(fields)) {
      updateFields.push(`${key} = ?`); // Crear la parte de la consulta con el campo dinámico
      values.push(value); // Añadir el valor correspondiente
    }

    // Unir todos los campos para formar la parte `SET`
    query += ` ${updateFields.join(", ")} WHERE id_user = ?`;
    values.push(id); // Añadir el ID al final de los valores

    // Ejecutar la consulta SQL
    const result = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el material" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id_user = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el Usuario" });
  }
};
