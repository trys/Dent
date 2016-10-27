var Sugar = require('sugar');

var Comment = function (comment) {
	this.name = comment.name ? comment.name : '';
	this.comment = comment.comment ? comment.comment : '';
	this.likes = comment.likes ? comment.likes : 0;
	this.replies = comment.replies ? comment.replies : 0;
	this.date = comment.date ? new Date(comment.date) : null;

	this.setupModel();
};

Comment.prototype.log = function () {
	console.log( this );
};

Comment.prototype.setupModel = function () {
	this.createRelativeDate();
};

Comment.prototype.createRelativeDate = function () {
	if ( this.date ) {
		this.relativeDate = Sugar.Date(this.date).relative().raw;
	}
};

module.exports.Comment = Comment;