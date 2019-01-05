const express = require("express"),
         path = require('path'),
           bp = require("body-parser"),
     mongoose = require("mongoose"),
          app = express(),
         port = 8000;


app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/messages', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true });


var MessageSchema = new mongoose.Schema({
    name: String, 
    message: String,
   })
mongoose.model('Message', MessageSchema); 
var Message = mongoose.model('Message')


var CommentSchema = new mongoose.Schema({
    name: String, 
    comment: String,
   })
mongoose.model('Comment', CommentSchema); 
var Comment = mongoose.model('Comment')


app.get("/", function(req, res){
    Message.find({}, function(err, messages){
        Comment.find({}, function(err, comments){
            res.render("index.ejs", {messages: messages, comments: comments})
        })
    })
});

app.post("/", function(req, res){
    let message = new Message(req.body);
    message.save(function(err){
        console.log(err);
        res.redirect("/");
    });
});


app.post("/", function(req, res){
    let comment = new Comment(req.body);
    comment.save(function(err){
        console.log(err);
        res.redirect("/");
    });
});



app.get("/delete/:_id", function(req, res){
    Message.findByIdAndRemove(req.params._id, (err, messages) => {
    });
    res.redirect("/");
    });










app.listen(port, function() {
    console.log(`listening on port ${port}`);
})