/**
 * Root class. 
 * All other classes should inherit this class, or inherit a descendant of it.
 */
function Item(){}

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
 * To be implemented by the children classes
 */
Item.method(function construct(){
    // Nothing
});
