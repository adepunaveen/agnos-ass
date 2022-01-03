require('./db/mongoose');
const express = require("express");
const cors = require("cors");
const itemRoute = require('./routes/index')
//web-push
const webpush = require('web-push');


const publicVapidKey = 'BPQCg0oSk3tetQwUtWGPwqYEmJYjTflLK8-LgwgCShSl4bSui8W-qsKFvCmwGQcFPJKSxMzOZIGJi-GIFHq8wLY';
const privateVapidKey = '9xN1HRt8mac486SzKnQY8OC0fZnlHjJe03k4qi3kuxI';

//setting vapid keys details
webpush.setVapidDetails('mailto:adepunaveen@hotmail.com', publicVapidKey,privateVapidKey);

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/grocery', itemRoute);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Agnos application." });
});

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'testing' });
  
    console.log(subscription);
  
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error(error.stack);
    });
  });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.use(require('express-static')('./'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});