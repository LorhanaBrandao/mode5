const express = require("express");

const app = express();
const mysql = require("mysql");
const mysql2 = require("mysql2")
const cors = require("cors");

const db = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "loja",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    const { qtd } = req.body;
    const { total } = req.body;
    let mysql = "INSERT INTO prod ( name, cost, category, qtd, total) VALUES (?, ?, ?, ?, ?)";
    db.query(mysql, [name, cost, category, qtd, total], (err, result) => {
        res.send(result);
    });
});

app.post("/search", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    const { qtd } = req.body;
    const { total } = req.body;
    let mysql = "SELECT * FROM prod WHERE name = ? AND cost = ? AND category = ? AND qtd = ? AND total = ?";
    db.query(mysql, [name, cost, category, qtd, total], (err, result) => {
        if (err) res.send(err);
        res.send(result);
    });
});

app.get("/getCards", (req, res) => {
    let mysql = "SELECT * FROM prod";
    db.query(mysql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;
    const { qtd } = req.body;
    const { total } = req.body;
    let mysql = "UPDATE prod SET name = ?, cost = ?, category = ?, qtd = ?, total = ? WHERE id = ?";
    db.query(mysql, [name, cost, category, qtd, total, id], (err, result) => {
        if (err) {
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let mysql = "DELETE FROM prod WHERE id = ?";
    db.query(mysql, id, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Rodando o Servidor na Porta 3001");
})