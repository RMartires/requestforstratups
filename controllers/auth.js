const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
//airtable
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'key6g32DRULc2ELR4' }).base('appTIhrtdSQzoGMIf');

exports.postSignup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmPassword;
    const username = req.body.username;

    if (password == confirmpassword) {
        var exist = false;
        base('users').select({
            fields: ["Email"],
            cellFormat: "json",
            view: "Grid view"
        })
            .eachPage((records) => {
                records.map(record => {
                    var { fields } = record;
                    var { Email } = fields;
                    if (Email === email) {
                        exist = true;
                    }
                });
                if (exist) {
                    console.log('user alredy exists');
                    res.cookie('email_already_exits', true);
                    res.redirect('http://localhost:3000/signup');
                } else {
                    bcrypt.hash(password, 12)
                        .then(hashedpassword => {
                            base('users').create([{
                                "fields": {
                                    "Name": username,
                                    "Email": email,
                                    "Password": hashedpassword,
                                    "ideas": [],
                                    "comments": []
                                }
                            }], (records, err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('new user added');
                                    res.redirect('http://localhost:3000/');
                                }
                            })
                        });
                }
            }, err => {
                console.log(err);
            });
    } else {
        console.log("password does not match");
    }

};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    var exist = false;
    var topPassword;

    base('users').select({
        fields: ["Email", "Password"],
        cellFormat: "json",
        view: "Grid view"
    })
        .eachPage((records) => {
            records.map(record => {
                var { fields } = record;
                var { Email } = fields;
                var { Password } = fields;
                if (Email === email) {
                    exist = true;
                    topPassword = Password;
                    console.log(Password);
                }
            });
            if (exist) {
                bcrypt.compare(password, topPassword)
                    .then(doMatch => {
                        console.log(doMatch);
                        if (exist && doMatch) {
                            console.log('loggedin');
                            const token = jwt.sign({
                                email: email
                            }, 'heyphil123');
                            console.log(token);
                            res.cookie('jwttoken', token);
                            res.redirect('http://localhost:3000/');
                        } else {
                            console.log('wrong password');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        }, err => {
            console.log(err);
        });

};

