var mongoose = require( 'mongoose' );
var User = require('../models/users');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); 
var config = require('../config');

function userlogin(req, res, next){
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({email: email}, function(err, user){
//        console.log("++++++"+user+"++++");
         if(err){ 
             res.status(400).json({ 
                 success: false, 
                 message:'Error processing request '+ err}); 
         }
         if (!user ) {
			res.status(201).json({ 
                success: false, 
                message: 'Incorrect login credentials.' });
		 }
        else if (user) { 
                        var token = jwt.sign(user.toObject(), config.secret, {
                            expiresIn: config.tokenexp
                        });
            var roles = user.role;
            console.log("---role---"+roles);

                        user.save(function(err) {
                            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

                            res.status(201).json({
                                success: true,
                                message: 'Login Successful',
                                token: token,
                                roles: roles
                            });
                        });         
        }
    })	                   
};

function signup(req, res, next){
    console.log("new user entered");

    var newUser = new User(req.body);
    
    User.findOne({ email: req.body.email }, function(err, existingUser) {
        if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err}); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(201).json({
                success: false,
		message: 'User already exists.'
            });
        }

        newUser.save(function(err){
            if(err){ 
                console.log("error saving user");
                res.status(400).json({ 
                    success: false, 
                    message:'Error processing request '+ err});
        }
        else{
            console.log("user inserted");
            res.status(201).json({
                success: true,
		message: 'User created successfully, please login to access your account.'
        });
    }
    });
    });
};

module.exports = {router, userlogin, signup};