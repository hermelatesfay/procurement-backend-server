const http =require("http")
const fs =require("fs")

const server = http.createServer((req,res) =>{
//using GET request
if(req.method ==="GET"){
    fs.readFile("data.json",(err,data)=>{
         if (err) {
                res.writeHead(404, {
                    "Content-Type": "application/json"
                })
                res.end()
        }else{
            

            res.writeHead(200, {
                            "Content-Type": "application/json"
            })

            res.write(JSON.stringify(JSON.parse(data)))
            res.end()
        }
    })
}else if (req.method ==="POST"){
    let body =""
    req.on("data",(chunk)=>{
        body += chunk.toString()
    })
    req.on("end",()=>{
        body = JSON.parse(body)
        console.log(body)
    })
    fs.readFile("data.json",(err,data)=>{
        if (err) {
                res.writeHead(404, {
                    "Content-Type": "application/json"
                })
                res.end()
        }else{
            let newData =JSON.parse(data)
            newData.push(body)
            let procurementString = JSON.stringify(newData)
            fs.writeFile("data.json",procurementString,(err)=>{
                if(err){
                     res.writeHead(500, {
                        "content-type": "application/json"
                    })
        
                        res.write(JSON.stringify({ message: err }))
                        res.end()
                    } else {

                        res.writeHead(201, {
                            "content-type": "application/json"
                        })

                        res.write(JSON.stringify({
                            message: "Procurement added successfully",
                            body
                        }))

                        res.end()


                }
            })
 }
 })
}
} )

server.listen(3000,()=>{
    console.log("The server is running on port 3000")
})
