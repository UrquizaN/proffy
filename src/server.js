const express = require('express')
const nunjucks = require('nunjucks')
const server = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

// configuração nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
// receber os dados do request.body
.use(express.urlencoded( { extended: true } ))
// configuração arquivos estáticos (css, scripts, imagens)
.use(express.static('public'))
// rotas
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/give-classes', pageGiveClasses)
.post('/save-classes', saveClasses)
.listen(5500, function(){
    console.log('Server is running')
})