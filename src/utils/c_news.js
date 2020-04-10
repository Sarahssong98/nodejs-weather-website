const request=require('request')
var endOfLine = require('os').EOL;
const countryNews = (country,callback)=>{
    // const forecast = (latitude,longitude,callback)=>{
    //     const url = 'http://api.weatherstack.com/current?access_key=63b7cdf816b8bdad7e9071ece23d3a1a&query='+latitude+','+longitude+'?'
    //     request({url,json:true},(error,{body})=>{
    //         if(error){
    //             callback('Unable to connect to location services!',undefined);
    //         }else if(body.error){
    //             callback('Unable to find location',undefined)
    //         }else{            
    //             callback(undefined,body.current.weather_descriptions[0]+ ' throughout the day. It is currently ' + body.current.temperature + ' degress out.'+' The humidity is '+body.current.humidity+'%. There is a ' + body.current.feelslike + '% chance of rain.'
    //             )
    //         }
    //     })
    const url = 'http://newsapi.org/v2/top-headlines?' +
            'country='+country+'&' +
            'apiKey=0b889214a8814c7c95e641e30265489f';
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to services!',undefined);
        }else if(response.totalResults===0){
                        callback('Unable to find news',undefined)
                    }else{  
                        // const text='Source: '+response.articles[0].source.name
                        // const author='Author: '+response.articles[0].author          
                       callback(undefined,{
                        news:{
                            title:response.body.articles[0].title,
                            description:response.body.articles[0].description,
                            url:response.body.articles[0].url
                        },news2:{
                            title:response.body.articles[1].title,
                            description:response.body.articles[1].description,
                            url:response.body.articles[1].url
                        }
                       })
                        
                    }
    })
}
// const keywordNews = (keyword,callback)=>{
//     const url = 'http://newsapi.org/v2/everything?' +
//           'q='+keyword+'&' +
//           'from=2020-04-10&' +
//           'sortBy=popularity&' +
//           'apiKey=0b889214a8814c7c95e641e30265489f';

//     request({url,json:true},(error,response)=>{
//         if(error){
//             callback('Unable to connect to services!',undefined);
//         }else if(response.totalResults===0){
//                         callback('Unable to find news',undefined)
//                     }else{  
//                         // const text='Source: '+response.articles[0].source.name
//                         // const author='Author: '+response.articles[0].author          
//                         news="News: "+response.body.articles[0].title+response.body.articles[0].description+"\n"
//                         news2="News: "+response.body.articles[1].title+response.body.articles[1].description+"\n"
//                        callback(undefined,{news,news2})
                        
//                     }
//     })
// }

module.exports=countryNews