var dal = require("./dal");//Initialize the Data Access Layer for AWS SDK
var express = require("express");
var app = new express();
var port = process.env.PORT;
/*Intialize the configuraion*/
require("dotenv").config();



/*Specify Bucket from config*/
var bucketName = process.env.defaultBucket;

/*Create static routes for front end*/
app.use(express.static("public"));

app.get("/api/v1/photos/list", (req, res) => {
    console.log("Getting Photos...")

    var service = new dal();
    service.ChangeBucket(bucketName);
    service.GetFiles().then(files => {
        console.log(files);

        res.json(files);
    });



});


/*Start Web Server*/
app.listen(port, (done) => {

    console.log(`services running on port ${port}`);

});



