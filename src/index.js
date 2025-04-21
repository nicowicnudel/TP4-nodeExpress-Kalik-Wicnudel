import Alumno from "./models/alumno.js"
import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"
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


    }
    res.status(200).send('Hola! ' + req.params.nombre);
})