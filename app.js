const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");




 const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/signup.html");
    
});

app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/286a28d02c";

    const options={
        method: "POST",
        auth:"chand1:0df747cf97adae817862869f56af9032-us21"
    } 

    const request= https.request(url,options,function(response){

        if (response.statusCode===200){
            res.sendFile(__dirname +"/success.html");
        }else{
            res.sendFile(__dirname +"/failure.html");
        }
         response.on("data",function(data){
            console.log(JSON.parse(data));
         });
         
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
});


 app.listen(process.env.POST || 3000,function(){
    console.log("The server is started at port 3000");
 });

 //api keys: 0df747cf97adae817862869f56af9032-us21

 //list id: 286a28d02c