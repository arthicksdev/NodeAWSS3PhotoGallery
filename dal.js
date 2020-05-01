var AWS = require("aws-sdk");
require("dotenv").config();

//Load Credentials from JSON
AWS.config.loadFromPath('./config.json');

module.exports = function (bucket) {
    this.bucketName = bucket;
    this.ChangeBucket = function (bucket) {
        this.bucketName = bucket;
    };
    this.GetFiles = function () {


        return new Promise((resolve, reject) => {
            var s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: { Bucket: this.bucketName }
            });
            //Get Files form bucket
            var myParams = {
                Bucket: this.bucketName,
                MaxKeys: 100
            };
            s3.listObjects(myParams, (err, data) => {
                if (err) {
                    console.log("Error", err);
                    reject(err);
                } else {
                    //console.log("selected components:", data.Contents);

                    var files = data.Contents;

                    //Looping through results and set image url
                    files.forEach(f => {

                        //Morph object to contain endpoint url
                        getUrlFromBucket
                        var photoUrl = getUrlFromBucket(s3, f.Key);
                        f.Url = photoUrl;

                        //console.log(f);

                    });
                    console.log("Files:", files)
                    resolve(files);


                }

            });
        });



    };
}



/*Helpers*/

const getUrlFromBucket = (s3Bucket, fileName) => {
    return 'https://' + s3Bucket.config.params.Bucket + '.s3.amazonaws.com/' + fileName
};





