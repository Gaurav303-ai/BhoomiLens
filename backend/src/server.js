const path = require('path');
require("dotenv").config({
    path: path.join(__dirname, '../.env')
});
const app = require('./app');
const pool = require("./config/db");
const logger = require('./utils/logger');

(async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        logger.info("Database connected:", result.rows[0].now);
    } catch (err) {
        logger.error(err);
    }
})();

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
})