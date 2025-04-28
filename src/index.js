import Alumno from "./models/alumno.js"
import {restar, sumar, multiplicar, dividir} from "./modules/matematica.js"
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
    let n1 = parseFloat(req.query.n1);  
    let n2 = parseFloat(req.query.n2);  

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Parámetros inválidos");
    }
    let suma = sumar(n1, n2);
    res.status(200).send("Suma valida: " + suma);
});

app.get('/matematica/restar', (req, res) => {
    let n1 = parseFloat(req.query.n1);  
    let n2 = parseFloat(req.query.n2); 

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Parámetros inválidos");
    }

    let resultado = restar(n1, n2);
    res.status(200).send("Resta valida: " + resultado);
});

app.get('/matematica/multiplicar', (req, res) => {
    let n1 = parseFloat(req.query.n1);  
    let n2 = parseFloat(req.query.n2); 

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Parámetros inválidos");
    }

    let multiplicacion = multiplicar(n1, n2);
    res.status(200).send("Multiplicación válida: " + multiplicacion);
});

app.get('/matematica/dividir', (req, res) => {
    let n1 = parseFloat(req.query.n1);  
    let n2 = parseFloat(req.query.n2); 

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).send("Parámetros inválidos");
    }

    let division = dividir(n1, n2);
    res.status(200).send("Division válida: " + division);
});

app.get('/omdb/searchbypage', async (req, res) => {
    const search = req.query.search;
    const p = req.query.p;

    if (!search || !p) {
        return res.status(400).send("Faltan parámetros 'search' o 'p'");
    }

    try {
        const result = await OMDBSearchByPage(search, p);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send("Error buscando en OMDB");
    }
});

app.get("/omdb/searchcomplete", async (req, res) => {
    const { search } = req.query;
    try {
        const resultado = await OMDBSearchComplete(search);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).send("Error en búsqueda completa");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})