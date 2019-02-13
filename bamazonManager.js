var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    port:3306,
    user: "root",
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

function start () {
    var options = ["View All Products", "Check Low Inventory", "Add To Existing Inventory", "Add New Item", "Exit"];
    inquirer 
        .prompt({
            name: "menu",
            type: "list",
            message: "Please Select What You Would Like To Do From The Menu Below",
            choices: options  
        }).then(function(answer) {
            
            if (answer.menu === options[0]) {
                viewProducts();
            } else if (answer.menu === options[1]) {
                lowInventory();
            } else if (answer.menu === options[2]) {
                addInventory();
            } else if (answer.menu === options[3]) {
                newProduct();
            } else if (answer.menu === options[4]) {
                connection.end();
            } else {
                console.log("I'm sorry there has been an error.");
            }

            // switch(answer.menu) {
            // case answer.menu === options[0]:
            //     console.log("Works");
            //     viewProducts();
            //     break;
            // case answer.menu[1]:
            //     lowInventory();
            //     break;
            // case answer[2]:
            //     addInventory();
            //     break;
            // case answer[3]:
            //     newProduct();
            //     break;
            // default:
            // console.log("I'm defaulting");
            // }

        });
}

function viewProducts() {
    console.log("\nProduct Listings:\n");
    connection.query(
        "SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
        if (err) {
            throw err;
        }
        for (var i = 0; i <res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nStock Level: " + res[i].stock_quantity + "\n\n");
        }
        start();
    });
}

function lowInventory() {
    console.log("\nProducts With Low Inventory:\n");
    connection.query(
        "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE stock_quantity <= 5", function (err, res) {
        if (err) {
            throw err;
        }
        for (var i = 0; i <res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price + "\nStock Level: " + res[i].stock_quantity + "\n\n");
        }
        start();
    });
}

function addInventory() {
    inquirer
        .prompt([
            {
            name: "add_stock",
            type: "input",
            message: "What is the Item ID of the product you would like to log stock increase?"
            },
            {
            name: "add_qty",
            type: "input",
            message: "How many new units would you like to log for this product?"
            }
        ]).then(function(answer) {
            connection.query(
                "SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE item_id=?", [answer.add_stock], function (err, res) {
                if (err) {
                    throw err;
                }
                
                var product = res[0].product_name;
                var prevStock = parseInt(res[0].stock_quantity);
                var totalStock = parseInt(res[0].stock_quantity) + parseInt(answer.add_qty);

                connection.query(
                "UPDATE products SET stock_quantity WHERE item_id=?", [totalStock, answer.add_stock], function(err,res) {
                    console.log("\nYour product, " + product + ", stock quantity has been updated.\nStock was: " + prevStock + ".\nStock is now: " + totalStock + ".\n")
                    connection.end();
                });


            });
        });
}

function newProduct() {
    //prompt to add new product
}