var bind_from_json = function(json){
    for(var i = 0; i < json.length; i++){
        if(typeof json[i].selector !== 'string'
            || typeof json[i].bind_to !== 'string'
            ||typeof json[i].func !== 'function'){
                throw 'Error in supplied JSON at index '+ i +
                '. Expects "Selector" as String, "Bind_to" as String and "Func" as Function';
        }
        else
            $(json[i].selector).bind(json[i].bind_to, json[i].func);
    }
}