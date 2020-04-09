const request=require('request')
const geocode = (address,callback)=>{
    //callback function is called once we have the latitude,longitude
    //encodeURIComponent : encodes the special characters to safe url 
   const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2FyYWhzc29uZyIsImEiOiJjazhwbzR5ZTcwMXQwM2ZwdDI2amhwOHQxIn0.OMCXS_JYvi0aZUYlDBtYQQ'
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
         }else if(response.body.features.length===0){
            callback('Unable to find location',undefined)
        }else{            
            callback(undefined,{
                location:response.body.features[0].place_name,
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1]
            })
        }
    })
}
module.exports=geocode