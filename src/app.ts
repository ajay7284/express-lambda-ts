import express from "express";
import cors from "cors";
require('dotenv').config();
import studentsRouter from "./routes/students.route";

const app = express();

// Middlewares
app.disable("etag");
app.use(cors());
app.use(express.json());

// Routes
app.use("/students", studentsRouter);



// -------------------------
// Local server (development only)
// -------------------------
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

export default app;
