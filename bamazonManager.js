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

            switch(answer.menu) {
            case options[0]:
                console.log("Works");
                viewProducts();
                break;
            case options[1]:
                lowInventory();
                break;
            case options[2]:
                addInventory();
                break;
            case options[3]:
                newProduct();
                break;
            case options[4]:
                connection.end();
                break;
            default:
            console.log("I'm defaulting");
            }

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
                    console.log("\nThe stock quantity of your product, " + product + ", has been updated by " + answer.add_qty + ".\nStock was: " + prevStock + "\nStock is now: " + totalStock + "\n");
                    start();
                });
            });
        });
}

function newProduct() {
    console.log("\nTo Enter a New Product Into Inventory, Follow The Prompts Below:\n");
    connection.query(
        "SELECT department_name FROM products", function(err, res) {
        if (err) {
            throw err;
        }
        var departments = [];
        for (var i = 0; i <res.length; i++) {
            if (departments.includes(res[i].department_name) === false) {
                departments.push(res[i].department_name);
            }
        }
        // console.log(departments.join("\n"));

    inquirer
        .prompt ([
            {
            name: "add_name",
            type: "input",
            message: "Enter the name of your new product: "
            },
            {
            name: "add_dept",
            type: "list",
            message: "Select which department your new product belongs in:",
            choices: departments  
            },
            {
            name: "add_price",
            type: "input",
            message: "Enter the price of your new product. Do not include any unit symbols:"
            },
            {
            name: "add_qty",
            type: "input",
            message: "Enter the stock quantity of your new product:"
            }
            ]).then(function(answer) {

                // console.log(answer.add_name);
                // console.log(answer.add_dept);
                // console.log(answer.add_price);
                // console.log(answer.add_qty);
                connection.query(
                    "INSERT INTO products SET ?", 
                    {
                        product_name: answer.add_name,
                        department_name: answer.add_dept,
                        price: answer.add_price,
                        stock_quantity: answer.add_qty
                    }, 
                    function(err, res) {
                        if (err) {
                            throw err;
                        }
                    connection.end();
                });
                connection.query(
                    "SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
                    if (err) {
                        throw err;
                    }
                    var newItem = res[res.length-1];
                    console.log("\nYou have added: \nProduct: " + newItem.product_name + "\nDepartment: " + newItem.department_name + "\nPrice: " + newItem.price + "\nStock Level: " + newItem.stock_quantity + "\n\n");
                    start();
                })
            });
        
        // connection.end();
    });
}