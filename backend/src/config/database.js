const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then((connection) => {

        console.log("MySQL bağlantısı başarılı.");

        connection.release();

    })
    .catch((error) => {

        console.error("MySQL bağlantı hatası:");
        console.error(error);

    });

module.exports = pool;