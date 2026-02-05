const http =require("http")
const fs =require("fs")

const server = http.createServer((req,res) =>{
//using GET request
     if(req.url === "/kgl/procurement" && req.method === "GET"){
            fs.readFile("./data.json",(err,data)=>{
                if(err){
                    res.writeHead(400,{"Content-Type":"application/json"});
                    res.end(JSON.stringify({error:"Invalid error", err}));
                }else{
                    let dataObject = JSON.parse(data);
                    console.log(dataObject)
                    res.writeHead(200,{"Content-Type":"application/json"});
                    res.end(JSON.stringify({message:"Successful", dataObject}));
                }
            })
        }else if(req.url === "/kgl/procurement" && req.method === "POST"){
            let body = ''
            req.on("data",(chunck)=>{
                body += chunck.toString();
            })
    
            req.on("end",()=>{
                try{
                    fs.readFile("./data.json",(err,data)=>{
                        if(err){
                            res.writeHead(400,{"Content-Type":"application.js"});
                            res.end(JSON.stringify({error:"Error"}));
                            
                        }else{
                            let newData = JSON.parse(data);
                             newData.push(body);
                            let stringified = JSON.stringify(newData);
                            console.log(stringified)
    
                            fs.writeFile("./data.json",stringified,(err)=>{
                                if(err){
                                    res.writeHead(400,{"Content-Type":"application.js"});
                                    res.end(JSON.stringify({error:"Error"}));
                                }else{
                                    res.writeHead(201,{"Content-Type":"application.js"});
                                    res.end(JSON.stringify({message:"Successfully saved",body}));
                                }
                            })
    
                        }
                    })
                    
                }catch(err){
                    console.log(err);
                }
            })
        }
        else{
            res.writeHead(404);
            res.end("Page not found");
        }
    
} )

server.listen(3000,()=>{
    console.log("The server is running on port 3000")
})
