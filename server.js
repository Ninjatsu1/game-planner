const http = require('http');
const express = require("express");
app = express();
const port = process.env.PORT || 8080;
const hostname = '127.0.0.1';
const service = require("./models/service");
const bodyParser = require("body-parser"); //expressin mukana
const multer = require("multer");
const fs = require("fs");
const upload = multer({dest : "./public/Images"});


app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public")); //Example in ejs file just write href="/custom.css"

app.use(bodyParser.json()); //Body parser  for sending data
app.use(bodyParser.urlencoded( { "extended" : true } )); //Session järjestyksessä on väliä

app.get("/",(req, res)=>{
 service.GetGames((err, data)=>{
  res.render("index",{
    "games": data
  })
 })
  
})
app.get("/create_game/",(req, res)=>{
    
  res.render("create_game", {
     
  })
})
app.post("/add_game/", (req, res)=>{
  service.AddGame(req.body, (err)=>{
      res.redirect("/");
  });
});
app.get("/project_details/:id/", (req, res)=>{
  id = req.params.id;
  service.GetProjectDetails(id, (err, data)=>{
    res.render("project_details",{
      "project_data" : data
    })
  })
})
app.get("/create_character/:id/", (req, res)=>{
  id = req.params.id;
  service.GetProjectDetails(id, (err, data)=>{
    res.render("create_character",{
      "project_data" : data
    })
  })
})
app.post("add_charater/:id/", upload.single("tiedosto"),(req, res)=>{
  id = req.params.id;
  file =  req.file;
  console.log(req.file.filename)
})
app.get("/edit_project/:id/", (req,res)=>{
  id = req.params.id;
  service.GetProjectDetails(id, (err, data)=>{
    res.render("edit_project", {
      "project_data" : data
    })
  })
})
app.post("/edit_project/:id/",(req, res)=>{
  id = req.params.id;
  service.EditProject(req.body, (err)=>{
    res.redirect("/project_details/"+id)
  })
})
app.post("/delete/:id/",(req, res)=>{
  id = req.params.id;
  service.DeleteProject(req.body,(err)=>{
    res.redirect("/");
  })
})


app.listen(port, hostname, () => {
  console.log(`Server running at ${port}`);
});