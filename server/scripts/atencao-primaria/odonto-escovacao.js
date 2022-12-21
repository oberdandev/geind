import pg from "pg"
import dotenv from 'dotenv'
const Client = pg.Client
dotenv.config()

export async function buscarOdontoEscovacao(firstDate, lastDate) {
    const query = `
    select 		tcd.no_disa, 
			tcd.no_unidade_saude,
			count(tfac.ds_filtro_pratica_em_saude) 
from		tb_fat_atividade_coletiva tfac 
left join 	"TAB_CNES_DISA" tcd on tcd.co_seq_dim_unidade_saude = tfac.co_dim_unidade_saude 
where 		tfac.co_dim_tempo >= '${firstDate}' and tfac.co_dim_tempo <= '${lastDate}' and 
			tcd.no_disa like '3 OESTE' and
			tfac.ds_filtro_pratica_em_saude like '%9%'
group by  1,2`

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
        console.table(res.rows)
        await client.end()
        return res.rows
    } catch (error) {
        console.log(error)
        return error
    }
}
