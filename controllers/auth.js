const bcrypt = require('bcrypt');

//airtable
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'key6g32DRULc2ELR4' }).base('appTIhrtdSQzoGMIf');

exports.postSignup = (req, res, next) => {
    const email = "user12@user.com";//req.body.email;
    const password = '1234';//req.body.password;
    const confirmpassword = req.body.confirmpassword;

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
                        console.log('hased');
                        base('users').create([{
                            "fields": {
                                "Email": email,
                                "Password": hashedpassword,
                                "ideas": []
                            }
                        }], (records, err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('new user added');
                            }
                        })
                    });
            }
        }, err => {
            console.log(err);
        });

};