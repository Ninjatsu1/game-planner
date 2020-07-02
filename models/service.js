const mysql = require("mysql");
let connection;
//Add server later
connection = mysql.createConnection({
    "host" : "localhost",
    "user" : "root",
    "password" : "",
    "database" : "game_planner",
    "port" : 3306
});
connection.connect((err)=>{
    if(!err){
        console.log("Connection to database opened :)");
    }
    else {
        throw err;
    }

});
module.exports = {
    AddGame: (results, callback)=>{
        console.log(results);
        let sql = "INSERT INTO game_info (game_title, target_audience, game_story, game_description) VALUES (?,?,?,?)";
        console.log(sql);
        connection.query(sql, [results.game_title, results.target_audience, results.game_story, results.game_description], (err)=>{
            callback(err);
        })
    },
    
}