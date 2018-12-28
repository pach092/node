require("./hbs/helpers/helpers")

const express = require("express")
const hbs = require("hbs")

const app = express()

const port = process.env.PORT || 3000

hbs.registerPartials(__dirname + "/views/parciales")

app.use(express.static(__dirname + "/public"))
app.set('view engine', 'hbs')

app.get("/", (req, res) => {
    res.render("home", {
        nombre: "francisco"
    })
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`)
})