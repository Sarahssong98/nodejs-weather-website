const request= require('request');
const geocode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');

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
    res.render('index',{
        title:'Weather',
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
app.get('/weather',(req,res)=>{
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