/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 9/26/13
 * Time: 10:48 AM
 * To change this template use File | Settings | File Templates.
 */

"use strict";


var buttonClass = Class.extend({
    init: function(parent, label, id, callback, color) {
        this.parent = parent;
        this.label = label;
        this.id = id;
        this.callback = callback;
        this.color = color;

        if (this.color==null) this.color="black";
        this.run();
    },

    run: function() {
        this.element = saveElement(this.parent, "div", this.id, ["button", this.color]);
        this.element.append(this.label);
        this.element.click($.proxy(this.on_click, this));
    },

    on_click: function(e) {
        try {
            this.callback();
        } catch (error) {
            console.error(error.stack);
        }
    },

    update_label: function(new_label) {
        this.label = new_label;
        this.element.empty();
        this.element.append(this.label);
    },

    update_proxy: function(proxy) {
        this.callback = proxy;
    },

    update_color: function(color) {
        this.element.removeClass(this.color);
        this.color = color;
        this.element.addClass(this.color);
    }
})

var buttonIcon = buttonClass.extend({
    init: function(parent, icon, id, label, callback, color) {
        this.icon = icon;
        this._super(parent, label, id, callback, color);

        //this.run();
    },

    run: function() {
        this.element = saveElement(this.parent, "div", this.id, ["ui-icon", this.icon], {"title": this.label});
        this.element.append(this.label);
        this.element.click($.proxy(this.on_click, this));
    },

    update_label: function(new_label) {
        this._super(new_label);
        this.element.attr('title', this.label);
    }
})

var windowedElement = Class.extend({
    init: function(parent, windowName, x, y) {
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.id = windowName;
    },

    run: function() {
        this.window = saveElement(this.parent, "div", this.id+"_window", ['windowClass']);
        this.window.css({"left": this.x, "top": this.y});
        this.window.click($.proxy(this.on_click_window, this));
        //this.window.addClass(this.data.class);

        this.windowHandler = saveElement(this.window, "div", this.id+"_windowHandler", ['windowClassHandler']);
        this.windowHandlerTitle = saveElement(this.windowHandler, "div", this.id+"_windowHandlerTitle", ['windowClassHandlerTitle']);
        this.windowHandlerTitle.append(this.id);

        this.windowHandlerIcons =saveElement(this.windowHandler, "div", this.id+"_windowHandlerIcons", ['windowClassHandlerIcons']);
        this.windowExit = new buttonIcon(this.windowHandlerIcons, 'ui-icon-circle-close', this.id+"_windowHandlerExit", "Exit", $.proxy(this.closeFromWindow, this));
        this.windowExit.element.addClass('windowHandlerExitIcon');


        // add draggable function here
        this.window.draggable(this.scrubber_fx);
        this.windowContent = saveElement(this.window, "div", this.id+"_windowContent", ["windowContent", "pad10"]);

    },

    on_click_window: function() {
        $(".windowClass").css({"z-index": "0"});
        this.window.css({"z-index": "10000"});
    },

    closeFromWindow: function() {
        this.closeWindow();
    },

    closeWindow: function() {
        this.close();
    },

    setxy: function(x,y){
        this.x = x;
        this.y = y;
        this.window.css({"left": this.x, "top": this.y});
    },

    scrubber_fx: {
        //containment: 'parent',
        cursor: 'pointer',
        handle: 'div.windowClassHandler',
        start: function() {
            $(".windowClass").css({"z-index": "0"});
            $("#"+this.id).css({"z-index": "10000"})


        },
        drag: function(){
        },
        stop: function() {
        }
    }
});

var windowArticles = windowedElement.extend({
    init:  function(parent, article, x, y, articlenum) {
        this._super(parent, article, x, y);
        this.articlenum = articlenum;
        this.run();
    },

    run: function() {
        this._super();
        this.element = saveElement(this.windowContent, "div", this.id+"_textContent", ["textContent"]);
        var artobj = vD.article[this.articlenum];
        for (var p in artobj.paragraphs) {
            var parindex = artobj.paragraphs[p];
            var parobj = vD.paragraphs[parindex];

            this.element.append("<p>"+parobj.par+"</p>");

        }


    }
})

