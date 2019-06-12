var mongoose = require( 'mongoose' );
var express = require('express');
var router = express.Router();
var Booking = require('../models/bookings');
var Client = require('../models/clients');

function savebooking(req, res, next){
    console.log("new booking entered");
    var newBooking = new Booking({
        clientName  : req.body.clientname,
        bookingDate : req.body.bookingdate,
        fromCity    : req.body.fromcity,
        toCity      : req.body.tocity,
        pickupDate  : req.body.pickupdate,
        returnDate  : req.body.returndate,
        car         : req.body.carname,
        driver      : req.body.drivername      
    });
    
    newBooking.save(function(err){
            if(err){ 
                console.log("error saving booking");
                res.status(400).json({ 
                    success: false, 
                    message:'Error processing request '+ err});
        }
        else{
            console.log("booking inserted");
            res.status(201).json({
                success: true,
		        message: 'booking created successfully.'
        });
    }
    });
};

function getbookings(req, res, next){
   console.log("finding all bookings");
    Booking.find({}).populate('clientName')
        .populate('car')
        .populate('driver').exec(function(err, bookings){
        if (err) return next(err);
        res.json(bookings);
    });
};

function getbooking(req, res, next){
   console.log("finding one booking");
    Booking.findById({_id: req.params.id}).populate('clientName')
        .populate('car')
        .populate('driver').exec(function(err, booking){
        if (err) return next(err);
      //  console.log(booking);
        res.json(booking);
    });
};

function deleteBooking(req, res, next){
    Booking.remove({_id: req.params.id}, function(err){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        res.status(201).json({
		success: true,
		message: 'Booking removed successfully'
	});
    });
}

function updateBooking(req, res, next){
    console.log("updating booking");
    Booking.findById({_id: req.params.id}).populate('clientName')
        .populate('car')
        .populate('driver').exec(function(err, booking){
        if(err){ res.status(400).json({ success: false, message: 'booking not found '+ err }); }
		//		console.log("booking--"+booking);
			if(booking) {
//                res.json("client found----"+client);
                booking.clientName = req.body.clientname,
                booking.bookingDate = req.body.bookingdate,
                booking.fromCity    = req.body.fromcity,
                booking.toCity      = req.body.tocity,
                booking.pickupDate  = req.body.pickupdate,
                booking.returnDate  = req.body.returndate,
                booking.car = req.body.carname,
                booking.driver = req.body.drivername 
			}
			booking.save(function(err) {
				if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
				res.status(201).json({
					success: true,
					message: 'booking updated successfully'
				});
			 });
            
		});
}


module.exports = { router, savebooking, getbookings, deleteBooking, getbooking, updateBooking };