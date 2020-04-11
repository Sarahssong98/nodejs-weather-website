const request= require('request');
const geocode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');
const countryNews=require('./utils/c_news.js');
const keywordNews=require('./utils/k_news.js')
const airNews=require('./utils/air.js')
const path=require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//path.join:__dirname+../public
const publicDir=path.join(__dirname,'../public')
//Define path for handlebars
const viewsPath=path.join(__dirname,'../templates/views')

const partialPath=path.join(__dirname,'../templates/partials')
//set up handlebars engine and views location
app.set('view engine','hbs')//hbs가 템플릿엔진임
app.set('views',viewsPath)//custom directory
hbs.registerPartials(partialPath)
//express.static:takes the path 
//use: a way to customize server 
app.use(express.static(publicDir))
//app.com : domain
app.get('',(req,res)=>{
    res.render('home',{
        title:'Home',
        name:'Sarah Song'
    })
})

//app.com/help
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Sarah Song',
        helpText:'This is some helpful text'
    })
})
//app.com/about 
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Sarah Song'
    })
})
app.get('/news',(req,res)=>{
    res.render('news',{
        title:'Recent News',
        name:'Sarah Song'
    })
})
app.get('/news/country',(req,res)=>{
    const country=req.query.country
    countryNews(country,(error,ndata)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            country:country,
           news:ndata.news,
           news2:ndata.news2
        })
    })
  
})
app.get('/news/search',(req,res)=>{
    const keyword=req.query.keyword
    keywordNews(keyword,(error,ndata)=>{
        if(error){
            return res.send({error})
        }
        res.send({
           keyword,
           news:ndata.news,
           news2:ndata.news2
        })
    })
    
})
app.get('/weather',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sarah Song'
    })
})
app.get('/weather/air',(req,res)=>{
    airNews((error,data)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            air1:data.air,
            air2:data.air2
        })
    })
    
})
app.get('/weather/search',(req,res)=>{
    const address=req.query.address
    if(!address){
        return res.send({
            error:'You must provide an address'
        })
    }
    //address가 제대로 안주어진 경우 위해 default parameter 부여 ={}
    geocode(address,(error,{location,longitude,latitude}={})=>{
        if(error){
          return res.send({error})
        }
        //callback chaining
        forecast(latitude,longitude, (error, fdata) => {
          if(error){
            return res.send({error})
          }
          res.send({
             address:address,
             location,
             forecast:fdata
          })
        })
})
})


//callback function is defined below by 익명함수 
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:{}
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sarah song',
        errorMessage:'Help article not found'
    })
})
//404 page: wild card character(*) = match anything else 
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sarah song',
        errorMessage:'Page not found'
    })
})
//setting up a webserver
app.listen(port, ()=>{
    console.log('Server is up on port '+port);
})