import Alumno from "./models/alumno.js"
import {restar, sumar} from "./modules/matematica.js"
import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"
import express  from "express";
import cors     from "cors";

const app  = express();
const port = 3000;              // (http://localhost:3000)

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Ya estoy respondiendo!(200)');
})

app.get('/saludar/:nombre', (req, res) => {
    res.status(200).send('Hola! ' + req.params.nombre);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    let anio = req.params.ano;
    let mes = req.params.mes;
    let dia = req.params.dia;
    let fechon = anio + "-" + mes + "-" + dia;
    let fecha = Date.parse(fechon)
    if(isNaN(fecha)){
        res.status(400).send("Fecha invalida")
    }
    else{
        res.status(200).send("Fecha valida")
    }
})

app.get('/matematica/sumar', (req, res) => {
    let n1 = parseFloat(req.query.n1);  // Lee el primer número (n1) desde los parámetros de la query
    let n2 = parseFloat(req.query.n2);  // Lee el segundo número (n2) desde los parámetros de la query

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Parámetros inválidos");
    }
    let suma = sumar(n1, n2);
    res.status(200).send("Suma valida: " + suma);
});

app.get('/matematica/restar', (req, res) => {
    let n1 = parseFloat(req.query.n1);  // Lee el primer número (n1) desde los parámetros de la query
    let n2 = parseFloat(req.query.n2);  // Lee el segundo número (n2) desde los parámetros de la query

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Parámetros inválidos");
    }

    let resultado = restar(n1, n2);
    res.status(200).send("Resta valida: " + resultado);
});

app.get('/matematica/multiplicar', (req, res) => {
    let n1 = parseFloat(req.query.n1);  // Lee el primer número (n1) desde los parámetros de la query
    let n2 = parseFloat(req.query.n2);  // Lee el segundo número (n2) desde los parámetros de la query

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Parámetros inválidos");
    }

    let multiplicacion = multiplicar(n1, n2);
    res.status(200).send("Multiplicación válida: " + multiplicacion);
});