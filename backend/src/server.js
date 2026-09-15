require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        const connection = await pool.getConnection();

        console.log("MySQL bağlantısı başarılı.");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Backend ${PORT} portunda çalışıyor.`);
        });

    } catch (error) {
        console.error("MySQL bağlantı hatası:", error.message);
        process.exit(1);
    }
}

startServer();