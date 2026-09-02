const express = require("express");
const app = express();
const cors = require('cors');
const errorHandler = require("./middlewares/errorHandler");
const requestLogger = require("./middlewares/request.logger");
const routes = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/users',routes);
app.get('/api', (req, res) => {
  res.send('Server is running and Postman is connected!');
});
app.use(errorHandler);


module.exports = app;