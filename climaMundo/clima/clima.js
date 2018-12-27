const axios = require("axios")

const getClima = async(lat, lng) => {
    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=f369635965b00ad16ced5da4da4b9f3b&units=metric`)

    if (resp.code === 400) {
        throw new Error(`No existen las coordenadas ${lat},${lng}`)
    }

    return resp.data.main.temp
}

module.exports = {
    getClima
}