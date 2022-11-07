const express = require("express");
const cors = require("cors");
const contatoRoutes = require("./contato.routes.js");
const telefoneRoutes = require("./telefone.routes.js");
const app = express();

app.use(express.json());
app.use(cors());
app.use(contatoRoutes);
app.use(telefoneRoutes);

app.get("/health", (req, res) => {
  return res.json("up");
});

app.listen(3333, () => console.log("Server up in 3333"));
