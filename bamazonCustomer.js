const mysql = require("mysql");
const table = require("table").table;
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: "localHost",
    port: 3306,
    user: "root",
    password: "Nathanwang03/13",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts();
});

//display all items for sale w/ id, name, prices, products
function displayProducts() {
    console.log("We have these items for sale:\n");
    connection.query(
        "SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            let result = JSON.parse(JSON.stringify(res));
            let resultArray = result.map(input => [input.item_id, input.product_name, input.price.toFixed(2), input.stock_quantity]);
            resultArray.unshift(['ID ', 'PRODUCT ', 'PRICE  ', 'QTY  ']);

            const display = table(resultArray);

            //show available products
            console.log(display);
            //allow customer to place order
            purchaseOrder(res);
        }
    );
}

function purchaseOrder(res) {
    let product;
    let quantity;

    inquirer.prompt([
        {
            name: "productChoice",
            message: "What is the ID of the product you would like to purchase? (Choose one!)",
            validate: productID => {
                product = res.find(database => Number(productID) === database.item_id);
                return (product !== undefined) || "I don't know that product ID.";
            }
        },
        {
            name: "productAmount",
            message: "How many of this product would you like to purchase?",
            validate: productQuantity => {
                quantity = Number(productQuantity);
                let quantityInStock = product.stock_quantity;
                if (!Number.isInteger(quantity) || quantity <= 0) {
                    return "Invalid quantity"
                } else if (quantity > quantityInStock) {
                    return `We only have ${quantityInStock} of these in stock.`;
                } else return true;
            }
        }
    ]).then( answers => {
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: product.stock_quantity - quantity
                },
                {
                    item_id: product.item_id
                }
            ],
            function (err, res) {
                if (err) throw err;

                console.log(res.affectedRows + " products updated!\n");

                let productPrice = quantity * product.price;
                console.log("The total price of your transaction is: " + productPrice.toFixed(2));

                connection.end();
            }
        );
    });
}