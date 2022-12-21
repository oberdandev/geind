console.log('entrou no script enfermeiros')
const url = 'http://localhost:2500/api/'

import getDBDate from "../GetDbDate.mjs"

const renderTable = document.querySelector('#render')
const createTable = document.querySelector('#createTable')
const inputInicial = document.querySelector('#data-inicial')
const inputFinal = document.querySelector('#data-final')
const submitRelatorio = document.querySelector('#botao-enviar')
const relatorioNome = document.querySelector('#nome-relatorio')


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
    axios.get(`http://localhost:2500/api/relatorio/puericultura/${dataInicial}/${dataFinal}`)
    .then(response => {
        const data = response.data
        const tableTitles = ` <tr>
        <th>Unidade</th>
        <th>Quantidade</th>
        </tr>`;
        createTable.insertAdjacentHTML('beforeend', tableTitles);
        
        relatorioNome.innerHTML = 'RELATÓRIO DE CONSULTAS PUERICULTURA'

        submitRelatorio.classList.toggle('is-loading')
        data.forEach(element => {
            const html = `
            <tr>
            <td>${element.unidade}</td>
            <td>${element.count}</td>
            </tr>`
            renderTable.insertAdjacentHTML('beforeend', html)
        });
    })
    .catch(err => {
        submitRelatorio.classList.toggle('is-loading')
        console.error('erro ao solicitar acesso a api:', err)
    })
}





