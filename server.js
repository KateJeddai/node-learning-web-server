const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.set('view engine', hbs);


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	    fs.appendFile('server.log', log + '\n', (err) => {
	    	if(err){
	    		console.log('Unable to append the server log');
	    	}
	    });

	next();
})

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
})*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Hello there'
	});
})

/*app.get('/', (req, res) => {
   // res.send('<h1>Hello express!</h1>');
   res.send({
   	  name: 'Kate',
   	  likes: ['reading', 'learning languages', 'travelling']
   })
})*/

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
})

app.get('/bad', (req, res) => {
	res.send({
        error: 'Error Message'
	})
})

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects'
	});
})


app.listen(port, () => {
	console.log(`Server is up on ${port}`);
});