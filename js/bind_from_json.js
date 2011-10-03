/*------------------------------------------------------------------------------------
 *
 *  Bind from JSON - uses JSON to set up UI bindings. Utilizes jquery's 'bind'
 *  
 *  Usage:
 *  Supply JSON file formatted like this:
 *      var json = [{
 *          'selector' : '#id',
 *          'bind_to' : 'click',
 *          'func' : function
 *      }];
 *  Note that you can include any valid jquery selector or combination of selectors
 *  
 *  Changelog:
 *  
 *  Version 0.1: Initial commit
 *  
 -----------------------------------------------------------------------------------*/

var bind_from_json = function(json){
    for(var i = 0; i < json.length; i++){
        if(typeof json[i].selector !== 'string'
            || typeof json[i].bind_to !== 'string'
            || typeof json[i].func !== 'function'){
                throw 'Error in supplied JSON at index '+ i +
                '. Expects "Selector" as String, "Bind_to" as String and "Func" as Function';
        }
        else
            $(json[i].selector).bind(json[i].bind_to, json[i].func);
    }
}