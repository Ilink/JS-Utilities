/*------------------------------------------------------------------------------------
 *
 *  Smallbox 0.1 - lightweight lightbox / modal window
 *  
 *  The script doesn't do a deep copy of the node, rather it moves the 
 *  node to a new position within the lightbox. This has the advantage of retaining any binds.
 *  Future versions may provide a deep copy option.
 *  
 *  Usage:
 *  supply the node you want to display in your lightbox: smallbox.init($('#test'));
 *  
 *  Changelog:
 *  
 *  Version 0.1: Initial commit
 *  
 -----------------------------------------------------------------------------------*/

smallbox = (function(){
    /*
     * Private Properties
     */
    //Yes I know multiple var declarations is technically a waste, but it's minimal and this is easier to read.
    var content;

    /*
     * Private Members
     */
    
    var create_box = function()
    {
        $('body').append("<div id='smallbox_container'><div id='smallbox'></div></div>");
        $(content).appendTo('#smallbox');
        $('#smallbox').prepend("<div id='smallbox_close'><img src='img/X.png'/></div>");
        $('#smallbox').children().show();
    }
    
    var create_overlay = function() //create the screen overlay
    {
        var height = $(document).height();
        var width = $(document).width();
        $('body').append(
            '<div id="smallbox_overlay" style="width:'+ width +'px; height:'+ height +'px;">&nbsp</div>'
        );
    }
    
    var _close = function() //the underscore represents a private function vs a public one to avoid confusion
    {
        $(content).hide();
        $(content).appendTo('body');
        $('#smallbox_container').remove();
        $('#smallbox_overlay').fadeOut('fast', function(){
            $(this).remove(); 
        });
    }
  
    var set_binds = function()
    {
        $('#smallbox_close').click(function()
        {
            _close();
        });
        
        $(document).keyup(function(e)
        {
            if(e.keyCode == '27'){
                _close();
            }
        });
    }
    
    //Public Members
    return {
        init:function(node)
        {
            content = node;
            create_overlay();
            create_box();
            set_binds();
        },
        close:function()
        {
            _close();
        }
    }
})();

$(document).ready(function()
{
    $('#open_box').click(function(){
        smallbox.init($('#content'));
    });
});