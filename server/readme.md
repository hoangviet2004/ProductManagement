---tạo database bằng sqlserver---
CREATE DATABASE ProductManagement;
GO

USE ProductManagement;
GO

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY, 
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name NVARCHAR(100) 
);
GO

INSERT INTO users (username, password, full_name) 
VALUES ('admin', '123456', N'Quản trị viên');
GO


---chạy server---
đầu tiên mở cmd và cd vào thư mục server

lần đầu chạy thì chạy lệnh này để cài thư viện
npm init -y
npm install express mssql cors body-parser

vào file index.js và sửa phần Server= tên server trên máy mình
sau đó chạy node index.js
