# bamazon

Bamazon is a command line Node.js application that utilizes MySQL to retrieve and update database-stored information. 

On the "Bamazon" storefront, customers can view products and make a purchase that updates the store's inventory. Managers can view all inventory, view low inventory, add to the inventory of an existing product, and create a new product.

=======================================================================================

#### To use this app, you must provide your own root password as a command line argument.
- For example:
- node bamazonCustomer.js password

=======================================================================================

**Technologies Used**
- Javascript
- Node.js
- MySQL
- npm package <a href="https://www.npmjs.com/package/inquirer">Inquirer</a>, for user interface in the command line

=======================================================================================

Upon running the customer file, the user is provided the product listings, this information is parsed from a MySQL database and handed to the user. 

Next, the user is prompted to answer two questions, using the node package 'inquirer'. 

What is the Item ID of the product you would like to purchase?
How many units would you like to purchase?

Using a MySQL query, the user response pulls the relevant data from the database. For example, the user responds with "1018", and "2" for the above questions. The item with the primary key ID of 1018 in the database will be queried, all relevant data will be pulled in, and then displayed to the user. This includes the product name, desired quantity, and total price. 

Given that there is sufficient stock, the database is then updated to reflect the new stock level after the customer has completed their order.

![Bamazon Customer Gif Part 1](assets/bamazon-1.gif)

=======================================================================================

If there is insufficient stock to fulfil the user's response request, the user will be alerted, and the transaction terminated.

![Bamazon Customer Gif Part 2](assets/bamazon-2.gif)

=======================================================================================

To watch a video of this app in action, follow this link to download a short video: 
https://github.com/camille-the-eel/bamazon/blob/master/assets/bamazon.mov
