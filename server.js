var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var cors       = require('cors');
var path       = require('path');
var http       = require('http');
const nodemailer = require('nodemailer');


var user = require('./server/routes/users');
var client = require('./server/routes/clients');
var driver = require('./server/routes/drivers');
var car = require('./server/routes/cars');
var booking = require('./server/routes/bookings');
var enquiry = require('./server/routes/enquiry');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = 'mongodb://localhost:27017/newMeanTravels';
mongoose.connect(db, { useNewUrlParser: true }, function(err){
    console.log("mongo connection done");
    if(err){
        console.log("Error.."+err);
    }
});

app.use(express.static(path.join(__dirname + '/dist/New-Mean-Travels')));

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/dist/New-Mean-Travels/index.html'));
});

const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  provider: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: ' ', // Enter here email address from which you want to send emails
    pass: ' ' // Enter here password for email account from which you want to send emails
  },
  tls: {
  rejectUnauthorized: false
  }
});

app.use('/api', user.router);
app.use('/api', client.router);
app.use('/api', driver.router);
app.use('/api', car.router);
app.use('/api', enquiry.router);

app.post('/enquiry', enquiry.sendEnquiry);

app.post('/login', user.userlogin);
app.post('/signup', user.signup);

app.get('/admin/clients', client.getclients);
app.get('/admin/clients/:id', client.getclient);
app.delete('/admin/clients/:id', client.deleteClient);
app.put('/admin/clients/edit/:id', client.updateClient);
app.post('/admin/clients/add', client.saveclient);

app.post('/admin/drivers/add', driver.savedriver);
app.get('/admin/drivers', driver.getdrivers);
app.get('/admin/drivers/:id', driver.getdriver);
app.delete('/admin/drivers/:id', driver.deleteDriver);
app.put('/admin/drivers/edit/:id', driver.updateDriver);

app.post('/admin/cars/add', car.savecar);
app.get('/admin/cars', car.getcars);
app.get('/admin/cars/:id', car.getcar);
app.delete('/admin/cars/:id', car.deleteCar);
app.put('/admin/cars/edit/:id', car.updateCar);

app.post('/admin/booking/add', booking.savebooking);
app.get('/admin/booking', booking.getbookings);
app.get('/admin/booking/:id', booking.getbooking);
app.delete('/admin/booking/:id', booking.deleteBooking);
app.put('/admin/booking/edit/:id', booking.updateBooking);

var port = process.env.PORT || 3000;
app.set('port', port);

var server = http.createServer(app);

server.listen(port, function(err){
    if(err){
       return console.log('something bad happened', err);
    }
    console.log("Server is running..!!");
});