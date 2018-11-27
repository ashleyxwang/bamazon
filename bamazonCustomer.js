const mysql = require("mysql");
const table = require("table").table;
const Prompt = require("prompt-checkbox");

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
            let resultArray = result.map(input => [input.item_id, input.product_name, input.price]);

            const displayArray = [
                ['ID', 'PRODUCT', 'PRICE'],
            ];

            for (let i = 0; i < resultArray.length; i++) {
                let tableElements = resultArray[i];
                displayArray.push(tableElements);
            };

            const display = table(displayArray);

            console.log(display);
            console.log("What are the ID's of the products you would like to purchase?");

            productPurchase();
        }
    )
}

function productPurchase() {
    let inquiry = process.argv;
    connection.query(
        "SELECT item_id FROM products",
        function (err, res) {
            if (err) throw err;
            console.log(res);
            
            if (inquiry === res) {
                console.log("ya got it")
            }
        }
    )
}

//allow customer to place order

//once order is placed, check if store has enougH

//if store does have enough, fulfill order
    //update SQL database item quantity
    //show customer total cost of purchase

//if not, log "insufficient quantity" and prevent order