import pg from "pg"
import dotenv from 'dotenv'
const Client = pg.Client
dotenv.config()

function formatDate(date){
    let dia=date.getDate()
    let mes = ("0" + (date.getMonth() + 1)).slice(-2);
    let fullyear = date.getFullYear()
    let result = `Base de dados: ${dia}/${mes}/${fullyear}`
    return result
}

export async function databaseDate() {
    const query = `select max(ta.dt_inicio)
    from tb_atend ta 
    where st_atend = 4`

    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
        await client.connect()
        const res = await client.query(query)
        const date = res.rows[0].max
        const dateFormated = formatDate(date)
        console.log(dateFormated)
        await client.end()
        return dateFormated
    } catch (error) {
        console.log(error)
        return error
    }
}
