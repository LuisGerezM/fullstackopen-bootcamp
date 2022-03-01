const express = require("express");
const app = express();
// https://github.com/expressjs/morgan
const morgan = require("morgan");

app.use(express.json());

const methods = require("./routes/routesMethods");

morgan.token("id", (req) => req.params.id);
morgan.token("body", (req) => JSON.stringify(req.body));

// 3.8*: Configure morgan para que también muestre los datos enviados en las solicitudes HTTP POST
app.use(morgan(":method :url :response-time ms :status :body "));
app.use("/api", methods);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
