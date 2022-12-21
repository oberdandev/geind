import pg from "pg"
import dotenv from 'dotenv'
const Client = pg.Client
dotenv.config()

export async function queryPrevineVacina(firstDate, lastDate) {
    const query = `select tcd.no_disa,
    tmv.nu_idade_meses,
    tmv.dt_aplicacao,
    tmv.no_imunobiologico,
tmv.no_dose_imunobiologico 
from 		tb_fat_atendimento_individual tfai
left join	"TAB_MANAUS_VACINA" tmv on tmv.co_seq_fat_cidadao_pec = tfai.co_fat_cidadao_pec 
left join 	"TAB_CNES_DISA" tcd on tcd.co_seq_dim_unidade_saude = tfai.co_dim_unidade_saude_1 
where		(tfai.co_dim_tempo >= ${firstDate} and tfai.co_dim_tempo <= ${lastDate}) and 
    tmv.dt_aplicacao >= '${firstDate}' and 
    (tmv.no_imunobiologico in ('Poliomielite inativada','DTP / HB / Hib' ) and 
    tmv.no_dose_imunobiologico like '3ª DOSE') and
    (tmv.nu_idade_meses <= 12) and 
    tcd.no_disa like '3 OESTE'`

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

export default queryPrevineVacina