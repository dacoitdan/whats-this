/**
 * Set-up
 */

if (typeof window === 'undefined') {
    global.whatsThis = whatsThis;
} else {
    global = window;
}

var obj = {
    id: 'object',
    whatsThis: whatsThis,
    inner: {
        id: 'inner-object',
        whatsThis: whatsThis
    }
};

var tricky = {
    id: 'tricky'
};

var location = {
    state: 'Alaska',
    city: 'Anchorage'
};

function whatsThis() {
    console.log('This is...', this);
    return this;
}

function Ctor() {
    this.id = 'constructor';
    whatsThis.call(this);
}

Ctor.whatsThis = whatsThis;

Ctor.prototype.whatsThis = whatsThis;



/**
 * Exercises
 */

var ex;

// Exercise 1

//prints out global object. without any context, this is just the global.

ex = whatsThis();

console.assert(ex === global);

// Exercise 2

//prints global object. in this case, it's being called from global, and this is global

ex = global.whatsThis();

console.assert(ex === global);

// Exercise 3

// prints out the contents of the obj object. the method was assigned to obj, and within that context, this is obj

ex = obj.whatsThis();

console.assert(ex === obj);

// Exercise 4

// prints out contents of obj-inner. same as before, but it's a method that is being called from the context of obj-inner

ex = obj.inner.whatsThis();

console.assert(ex === obj.inner);

// Exercise 5

// appears same as ex4, should print out contents of obj-inner

ex = obj.inner.whatsThis();

console.assert(ex === obj.inner);

// Exercise 6

//prints out global object. it's being called bound to nothing and with no argument, so this = global

ex = whatsThis.call(null);

console.assert(ex === global);

// Exercise 7

// prints out contents of location object. the this value location is being passed in, so this = location.

ex = whatsThis.call(location);

console.assert(ex === location);

// Exercise 8

// prints out contents of tricky object. same as before, but using apply instead of call.

ex = whatsThis.apply(tricky);

console.assert(ex === tricky);

// Exercise 9

// prints out contents of the Ctor() constructor. when Ctor() is used, it runs whatsthis on itself.

ex = Ctor();

console.assert(ex === Ctor());

// Exercise 10

// prints out the contents of Ctor's prototype.

ex = Ctor.prototype.whatsThis();

//console.assert(ex === Ctor());
//console.assert(ex === Ctor);
//console.assert(ex === new Ctor().protoype);
//console.assert(ex === Ctor.__proto__);
console.assert(ex === Ctor.prototype);

// Exercise 11

// prints out the contents of newObject, which is a newly created instance of the Ctor(). this is because a new Ctor is being made with the new keyword, and this refers to the created object, whichever it is

var newObject = ex = new Ctor();

console.assert(ex === newObject);

// Exercise 12

// again, prints out contents of newObject, for the same reason as before.

ex = newObject.whatsThis();

console.assert(ex === newObject);

// Exercise 13

// prints out contents of tricky. even though whatsthis is being called off of obj, the passed in this value of tricky overrides that.

ex = obj.whatsThis.call(tricky);

console.assert(ex === tricky);

// Exercise 14

// prints out contents of obj.inner. in this case, the this was specifically bound to obj-inner before the call is made, so that takes precedence.

ex = whatsThis.bind(obj.inner).call(location);

console.assert(ex === obj.inner);


