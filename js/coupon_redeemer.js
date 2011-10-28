/*
 * input_highlights.init(jquery selectors, blacklist)
 *
 */


var input_highlights = (function(){
    //Private
    var self = this;
    //Public
    return{
        init:function(){
            
        }
    }
})();

ADSHARE.dux = (function()
{
    //private
    var self = this;
    
    
    //public
    return{
        init:function()
        {
            /* start by binding something to validate
             * 
             *
             *
             */
        }
    }
})();

ADSHARE.highlights = (function()
{
    //Private
    var self = this;
    
    //Public Interface
    return{
        display:function()
        {
            
        },
        add_child:function()
        {
            
        },
        hide:function()
        {
            
        }
    }
})();

ADSHARE.input_highlight = (function()
{
    //Private
    var self = this;
    var width;
    var height; // or do i not want this here/at all?
    
    //Public Interface
    return{
        display:function()
        {
            //$(node).show();
        },
        add_child:function()
        {
            return false;
        },
        hide:function()
        {
            
        }
    }
})();

ADSHARE.validate = (function()
{
    //Private
    var self = this;
    
    //Public Interface
    return{
        get_results:function(text_input, blacklist) //node is a jquery selector
        {
            //we only have one algoritihm to pick from
            //ordinarily we would use a variable or something to pick from several algorithms
            return ADSHARE.validate_algorithm.get_results(text_input, blacklist);
        }
    }
})();

ADSHARE.validate_algorithm = (function()
{
    //Private
    var self = this;
    var text;
    var blacklist;
    
    var invalid_chars = function()
    {
        var json_output = [];
        var spacebar = 32;//spacebar keycode
        var text_length = text.length;
        var temp_list = ['o'];
        
        for(var i=0; i < text_length; i++){
            var current_char = text.charAt(i); 
            var current_char_code = text.charCodeAt(i);
            
            if(jQuery.inArray(current_char, blacklist) > -1 && current_char !== 'undefined' || current_char_code == spacebar){
                $('body').prepend(i);
                json_output.push(
                   {
                       'start':i,
                       'end':i
                   }
                );
            }
        }
        return json_output;
    }
    
    //Public Interface
    return{
        get_results:function(text_input, _blacklist)
        {
            text = text_input;
            blacklist = _blacklist;
            return invalid_chars();
        }
    }
})();



//input.keyup(function()
//{
//    validate(this.text);
//})



function redeem(force)
{     
    var _data = $('#redeemer_form').serialize();
    if (force) {_data+="&force=1"};
    $.ajax({
            type: "POST",
            url: "/coupon_instances/redeemer",
            dataType: 'json',
            data: _data,
            success: function(data, textStatus, xmlHttpRequest) {
                    lablog(data);
                    try {
                            if(data.status=="1") {
                                    $('#redeemer_status').html("Coupon successfully redeemed");
                                    $("#redeemer_recently_entered").prepend("<br />").prepend($("#coupon_code").attr("value"));
                                    $("#redeemer_coupon_code").val("");
                                    $("#redeemer_coupon_code").focus();
                            } else {
                                if(data.field == 'code') {
                                        $('#redeemer_coupon_code').css("border", "1px solid #f78f1e");
                                } else if(data.field == 'passcode') {
                                        $('#passcode').css("border", "1px solid #f78f1e");
                                }

                                //give the user a chance to force redeem
                                if (data.errorCode == 2 || data.errorCode == 1) //redeemed or expired
                                {                      
                                    $.prompt(data.error + "<br/> You can still redeem by clicking \"Redeem\" below.",
                                            {
                                                buttons: { 
                                                        Redeem: true, 
                                                        Cancel: false 
                                                },
                                                callback:function(_ok,_message,_form){
                                                if (_ok) 
                                                {
                                                         redeem(true);
                                                }else
                                                {
                                                        $('#redeemer_status').html(data.error);
                                                }
                                            }
                                    });
                                }else
                                {
                                   $('#redeemer_status').html(data.error); 
                                }
                                $("#redeemer_coupon_code").select();
                            }
                    } catch(error) {
                            alert('There was a problem processing the request.');
                    }
                    $("#loader").hide();			
            },
            error: function(jqXHR, textStatus, errorThrown) {
               // alert("There was a problem processing the request: " + jqXHR);
                $("#loader").hide();
            }
    });
}

