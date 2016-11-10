var express = require('express');
var router = express.Router();
var burger = require('../models/burgers.js');

router.get('/', function(req, res){
	res.redirect('/burgers');
});

router.get('/burgers', function(req, res){
	burger.all(function(data){
		var allObject = { burgers: data };
		console.log(allObject);
		res.render('index', allObject);
	});
});

router.post('/burgers/create', function (req, res) {
	burger.create(['burger_name', 'devoured'], [req.body.name, req.body.devoured], function () {
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burger.update({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/burgers');
	});
});

router.delete('/burgers/delete/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	burger.delete(condition, function () {
		res.redirect('/burgers');
	});
});

module.exports = router;