var AutoComPaste = windowedElement.extend({
    init:  function(parent, x, y) {
        this._super(parent, "AutoComPaste", x, y);
        this.focusflag=false;
        this.wordinput = "";
        this.escapeflag = false;
        this.pasteflag = false;
        this.currentPaste = "";
        this.run();
    },

    run: function() {
        this._super();
        this.window.css({"z-index": 10000});
        this.textArea = saveElement(this.windowContent, "textarea", this.id+"_textArea", ["textArea"]);
        this.textArea_el = document.getElementById(this.id+"_textArea");
        this.caretPosNum = 0;
        this.caretWordPos = 0;

        if (vD.acpflag) {
            this.textArea.focus($.proxy(this.focustextarea, this));
            this.textArea.click($.proxy(this.on_click, this));
            this.textArea.blur($.proxy(this.blurtextarea, this));
            this.textArea.keydown($.proxy(this.keydowned, this));
            this.textArea.keypress($.proxy(this.keypressed, this));
        }


    },

    on_click: function(e) {
        var num = this.getCaret(document.getElementById(this.id+"_textArea"));

        var wordlength = this.wordinput.length;
        var posdifference = this.caretPosNum - num;

        if (posdifference>=wordlength) {
            this.wordinput = "";
            this.reset();
            this.destroyDropDown();
        } else {
            this.caretWordPos = this.caretWordPos-(posdifference+1);
        }


        //console.log(cPos.left);
        //console.log(cPos.top);
        //console.log(num);
    },

    getCaret: function(el) {
        if (el.selectionStart) {
            return el.selectionStart;
        } else if (document.selection) {
            el.focus();

            var r = document.selection.createRange();
            if (r == null) {
                return 0;
            }

            //console.log(r);

            var re = el.createTextRange(),
                rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;
    },

    keypressed: function(e) {
        console.log(e.charCode);

        if (this.focusflag) {
            if (String.fromCharCode(e.charCode).match(/\W|_/)) {
                if (String.fromCharCode(e.charCode)!=" ") {
                    this.wordinput == "";
                    this.reset();
                    return;
                }

            }

            if (this.wordinput.trim()=="") {
                this.caretStart = this.getCaret(document.getElementById(this.id+"_textArea"));
                this.caretWordPos = 0;


            }
            this.caretPosNum = this.getCaret(document.getElementById(this.id+"_textArea"));
            this.caretWordPos = this.caretPosNum - this.caretStart;
            this.wordinput = this.wordinput.substring(0, this.caretWordPos)+ String.fromCharCode(e.charCode)+this.wordinput.substring(this.caretWordPos, this.wordinput.length);

            this.searchWord(this.wordinput);

            console.log(this.wordinput)

        }
    },

    keydowned: function(e) {
        if (this.focusflag) {
            console.log(e.keyCode)
            if (e.keyCode == 8) {

                this.caretPosNum = this.getCaret(document.getElementById(this.id+"_textArea"));
                this.caretWordPos = this.caretPosNum - this.caretStart;

                if (this.caretWordPos<0) {
                    this.caretStart = this.getCaret(document.getElementById(this.id+"_textArea"));
                }

                this.wordinput = this.wordinput.substring(0, this.caretWordPos - 1)+this.wordinput.substring(this.caretWordPos, this.wordinput.length);
                this.searchWord(this.wordinput);

            //left
            } else if (e.keyCode == 37) {
                if (this.pasteflag) {
                    this.removeSentence();

                }

            // right
            } else if (e.keyCode == 39) {
                if (this.pasteflag) {
                    this.addSentence();
                }

            // down
            } else if (e.keyCode == 40) {
                if (this.pasteflag) {
                    this.addParagraph();
                    this.downflag=true;
                } else if (this.dropDown!=null) {
                    this.dropDown[0].selectedIndex=0;
                    this.textAreaVal = this.textArea.val();
                    this.selectedValue();
                    this.dropDown.focus();
                }

            // up
            } else if (e.keyCode == 38) {
                if (this.pasteflag) {
                    this.removeParagraph()
                    this.upflag=true;
                } else if (this.dropDown!=null) {
                    this.dropDown[0].selectedIndex=0;
                    this.textAreaVal = this.textArea.val();
                    this.selectedValue();
                    this.dropDown.focus();
                }

            // escape
            } else if (e.keyCode==27) {
                e.preventDefault();
                if (this.pasteflag) {
                    this.textArea.val(this.textAreaVal);
                    this.pasteflag=false;
                } else {
                    var num = this.getCaret(document.getElementById(this.id+"_textArea"));
                    this.wordinput = this.getWord(num);
                    //this.wordinput="";
                    this.destroyDropDown();
                }



            // space bar
            } else if (e.keyCode==32) {
                if (this.escapeflag) {
                    this.escapeflag=false;
                    this.wordinput="";
                }
                if (this.pasteflag) {
                    e.preventDefault();
                    this.wordinput="";
                    this.reset();
                    this.pasteflag=false;
                }

            // enter
            } else if (e.keyCode==13) {
                if (this.pasteflag) {
                    e.preventDefault();
                    this.wordinput="";
                    this.reset();
                    this.pasteflag=false;
                }
            }

        }

        /// put escape
    },

    reset: function() {
        this.currentOption = null;
        this.startOption = null;
        this.wordinput = "";
        this.currentPaste = "";
    },

    addSentence: function() {

        console.log(this.currentOption);

        if (vD.article[this.currentOption.art].paragraphs.length-1>this.currentOption.parpos)
        {
            if (vD.paragraphs[this.currentOption.par].sentences.length-1>this.currentOption.senpos) {
                this.currentOption.senpos++;
                this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
                this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
            } else {
                this.currentOption.parpos++;
                this.currentOption.par = vD.article[this.currentOption.art].paragraphs[this.currentOption.parpos];
                this.currentOption.senpos = 0;
                this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
                this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
            }

        } else {
            if (vD.paragraphs[this.currentOption.par].sentences.length-1>this.currentOption.senpos) {
                this.currentOption.senpos++;
                this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
                this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
            }
        }

        console.log(this.currentOption);

        var startparpos = this.startOption.parpos;
        var startsenpos = this.startOption.senpos;
        var endparpos = this.currentOption.parpos;
        var endsenpos = this.currentOption.senpos;
        var text = this.currentPaste;

        console.log(startsenpos);

        for (var i = startparpos; i<=endparpos; i++) {
            var par = vD.article[this.startOption.art].paragraphs[i];

            if (startparpos==endparpos) {
                var len = endsenpos
            } else {
                if (i!=endparpos) {
                    var len = vD.paragraphs[par].sentences.length-1;
                } else {
                    var len = endsenpos
                }
            }

            if (i==startparpos) {
                var cursenpos = startsenpos;
            } else {
                var cursenpos = 0;
            }

            for (var j = cursenpos; j<=len; j++ ) {
                if ((j==startsenpos) && (i==startparpos)) continue;
                var sen = vD.paragraphs[par].sentences[j];

                text += vD.sentences[sen].sen+" ";
            }
            text = text.trim()+"\n";
        }

        this.pasteToText(text, this.wordinput);

    },

    removeSentence: function() {
        if (this.startOption.parpos<this.currentOption.parpos)
        {
            if (this.currentOption.senpos>0) {
                this.currentOption.senpos--;
                this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
                this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
            } else {
                this.currentOption.parpos--;
                this.currentOption.par = vD.article[this.currentOption.art].paragraphs[this.currentOption.parpos];
                this.currentOption.senpos = vD.paragraphs[this.currentOption.par].sentences.length-1;
                this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
                this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
            }

        } else {

            if (this.currentOption.senpos>this.startOption.senpos) {
                this.currentOption.senpos--;
                this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
                this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
            }
        }

        var startparpos = this.startOption.parpos;
        var startsenpos = this.startOption.senpos;
        var endparpos = this.currentOption.parpos;
        var endsenpos = this.currentOption.senpos;
        var text = this.currentPaste;


        for (var i = startparpos; i<=endparpos; i++) {
            var par = vD.article[this.startOption.art].paragraphs[i];

            if (startparpos==endparpos) {
                var len = endsenpos
            } else {
                if (i!=endparpos) {
                    var len = vD.paragraphs[par].sentences.length-1;
                } else {
                    var len = endsenpos
                }
            }

            if (i==startparpos) {
                var cursenpos = startsenpos;
            } else {
                var cursenpos = 0;
            }

            for (var j = cursenpos; j<=len; j++ ) {
                if ((j==startsenpos) && (i==startparpos)) continue;
                var sen = vD.paragraphs[par].sentences[j];

                text += vD.sentences[sen].sen+" ";
            }

            text = text.trim()+"\n";
        }

        this.pasteToText(text, this.wordinput);
    },

    addParagraph: function() {

        if (this.upflag) {
            if (vD.article[this.currentOption.art].paragraphs.length-1>this.currentOption.parpos)
            {
                this.currentOption.parpos++;
                this.currentOption.par = vD.article[this.currentOption.art].paragraphs[this.currentOption.parpos]
                this.currentOption.senpos = 0
                this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
                this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
            }
            this.upflag=null;
        }

        if (this.downflag) {

        }
        var startparpos = this.startOption.parpos;
        var endparpos = this.currentOption.parpos;
        var text = ""; //this.currentPaste;
        for (var i= startparpos; i<=endparpos; i++) {
            var par = vD.article[this.startOption.art].paragraphs[i];

            if (i==startparpos) {
                text = this.currentPaste;
                var len = vD.paragraphs[par].sentences.length-1;
                var cursenpos = this.startOption.senpos;

                for (var j = cursenpos; j<=len; j++ ) {
                    if ((j==this.startOption.senpos) && (i==startparpos)) continue;
                    var sen = vD.paragraphs[par].sentences[j];

                    text += vD.sentences[sen].sen+" ";
                }

            } else {
                text += vD.paragraphs[par].par;
            }


        }

        if (vD.article[this.currentOption.art].paragraphs.length-1>this.currentOption.parpos)
        {
            this.currentOption.parpos++;
            this.currentOption.par = vD.article[this.currentOption.art].paragraphs[this.currentOption.parpos]
            this.currentOption.senpos = 0
            this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
            this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
        }

        this.pasteToText(text, this.wordinput);

    },

    removeParagraph: function() {

        if (this.upflag) {

        }

        if (this.downflag) {
            if (this.startOption.parpos<this.currentOption.parpos)
            {
                this.currentOption.parpos--;
                this.currentOption.par = vD.article[this.currentOption.art].paragraphs[this.currentOption.parpos]
                this.currentOption.senpos = vD.paragraphs[this.currentOption.par].sentences.length-1;
                this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
                this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
            }


            this.downflag = null;
        }

        var startparpos = this.startOption.parpos;
        var endparpos = this.currentOption.parpos;
        var text = "";//this.currentPaste;
        for (var i = startparpos; i<=endparpos; i++) {
            var par = vD.article[this.startOption.art].paragraphs[i];
            if (i==startparpos) {
                text = this.currentPaste;
                var len = vD.paragraphs[par].sentences.length-1;
                var cursenpos = this.startOption.senpos;

                for (var j = cursenpos; j<=len; j++ ) {
                    if ((j==this.startOption.senpos) && (i==startparpos)) continue;
                    var sen = vD.paragraphs[par].sentences[j];

                    text += vD.sentences[sen].sen+" ";
                }

            } else {
                text += vD.paragraphs[par].par;
            }
        }

        if (this.startOption.parpos<this.currentOption.parpos)
        {
            this.currentOption.parpos--;
            this.currentOption.par = vD.article[this.currentOption.art].paragraphs[this.currentOption.parpos]
            this.currentOption.senpos = vD.paragraphs[this.currentOption.par].sentences.length-1;
            this.currentOption.sen = vD.paragraphs[this.currentOption.par].sentences[this.currentOption.senpos];
            this.currentOption.pos = vD.sentences[this.currentOption.sen].word.length-1;
        }

        this.pasteToText(text, this.wordinput);
    },

    keydowned_onlist: function(e) {
        console.log(e.keyCode)

        // backspace
        if (e.keyCode==8) {
            e.preventDefault();
            this.textArea.val(this.textAreaVal);
            this.textArea.focus();
            //this.keydowned(e);

        // escape
        } else if (e.keyCode==27) {
            e.preventDefault();
            this.textArea.val(this.textAreaVal);
            this.textArea.focus();
            var num = this.getCaret(document.getElementById(this.id+"_textArea"));
            this.wordinput = this.getWord(num);

            //this.wordinput="";
            this.destroyDropDown();

        // enter
        } else if (e.keyCode==13) {
            e.preventDefault();
            this.textArea.focus();
            var obj = {};
            obj.art = this.currentOption.art
            obj.parpos = this.currentOption.parpos
            obj.par = this.currentOption.par
            obj.senpos = this.currentOption.senpos
            obj.sen = this.currentOption.sen
            obj.pos = this.currentOption.pos
            this.startOption = obj;
            console.log(this.currentOption);


            this.destroyDropDown();
            this.pasteflag = true;
        }
    },

    getWord: function(num) {
        var word = "";
        var textarea = this.textArea.val();
        num--;
        var startnum = num;
        console.log(textarea.charAt(num));
        word = textarea.charAt(num);
        //get previous

        while (!(""+textarea.charAt(num-1)).match(/\W|_/)){
            console.log(num);
            word = textarea.charAt(num-1)+word;
            num--;
            if (num==0) break;
        }
        this.caretStart = num;
            //console.log(word);

        num = startnum;

        while (!(""+textarea.charAt(num+1)).match(/\W|_/)){
            word = word+textarea.charAt(num+1);
            num++;
            if (num>=textarea.length) break;
        }

        this.escapeflag = true;

        //console.log(word)
        return word;
        // get forward

    },

    searchWord: function(word) {
        if (word.length<3) {
            this.destroyDropDown();
            return;
        }

        word = word.toLowerCase();

        var list = vD.searchWord(word);
        var sentencelist = [];

        //console.log(list);
        for (var i in list) {
            var data = list[i]
            var pos = data.pos;
            var sen = data.s;
            var par = data.p;
            var art = data.art;
            var ap = data.ap;
            var ps = data.ps;

            var sentence = "";
            var senobj = vD.sentences[sen];

            var firstword = senobj.word[parseInt(pos)];

            var firstwordIndex = senobj.sen.indexOf(firstword);

            sentence = senobj.sen.substring(firstwordIndex, senobj.sen.length);

            var sentencelistobj = {};
            sentencelistobj.sentence = sentence;
            sentencelistobj.sen = sen;
            sentencelistobj.par = par;
            sentencelistobj.art = art;
            sentencelistobj.pos = pos;
            sentencelistobj.ap = ap;
            sentencelistobj.ps = ps;

            sentencelist.push(sentencelistobj)

        }

        //console.log(sentencelist);
        this.createDropDown(sentencelist);
    },

    createDropDown: function(list) {
        if (list.length<=0) {
            this.destroyDropDown();
            return;
        }

        if (this.dropDown==null) {
            this.dropDown = saveElement(this.windowContent, "select", this.id+"_dropDown", ["ACPDropDown"], {"size": 10});
            this.dropDown.change($.proxy(this.selectedValue, this));
            this.dropDown.keydown($.proxy(this.keydowned_onlist, this));
        }

        this.dropDown.empty();

        var cPos = Measurement.caretPos(this.textArea_el);
        var offset = this.textArea.offset();

        var caretX = cPos.left-offset.left;
        var caretY = cPos.top-offset.top;

        this.dropDown.css({"left": caretX, "top": caretY+24});
        //console.log(list);
        for (var i in list) {
            var obj = list[i];
            var sen = obj.sentence;
            var s = obj.sen;
            var p = obj.par;
            var art = obj.art;
            var pos = obj.pos;
            var ap = obj.ap;
            var ps = obj.ps;

            var optionval = art+":"+ap+":"+p+":"+ps+":"+s+":"+pos;
            var option = "<option value=\""+optionval+"\">"+sen+"</option>";
            this.dropDown.append(option);
        }
    },

    destroyDropDown: function() {
        if (this.dropDown!=null) {
            //this.currentOption=null;
            //this.currentPaste ="";
            this.dropDown.empty();
            this.dropDown.remove();
            this.dropDown = null;
        }
    },

    selectedValue: function() {
        var option = this.dropDown.find(":selected");
        var text = option.text();

        var arr = option.val().split(":");

        var obj = {}
        obj.art = arr[0]
        obj.parpos = arr[1]
        obj.par = arr[2]
        obj.senpos = arr[3]
        obj.sen = arr[4]
        obj.pos = arr[5]

        this.currentOption = obj;
        this.currentPaste = text;
        this.pasteToText(text, this.wordinput);
        //console.log(option.val())
    },

    pasteToText: function(text, wordplacement) {
        var textval = this.textAreaVal;
        var textindex = this.caretStart
        textval = textval.substring(0, textindex)+text+textval.substring(textindex+wordplacement.length, textval.length);
        this.textArea.val(textval);
    },

    focustextarea: function() {
        this.focusflag=true;
        //this.window.css({"z-index": "10000"});
        this.caretPosNum = this.getCaret(document.getElementById(this.id+"_textArea"));

    },

    blurtextarea: function() {
        this.focusflag=false;
        //this.wordinput = "";
        this.caretPosNum = 0;
        //this.destroyDropDown();
    }
})