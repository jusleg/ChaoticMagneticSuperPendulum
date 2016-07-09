// Items which will store all the components in the dom
items = {};

/**
 * Root class. 
 * All other classes should inherit this class, or inherit a descendant of it.
 */
function Item(id){
console.log(id);
    // Ignore on undefined caused by uber
    if(id == undefined)
        return;

    // Mandatory variables
	this.id = id;
    // console.log(id);
    if(items[this.id] != undefined)
        alert("Duplicated id: " + this.id);
    else
	   items[this.id] = this;
}

/**
 * Use method() to add function
 */
Function.prototype.method = function (func) {
    this.prototype[func.name] = func;
    return this;
};

/**
 * Inherits method from parent
 */
Function.method(function inherits(parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    this.method(function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});

/** 
 * Get item from the global object `items`
 */
function getItem(id) {
	return items[id];
}

/**
 * To be implemented by the children classes
 */
Item.method(function construct(){
    // Nothing
});
