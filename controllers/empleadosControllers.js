//empleadosControllers.js
import { pool } from "../models/db.js";

export const getEmpleado = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM `empleados` INNER JOIN cargos ON empleados.cargo_empleado=cargos.id_cargo WHERE NOT horario_entrada=''"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los empleados" });
  }
};

export const getUnEmpleado = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM empleados WHERE id_empleados = ?",
      [req.params.id]
    );

    if (result.length === 0)
      return res.status(404).json({ message: "Empleado no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el Empleado" });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      dni,
      fecha_ingreso,
      correo,
      cargo_empleado,
      horario_entrada,
      horario_salida,
      created_at,
    } = req.body;

    // Inserción en la base de datos
    const [result] = await pool.query(
      "INSERT INTO empleados (nombres,apellidos,dni,fecha_ingreso,correo,cargo_empleado,horario_entrada,horario_salida, created_at) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        nombres,
        apellidos,
        dni,
        fecha_ingreso,
        correo,
        cargo_empleado,
        horario_entrada,
        horario_salida,
        created_at,
      ]
    );

    res.json({
      id: result.insertId,
      nombres,
      apellidos,
      dni,
      fecha_ingreso,
      correo,
      cargo_empleado,
      horario_entrada,
      horario_salida,
      created_at,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el empleado" });
  }
};

export const updateEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "ID del empleado no proporcionado" });
    }

    // Verificar que haya al menos un campo para actualizar
    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    // Construir la consulta SQL de forma dinámica
    let query = "UPDATE empleados SET";
    const values = [];
    let updateFields = [];

    // Iterar sobre los campos que vienen en el body
    for (const [key, value] of Object.entries(fields)) {
      updateFields.push(`${key} = ?`); // Crear la parte de la consulta con el campo dinámico
      values.push(value); // Añadir el valor correspondiente
    }

    // Unir todos los campos para formar la parte `SET`
    query += ` ${updateFields.join(", ")} WHERE id_empleados = ?`;
    values.push(id); // Añadir el ID al final de los valores

    // Ejecutar la consulta SQL
    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el empleado" });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM empleados WHERE id_empleados = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Empleado no encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el rol" });
  }
};
