const roleModel = require("../models/rolModel");

// Obtener todos los roles
const getRoles = async (req, res) => {
  try {
    const roles = await roleModel.getAllRoles();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los roles", error: err });
  }
};

// Obtener un rol por ID
const getRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await roleModel.getRoleById(id);
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el rol", error: err });
  }
};

// Crear un nuevo rol
const createRole = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Nombre y descripción son requeridos" });
    }
    const result = await roleModel.createRole({ name, description });
    res
      .status(201)
      .json({ message: "Rol creado exitosamente", roleId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el rol", error: err });
  }
};

// Actualizar un rol
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await roleModel.updateRole(id, { name, description });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.status(200).json({ message: "Rol actualizado exitosamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el rol", error: err });
  }
};

// Eliminar un rol
const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await roleModel.deleteRole(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.status(200).json({ message: "Rol eliminado exitosamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el rol", error: err });
  }
};

module.exports = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
