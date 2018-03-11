const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

// create customer Schema & model
const CustomerSchema = new Schema({
    user_id: {
        type: Number,
    },
    name: {
        type: String,
    },
    geometry: GeoSchema
});

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;



// {
//  	"user_id": 12,
//  	"name": "Christinaaaaa McArdle",
//  	"geometry": {
//  		"type": "point", "coordinates": [-6.043701, 52.986375]
//  	}
// }
