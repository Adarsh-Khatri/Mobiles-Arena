let express = require("express");
let mysql = require('mysql');
require('dotenv').config();
let cors = require('cors');
const PORT = process.env.PORT || 2410;


let app = express();
app.use(express.json());
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD");
    res.header("Access-Control-Allo-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.listen(PORT, () => console.log(`Listening on port http://localhost/${PORT}`))


const { Client } = require("pg")
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    ssl: { rejectUnauthorized: false }
});
client.connect((err) => {
    if (err) console.error('Error connecting to the database:', err);
    else console.log('CONNECTED SECURELY');
});



// @ GET 
// @ ROUTE : /api/mobiles/brand/:brand
app.get('/api/mobiles/brand/:brand', (req, res) => {
    let { brand } = req.params;
    let sql = `SELECT * FROM MOBILES WHERE brand = $1`;
    client.query(sql, [brand], (err, data) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json(data.rows)
    })
})


// @ GET 
// @ ROUTE : /api/mobiles/ram/:ram
app.get('/api/mobiles/ram/:ram', (req, res) => {
    let { ram } = req.params;
    let sql = `SELECT * FROM MOBILES WHERE ram = $1`;
    client.query(sql, [ram], (err, data) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json(data.rows)
    })
})


// @ GET 
// @ ROUTE : /api/mobiles/rom/:rom
app.get('/api/mobiles/rom/:rom', (req, res) => {
    let { rom } = req.params;
    let sql = `SELECT * FROM MOBILES WHERE rom = $1`;
    client.query(sql, [rom], (err, data) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json(data.rows)
    })
})


// @ GET 
// @ ROUTE : /api/mobiles/os/:os
app.get('/api/mobiles/os/:os', (req, res) => {
    let { os } = req.params;
    let sql = `SELECT * FROM MOBILES WHERE os = $1`;
    client.query(sql, [os], (err, data) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json(data.rows)
    })
})


// @ GET 
// @ ROUTE : /api/mobiles/:name
app.get('/api/mobiles/:name', (req, res) => {
    let { name } = req.params;
    let sql = `SELECT * FROM MOBILES WHERE name = $1`;
    client.query(sql, [name], (err, data) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json(data.rows)
    })
})


// @ GET 
// @ ROUTE : /api/mobiles AND QUERY Params ARE { brand, ram, rom }
app.get('/api/mobiles', (req, res) => {
    let { brand, ram, rom } = req.query;
    const sql = "SELECT * FROM MOBILES";
    client.query(sql, (err, result) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else {
            let data = result.rows;
            let brandArr = brand && brand.split(',');
            let ramArr = ram && ram.split(',');
            let romArr = rom && rom.split(',');
            data = brandArr ? data.filter(dt => brandArr.findIndex(br => br === dt.brand) >= 0) : data;
            data = ramArr ? data.filter(dt => ramArr.findIndex(ram => ram === dt.ram) >= 0) : data;
            data = romArr ? data.filter(dt => romArr.findIndex(rom => rom === dt.rom) >= 0) : data;
            console.log(data);
            return res.status(200).json(data)
        }
    })
})


// @ DELETE 
// @ ROUTE : /api/mobiles/:name
app.delete('/api/mobiles/:name', (req, res) => {
    let { name } = req.params;
    let sql = `DELETE FROM MOBILES WHERE name = $1`;
    client.query(sql, [name], (err) => {
        if (err) res.status(400).json(`ERROR : ${err.message}`);
        else return res.status(200).json({ message: `Mobile ${name} Deleted Successfully` })
    })
})


// @ POST
// @ ROUTE : /api/mobiles
app.post('/api/mobiles', (req, res) => {
    let body = req.body;
    let sql = `INSERT INTO MOBILES(name, price, brand, ram, rom ,os) VALUES($1, $2, $3, $4, $5, $6)`;
    client.query(sql, [body.name, body.price, body.brand, body.ram, body.rom, body.os], (err) => {
        if (err) return res.status(404).json(`ERROR : ${err.message}`);
        else return res.status(200).json(body);
    })
})


