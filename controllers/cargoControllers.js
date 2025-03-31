import { pool } from "../models/db.js";

export const getCargo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM cargos ");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los cargos" });
  }
};

export const getUnCargo = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM cargos WHERE id_cargo = ?",
      [req.params.id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Cargo no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el cargo" });
  }
};

export const createCargo = async (req, res) => {
  try {
    const { cargo } = req.body;

    // Inserción en la base de datos
    const [result] = await pool.query("INSERT INTO cargos (cargo) VALUES (?)", [
      cargo,
    ]);

    res.json({
      id: result.insertId,
      cargo,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el cargo" });
  }
};

export const updateCargo = async (req, res) => {
  try {
    const { cargo } = req.body;
    const result = await pool.query("UPDATE cargos SET ? WHERE id_cargo = ?", [
      req.body,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el cargo" });
  }
};

export const deleteCargo = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM cargos WHERE id_cargos = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "cargo no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el cargo" });
  }
};
