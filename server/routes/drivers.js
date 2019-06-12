var mongoose = require( 'mongoose' );
var express = require('express');
var router = express.Router();
var Driver = require('../models/drivers');

function savedriver(req, res, next){
    console.log("new driver entered");
    var newDriver = new Driver({
        driverName    : req.body.drivername,
        driverPhoneNo : req.body.driverphoneno,
        driverAddress : req.body.driveraddress
    });
    
    newDriver.save(function(err){
            if(err){ 
                console.log("error saving driver");
                res.status(400).json({ 
                    success: false, 
                    message:'Error processing request '+ err});
        }
        else{
            console.log("driver inserted");
            res.status(201).json({
                success: true,
		      message: 'driver created successfully.'
        });
    }
    });
};

function getdrivers(req, res, next){
   console.log("finding all drivers");
    Driver.find({}, function(err, drivers){
        if (err) return next(err);
        res.json(drivers);
    });
};

function deleteDriver(req, res, next){
    Driver.remove({_id: req.params.id}, function(err){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        res.status(201).json({
		success: true,
		message: 'driver removed successfully'
	});
    });
};

function getdriver(req, res, next){
   console.log("finding one driver");
    Driver.findById({_id: req.params.id}, function(err, driver){
        if (err) return next(err);
        res.json(driver);
//        res.status(201).json({
//		success: true,
//		message: 'found Client successfully',
//        data: client
//	});
    });
};

function updateDriver(req, res, next){
    console.log("updating driver");
    Driver.findById({_id: req.params.id}, function(err, driver){
        if(err){ res.status(400).json({ success: false, message: 'driver not found '+ err }); }
				
			if(driver) {
//                res.json("client found----"+client);
				driver.driverName = req.body.drivername;
				driver.driverPhoneNo = req.body.driverphoneno;
				driver.driverAddress = req.body.driveraddress;
			}
			driver.save(function(err) {
				if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
				res.status(201).json({
					success: true,
					message: 'driver updated successfully'
				});
			 });
            
		});
}

module.exports = { router, savedriver, getdrivers, deleteDriver, updateDriver, getdriver};