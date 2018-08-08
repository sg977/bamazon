// Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.


var mysql = require("mysql");
var inquirer = require("inquier");
var columnify = require('columnify');

//create the connection information for the SQL database

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",

    database: "bamazon_db"
});

//connect to the mysql server and sql database  
connection.connect(function(err) {
    if (err) throw err;
    //run the start function after the connection is made to prompt the user
    start();
});

//show inventory
function showInventory() {
    var product_catalog = [];
    var product_catalog_names = [];
    
    //only display items in stock
    connection.query ('SELECT * FROM products WHERE stock_quantity != 0', function(error,results) {
        if(error) throw error;
        console.log(columnify(results, {columns:['id', 'product_name', 'department_name', 'price', 'stock_quantity']}))

        //removes RowDataPacket
        var newResults = JSON.parse(JSON.stringify(results));

        //store data in new arrays for catalog selection
        newResults.forEach((element) => {
            product_catalog_names.push(element.product_name);
        }, this); 
        //have to console log and ttest out this 
        newResults.forEach((element) => {
            product_catalog.push(element);
        }, this); 

        purchase(product_catalog, product_catalog_names);
        
    });

}


//purchase 
function purchase(product_catalog, product_catalog_names) {
    console.log("");
    inquirer.prompt([{
        name: "id",
        message: "Which product would you like to purchase?",
        type: "list",
        choices: product_catalog_names,


    },
    {
        name:"purchase_amount",
        message: "How many units would you like to purchase?",
        type:"input",
        validate: (value) => {
            var valid = !isNan(parseFloat(value));
            return valid || "Please enter a number"
        }
    }
]).then(function(answers) {
    //referenced id for chosen product
    var chosenId = product_catalog_names.indexOf(answers.id)+1;

    //store product selected by user to edit db 
    var chosenProduct = product_catalog[chosenId -1];

    //validate if the product is in stock
    if (chosenProduct.stock_quantity<answers.purchase_amount) {
        console.log('Insufficient quantity!')

        purchase(product_catalog, product_catalog_names);
    } else {
        //store current stock amoount
        var current_quantity = chosenProduct.stock_quantity - answers.purchase_amount;
        var totalSale = Math.round(answers.purchase_amount*chosenProduct.price);
        var increaseSale = Math.round()
    }
})
}


// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.