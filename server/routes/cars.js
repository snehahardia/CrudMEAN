var mongoose = require( 'mongoose' );
var express = require('express');
var router = express.Router();
var Car = require('../models/cars');

function savecar(req, res, next){
    console.log("new car entered");
    var newCar = new Car({
        carName : req.body.carname,
        carNo : req.body.carno
    });
        
    newCar.save(function(err){
            if(err){ 
                console.log("error saving car");
                res.status(400).json({ 
                    success: false, 
                    message:'Error processing request '+ err});
        }
        else{
            console.log("car inserted");
            res.status(201).json({
                success: true,
		      message: 'car created successfully.'
        });
    }
    });
};

function getcars(req, res, next){
   console.log("finding all cars");
    Car.find({}, function(err, cars){
        if (err) return next(err);
        res.json(cars);
    });
};

function getcar(req, res, next){
   console.log("finding one car");
    Car.findById({_id: req.params.id}, function(err, car){
        if (err) return next(err);
        console.log(car);
        res.json(car);
//        res.status(201).json({
//		success: true,
//		message: 'found Client successfully',
//        data: client
//	});
    });
};

function deleteCar(req, res, next){
    Car.remove({_id: req.params.id}, function(err){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        res.status(201).json({
		success: true,
		message: 'Car removed successfully'
	});
    });
}

function updateCar(req, res, next){
    console.log("updating car");
    Car.findById({_id: req.params.id}, function(err, car){
        if(err){ res.status(400).json({ success: false, message: 'car not found '+ err }); }
				
			if(car) {
//                res.json("client found----"+client);
				car.carName = req.body.carname;
				car.carNo = req.body.carno;
			}
			car.save(function(err) {
				if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
				res.status(201).json({
					success: true,
					message: 'car updated successfully'
				});
			 });
            
		});
}

module.exports = { router, savecar, getcars, deleteCar, updateCar, getcar };