/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 10/3/13
 * Time: 12:14 PM
 * To change this template use File | Settings | File Templates.
 */

// General functions
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
}