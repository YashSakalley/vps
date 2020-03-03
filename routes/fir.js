var express = require('express');
var router = express.Router();
var fir_model = require('../model/FIR');

router.get('/logout', (req, res) => {
  req.flash('auth', 'no');
  res.redirect('/');
});

router.post('/submitFir', (req, res) => {
  answers = req.body.answers;
  answers = answers.split(',');
  console.log(answers);
  res.redirect('/submit');
});

router.post('/test_fir', (req, res) => {
  var obj_fir = new fir_model({
    name: req.body.name,
    aadhaar_number: req.body.a_num,
    document: req.body.doc,
    data_created: Date(),
    status : req.body.status
  });
  obj_fir.save()
  .then((data) => {
    res.send("FIR saved");
  })
  .catch((err) => {
    res.send(`error occured during saving FIR ${err}`);
  });
});

router.get('/test_fir', (req, res) => {
  fir_model.find({})
  .then((data) => {
      res.send(data);
  })
  .catch((err) => {
      res.send(`error occured in gettin all docs ${err}`)
  });
});

router.get('/submit', (req, res) => {
  res.render('final');
});

module.exports = router;