ADSHARE.measure_chars = (function()
{
    //Private Properties
    var self = this;
    var num_spaces;
    var space_width;
    var char_width;
    
    var current_string;
    var num_chars;
    var error_locations = [];
    
    //Private Methods
    var measure_length = function()
    {
        for(var i = 0; i < self.num_chars; i++){
            
        }
    }
    
    var count_spaces = function(char_code)
    {
        if(char_code == 32){
            self.num_spaces++;
//            width = 15;
        }
    }
    
    var init = function()
    {
        self.num_spaces = 0;
        self.space_width = 0;
        self.char_width = 0;
    }
    
    //Public Methods
    return{
        measure:function(string){
            self.init();
            self.current_string = string;
            self.current_string.toUpperCase();
            self.num_chars = self.current_string.length;
        }
    }
})();

/*
 * For now, this only does IE7. May implement more later but that's all we need.
 */
ADSHARE.browser = (function()
{
    //Private Properties
    var self = this;
    var ie7 = navigator.appVersion;
    ie7 = ie7.search("MSIE 7.0");
    //Private
    
    
    //Public
    return ie7;
})();


$(document).ready(function() 
{	
    var invalid = ADSHARE.validate.get_results('ofso',['o']);
    $('body').prepend(invalid[0].start);
    
    
    
    
    var ie7 = navigator.appVersion;
    ie7 = ie7.search("MSIE 7.0");
    var ignoreKey = [91,92,93];// We ignore the command key and similar
    var total_errors = 0;

    //check if this is the iPad
    var _useIpadFontFix = false;
    if (! $.browser.msie) 
    {
       var platform = navigator.platform;
            if (platform == "iPad") 
            {
                    _useIpadFontFix = true;
            };
    }

    function test_string(current_string)
    {
        var spacebar = 32; //spacebar keycode
        var num_spaces = 0;   //number of spacebar spaces
        var space_width = 0;   
        var ipadOffset = 0;
        //all characters are converted to uppercase (via CSS) when entered, so they must be converted here
        current_string = current_string.toUpperCase();
        for(var i=0; i < 6; i++){
                var current_char = current_string.charAt(i); 
                var current_char_code = current_string.charCodeAt(i);
                if(jQuery.inArray(current_char, chars) < 0 && current_char !== 'undefined' || current_char_code == spacebar){
                    jQuery('#redeemer_measure_width_current').text(current_char);
                    for(var j=0; j <= i; j++){
                        //spaces are tricky to measure. For instance 'O ' would only return width of 'O' whereas 'O O' includes the width of the space
                        //easier to take out all spaces and count them individually
                        if(current_string.charCodeAt(j) != spacebar){
                            jQuery('#redeemer_measure_width_total').append(current_string.charAt(j));
                        }
                    }

                    var total = jQuery('#redeemer_measure_width_total').width();

                    jQuery('#redeemer_measure_width_total').text('');

                    if(current_char_code == spacebar){
                        num_spaces++;
                        width = 15;
                    }
                    else{		
                        var width = jQuery('#redeemer_measure_width_current').width();								
                    }
                    if(num_spaces > 0){
                        space_width = 15 * num_spaces;
                    }

                    //6 pixels is the padding on the text box
                    var padding = 6;
                    if (_useIpadFontFix)
                        padding -=2; 
                    if (_useIpadFontFix && width>0){
                        width-=2;
                        padding -= (i*padding);
                    }  	
                    var margin_left = (total + space_width) - width + padding;

                    if(ie7 > 0)
                        margin_left = margin_left - 216;

                    jQuery('#redeemer_highlight_'+i).width(width);    
                    jQuery('#redeemer_highlight_'+i).css('margin-left', margin_left);
                    jQuery('#redeemer_highlight_'+i).show();

                    total_errors++;
                    $("#redeemer_warning").show();
                }
                else{
                    jQuery('#redeemer_highlight_'+i).hide();
                }
            }

        if(total_errors < 1){
                $("#redeemer_warning").hide();
            }
    }

    $("#redeemer_coupon_code").keyup(function(event) {
        var current_string = $("#redeemer_coupon_code").val();
                    test_string(current_string);			   
                    $('#redeemer_status').html("");
    });


    $('#redeemer_form').submit(function(event) {
            event.preventDefault(); // cancel form submission
            var _hasGoodLength = $("#redeemer_coupon_code").val().length >=6;//at least 6 characters long

            if (_hasGoodLength && total_errors<1) {
                    // reset styles
                    $(".input").each(function() { 
                            $(this).css("border", "1px solid black");
                    });
                    $("#loader").show();
                    $('#redeemer_status').empty();
                    redeem(false);
            }else
            {
               $('#redeemer_status').html("Invalid entry."); 
            }

            return false;
    });

    $('#redeemer_form').focus();
    
    
    
    
});