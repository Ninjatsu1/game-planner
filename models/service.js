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
        let sql = "INSERT INTO game_info (game_title, target_audience, game_story, game_description, team, monetization) VALUES (?,?,?,?,?, ?)";
        console.log(sql);
        connection.query(sql, [results.game_title, results.target_audience, results.game_story,
                                 results.game_description, results.team, results.monetization], (err)=>{
            callback(err);
        })
    },
    GetGames:(callback)=>{
        sql = "SELECT Id_project, game_title, game_description FROM game_info";
        connection.query(sql,(err, data)=>{
            callback(err, data);

        })
    },
    GetProjectDetails:(id, callback)=>{
        sql = "SELECT * FROM game_info WHERE Id_project = ?";
        connection.query(sql, [id],(err, data)=>{
            callback(err, data);
        })
    },
    EditProject:(results, callback)=>{
       sql="UPDATE game_info SET game_title = ?, target_audience = ?, game_story = ?, game_description = ?, game_genre = ?, team = ?, monetization = ? WHERE Id_project = ?";
        connection.query(sql, [results.game_title, results.target_audience, results.game_story,
                             results.game_description, results.game_genre, results.team,
                                results.monetization, results.id],(err)=>{
            callback(err);
        })
    },
    DeleteProject:(result, callback)=>{
        sql = "DELETE FROM game_info WHERE Id_project = ?";
        console.log(result);
        connection.query(sql, [result.Id], (err)=>{
            console.log(err);
            callback(err);
        })
    }
    

    
}