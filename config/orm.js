var connection = require('../config/connection.js');

function printQuestionMarks(num){
	var arr = [];

	for (var i = 0; i < num; i++){
		arr.push('?');
	}

	return arr.toString();
}

function objectToSql(object){
	var arr = [];

	for(var key in object){
		if (object.hasOwnProperty(key)){
			arr.push(key + "=" +object[key]);
		}
	}

	return arr.toString();
}

var orm ={
	all: function(tableInput, callback){
		var queryString = 'SELECT * FROM ' + tableInput + ";";
		connection.query(queryString, function(err, results){
			if (err) throw err;
			callback(results);
		});
	},

	create: function(table, columns, values, callback){
		var queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += columns.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		querystring += printQuestionMarks(values.legnth);
		querystring += ') ';

		console.log(querystring);

		connection.query(queryString, values, function(err, results){
			if (err) throw err;
			callback(results);
		});
	},

	update: function (table, objectColumnValues, condition, callback){
		var queryString = 'UPDATE ' + table;

		querystring += ' SET ';
		queryString += objectToSql(objectColumnValues);
		queryString += ' WHERE ';
		queryString += condition;

		console.log(queryString);

		connection.query(queryString, function(err, results){
			if (err) throw err;
			callback(results);
		});
	},

	delete: function(table, condition, callback){
		var queryString = 'DELETE FROM ' + table;
		queryString += ' WHERE ';
		queryString += condition;

		connection.query(queryString, function(err, results){
			if (err) throw err;
			callback(results);
		})
	}
};

module.exports = orm;