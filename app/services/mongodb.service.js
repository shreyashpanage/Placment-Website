const mongoose = require('mongoose');

exports.connect = () => {
    // connecting to mongo database
    mongoose.connect('mongodb+srv://tandp:Thisist&p@cluster0.nmgml0r.mongodb.net/tandp', { useNewUrlParser: true, useFindAndModify: false ,useUnifiedTopology: true }, function (err) {
        if(err) {
            console.log(err);
        } else {
            console.log('Successfully connected to database.');
        }
    });
}
