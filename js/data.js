/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 9/26/13
 * Time: 10:37 AM
 * To change this template use File | Settings | File Templates.
 */

"use strict";

var dataModel = Class.extend({
    init: function(parent) {
        this.parent = parent;
        this.word_DB = {};
        this.article = [];
        this.sentences = [];
        this.paragraphs = [];
        this.acpflag = false;
        this.run();
    },

    run: function() {
        var vars = this.getURLVars();
        var file = "";
        var filename = "";
        //console.log(vars);
        if (vars!=null) {
            if (vars.data!=null) {
                filename = "data/"+vars.data+".json";
            } else {
                filename = "data/data.json";
            }
            if (vars.acp!=null) {
                if (vars.acp.trim().toLowerCase()=="false") {
                    this.acpflag= false
                } else if (vars.acp.trim().toLowerCase()=="true"){
                    this.acpflag= true
                } else {
                    this.acpflag= true
                }


            } else {
                this.acpflag=true;
            }
        }

        var filelist = $.parseJSON(this.loadFile(filename));

        for (var fileobj in filelist.data) {

            // RANDOM DATA

            if (this.article.length<5) {
                if (Math.random()>0.7) {
                    if (filelist.data[fileobj].type=="text") {
                        this.processTextFile(this.loadFile(filelist.data[fileobj].link), filelist.data[fileobj].link);
                    }
                } else {
                    continue;
                }
            }


        }

        console.log(this);

    },

    processTextFile: function(str, filename) {
        var arr = str.split("\n");

        var articleobj = {};

        articleobj.filename = filename;
        articleobj.paragraphs = [];

        for (var parind in arr) {

            var par = arr[parind];
            if (par.trim()=="") continue;
            var paragraphobj = {};
            paragraphobj.par = par;
            paragraphobj.sentences = [];

            var arrstr = par.split(/[.|!|?]\s/gi);

            for (var s in arrstr) {
                var str = arrstr[s];
                if (str.trim()=="") continue;
                str = par.substring(par.indexOf(str),par.indexOf(str)+str.length+1);
                str = str.trim();
                var sentenceobj = {};
                sentenceobj.sen = str;
                sentenceobj.word = [];
                var arrword = str.split(/\W|_/);

                for (var wi in arrword) {
                    var word = arrword[wi];
                    if (word.trim()=="") continue;
                    word = word.trim();
                    sentenceobj.word.push(word);
                }


                this.sentences.push(sentenceobj);
                var sentenceindex = this.sentences.length-1;
                paragraphobj.sentences.push(sentenceindex);
            }

            this.paragraphs.push(paragraphobj);
            var paragraphindex = this.paragraphs.length-1;
            articleobj.paragraphs.push(paragraphindex);

        }

        this.article.push(articleobj);
        var articleindex = this.article.length-1;

        var art = this.article[articleindex]

        for (var par_index in art.paragraphs) {
            var p_index = art.paragraphs[par_index];
            var p_obj = this.paragraphs[p_index];

            for (var sen_index in p_obj.sentences) {
                var s_index = p_obj.sentences[sen_index];
                var s_obj = this.sentences[s_index];

                for (var word_index in s_obj.word) {
                    var word = s_obj.word[word_index];

                    var wordobj = {};
                    wordobj.id = word.toLowerCase();
                    wordobj.data = {
                        art: articleindex,
                        p: p_index,
                        ap: par_index,
                        s: s_index,
                        ps: sen_index,
                        pos: word_index
                    }
                    //console.log(wordobj);
                    this.w(wordobj);

                }

            }
        }

        //console.log(arr);
    },

    wordIndex: function(val, del) {
        var id = null;
        var obj = null;

        //if (val==null && del==true) return 2;
        // checks if value is an object with id or if it is just an id
        if (val.id!=null) {
            id = val.id;
            obj = val;
        } else {
            id = val;
        }

        // check if id is null... then throw error
        if (id==null) {
            throw new Error("id is needed to do CRD for word INdex")
            return;
        }

        // if del flag is true, delete object
        if (del) {
            //console.log(id);
            //console.log(this.instance_set[id])
            if (this.word_DB[id]!=null) {
                this.word_DB[id]=null;
                return 2
            } else {
                return 3
            }

        }

        // check if id -> obj in instance_set exists;
        if (this.word_DB[id]!=null) {
            if (obj!=null) {
                this.word_DB[id].data.push(obj.data)
            } else {
                return this.word_DB[id];
            }


            // if it doesn't exist (meaning id is free to connect to obj)
            // and val is an object to be saved... then save
        } else if (obj!=null) {
            this.word_DB[id] = {};
            this.word_DB[id].id = id;
            this.word_DB[id].data = [];
            this.word_DB[id].data.push(obj.data);
            return 1

            // if obj doesn't exist
            // then return null
        } else if (obj==null) {
            return null;
        }

    },

    w: function(val, del) {
        return this.wordIndex(val, del);
    },

    searchWord: function(val) {
        var list = [];

        var arr = val.split(/\W|_/);

        for (var i in arr) {
            var word = arr[i];
            if (word.trim()=="") continue;
            if (i<1) {
                for (var k in this.word_DB) {
                    if (k.indexOf(word)== 0) {
                        var obj = this.word_DB[k].data;
                        for (var x in obj) {
                            list.push(obj[x])
                        }
                        //list.push(this.word_DB[k]);
                    }
                }
            } else {

              //console.log(list);

                var templist = list;
                var newlist = [];

                for (var j=0; j<templist.length; j++) {
                    var obj = templist[j];

                    var senobj = this.sentences[obj.s];
                    var firstword = senobj.word[parseInt(obj.pos)];
                    var firstwordIndex = senobj.sen.indexOf(firstword);

                    var newsentence = senobj.sen.substring(firstwordIndex+firstword.length+1, senobj.sen.length);

                    //console.log(word);
                    if (newsentence.indexOf(word)==0) {
                        newlist.push(obj);
                        break;
                    }


                }
                list = newlist;
            }
        }
        console.log(list);

        return list;
    },

    getURLVars: function() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },

    loadFile: function(filename) {
        var oRequest = new XMLHttpRequest();
        var sURL = "http://"+ self.location.hostname + "/faq/requested_file.htm";

        oRequest.open("GET",filename,false);
        oRequest.setRequestHeader("Chrome",navigator.userAgent);
        oRequest.send(null)

        if (oRequest.status==200) {
            var text =  oRequest.responseText;
            //console.log(text);
            return text;
        }
        else alert("Error executing XMLHttpRequest call!");
    }

})