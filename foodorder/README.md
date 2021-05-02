Équipe:

Keven Thibault
Jordan Leblond-Thibodeau

Type:
Steak house

Project made using:
XAMPP
Apache
MySql Workbench
Node.js

Steps to see the full project:

1. Open XAMPP Control Panel
    1.2 Start Apache service by pressing the "Start" Button
    1.2 Start MySql service by pressing the "Start" Button
2. Open MySql Workbench
    2.1 Create a connection to your default root ->
        2.1.1 Click on the + sign next to "MySQL Connections"
        2.1.2 Give that connection any name
        2.1.3 Then press on "OK" Button
    2.2 Click on the freshly new created Connection that should now be right under "MySQL Connections"
    2.3 On the top left of the interface, click on the icon written with "SQL" and that looks like a sheet with a "+" sign at its bottom corner.

3. Go in your folder "Autres_Ressources" (in the project's folder)

4. Copy the content of " commande_nourriture_KT_JLT.sql " (or drag the folder) in MySQL where you oppened a new SQL script (see step 2.3)

5. Execute that script

6. On the top left of the interface, click on the icon written with "SQL" and that looks like a sheet with a "+" sign at its bottom corner.

7. Go in your folder "Autres_Ressources" (in the project's folder)

8. Copy the content of " defaultValues_commande_nourriture_KTJLT.sql " (or drag the folder) in MySQL where you oppened a new SQL script (see step 2.3)

9. Execute that script
    9.1 You can validate that everything went well by refreshing the database by pressing the refresh icon next to "SCHEMAS" on the left (the icon will be on the right of that writting)
    9.2 Drop down the database that you just created 
    9.3 Drop down "Tables"
    9.4 You should see the tables created with the 1st script that you executed
    9.5 Right click on any table and then press "Select Rows-Limit 2000"
    9.6 You should now see values appearing validating that the scripts worked

10. Leave all that open and now open "foodorder" folder with Visual studio code

11. In the command console, enter : npm -install
    11.1 (INFOS) it should install the modules required for this project

12. Once its finished downloading, in the command console enter: npm -start

13. And now you should have the project open on the main page with all the images and descriptions.

14. You can connect to the website with id: "admin" password: "admin" to see the admin point of view OR id: "test" password : "test" to see has a user points of views
    14.1 Admins can go see all the orders made and change their status
    14.2 Test user can only view his orders and cannot change their status