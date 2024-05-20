const express = require("express");
const app = express();
const consultaRouter = require("./routes/consulta.router");

app.use(express.json())

// Add middleware and other routes as needed
app.use("/consultas", consultaRouter);

// Handle other endpoints or invalid requests
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Handle errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
