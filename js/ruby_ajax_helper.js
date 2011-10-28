var rails_ajax_helper = (function(){
    /*
     * polymorphism boiiiii
     * 
     */
    
    
    
    return{
        ajax:function(settings){
            var url = settings['url'];
            //adjust the url
            settings['url'] = url;
            return $.ajax(settings);
        }
    }
})();