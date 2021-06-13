var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}

//function to make ajax call
//async and data are optional parameters
function makeAJAXCall(methodType,url,callback,async=true,data=null)
{
    let xhr= new XMLHttpRequest();
    xhr.onreadystatechange= function(){
        if(xhr.readyState===4)
        {
            if(xhr.status===200||xhr.status===201)
            {
                //If i am using callback function, i  am able to reuse code
                //otherwise i will have to make ajax call method for each request
                callback(xhr.responseText);
            }
            else if(xhr.status>=400)
            {
                console.log("Handle 400 client error or 500 server error at: "+showTime())
            }
        }
    }
        xhr.open(methodType,url,async);
        //changes required for inserting data into json file
        if(data)
        {
            //setting header for request
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }
    console.log(methodType+" Request sent to the server at: "+showTime());
}

//User detail function
function getUserDetails(data)
{
    console.log("Get User Data at"+showTime()+" Values "+data);
}

//making ajax call through function
//specifying http method, url for call and callback function, async nature to be true or false
//getUserDetails is a callback function, after exection of this method, getUsetDetails will be executed
//async nature set to true means, program will run asynchrnously only.
const getURL=   "http://127.0.0.1:3000/employees/";
makeAJAXCall("GET",getURL,getUserDetails,true);
console.log("Made GET AJAX call to server at: "+showTime());

//Deleting emp with id 4 from json file.
const deleteURL="http://localhost:3000/employees/4";
//callback function
function userDeleted(data)
{
    console.log("User Deleted: "+data);
}
//method to make ajax call
makeAJAXCall("DELETE",deleteURL,userDeleted,false);
console.log("Made DELETE AJAX call to server at: "+showTime());

const postURL= "http://localhost:3000/employees";


//Adding data to json file through POST method.
const emplData= {"name":"Rohan","salary":"24500"};
function userAdded(data)
{
    console.log("User Added: "+data);
}
makeAJAXCall("POST",postURL,userAdded,true,emplData);
console.log("Made POST AJAX call to server at: "+showTime());