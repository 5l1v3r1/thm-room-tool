const express = require("express")
const axios = require("axios")
const app = express()

app.set("view engine", "ejs")
app.use("/", express.static("static"))

app.get("/", (req,res)=>{
  return res.render("index", { error: undefined })
})

app.get("/room", async (req,res)=>{
  console.log(`-> ${req.ip} request room ${req.query.name}`)

  if (typeof req.query.name !== "string")
    return res.redirect("/")

  let body = await axios.get(`https://tryhackme.com/api/tasks/${req.query.name}`)
  if(body.data.data===undefined||body.data.data.length==0)
    return res.render("index", { error: "Room not found!" }) 
  res.render("room", { tasks: body.data.data })
})

app.listen(8080, ()=>{
  console.log("-> Started the web server on port 8080!")
})
