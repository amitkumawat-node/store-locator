const Store = require('../models/store');

const addStore = (req, res) => {
	if(req.body.name && req.body.location)
	{
		new Store(req.body).save((err, store) => {
			if(err)
			{
				console.log(err)
				res.status(200).json({status:false, message:'Server Error'})
			}
			else
			{
				res.status(201).json({status:true, message:'Store Added Successfully'})
			}
		})
	}
	else
	{
		res.status(200).json({status:false, message:'Some parameters are missing'})
	}
}


const getNearByStore = (req, res) => {
	const latitude = req.query.latitude ? parseFloat(req.query.latitude) : '';
	const longitude = req.query.longitude ? parseFloat(req.query.longitude) : '';
	const radius = req.query.radius ? req.query.radius : 5;
	var aggregator = [
   		{
	     	$geoNear: {
		        near: { type: "Point", coordinates: [longitude, latitude ] },
		        distanceField: "dist.calculated",
		        minDistance: 5,
		        includeLocs: "dist.location",
		        num: 100,
		        spherical: true
		    }
	   	}
	];
	var query = { 
		location: {
			$geoWithin:{
				$centerSphere:
					[ [longitude, latitude ], 5 / 3963.2 ]
			} 
		} 
	}
	Store.find(query, (err, stores) => {
		if(err)
		{
			console.log(err)
			res.status(200).json({status:false, message:'Server Error'})
		}
		else
		{
			res.status(200).json({status:true, data:stores})
		}
	})
}

module.exports = {
	addStore : addStore,
	getNearByStore : getNearByStore
}