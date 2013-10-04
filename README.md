AutoComPasteHTML
===========

A project for the creation of Experimental Environment

#Instructions
How to use this?

###Download Zip:
You can see on the right a "Download Zip" button. Click there to get this project to your computer

###Fork
If you have a github account, you can fork this project as your own. Please check here on how to fork this project as your own: https://help.github.com/articles/fork-a-repo

#How to Install:
You should have your own local server to run this. You can get and install a local server like XAMPP or MAMP
- for Windows: http://www.apachefriends.org/en/xampp-windows.html
- and Linux: http://www.apachefriends.org/en/xampp-linux.html
- for Mac: http://www.mamp.info/

and then put this at htdocs. Preferably put it in a folder.    
For this purpose, the name of the folder will be: acptest

#Accessing:
To access the ACP Testing Environment, just type:   
For Windows and Linux: localhost/acptest      
For Mac: localhost:8888/acptest   

Note: because MAMP usually puts it in a different port -> 8888, check MAMP settings on what port to access the MAMP server

#What do you get?
You will get:
- *index.html*: which is the main interface
- *js folder*: all the core javascript files it needs to run
   - *base_class.js*: this is the base class used for inheritance
   - *caretposition.js*: this is used to get the caret position in the text editor of ACP
   - *jquery-2.0.2.min.js*: this is used for all jquery functionalities
   - *jquery-ui-1.10.3.custom.min.js*: this is used for the dragging and button functionalities
   - *index.min.js*: this is the main core system
   - *module folder*: this is the index.min.js separated to its other core components.
- *data folder*: here you put the data for your tests..
   - *data.json*: This is a *Data JSON File Descriptor* that lists all of articles that will be fed in the system. Each article file is described in this form:
   ```javascript
   {
      type: "text",
      link: "[RELATIVE URL OF THE ARTICLE FILE FROM INDEX.HTML]"
   }
   ```
   Note: Although you can put any number of article files, the system randomizes the files to read... The current setting is 5 random articles will show up for each test.
   - *articles folder*: This is where you can put the articles, currently it has 88 articles.
- *css folder*: for basic ui design.
- *extrajs folder*: here is where you can put your additional javascript files for your logging user behavior
    - *extrajs.json*: same as data.json, This is a *Javascript JSON File Descriptor* that lists all of the extra external javascript files that will be loaded into the system. Each javascript file that will be loaded is described in a JSON format in this form:
    ```javascript
 {
     type: "js",
     link: "[RELATIVE URL OF THE JS FILE FROM INDEX.HTML]"
 }
    ```
    - *defaultlib.js*: An example javascript file that has the basic function libraries on mouse events and logging it on the built-in system recorder
    - *default.js*: An example javascript file that adds event detectors on elements in the system and uses the functions in defaultlib.js

#How to Use?
You can modify the JSON files to be accessed...

###

###Loading A Different Data JSON File Descriptor
If you want to access a different data JSON file Loader,    
let's say *new_data.json* (from the example above),    
you can type this in your url:
```
localhost/acptest/?data=new_data
```

Note: Please put the *new_data.json* at the *data* folder.

###How to Add your own Javascript files in the Javascript JSON File Descriptor
If you want to add your own javascript file,    
let's say *new_js.js*,      
and you have put it inside the *extrajs folder*, you need to edit the *extrajs.json* inside the *extrajs folder* and add the javascript file as a javascript object notation data, using this format:
```javascript
{
     type: "js",
     link: "extrajs/new_js.js" 
}
```
Note: This is given that the javascript file *new_js.js* is inside *extrajs folder*.

If you want to create your own javascript list,   
let's say *new_javascript_list.json*,    
and you want to put your javascript file in it, you need to edit *new_javascript_list.json* (which should also be inside the *extrajs folder*), you have to start the file this way:
```javascript
{
   data: [ LIST OF JAVASCRIPT FILES ]
}
```
This means, if you have two javascript files that you want to be loaded,    
let's say *new_js.js* and *new_js_2.js*, both inside the *extrajs folder*, then *new_javascript_list.json* would look like this:
```javascript
{
   data: [
      {
         type: "js",
         link: "extrajs/new_js.js"
      },
      {
         type: "js",
         link: "extrajs/new_js_2.js"
      }
   ]
}
```

###Loading A Different Javascript JSON File Descriptor
If you want to access a different javascript list with a different set of javascript files for access,   
let's say *new_javascript_list.json* (from the example above),    
you can type this in your url:
```
localhost/acptest/?jslist=new_javascript_list
```

Note: Please put the *new_javascript_list.json* at the *extrajs folder*

###Recording Logs
To record your logs, put this function in your external extra javascript file that you want to load:
```
log(data)
```
where data is any data you want to record.
- a javascript data object (make sure you don't save the whole jquery element on this, as it will conflict with JSON stringify later on)
- a string
- an integer, float, number...
- an array of the above

###Getting the Logs
You can get the logs by clicking the *Generate Result* button at the top right corner of the system UI. It will generate a JSON file named *"download"*, which can be read by any text file editor.    

Note: It will not create a .txt file extension, so you have to right-click open with a notepad or Notepad++ to read the file)

###How to change the generation of logs?
You can change the generation of logs by creating a function to get the data,   
let's say *generateNewLog()*,    
and putting this function in your new javascript file,    
let's say *new_js.js*,    
to use *generateNewLog()* when the *Generate Results* button is clicked:
```
generateResult.change_function(generateNewLog);
```
Note: Make sure that *new_js.js* is added in your *Javascript JSON file descriptor* to be loaded by the system - See *What do you get?-extrajs folder-extrajs.json*

#More Questions
As this is currently for class use, ask your professor by email and we would answer it the best we can
