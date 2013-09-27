/**
 * Created with JetBrains PhpStorm.
 * User: tjmonsi
 * Date: 9/26/13
 * Time: 10:38 AM
 * To change this template use File | Settings | File Templates.
 */

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype


(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.C = function(){};

    // Create a new Class that inherits from this class
    C.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn){
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function C() {
            // All construction is actually done in the init method
            if ( !initializing && this.init )
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        C.prototype = prototype;

        // Enforce the constructor to be what we expect
        C.prototype.constructor = C;

        // And make this class extendable
        C.extend = arguments.callee;

        return C;
    };
})();

var Class = C.extend({
    init: function(){
        this._super(true);
    },
    close: function() {
        var res=null;
        try {
            for (var key in this) {
                if (this[key]==null) continue;
                if (key == "parent") continue;
                if (this[key].close!=null) {
                    //console.log(key);
                    //console.log(this[key]);
                    //res = this[key].close();
                    //if ((res==3) || (res==null)) throw new Error("Something went wrong at closing key: "+key);
                }
                if (this[key].empty!=null) this[key].empty();
                if (this[key].remove!=null) this[key].remove();
                if (key!="id") this[key]=null;
            }
            //res = vD.i(this.id, true);
            //if ((res==3) || (res==null)) throw new Error("Something went wrong at closing this element");

           // return res;

        } catch (e) {

            console.error(e.stack);
            console.log(vD);
            //log(e.stack.toString());
            return res;
        }

    },

    generalError: function(e) {
        console.error(e.stack);
        console.log(vD);
        //log(e.stack.toString());
    }
})
