const request = require('request')

const geocode = (address, callback) => {

    const url = 'http://api.weatherapi.com/v1/current.json?key=1bef44f5ff6643d6af590018211612&q=' + address + '&aqi=yes'

    request({ url:url, json:true }, (error , response) => {
            if (error){
                callback('Unable to connect to the weather service !', undefined)
            }
            else if (response.body.error) {
                callback('Unable to find location. Try another search.', undefined)
            }
            else {
                callback(undefined, {
                    latitude  : response.body.location.lat,
                    longitude : response.body.location.lon,
                    location  : response.body.location.region,
                    Area      : response.body.location.tz_id,
                    weather   : 'Its currently ' + response.body.current.condition.text
                })
            }
    }

    )
}

module.exports = geocode