//Required dependancies
const Table = require('cli-table');
const inquirer = require("inquirer");

// mysql connection with login information contained in dotenv and keys
let mysql = require('mysql'),
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: "root",
        password: "sanshay88",
        database: 'bamazon'
    })

    // Check for successful connection to database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon");
    listProducts();
});

// Invoice view for BAMAZON
function displayInvoice() {
    console.log("========");
    console.log("Invoice");
    console.log("========");
}

// Display all items for sale in a table
function listProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        let table = new Table({
            head: ['ID', 'Name', 'Department', 'Price', 'Stock']
        })
        for (let i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, `$${res[i].price}`, res[i].stock_quantity]);
        };
        console.log("\n")
        console.log(table.toString());
    });
    placeOrder();
};

// Updates the stock of the item purchased and displays invoice 
function placeOrder() {
    inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the item you want to purchase' + ' (or ' + `${"q"}` + ' to exit)',
            validate: input => {
                if (input.toLowerCase() == 'q') process.exit()

                if (isNaN(input)) {
                    return 'Please enter a valid product number'
                }

                return true
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Enter quantity of purchase' + ' (or ' + `${"q"}` + ' to exit)',
            validate: input => {
                if (input.toLowerCase() == 'q') process.exit()

                if (isNaN(input)) {
                    return 'Please valid number'
                }

                return true
            }
        }
    ]).then(function (order) {
        connection.query(
            "SELECT * FROM products WHERE ?", {
                item_id: order.id
            },
            function (err, res) {
                if (err) throw err;
                displayInvoice();
                let table = new Table({
                    head: ['Item Name', 'Quantity purchased', 'Total cost']
                })
                for (let i = 0; i < res.length; i++) {
                    if (res[i].stock_quantity > order.quantity) {
                        let total = order.quantity * res[i].price;
                        table.push([res[i].product_name, order.quantity, `$${total}`]);
                        console.log(table.toString());
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [{
                                    stock_quantity: res[i].stock_quantity - order.quantity,
                                    product_sales: total
                                },
                                {
                                    item_id: order.id
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                listProducts();
                            }
                        )
                    } else {

                        console.log("Not enough in stock");
                        console.log("In stock: " + res[i].stock_quantity + "\n");
                        listProducts();
                    };
                };
            }
        )
    })
};