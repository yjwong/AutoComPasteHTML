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

and then put this at ```htdocs```. Preferably put it in a folder.    
For this purpose, the name of the folder will be: ```acptest```

#Accessing:
To access the ACP Testing Environment, just type:   
For Windows and Linux: ```localhost/acptest```      
For Mac: ```localhost:8888/acptest```   

Note: because MAMP usually puts it in a different port -> 8888, check MAMP settings on what port to access the MAMP server

###How to Run ACP and test it your self...
For this, access the system by typing:    
For Windows and Linux: ```localhost/acptest/testenv.html```
For Mac: ```localhost:8888/acptest/testenv.html```

Click on the TextEditor Window inside the system. And then type the first few letters of any of the words that you see in the other windows inside the system as well. Commonly, you can try words like "Why" or "The"...
It should show a dropdown list of possible sentences from the articles that you have put.

If you pressed the down/up-button in the keyboard, it should show paste the sentence/phrase to the text document. 
If you press enter, it will return to the text document. If you press left/right button right after pressing enter,
you can delete/add the next few sentences of the article. If you press up/down button, you can delete/add the next few paragraphs of the article.
Pressing enter or space would mean pasting the final text to the system.

#What do you get?
THe files that you will get are:
- **css folder**: this would include all the styles needed for the **testenv.html**
- **data folder**: this would include all the data that the system will need to be read... the system would read the file that is a list of sample articles in here... inside it are...
  - **data.txt**: this would be the default file to read all the sample data articles as your articles for copying text to the text editor. Each file is separated by a newline and the file location is related to the location of **testenv.html**
  - **articles folder**: You can put here your additional articles.
- **extrajs folder**: this would include added javascript files that you coded and would help you record and log user data... the system would read the file that is a list of javascript files you want to use... inside it are...
  - **extrajs.txt**: this would be the default file to read all the extra javascript files that you want to use... each file is separated by a newline and the location of each file is related to the location of **testenv.html**
- **js folder**: this would be the core js folder. This includes all the javascript files that the system needs to run the **testenv.html**. You can modify this with the risk of breaking the system. You can also look into it to see how ACP works. (We copied the original ACP testenv and put it in javascript format)
- **task folder**: this is where you put your list of tasks for the **testenv.html**. 
  - **tasks.json**: this is the default tasks that the system will read for your experiment. The file is in JSON format. The file would look like this:
``` 
{
  "data": {
    "acp": [ /* list of tasks for acp testing environment */ ],
    "xwindow": [ /* list of tasks for xwindow testing environment */ ]
  }
}
```
Each task is formated like this:
```
{
  "title": "Copy-paste Experiment",
  "var": ["--Independent Variable 2--", "--Independent Variable 3--"],
  "Instruction": "Your instruction here",
  "Stimuli": "What would be the text that you wanted to copy to the text editor in this task"
}
```
Of course the independent variable 1 is the acp/xwindow itself. Please refer to your assignment document on the independent variables 2 and 3.
- **external_files.php**: the file includes the default files to be read by the **interface1.php** when it is time to call **testenv.html**. Change this if you have other files to read.
- **generateFile.php**: (CHANGE AT OWN RISK) this is the default file to get you to download the data in a text format at the end of experiment. 
- **index.php**: This is the starting page of experiment. You can modify this to modify the instructions at the beginning of your experiment.
- **interface1.php**: (CHANGE AT OWN RISK) This calls the **testenv.html** to run the system for experiment. It uses **external_files.php** to load the data, extra javascript files and the tasks for the experiment.
- **page1.php - page4.php**: These are the files that will be called as you continue on the experiment. You can modify the instructions to suit your experiment design
- **page5.php**: This is where it instructs you to download your data file. You can modify it if you want another php file to process your data.
- **reset.php**: (CHANGE AT OWN RISK) this just resets the system for next experiment
- **testenv.html**: (CHANGE AT OWN RISK) this is the testing environment for the ACP/XWindow
 
#FAQ:
### I find a lot of files in the repo and not sure which ones to change..
The things that you can change are:
- files inside **data folder**
- files inside **extrajs folder**
- files inside **task folder**
- **external_files.php** - if you want to load a different file from your default files
- **index.php, page1.php - page4.php** - you need to change the instructions
- **page5.php** - if you want to load a different php file to process your data

### do we have to code the algorithms for the two copy-paste techniques since I was not able to try them when I ran your code..
No need to code the algorithm


