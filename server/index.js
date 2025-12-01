const express = require('express');
const sql = require('mssql/msnodesqlv8'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- CẤU HÌNH KẾT NỐI WINDOWS AUTHENTICATION ---
const dbConfig = {
    connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=HOANGVIET;Database=ProductManagement;Trusted_Connection=yes;',
};

// Hàm kết nối DB
async function connectDB() {
    try {
        await sql.connect(dbConfig);
        console.log('Đã kết nối SQL Server (Windows Auth) thành công!');
    } catch (err) {
        console.error('Lỗi kết nối SQL Server:', err);
    }
}

connectDB();

// API Đăng nhập
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const request = new sql.Request();
        request.input('username', sql.VarChar, username);
        request.input('password', sql.VarChar, password);

        const result = await request.query('SELECT * FROM users WHERE username = @username AND password = @password');

        if (result.recordset.length > 0) {
            res.json({ success: true, user: result.recordset[0] });
        } else {
            res.json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi Server");
    }
});

app.listen(3000, () => {
    console.log('Server đang chạy tại cổng 3000');
});