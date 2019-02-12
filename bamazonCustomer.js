// require("dotenv").config();
// var pw = require("./pw.js");

var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    port:3306,
    user: "root",
    // password: pw.ROOT_PW,
    password: "D#vils3rver",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    console.log("Connected as ID: " + connection.threadId);
    start();
});

function start(){
    console.log("\nProduct Listings:\n");
    connection.query(
        "SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
            if (err) {
                throw err;
            }

            for (var i = 0; i <res.length; i++) {
                console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\n\n");
            }
    })
    // .then(function() {
    //     userPrompt();
    // })
    ;

    userPrompt();
}

function userPrompt() {
    inquirer
        .prompt([
            {
            name: "purchase_id",
            type: "input",
            message: "What is the Item ID of the product you would like to purchase?"
            },
            {
            name: "purchase_id",
            type: "input",
            message: "How many units would you like to purchase?"
            }
        ])
        .then(function(answer){
            var item = connection.query("SELECT item_id FROM products");
            
            if (answer.purchase_id === item) {
                var purchasing = item;
                console.log(purchasing);
            } else {
                console.log("This item does not exist.");
            }
            
            connection.query()
        });

    //inquirer 
    //id of product to buy & # of units
    storeCheck();
}

function storeCheck() {
    //enough in stock
        //update mysql quantity
    //show customer total cost of purchase

    //or error
    connection.end();
}


