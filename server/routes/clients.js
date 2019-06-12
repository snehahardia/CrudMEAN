var mongoose = require( 'mongoose' );
var express = require('express');
var router = express.Router();
var Client = require('../models/clients');

function saveclient(req, res, next){
    console.log("new client entered");
    var newClient = new Client({
        clientName    : req.body.clientname,
        clientPhoneNo : req.body.clientphoneno,
        clientEmail   : req.body.clientemail,
        clientAddress : req.body.clientaddress
    });
    
    newClient.save(function(err, client){
            if(err){ 
                console.log("error saving client");
                res.status(400).json({ 
                    success: false, 
                    message:'Error processing request '+ err});
        }
        else{
            console.log("client inserted");
            res.status(201).json({
                success: true,
		      message: 'client created successfully.',
                data: client
        });
    }
    });
};

function getclients(req, res, next){
   console.log("finding all clients");
    Client.find({}, function(err, clients){
        if (err) return next(err);
        res.json(clients);
    });
};

function getclient(req, res, next){
   console.log("finding one client");
    Client.findById({_id: req.params.id}, function(err, client){
        if (err) return next(err);
        console.log(client);
        res.json(client);
//        res.status(201).json({
//		success: true,
//		message: 'found Client successfully',
//        data: client
//	});
    });
};

function deleteClient(req, res, next){
    Client.remove({_id: req.params.id}, function(err){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        res.status(201).json({
		success: true,
		message: 'Client removed successfully'
	});
    });
}

function updateClient(req, res, next){
    console.log("updating client");
    Client.findById({_id: req.params.id}, function(err, client){
        if(err){ res.status(400).json({ success: false, message: 'client not found '+ err }); }
				
			if(client) {
//                res.json("client found----"+client);
				client.clientName = req.body.clientname;
				client.clientEmail = req.body.clientemail;
				client.clientPhoneNo = req.body.clientphoneno;
				client.clientAddress = req.body.clientaddress;
			}
			client.save(function(err) {
				if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
				res.status(201).json({
					success: true,
					message: 'client updated successfully'
				});
			 });
            
		});
}

module.exports = { router, saveclient, getclients, deleteClient, updateClient,getclient };