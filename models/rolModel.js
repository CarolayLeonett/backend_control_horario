const db = require("./db"); // Conexión a la base de datos

// Función para obtener todos los roles
const getAllRoles = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM roles", (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

// Función para obtener un rol por su ID
const getRoleById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM roles WHERE id = ?", [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results[0]);
    });
  });
};

// Función para agregar un nuevo rol
const createRole = (roleData) => {
  const { name, description } = roleData;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO roles (name, description) VALUES (?, ?)",
      [name, description],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      }
    );
  });
};

// Función para actualizar un rol
const updateRole = (id, roleData) => {
  const { name, description } = roleData;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE roles SET name = ?, description = ? WHERE id = ?",
      [name, description, id],
      (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      }
    );
  });
};

// Función para eliminar un rol
const deleteRole = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM roles WHERE id = ?", [id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
