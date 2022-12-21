import express from 'express'
import path from 'path'
const app = express()
const port = process.env.PORT || 3000

app.listen(port, ()=> console.info('app running at port:' + port))

app.get('/', (req, res)=>{
    res.sendFile(path.resolve('src/pages/index.html'))
})

app.use('/src', express.static(path.resolve('src')))

