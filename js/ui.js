/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 9/26/13
 * Time: 10:42 AM
 * To change this template use File | Settings | File Templates.
 */

"use strict";

var viewerUI = Class.extend({
    init: function(parent) {
        this.parent = parent;
        this.windows = [];
        this.run();
    },

    run: function() {
        var acp = new AutoComPaste(this.parent, 0, 0);

        var win_width = $(document).width();
        var win_height = $(document).height();

        for (var art in vD.article) {
            var artobj = vD.article[art];
            var filename = artobj.filename;
            var arrfile=filename.split(/\W|_/);
            var name = "";

            for (var n in arrfile) {
                name += arrfile[n]+"_"
            }

            name += "window";

            var posx = Math.random()*(win_width-500);
            var posy = Math.random()*(win_height-400);

            this.windows.push(new windowArticles(this.parent, name, posx, posy, art));
        }


    }

});