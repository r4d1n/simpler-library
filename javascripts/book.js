var Book = function(properties) { // constructor
  this.setProperties(properties); // called when instantiated
};

Book.prototype.getAge = function() { return new Date().getFullYear() - Number(this.year) }; 

Book.prototype.setProperties = function(properties) { 
 for(var att in properties){
  this[att] = properties[att];
 }
}

