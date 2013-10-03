AutoComPasteHTML
===========

A project for the creation of Experimental Environment

#Instructions
How to use this?

###Download Zip:
You can see on the right a "Download Zip" button. Click there to get this project to your computer

###Fork
If you have a github account, you can fork this project as your own.

#How to Install:
You should have your own local server to run this. You can get and install a local server like XAMPP or MAMP
- for Windows: http://www.apachefriends.org/en/xampp-windows.html
- and Linux: http://www.apachefriends.org/en/xampp-linux.html
- for Mac: http://www.mamp.info/

and then put this at htdocs. Preferably put it in a folder. For this purpose, the name of the folder will be: acptest

#Accessing:
To access the ACP Testing Environment, just type: localhost/acptest (for Windows and Linux) or localhost:8888/acptest (for Mac... because MAMP usually puts it in a different port -> 8888, check MAMP settings on what port to access the MAMP server)

#What do you get?
You will get:
- index.html, which is the main interface
- js folder, all the core javascript files it needs to run
   - base_class.js, this is the base class used for inheritance
   - caretposition.js, this is used to get the caret position in the text editor of ACP
   - jquery-2.0.2.min.js, this is used for all jquery functionalities
   - jquery-ui-1.10.3.custom.min.js, this is used for the dragging and button functionalities
   - index.min.js, this is the main core system
   - module folder, this is the index.min.js separated to its other core components.
