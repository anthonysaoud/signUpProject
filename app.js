//setup necessary express, body parser constants
const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const sgMail = require('@sendgrid/mail')
require('custom-env').env('.env.staging')
const app = express()


//storing the secret keys in this mailchimjson package
const fs = require('fs');
//const obj = JSON.parse(fs.readFileSync(__dirname+'/mailchimpCredentials.json', 'utf8'));


//this allows you to access the css and images on the server side. relative URL
app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html")
})


app.post("/", function (req, res) {
    console.log(req.body)
    console.log(req.body.email)
    console.log(req.body.fName)
    console.log(req.body.lName)

    const email = req.body.email
    const firstName = req.body.fName
    const lastName = req.body.lName

    //create the JavaScript object to input into the mailchimp post request
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    //convert data object into a jsonData format using stringify
    var jsonData = JSON.stringify(data)

    //const appid  = obj.credentials[0].appid
    const appid = process.env.appid
    const listID = '433266e95e'
    const url = "https://us13.api.mailchimp.com/3.0/lists/" + listID
    const options = {
        method: "POST",
        auth: "asaoud1:"+appid
    }

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            if (response.statusCode===200) {
                res.sendFile(__dirname + '/success.html')
            } else {
                res.sendFile(__dirname + '/failure.html')
            }
            console.log(JSON.parse(data));
        })
    
    
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'apsg2000@gmail.com', // Use the email address or domain you verified above
      subject: 'Thanks ' +firstName+' for Signing Up to my Newsletter!',
      text: 'Looking forward to having you be part of my journey of becoming a full fledged software engineer!',
      html: '<strong>Looking forward to having you be part of my journey of becoming a full fledged software engineer!</strong>',
    };
    //ES6
    sgMail
      .send(msg)
      .then(() => {}, error => {
        console.error(error);
    
        if (error.response) {
          console.error(error.response.body)
        }
      });
    //ES8
    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);
    
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();






})
    request.write(jsonData)
    request.end()
})

//create route for try again button from the failure page
app.post("/failure", function (req, res) {
    res.redirect("/")
})

//process.env.PORT is a dynamic port that heroku will define for you
app.listen(process.env.PORT || 8080, function () {
    console.log("Server is running on port 8080")
});