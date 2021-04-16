const request = require('postman-request')


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoid2ViZGV2cG9pbnQiLCJhIjoiY2tuNmU2a3E1MGRiYzJ1czY4ZGFmYm13MyJ9.bBXP-Ab1KM99cDBUCMNJQg&limit=1`

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try again with different search terms!')
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}


module.exports = geocode