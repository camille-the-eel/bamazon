# bamazon

Bamazon is a command line node app, that utilizes MySQL to retrieve database-stored information. 

## To use this app, you must provide your own root password as a command line argument.
- For example:
- node bamazonCustomer.js password

Upon running the file, the user is provided the product listings, this information is parsed from a MySQL database and handed to the user. 

Next, the user is prompted to answer two questions, using the node package 'inquirer'. 

What is the Item ID of the product you would like to purchase?
How many units would you like to purchase?

Using a MySQL query, the user response pulls the relevant data from the database. For example, the user responds with "109", and "2" for the above questions. The item with the primary key ID of 109 in the database will be queried, all relevant data will be pulled in, and then displayed to the user. This includes the product name, desired quantity, and total price. 

If there is insufficient stock to fulfil the user's response request, the user will be alerted, and the transaction terminated.

Given that there is sufficient stock, the database is then updated to reflect the new stock level after the customer has completed their order.

To watch a video of this app in action, follow this link to download a short video: 
https://github.com/camille-the-eel/bamazon/blob/master/assets/bamazon.mov
