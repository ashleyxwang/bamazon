const sql = require('sql')

//create MYSQL database: bamazon
// create table: products 
// create columns: item_id, product_name, department_name, price (cost to customer), stock_quantity

//create node app in this js file
//display all items for sale w/ id, name, prices, products
//allow customer to place order

//once order is placed, check if store has enough
//if not, log "insufficient quantity" and prevent order

//if store does have enough, fulfill order
    //update SQL database item quantity
    //show customer total cost of purchase