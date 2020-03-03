var mongoose = require("mongoose");
var FIR = mongoose.Schema({
    name : String,
    aadhaar_number : Number,
    document : String,
    data_created : String,
    status : String
});


module.exports = mongoose.model('FIR', FIR);