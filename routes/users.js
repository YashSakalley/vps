var express = require('express');
var router = express.Router();
var fir_model = require('../model/FIR');
/* GET users listing. */
router.get('/userTracking/:a_num', (req, res) => {
  
  fir_model.findOne({aadhaar_number: req.params.a_num})
  .then((data) => {
    // res.json(data);
    console.log(data);
    res.render('status', {'data': data});
  })
  .catch((err) => {
    console.log(`error occured at ${err}`);
  })
});


module.exports = router;
