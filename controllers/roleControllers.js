import { pool } from "../models/db.js";

export const getRol = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM roles ");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los roles" });
  }
};

export const getUnRol = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM roles WHERE id_rol = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Rol no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el rol" });
  }
};

export const createRol = async (req, res) => {
  try {
    const { rol } = req.body;

    // Inserción en la base de datos
    const [result] = await pool.query("INSERT INTO roles (rol) VALUES (?)", [
      rol,
    ]);

    res.json({
      id: result.insertId,
      rol,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el rol" });
  }
};

export const updateRol = async (req, res) => {
  try {
    const { rol } = req.body;
    const result = await pool.query("UPDATE roles SET ? WHERE id_rol = ?", [
      req.body,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el rol" });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM roles WHERE id_rol = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Rol no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el rol" });
  }
};
