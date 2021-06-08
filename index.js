const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "rutas.cm8d43vzy8up.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "enrutatearkus",
    database: "rutas",
    port: 3306
})

// app.get('/', (req, res) => {
//     const sqlInsert = 
//     "INSERT INTO movie_review (movieName, movieReview) VALUES ('Overboard', 'Is the best movie');";
//     db.query(sqlInsert, (err, result) => {
//         res.send("Datos agregados");
//     });
// });
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


// app.get('/api/get', (req, res) => {
//     const sqlSelect = 
//     "SELECT * FROM movie_review ;";
//     db.query(sqlSelect, (err, result) => {
//         res.send(result);
//     });
// })


app.get('/api/:id', (req, res) => {
    const id = req.params.id
    const sqlSelect = 
    `SELECT nombre FROM ruta WHERE rutaID IN (
        SELECT rutaID FROM rutaparada where paradaID = ${id}
        );`
    // `SELECT * FROM movie_review where id = ${id};`;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
        console.log(err);
        console.log(result);
    });
})

// app.post('/api/insert', (req, res) => {

//     const movieName = req.body.movieName
//     const movieReview = req.body.movieReview

//     const sqlInsert = 
//     "INSERT INTO movie_review (movieName, movieReview) VALUES (?,?);";
//     db.query(sqlInsert, [movieName, movieReview], (err, result) => {
//         console.log(result);
//     });
// });

 app.listen (3001, () =>{ 
     console.log("running on port 3001");
 });