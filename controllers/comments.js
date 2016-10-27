var Comment = require('../models/comment').Comment;
var fs = require('fs');

module.exports.comments = function(req, res) {
	var dataComments = require('../data/comments.json');

	var data = {
		comments: dataComments
	};

	data.comments = data.comments.map(function(comment) {
		return new Comment(comment);
	});

	res.render('comments', data);
};



module.exports.commentsPost = function(req, res) {

	if ( ! req.body.comment ) {
		return res.redirect('/');
	}

	var dataComments = require('../data/comments.json');
	var newComment = {
		name: 'Trys Mudford',
		comment: req.body.comment,
		likes: 0,
		replies: 0,
		date: Date.now()
	};

	dataComments.push(newComment);

	var json = JSON.stringify(dataComments);
	fs.writeFile(__dirname + '/../data/comments.json', json, function (err,data) {
		res.redirect('/');
	});

};
