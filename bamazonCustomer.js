var mysql = require("mysql");
var inquirer = require("inquirer");

var pwd = process.argv[2];

var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: pwd,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    // console.log("Connected as ID: " + connection.threadId);
    start();
});

function start(){
    console.log("\nProduct Listings:\n");
    connection.query(
        "SELECT item_id, product_name, department_name, price FROM products", function (err, res) {
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
                    console.log("\n\nItem ID does not exist or invalid input submitted.\n\n");
                    throw err;
                }

                var purchasing = res[0].product_name;
                var cost = res[0].price;
                var stock = res[0].stock_quantity;
        
                if (stock >= units) {
                    var purchaseQty = units;
                    var total = purchaseQty * cost;
                    console.log("\n\nItem #" + item + ": " + purchasing + ", has been added to your cart. Quantity: " + purchaseQty + ". Your total is $" + total + ".\n\n");
                    
                    var remaining = stock - purchaseQty;
                    connection.query(
                        "UPDATE products SET stock_quantity=? WHERE item_id=?", [remaining, item], function (err, res) {
                        if (err) {
                            throw err;
                        }
                        console.log("Stock Remaining: " + remaining + "\n\n");
                        connection.end();
                    });
                } else {
                    console.log("\n\nWe're sorry, we could not complete your order. There are only " + stock + " units available of Item #" + item + ": " + purchasing + ".\n\n");
                    connection.end();
                }

            });
        });
}

