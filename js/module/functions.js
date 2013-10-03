/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 9/26/13
 * Time: 10:45 AM
 * To change this template use File | Settings | File Templates.
 */

"use strict";

function replaceURLs(string) {
    return string.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g,
        function(url) {
            return "<a target=\"_blank\" href=\""+url+"\">"+url+"</a>";
            //var a = createElement("a", "", [], {"href": url, "target":"_blank"});
            //a.appendChild(url);
        });
}

// capFirst = capitalize first letter of string
function capFirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// create a random id string of a specified length
function makeID(length){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// santize input as a number input
function toStringNum(num) {
    var possible = "0123456789./ ";
    for (var i in num) {
        var flag = false;
        for (var j in possible) {
            if (num[i]==possible[j]) {
                flag=true;
                break;
            }
        }
        if (!flag) {
            num = num.slice(0,i)+num.slice(i, num.length-1);
        }
    }
    return num;
}

function toFloat(str) {
    var arr = str.split(" ");
    var num = 0;

    for (var k in arr) {
        var x = arr[k];
        if (x.indexOf("/") == -1) {
            num += parseFloat(x);
        } else {
            var arr3 = x.split("/");
            var x2 = parseFloat(arr3[0]);
            for (var i=1; i<arr3.length; i++) {
                x2 = x2/parseFloat(arr3[i]);
            }
            num += x2;
        }

    }
    return num;
}


// create an element and appends it to parent. Must have id
function saveElement(parent, el, id, classes, attributes){
    try {
        var element = createElement(el, id, classes, attributes);
        parent.append(element);
        return $(el+"#"+id);
    } catch(e) {
        console.error(e.stack)
    }
}

// creates an elements and appends it after a sibling. Must have id
function saveElementAfter(before, el, id, classes, attributes) {
    try {
        var element = createElement(el, id, classes, attributes);
        before.after(element);
        return $(el+"#"+id)
    } catch (e) {
        console.error(e.stack)
    }

}

// checks element if within a specified area
function withinArea(x, y, x2, y2, area) {

    if (((x>=x2-area) && (x<=x2+area)) && ((y>=y2-area) && (y<=y2+area))) {
        return true
    } else {
        return false
    }

}

// create a br element
function br(){
    return createElement('br');
}

// create an element
function createElement(el, id, classes, attributes) {
    var element = document.createElement(el);
    // add id
    if (id) element.id = id;
    // add classes
    if (classes) {
        for (var classname in classes) {
            element.classList.add(classes[classname]);
        }
    }
    // add other attributes
    if (attributes) {
        var key;
        for (key in attributes) {
            var value = attributes[key];
            if (key == 'textContent') {
                element.textContent = value;
            }
            else {
                element.setAttribute(key, value);
            }
        }
    }
    return element;
}