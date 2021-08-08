const axios = require('axios');
const fs = require('fs');

class Busquedas {
    historial = [];
    dbPath = './db/database.json'
    lat = 0;
    lon = 0;

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => lugar.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))))
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            'lat': this.lat,
            'lon': this.lon,
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            this.lat = lat;
            this.lon = lon;
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: this.paramsOpenWeather
            })
            const resp = await instance.get();
            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = '') {
        if(this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial = this.historial.splice(0, 5)
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) return
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}

module.exports = Busquedas;