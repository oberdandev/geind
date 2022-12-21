import pg from "pg"
import dotenv from 'dotenv'
const Client = pg.Client
dotenv.config()

export async function buscarConsultasMedicos(firstDate, lastDate) {
    const query = `select 		tcd.no_disa, 
    tcd.no_unidade_saude,
    count (tfai.co_seq_fat_atd_ind)
from 		tb_fat_atendimento_individual tfai
left join 	"TAB_CNES_DISA" tcd on tcd.co_seq_dim_unidade_saude = tfai.co_dim_unidade_saude_1 
left join   tb_dim_cbo tdc on tdc.co_seq_dim_cbo = tfai.co_dim_cbo_1 
where 		(tfai.co_dim_tempo >= '${firstDate}' and tfai.co_dim_tempo <= '${lastDate}') and
    (tdc.nu_cbo like '2251%' or tdc.nu_cbo like '2252%' or tdc.nu_cbo like '2253%' or tdc.nu_cbo like '2231%') and
    tcd.no_disa like '3 OESTE'
group by 	1,2`

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

export default buscarConsultasMedicos