const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token recibido:", token); // Log para ver el token recibido

  if (!token) {
    console.log("No se encontró token en la solicitud."); // Log para cuando no haya token
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se encontró token" });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardar la información del usuario en el request
    console.log("Token verificado y decodificado:", decoded); // Log para verificar el token decodificado
    next(); // Continuar con la ejecución de la ruta
  } catch (err) {
    console.log("Error al verificar el token:", err); // Log para errores en la verificación del token
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

module.exports = authenticateToken;
