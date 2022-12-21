import getDBDate from "../GetDbDate.mjs"

console.log('entrou no script puericultura')
const url = 'http://10.50.0.178:2500/api/'



const renderTable = document.querySelector('#render')
const createTable = document.querySelector('#createTable')
const inputInicial = document.querySelector('#data-inicial')
const inputFinal = document.querySelector('#data-final')
const submitRelatorio = document.querySelector('#botao-enviar')
const relatorioNome = document.querySelector('#nome-relatorio')

const p_dbdate = document.querySelector('#p-dbdate')
function insert_title_db_date(){
    const db_date = getDBDate()
    relatorioNome.innerHTML = 'RELATÓRIO DE CONSULTAS PUERICULTURA'
    p_dbdate.innerHTML = db_date
}


submitRelatorio.addEventListener('click', ()=>{
    const dataInicial = inputInicial.value
    const dataFinal = inputFinal.value

    getResult(dataInicial, dataFinal)

    submitRelatorio.classList.toggle('is-loading')

    createTable.innerHTML = ''
    renderTable.innerHTML = ''

    inputInicial.value = ''
    inputFinal.value = ''
})




const getResult = (dataInicial, dataFinal) =>{
    relatorioNome.innerHTML = ''
    axios.get(`http://10.50.0.178:2500/api/relatorio/puericultura/${dataInicial}/${dataFinal}`)
    .then(response => {
        const data = response.data
        const tableTitles = ` <tr>
        <th>Unidade</th>
        <th>Quantidade</th>
        </tr>`;
        createTable.insertAdjacentHTML('beforeend', tableTitles);

        submitRelatorio.classList.toggle('is-loading')
        data.forEach(element => {
            const html = `
            <tr>
            <td>${element.unidade}</td>
            <td>${element.count}</td>
            </tr>`
            renderTable.insertAdjacentHTML('beforeend', html)
        });

        relatorioNome.innerHTML = 'RELATÓRIO DE CONSULTAS PUERICULTURA'

    })
    .catch(err => {
        submitRelatorio.classList.toggle('is-loading')
        console.error('erro ao solicitar acesso a api:', err)
    })
}





