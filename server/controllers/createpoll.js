const User = require('../models/user');
const Poll = require('../models/poll');
const sendgrid = require('sendgrid')('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');

exports.answerPending = function(req, res, next) {
  // we need to go to user who answered in collection
  User.findOne({ username: req.body.username.toLowerCase() }, function(err, user) {
    if (err) { return next(err); }
    // remove poll from their pending
    delete user.pending[req.body.id];
    User.findOneAndUpdate( { username: user.username }, { pending: user.pending }, { new: true }, function(err, user) {
      if (err) { return next(err); }
    });
  });
  // find poll by id
  Poll.findOne({ "_id": req.body.id }, function(err, poll) {
    // update answer count
    poll.answers[req.body.answer]++;
    Poll.findOneAndUpdate({ "_id": poll.id }, { answers: poll.answers }, { new: true }, function(err, poll) {
      if (err) { return next(err); }
      req.body.poll = poll;
      next();
    })
  });
}

exports.removeResults = function(req, res, next) {
  Poll.findOne({ "_id": req.body.pollId }, function(err, poll) {
    if (err) { return next(err); }
    User.find({}, function(err, users) {
      if (err) { return next(err); }
      users.forEach(function(user) {
        if (user.username === poll.createdBy) {
          delete user.created[req.body.pollId];
          User.findOneAndUpdate({ username: user.username }, { created: user.created }, { new: true }, function(err, user) {
            if (err) { return next(err); }
          });
        } else {
          delete user.pending[req.body.pollId];
          User.findOneAndUpdate({ username: user.username }, { pending: user.pending }, { new: true }, function(err, user) {
            if (err) { return next(err); }
          })
        }
      });
    });
    Poll.remove({ "_id": poll.id }, function (err) {
      if (err) return handleError(err);
    });
    next();
  });
}

exports.createPoll = function(req, res, next) {
  var answers = {};
  var country = {};
  var emails = {};
  var message = {};

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


  //formats input emails into an array
  var emailList = (req.body.emails)
    .replace(/[^,;]*.?</g, "")
    .replace(/>/g, "")
    .replace(/[,; ]{1,}/g, "\n")
    .replace(/[\n]{2,}/g, "\n")
    .split("\n");

    console.log("The email list: ", emailList, req.body.message);

    var payload = {
      to: emailList,
      from: 'noreply@sealzy.com',
      subject: "Your friend has invited you to take a poll at sealzy.com",
      text: req.body.message + '\n' + "Your poll is waiting at www.sealzy.com."
    }

    sendgrid.send(payload, function(err, json) {
      if (err) { console.error(err); }
      console.log(json);
    });

  // TO DO: check if createdBy username's lastCreatedPollAt is within 5 minutes of createdAt
  // if so, send an error saying need to wait 5 minutes
  // if not, update user's lastCreatedPollAt with createdAt

  const poll = new Poll ({
    photo: req.body.dataURL,
    reveal: req.body.reveal,
    createdBy: req.body.username,
    createdAt: req.body.createdAt,
    question: req.body.question,
    answers,
    country: req.body.country,
    emails: req.body.emails
  });

  poll.save(function(err){
    //finished saving created poll to database
    //need to update usernames createdPoll list with new poll id
    //need to send back that poll so client can update their state with the poll they just created
    //need to put poll in everyones pending
    //later on put it only pending of people chosen by options sendTo

    if (err) { return next(err); }
    User.find({}, function(err, users) {
      users.forEach(function(user) {
        if (user.username === req.body.username.toLowerCase()) {
          user.created[poll.id] = poll.id;
          User.findOneAndUpdate({ username: user.username }, { created: user.created }, { new: true }, function(err, user) {
            if (err) { return next(err); }
          });
        } else {
          if (req.body.country) {
            if (req.body.country === user.country) {
              user.pending[poll.id] = poll.id;
              User.findOneAndUpdate({ username: user.username }, { pending: user.pending }, { new: true }, function(err, user) {
                if (err) { return next(err); }
              });
            }
          } else {
            user.pending[poll.id] = poll.id;
            User.findOneAndUpdate({ username: user.username }, { pending: user.pending }, { new: true }, function(err, user) {
              if (err) { return next(err); }
            });
          }
        }
      });
    });
    req.body.poll = poll;
    next();
  });
};