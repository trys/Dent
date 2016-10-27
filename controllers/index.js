var Comment = require('../models/comment').Comment;

module.exports.index = function(req, res) {
	var data = {
		comments: [
			{
				name: 'Alice Gilbert',
				comment: 'Awesome pictures, Ann!',
				likes: 3,
				replies: 2,
				date: '2016-10-02 12:30:02'
			},
			{
				name: 'Tiffany Moreno',
				comment: 'Love the whole album!',
				likes: 1,
				replies: 0,
				date: '2016-10-02 12:30:02'
			},
		]
  };

  data.comments = data.comments.map(function(comment) {
  	return new Comment(comment);
  });

	// Comment
  res.render('index', data);
};