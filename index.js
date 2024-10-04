const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
const personaRouter = require("./routes/personaRoutes");
const oficinaRouter = require("./routes/oficinaRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/personas", personaRouter);
app.use("/api/oficinas", oficinaRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Aplicacion corriendo en puerto ${PORT}`);
})