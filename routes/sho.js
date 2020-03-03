var express = require('express');
var router = express.Router();
var fir_model = require('../model/FIR');

router.get('/sho', (req, res) => {
    fir_model.find({})
    .then((data) => {
        res.render('sho', {'data': data});
    })
    .catch((err) => {
        res.send(`error occured in getting ${err}`);
    });
});
router.get('/sho/:id', (req, res) => {
    fir_model.findById(req.params.id)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.send(`error occured in getting ${err}`);
    });
});

module.exports = router;



