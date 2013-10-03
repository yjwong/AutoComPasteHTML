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

and then put this at htdocs. Preferably put it in a folder. 

For this purpose, the name of the folder will be: acptest

#Accessing:
To access the ACP Testing Environment, just type: localhost/acptest (for Windows and Linux) or localhost:8888/acptest (for Mac... because MAMP usually puts it in a different port -> 8888, check MAMP settings on what port to access the MAMP server)

#What do you get?
You will get:
- index.html: which is the main interface
- js folder: all the core javascript files it needs to run
   - base_class.js: this is the base class used for inheritance
   - caretposition.js: this is used to get the caret position in the text editor of ACP
   - jquery-2.0.2.min.js: this is used for all jquery functionalities
   - jquery-ui-1.10.3.custom.min.js: this is used for the dragging and button functionalities
   - index.min.js: this is the main core system
   - module folder: this is the index.min.js separated to its other core components.
- data folder: here you put the data for your tests..
   - data.json: this is a list of articles in JSON format to be fed in the system. Each article data is in this form:
   {
      type: "text",
      link: "[RELATIVE URL OF THE ARTICLE FILE FROM INDEX.HTML]"
   }
   Note: Although you can put any number of article files, the system randomizes the files to read... The current setting is 5 random articles will show up for each test.
   - articles folder: This is where you can put the articles, currently it has 88 articles.
- css folder: for basic ui design.
- extrajs folder: here is where you can put your additional javascript files for your logging user behavior
    - extrajs.json: same as data.json, it is a list of js files in JSON format to be fed in the system. Each js data to be loaded is in this form:
    {
        type: "js",
        link: "[RELATIVE URL OF THE JS FILE FROM INDEX.HTML]"
    }
    - defaultlib.js: An example javascript file that has the basic function libraries on mouse events and logging it on the built-in system recorder
    - default.js: An example javascript file that adds event detectors on elements in the system and uses the functions in defaultlib.js

#How to Use?
You can modify the JSON files to be accessed...

###Using A Different Data list
If you want to access a different data list, let's say new_data.json, you can type this in your url:
- localhost/acptest/?data=new_data
Note: Please put the new_data.json at the data folder.

###Using A Different External Javascript list
If you want to access a different javascript list, let's say new_javascript_list.json, you can type this in your url:
- localhost/acptest/?jslist=new_javascript_list
Note: Please put the new_javascript_list.json at the extrajs folder

###Recording Logs
To record your logs, use the function:

log(data)

where data is any data you want to record.
- a javascript data object (make sure you don't save the whole jquery element on this, as it will conflict with JSON stringify later on)
- a string
- an integer, float, number...
- an array of the above

###Getting the Logs
You can get the logs by clicking the Generate Result in the top right corner of the system UI. It will generate a JSON file named "download", which can be read by any text file. (Note that it will not spew a .txt file, so you have to right-click open with a notepad or Notepad++ to read the file)

###How to change the generation of logs?
You can change the generation of logs by creating a function to get the data, let's say generateNewLog(), and putting this function to use "generateNewLog()" when the button "Generate Results" is clicked, and putting this in your new javascript file, let's say new_js.js,

generateResult.change_function(generateNewLog);

(make sure that new_js.js is added in your javascript JSON file loader to be loaded by the system - See What do you get?-extrajs folder-extrajs.json

#More Questions
As this is currently for class use, ask your professor by email and we would answer it the best we can
