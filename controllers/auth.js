const bcrypt = require('bcrypt');
const axios = require('axios');
const path = require('path');
//airtable
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'key6g32DRULc2ELR4' }).base('appTIhrtdSQzoGMIf');

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmPassword;

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
                } else {
                    bcrypt.hash(password, 12)
                        .then(hashedpassword => {
                            base('users').create([{
                                "fields": {
                                    "Email": email,
                                    "Password": hashedpassword,
                                    "ideas": []
                                }
                            }], (records, err) => {
                                if (err) {
                                    console.log(err);
                                    res.redirect('http://localhost:3000/');
                                } else {
                                    console.log('new user added');
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
    console.log(password);
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
                bcrypt.hash(password, 12)
                    .then(hashedpassword => {
                        console.log(hashedpassword);
                        if (exist && hashedpassword == topPassword) {
                            console.log('loggedin');
                            res.redirect('http://localhost:3000/');
                        } else {
                            console.log('wrong password');
                        }
                    });
            }

        }, err => {
            //console.log(err);
        });
};