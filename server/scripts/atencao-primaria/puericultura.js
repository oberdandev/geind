import pg from "pg"
import dotenv from 'dotenv'
const Client = pg.Client
dotenv.config()

export async function buscarPuericultura(firstDate, lastDate) {
    const query = `
    select tcd.no_unidade_saude as unidade,
          count(tfpa.co_seq_fat_proced_atend)
    from tb_fat_proced_atend tfpa 
    left join tb_fat_procedimento tfp on tfp.co_seq_fat_procedimento = tfpa.co_fat_procedimento
    left join "TAB_CNES_DISA" tcd on tcd.co_seq_dim_unidade_saude = tfpa.co_dim_unidade_saude
    where (tfpa.co_dim_tempo >= '${firstDate}' and tfpa.co_dim_tempo <= '${lastDate}')
    and (tfpa.ds_filtro_procedimento like '%0301010269%' or tfpa.ds_filtro_procedimento like '%0301010277%')
    and  tcd.no_disa = '3 OESTE'
    group by 1`

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
