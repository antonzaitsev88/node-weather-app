const response = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d9674a67eb6916fcbb0b45980a22003d&query=${latitude},${longitude}&units=m`

    response({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            const weatherDescription = body.current.weather_descriptions[0]
            const tempreture = body.current.temperature
            const feelslike = body.current.feelslike
            const humidity = body.current.humidity
            const data = `${weatherDescription}. It is currently ${tempreture} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}.`

            callback(undefined, data)
        }
    })


}

module.exports = forecast