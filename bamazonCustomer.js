const mysql = require("mysql");
const table = require("table").table;
// const Prompt = require("prompt-checkbox");
const inquirer = require("inquirer");
// const CLIinput = process.argv

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
            let resultArray = result.map(input => [input.item_id, input.product_name, input.price.toFixed(2)]);
            resultArray.unshift(['ID', 'PRODUCT', 'PRICE']);

            const display = table(resultArray);

            //show available products
            console.log(display);
            //allow customer to place order
            purchaseOrder(res);
        }
    )
}

function purchaseOrder(res) {
    let product;
    let quantity;
    inquirer.prompt([
        {
            name: "productChoice",
            message: "What is the ID of the product you would like to purchase? (Choose one!)",
            validate: function (productID) { 
                product = res.find(database => Number(productID) === database.item_id);
                // console.log("validating product:", product); 
                if (product === undefined || product === NaN) {
                    return "I don't know that product ID.";
                } else return true
            }
        }, 
        {
            name: "productAmount",
            message: "How many of this product would you like to purchase?",
            validate: function (productQuantity) {
                quantity = Number(productQuantity);
                let quantityInStock = product.stock_quantity; 
                if (!Number.isInteger(quantity) || quantity <= 0) {
                    return "Invalid quantity"
                } else if (quantity > quantityInStock) {
                    return `We only have ${quantityInStock} of these in stock.`;
                } else return true;
            }
        }
    ]).then(answers => {
        let productPrice = quantity * product.price;
        console.log("You're good to go! The price is: " + productPrice.toFixed(2));
        // update the database to reduce the quantitesssssss =D 

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
                // let result = JSON.parse(JSON.stringify(res));
                // let resultArray = result.map(input => [input.item_id, input.product_name, input.price.toFixed(2)]);
                // resultArray.unshift(['ID', 'PRODUCT', 'PRICE']);
    
                // const display = table(resultArray);
    
                // //show available products
                // console.log(display);
                // //allow customer to place order
                // purchaseOrder(res);
            }                
        );        
        
        connection.end();
    });
}

// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;

// var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );


        // let product;
        // for(let i=0; i < res.length; i++) {
        //     if (res[i].item_id === productID) {
        //         product = res[i];
        //         break;
        //     }
        // }
        // // make it a function that we can change, if we want to
        // function isthatwhatIWant(whatyougotforme){
        //     return whatyougotforme.item_id === productID;
        // }

        // let product;
        // for(let i=0; i < res.length; i++) {
        //     if (isthatwhatIWant(res[i].item_id)) {
        //         product = res[i];
        //         break;
        //     }
        // }
        // // ORRRR
        // let product = res.find(isthatwhatIWant);
        // // ORRR we can define that function directly into the find
        // let product = res.find(function(whatyougotforme) {
        //     return productID === whatyougotforme.item_id
        // });
        // // ORRR turn it into a fat-arrow
        // let product = res.find(whatyougotforme => {
        //     return productID === whatyougotforme.item_id
        // })        
        // // and replace the return
        // let product = res.find(whatyougotforme => productID === whatyougotforme.item_id)
        // // the above is equivalent
