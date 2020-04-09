const request=require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=63b7cdf816b8bdad7e9071ece23d3a1a&query='+latitude+','+longitude+'?'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined);
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{            
            callback(undefined,body.current.weather_descriptions[0]+ ' throughout the day. It is currently ' + body.current.temperature + ' degress out.'+' The humidity is '+body.current.humidity+'%. There is a ' + body.current.feelslike + '% chance of rain.'
            )
        }
    })
}

module.exports=forecast