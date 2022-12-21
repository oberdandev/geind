//import pg from "pg"
import dotenv from 'dotenv'
//const Client = pg.Client
import {jsPDF} from 'jsPDF'
//import toTable from 'object-to-table'
import express from 'express'
//import path from 'path'
import cors from 'cors'

import {queryPrevineVacina} from "./scripts/previne/previneVacina.js"
import {buscarPuericultura} from "./scripts/atencao-primaria/puericultura.js"
import {buscarConsultasMedicos} from "./scripts/atencao-primaria/consultas-medicos.js"
import {buscarConsultasEnfermeiros} from "./scripts/atencao-primaria/consultas-enfermeiros.js"
import {buscarConsultasPuerperais} from './scripts/atencao-primaria/consultas-puerperais.js'
import { visitiaDomiciliar } from './scripts/atencao-primaria/visita-domiciliar.js'
import { buscarOdontoEscovacao } from './scripts/atencao-primaria/odonto-escovacao.js'
import { buscarOdontoPrimeiraConsulta } from './scripts/atencao-primaria/odonto-primeira-consulta.js'
import { databaseDate } from './scripts/db-date.js'

const app = express()
dotenv.config()
//const doc = jsPDF()

app.listen(2500, ()=>{
    console.log('app running at localhost:', 2500)
})

app.use(cors())

app.get('/api/relatorio/puericultura/:firstDate/:lastDate', async(req, res)=> {
    const firstDate = req.params.firstDate
    const lastDate = req.params.lastDate 
    // const dados = await connectDb('20220801', '20220830') 
    const dados = await buscarPuericultura(firstDate, lastDate) 
    res.json(dados)
})

app.get('/api/previne/vacina/:fisrtDate/:lastDate', async(req,res)=>{
    const firstDate = req.params.fisrtDate
    const lastDate = req.params.lastDate

    const dados = await queryPrevineVacina(firstDate, lastDate)
    res.json(dados)
})

app.get('/api/relatorio/enfermeiros/:firstDate/:lastDate', async(req,res)=> {
    const firstDate = req.params.firstDate
    const lastDate = req.params.lastDate 
    // const dados = await connectDb('20220801', '20220830') 
    const dados = await buscarConsultasEnfermeiros(firstDate, lastDate) 
    res.json(dados)
})

app.get('/api/dbdate', async (req,res) =>{
    let data = await databaseDate()
    res.json(data)
})



//queryPrevineVacina('20220901', '20220931')
//buscarPuericultura('20220901', '20220931')



 
