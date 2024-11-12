//instantiation
const express = require("express")
const app = express()

const mysql =  require("mysql")
const moment = require("moment")

const PORT = process.env.PORT || 5001

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get("host")}${req.originalUrl} : ${moment().format()}`)
    next();
}

app.use(logger);


const connection =  mysql.createConnection({
    host: "brjcgzfsoddavnxdvgmg-mysql.services.clever-cloud.com",
    user: "ububnh7p6s5texzi",
    password: "JA75q7foksPb3y1tFA6M",
    database: "brjcgzfsoddavnxdvgmg",
});

connection.connect();

app.use(express.urlencoded({extended: false}))
app.put("/api/members", (req, res) => {
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const id = req.body.id;

    connection.query(`UPDATE userdata SET product_name='${product_name}', product_price='${product_price}',  WHERE id='${id}'`, (err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Success`})
    })

})
// DELETE
app.use(express.urlencoded({extended: false}))
app.delete("/api/members", (req, res) => {

    const id = req.body.id
    connection.query(`DELETE FROM product WHERE id = '${id}'`, (err, rows, fields) => {
        if(err) throw err;
        res.json({msg: `Successfully yeeted`})

    })

})

app.listen(5001, () => {
    console.log(`Server is running in port ${PORT}`);
})
