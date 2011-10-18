JS-Utilities
==============================

Useful! At least, they're useful to me. I'm currently adding/packaging scripts that I use in my day-to-day Javascript life. 

Smallbox
------------------------------
Very small Lightbox with no frills. 

Bind from JSON
------------------------------
Utilizes jQuery's 'Bind' function in conjunction with JSON. Simply setup a JSON file like so:

	var json = [{
	           'selector' : '#id',
	           'bind_to' : 'click',
	           'func' : [
	 				func1,
	 				func2
	 			]
	       }];

Or if you only want to bind to one function:

	var json = [{
	           'selector' : '#id',
	           'bind_to' : 'click',
	           'func' : func1
	       }];

Then call the bind function using your JSON:

	jsUtil.bind_from_json(json)
	
Alternatively, the JSON values could already exist on the page, perhaps in a hidden field. In that case, one could simply use jQuery to grab the data.