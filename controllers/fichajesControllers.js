//fichajesControllers.js
import { pool } from "../models/db.js";

export const getFichaje = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM `fichajes` INNER JOIN empleados ON fichajes.empleado = fichajes.id_fichaje"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los datos" });
  }
};

export const getUnFichaje = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM fichajes WHERE id_fichaje = ?",
      [req.params.id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Dato no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los datos" });
  }
};

export const createFichaje = async (req, res) => {
  try {
    const {
      empleado,
      fecha_fichaje,
      horas_trabajadas,
      horas_pausa,
      motivo_pausa,
      ubicacion_inicio_fichaje,
      ubicacion_fin_fichaje,
    } = req.body;

    // Inserción en la base de datos
    const [result] = await pool.query(
      "INSERT INTO fichajes (empleado, fecha_fichaje, horas_trabajadas, horas_pausa, motivo_pausa, ubicacion_inicio_fichaje,ubicacion_fin_fichaje) VALUES (?,?,?,?,?,?,?)",
      [
        empleado,
        fecha_fichaje,
        horas_trabajadas,
        horas_pausa,
        motivo_pausa,
        ubicacion_inicio_fichaje,
        ubicacion_fin_fichaje,
      ]
    );

    res.json({
      id: result.insertId,
      empleado,
      fecha_fichaje,
      horas_trabajadas,
      horas_pausa,
      motivo_pausa,
      ubicacion_inicio_fichaje,
      ubicacion_fin_fichaje,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear" });
  }
};

export const updateFichaje = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID no proporcionado" });
    }

    // Verificar que haya al menos un campo para actualizar
    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    // Construir la consulta SQL de forma dinámica
    let query = "UPDATE fichajes SET";
    const values = [];
    let updateFields = [];

    // Iterar sobre los campos que vienen en el body
    for (const [key, value] of Object.entries(fields)) {
      updateFields.push(`${key} = ?`); // Crear la parte de la consulta con el campo dinámico
      values.push(value); // Añadir el valor correspondiente
    }

    // Unir todos los campos para formar la parte `SET`
    query += ` ${updateFields.join(", ")} WHERE id_fichaje = ?`;
    values.push(id); // Añadir el ID al final de los valores

    // Ejecutar la consulta SQL
    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No encontrado" });
    }

    res.json({ message: "actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar" });
  }
};

export const deleteFichaje = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM fichajes WHERE id_fichaje = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "No encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar" });
  }
};
