const { hasSubscribers } = require('diagnostics_channel')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

// Define paths for express config
const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akash Nilay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Akash Nilay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Akash Nilay',
        helpText: 'Help page.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide a address.'
        })
    }

    geocode(req.query.address, (error , response) => {
        if (error) {
            return res.send({error})
        }

        res.send({
                forecast: response.weather,
                location:  req.query.address,
                address: response.location +','+ response.Area
            })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash Nilay',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})