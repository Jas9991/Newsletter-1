const express = require("express");
const app = express();
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const bodyParser = require("body-parser");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Signup.html");
});

mailchimp.setConfig({
  apiKey: "f56c759aaee227a9eee085c93db146b6-us21",
  server: "us21",
});

/*app.post("/" , function(req,res){

    const firstName = req.body.firstName;

    const lastName = req.body.lastName;

    const email = req.body.userEmail;

    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                FNAME:firstName,
                LNAME:lastName
            }
        ]
    } */

app.post("/", function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.userEmail;

  const listId = "4e663b0e36";
  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
  }

  run();

  res.sendFile(__dirname + "/success.html");
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is up and running on port 3000.");
});



































/*  Api key */
/*     f56c759aaee227a9eee085c93db146b6-us21    */

/*  list key  */
/*       4e663b0e36         */

/*const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/4e663b0e36"

    const options = {
        method: "POST",
        auth:"jas987:f56c759aaee227a9eee085c93db146b6-us21"
    }

    const request = https.request(url , options , function(response){
        
        response.on("data",function(data){
            console.log(JSON.parse( data));
        })


    })

    request.write(jsonData);
    request.end;



    console.log(firstName , lastName , email);
    // console.log(data);*/