// @ PUT
// @ ROUTE : /api/mobiles/:name
app.put('/api/mobiles/:name', (req, res) => {
    let { name } = req.params;
    let body = req.body;
    let sql = `UPDATE MOBILES SET name = $1, price = $2, brand = $3, ram = $4, rom = $5, os = $6 WHERE name = $7`;
    client.query(sql, [body.name, body.price, body.brand, body.ram, body.rom, body.os, name], (err, data) => {
        if (err) return res.status(404).json({ error: err.message });
        else return res.status(200).json(body);
    });
});



// ---------------------------------------------------------------- FOR RESETING THE DATA


let mobilesData = [
    { name: "iPhone XR", price: 49000, brand: "Apple", ram: "4GB", rom: "128GB", os: "iOS" },
    { name: "iPhone 7", price: 28500, brand: "Apple", ram: "3GB", rom: "32GB", os: "iOS" },
    { name: "iPhone 8", price: 33000, brand: "Apple", ram: "3GB", rom: "64GB", os: "iOS" },
    { name: "iPhone 11", price: 52000, brand: "Apple", ram: "6GB", rom: "128GB", os: "iOS" },
    { name: "iPhone 12", price: 71000, brand: "Apple", ram: "8GB", rom: "128GB", os: "iOS" },
    { name: "J1", price: 7500, brand: "Samsung", ram: "3GB", rom: "32GB", os: "Android" },
    { name: "J2", price: 9500, brand: "Samsung", ram: "4GB", rom: "32GB", os: "Android" },
    { name: "J5", price: 12700, brand: "Samsung", ram: "6GB", rom: "64GB", os: "Android" },
    { name: "M32", price: 18300, brand: "Samsung", ram: "6GB", rom: "64GB", os: "Android" },
    { name: "A25", price: 24600, brand: "Samsung", ram: "8GB", rom: "128GB", os: "Android" },
    { name: "Note 6", price: 9999, brand: "Xiaomi", ram: "3GB", rom: "32GB", os: "Android" },
    { name: "Note 7", price: 12000, brand: "Xiaomi", ram: "6GB", rom: "64GB", os: "Android" },
    { name: "Note 8", price: 14100, brand: "Xiaomi", ram: "8GB", rom: "128GB", os: "Android" },
    { name: "Note 9", price: 17900, brand: "Xiaomi", ram: "8GB", rom: "128GB", os: "Android" },
    { name: "X4", price: 11300, brand: "Realme", ram: "3GB", rom: "32GB", os: "Android" },
    { name: "X5", price: 12900, brand: "Realme", ram: "4GB", rom: "64GB", os: "Android" },
    { name: "X6", price: 15800, brand: "Realme", ram: "6GB", rom: "128GB", os: "Android" },
    { name: "X7", price: 19300, brand: "Realme", ram: "8GB", rom: "128GB", os: "Android" },
]





// @ PUT
// @ ROUTE : /svr/resetData
app.get('/api/resetData', (req, res) => {
    let sql = `DELETE FROM MOBILES`;
    client.query(sql, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error Resetting Data' });
        }
        let mobileArr = mobilesData.map(mobile => [mobile.name, mobile.price, mobile.brand, mobile.ram, mobile.rom, mobile.os]);
        let placeholders = mobileArr.map((_, index) => `($${index * 6 + 1}, $${index * 6 + 2}, $${index * 6 + 3}, $${index * 6 + 4}, $${index * 6 + 5}, $${index * 6 + 6})`).join(', ');
        let sql2 = `INSERT INTO MOBILES(name, price, brand, ram, rom, os) VALUES ${placeholders}`;
        client.query(sql2, mobileArr.flat(), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error Resetting Data' });
            }
            return res.status(200).json({ message: "DATA RESET SUCCESSFULLY" });
        });
    });
});

