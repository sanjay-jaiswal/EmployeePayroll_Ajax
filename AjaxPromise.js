const { resolve } = require("path");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function showTime()
{
    const date= new Date();
    return date.getHours()+"Hrs:"+date.getMinutes()+"Mins:"+date.getSeconds()+"Secs";
}

//function to make ajax call
//async and data are optional parameters
function makePromiseCall(methodType,url,async=true,data=null)
{
    return new Promise(function(resolve,reject){
    let xhr= new XMLHttpRequest();
    xhr.onreadystatechange= function(){
        //if connection is closed and status is 200 or 201 then callback method is called
        if(xhr.readyState===4)
        {
            if(xhr.status===200||xhr.status===201)
            {
            resolve(xhr.responseText);
            }
            //if status is greater than 400, there is error in calling request.
            else if(xhr.status>=400)
            {
                reject({
                    status:xhr.status,
                    statusText:xhr.statusText
                });
                console.log("Xhr failed");
                console.log("Handle 400 client error or 500 server error at: "+showTime())
            }
        }
    }
        xhr.open(methodType,url,async);
        if(data)
        {
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else
        {
            xhr.send();
        }    
    console.log(methodType+" Request sent to the server at: "+showTime());
    });
}
const getURL="http://localhost:3000/employees/1";
makePromiseCall("GET",getURL,true)
    .then(responseText=>{
        console.log("Get User data: "+JSON.stringify(responseText));
    })
    .catch(error=>console.log("Get error status: "+JSON.stringify(error)))


//Delete data ffrom server. 
const deleteURL="http://localhost:3000/employees/5";
makePromiseCall("DELETE",deleteURL,false)
    .then(responseText=>console.log("User Deleted: "+responseText))
    .catch(error=>console.log("DELETE Error Status: "+JSON.stringify(error)))


const postURL= "http://localhost:3000/employees";


//Post method to send data on server.
const emplData= {"name":"Rohan","salary":"24500"};
//making promise call
makePromiseCall("POST",postURL,true,emplData)
    .then(responseText=>console.log("User added: "+JSON.stringify(responseText)))
    .catch(error=>console.log("POST error status: "+JSON.stringify(error)))
