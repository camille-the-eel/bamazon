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
           
            userPrompt();
    });
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
            name: "purchase_amount",
            type: "input",
            message: "How many units would you like to purchase?"
            }
        ])
        .then(function(answer) {

            var item = answer.purchase_id;
            var units = answer.purchase_amount;

            connection.query(
                "SELECT product_name, price, stock_quantity FROM products WHERE item_id=?", [item], function (err,res) {

                if (err) {
                    console.log("Item ID does not exist or invalid input submitted.");
                    throw err;
                }

                var purchasing = res[0].product_name;
                var cost = res[0].price;
                var stock = res[0].stock_quantity;
        
                if (stock >= units) {
                    var purchaseQty = units;
                    var total = purchaseQty * cost;
                    console.log("Item #" + item + ": " + purchasing + ", has been added to your cart. Quantity: " + purchaseQty + ". Your total is $" + total + ".");
                    storeUpdate();
                } else {
                    console.log("We're sorry, we could not complete your order. There are only " + stock + " units available of Item #" + item + ": " + purchasing + ".");
                    connection.end();
                }

            });
        });
}

function storeUpdate() {
    //enough in stock
        //update mysql quantity
    //show customer total cost of purchase

    //or error
    connection.end();
}


