import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import rolRoutes from "./routes/roleRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import empleadosRoutes from "./routes/empleadosRoutes.js";
import cargoRoutes from "./routes/cargoRoutes.js";
import fichajesRoutes from "./routes/fichajesRoutes.js";

const app = express();

const corsOptions = {
  allowedHeaders: ["Authorization", "Content-Type"],
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Rutas de autenticación
app.use("/api/", authRoutes);
app.use("/api/", rolRoutes);
app.use("/api/", usersRoutes);
app.use("/api/", empleadosRoutes);
app.use("/api/", cargoRoutes);
app.use("/api/", fichajesRoutes);

const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
