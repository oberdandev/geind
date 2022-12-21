function getDBDate (){
    axiox.get(url+'dbdate')
    .then(response =>{
        const finalDateDB = response
        return finalDateDB
    })
}

export default getDBDate