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
		this.tidyUpDate('years', 'yr');
		this.tidyUpDate('minutes', 'min');
		this.tidyUpDate('months', 'mo');
		this.tidyUpDate('days', 'days');
		this.tidyUpDate('hours', 'hr');
		this.tidyUpDate('seconds', 'sec');
		this.tidyUpDate(' from now', '');

	}
};

Comment.prototype.tidyUpDate = function (from, to) {
	this.relativeDate = this.relativeDate.replace(from, to);
};

module.exports.Comment = Comment;