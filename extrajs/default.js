/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/2/13
 * Time: 2:33 PM
 * To change this template use File | Settings | File Templates.
 */

// this is the function that should be called after the doing the tasks
var updatedGenerateResult = function() {

}

// this change the generateResult function so that the function above will be called after doing the tasks.
generateResult.changeGenerator(updatedGenerateResult);

// this detects copy events in windowContents (open Documents and text Editor)
$('.windowContent').bind('copy', null, copyEvent);

// this detects paste events in textEditor textboxArea (both CTRL+V and right-mouse paste)
$('#TextEditor_textArea').bind('paste', null, pasteEvent);

// this detects custom paste event of ACP
$('#TextEditor_textArea').bind('acp_paste', pasteEvent);

// this detects custom event "next_task" when you click on the next task button
$(document).bind('next_task', nextTask);

$(document).bind('data_saved', dataSaved);


/*
// detects mouseenter on all windowContent
$('.windowContent').mouseenter(mouseEnter);

// detects mouseleave on all windowContent
$('.windowContent').mouseleave(mouseLeave);

// detects mouseclick on all windowContent
$('.windowContent').click(mouseLeave);
*/

