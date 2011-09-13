
/**
 * Returns string supplemented by zeros to form n-digit number
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method toDigits
 * @param {Integer} n Digits to return
 * @return {String} Stringified number
 */
Number.prototype.toDigits = function(n) {
	var d = '';
	while(this < Math.pow(10, --n))d += '0';
	return d + this
}

/**
 * Applies function to all varieties of arrays
 * much like SQL CROSS JOIN function
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method cross
 * @param {Array} arg Array in case of table column
 * @return {Function} This function will call 'this' to each join
 */
Function.prototype.cross = function(arg) {
	var me = this;
	return function(stack) {
		for(var i = 0, l = arg.length; i < l; i++)
			me([].concat(arg[i], stack || []))
	}
}

/**
 * Returns keys of object
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method keys
 * @return {Array} Keys array of object
 */
Object.prototype.keys = function() {
	var p, arr = [];
	for (p in this)
		this.hasOwnProperty(p) && arr.push(p);
	return arr
}

/**
 * Implementation of forEach method of array
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method each
 * @param {Function} fn Function applied to each element of object
 * @return {Undefined} Returns nothing
 */
Array.prototype.each = function(fn) {
    for(var i=0, l = this.length; i < l; i++)
		fn.call(this[i], i, this[i])
}

/**
 * Implementation of forEach method of object
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method each
 * @param {Function} fn Function applied to each element of array
 * @return {Undefined} Returns nothing
 */
Object.prototype.each = function(fn) {
	var p, i = 0;
    for(p in this)
		this.hasOwnProperty(p) &&
		fn.call(this[p], p, this[p], i++)
}

/**
 * Returns this if this contains argument string or '' if not
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method has
 * @param {String} substring String to search
 * @return {String} Source string or void string
 */
String.prototype.has = function(substring) {
	return this.indexOf(substring) + 1 ? this : ''
}

/**
 * Useful when toString() of object called by default, such as [].join()
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method toString
 * @return {String} outerHTML property of DOM element
 */
HTMLElement.prototype.toString = function() {
	return this.outerHTML
}

/**
 * Draw a grid to canvas with given interval
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method grid
 * @param {Float} size Grid interval in pixels
 * @return {Undefined} Returns nothing
 */
CanvasRenderingContext2D.prototype.grid = function(size) {
	var x, y;
	this.save();
	this.setTransform(1,0,0,1,0,0);
	this.fillStyle = 'rgba(0,0,0,.2)';
	for(x = 0; x < width; x++)
		for(y = 0; y < height; y++)
			if(x%size==0 || y%size==0)
				this.fillRect(x, y, 1, 1);
	this.restore()
}

/**
 * Draw a polygon with given parameters
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method polygon
 * @param {Float} x Abscissa of polygon center point
 * @param {Float} y Ordinate of polygon center point
 * @param {Float} R Radius of inscribed circle
 * @param {Integer} dim Number of polygon dimensions
 * @param {Float} angle Rotate polygon around it's axis to given angle
 * @param {Boolean} outer True changes circle to described instead of inscribed
 * @return {Undefined} Returns nothing
 */
CanvasRenderingContext2D.prototype.polygon = function(x, y, R, dim, angle, outer) {
	if (!R || !dim) return;
	var i, beta, alpha = 2*Math.PI/Math.abs(dim);
	if (outer) R = R / Math.cos(alpha/2);
	this.moveTo(x + Math.cos(angle || 0)*R, y + Math.sin(angle || 0)*R);
	for(i = 0, beta = alpha + angle; i < dim; i++, beta += alpha)
	this.lineTo(Math.cos(beta)*R, Math.sin(beta)*R);
}

/**
 * Supplements both sides of string with given
 * if argument is html tag, output string will be outerHTML of this tag
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method wrap
 * @param {String} str String-wrapper
 * @return {String} Wrapped string
 */
String.prototype.wrap = function(str) {
	return str + this + (/<\w+[^>]*>/.test(str) ? str.replace(/<(\w+).*/,'</$1>') : str)
}

/**
 * Converts html form element to object
 * which can be simply converted to JSON or URI component
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method toObject
 * @return {Object} Hash with {name: value} format
 */
HTMLFormElement.prototype.toObject = function() {
	var i, obj = {};
	for(i = this.elements.length; i--; )
		this.elements[i].type == 'submit' ||
		(obj[this.elements[i].name] = this.elements[i].value);
	return obj
}

/**
 * Converts object to URI component
 *
 * @author dec7144cbef9325858fb6a20a4c2e16c
 * @method serialize
 * @return {String} Encoded URI component
 */
Object.prototype.serialize = function() {
	var p, arr = [], e = encodeURIComponent;
	for(p in this)
		this.hasOwnProperty(p) &&
		arr.push( e(p) + '=' + e(this[p]) );
	return arr.join('&')
}