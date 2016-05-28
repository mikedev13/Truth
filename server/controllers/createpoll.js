const User = require('../models/user');
const Poll = require('../models/poll');


exports.createPoll = function(req, res, next) {
  console.log('inside createpoll controller');
  console.log('photo dataURL on server:', req.body.dataURL);
  var answers = {};
  if (req.body.answer1) {
    answers[req.body.answer1] = 0;
  }
  if (req.body.answer2) {
    answers[req.body.answer2] = 0;
  }
  if (req.body.answer3) {
    answers[req.body.answer3] = 0;
  }
  if (req.body.answer4) {
    answers[req.body.answer4] = 0;
  }
  // both fields must be filled out
  if (!req.body.question || !req.body.answer1 || !req.body.answer2) {
  	res.status(422).send({ error: "You must provide a question and answers" });
  }

  const poll = new Poll ({
    photo: req.body.dataURL,
    createdBy: req.body.username,
    createdAt: req.body.createdAt,
    question: req.body.question,
    answers
  });

  poll.save(function(err){
    // User.findOne({ name: 'borne' }, function (err, doc) {
    //   if (err) .
    //   doc.name = 'jason borne';
    //   doc.save(callback);
    // })
  // socket emitting
  // io.sockets.emit('createpoll', { it: 'worked' });
    if (err) { return next(err); }
    res.json({ status: 'Poll entered into database!' });
  });
};