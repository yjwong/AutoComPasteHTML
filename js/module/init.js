/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 9/26/13
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */

"use strict";

var vD = null;
var vUI = null;

var run = function(){
    var root = $("#Root");
    vD = new dataModel(root);
    vUI = new viewerUI(root);
}

$(document).ready(run);