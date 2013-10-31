/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/3/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */

// General functions
var copyflag = false

var pasteEvent = function(e) {
    console.log(e);
    // this gets today's date and time
    var thisevent = new Date();

    // this gets the difference of global.taskstart date and time and thisevent's date and time
    var eventdiff = Math.abs(thisevent.getTime() - global.taskstart.getTime())
    // this checks if the user copied first from the opened-document
//    if (copyflag) {
//        copyflag = false;
//    // this checks if the user is in ACP environment
//    } else if (vD.acpflag) {
//    // put special code here if you have other things to put...
//
//    } else {
//        return;
//    }

    // sets values in data, the setup is just like in the word document material:
    // Participant, primary independent variable, secondary independent variable 1, secondary independent variable 2, trial number,
    // stimuli, user response, trial start time, trial end time, trial time difference
    setTimeout(function() {
        var data = {};

        // puts user value
        data.user = vD.user;

        // puts primary independent variable
        if (vD.acpflag) {
            data.testenv = "AutoComPaste"
        } else {
            data.testenv = "XWindow"
        }

        // puts secondary independent variable
        data.other_independent_var = global.taskobject.var

        // puts trial number
        data.trial = tasknum;

        // puts stimuli
        data.stimuli = global.taskobject.Stimuli

        // puts user response (the whole text)
        data.user_response = $("#TextEditor_textArea").val();

        // puts trial start time
        data.trial_start = global.taskstart;

        // puts trial end
        data.trial_end = thisevent;

        // puts trial time difference
        data.trial_difference = eventdiff;

        // put it in log
        log(data);
        //console.log(logdata);
    }, 100);

}

var copyEvent = function(e) {
    console.log(e);
    copyflag = true

}

var nextTask = function(e) {
    console.log(e);

    // reset the z-order of the windows
    resetZ_order();

    // remove highlight text
    removeHighlightText();

    // highlights text in all windows that has the same phrasing in the stimuli
    highlightText(getCurrentStimuli());

    // resets the data in textarea
    resetTextArea();

    //
}

var dataSaved = function(e) {
    console.log(e);
}


/*
function mouseEnter(e) {
    var d = {}
    d.target = e.target.id;
    d.event = e.type;
    d.offsetX = e.offsetX;
    d.offsetY = e.offsetY;
    d.clientX = e.clientX;
    d.clientY = e.clientY;
    log(d);
}

function mouseLeave(e) {
    var d = {}
    d.target = e.target.id
    d.event = e.type;
    d.offsetX = e.offsetX;
    d.offsetY = e.offsetY;
    d.clientX = e.clientX;
    d.clientY = e.clientY;
    log(d);
}

function mouseClick(e) {
    var d = {}
    d.target = e.target.id
    d.event = e.type;
    d.offsetX = e.offsetX;
    d.offsetY = e.offsetY;
    d.clientX = e.clientX;
    d.clientY = e.clientY;
    log(d);
}*/