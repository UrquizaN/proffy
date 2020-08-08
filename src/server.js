const proffys = [
    {
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "12345678910", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20,00", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    },
    {
        name: "Daniela Evangelista", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "12345678910", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost: "20", 
        weekday: [1], 
        time_from: [720], 
        time_to: [1220]
    }
]

const subjects = [
    "Biologia",
    "Artes",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

const express = require('express')
const nunjucks = require('nunjucks')
const server = express()

function pageLanding(request, response) {
    return response.render('index.html')
}

function pageStudy(request, response) {
    const filters = request.query
    return response.render('study.html', { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(request, response) {
    const data = request.query

    const isNotEmpty = Object.keys(data).length !== 0
    
    if(isNotEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return response.redirect('/study')
    }

    return response.render('give-classes.html', { subjects, weekdays })
}

function getSubject(subjectNumber) {
    return subjects[subjectNumber - 1]
}

// configuração nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
// configuração arquivos estáticos (css, scripts, imagens)
.use(express.static('public'))
// rotas
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/give-classes', pageGiveClasses)
.listen(5500, function(){
    console.log('Server is running')
})