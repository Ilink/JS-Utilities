var test = function(){
    $('body').append('hi!')
}

var json = [{
           'selector' : '#test',
           'bind_to' : 'click',
           'func' : [
				test, 
				test
				]
           },
           {
           'selector' : '#test2',
               'bind_to' : 'click',
               'func' : function(){
                   $('body').append('hello!')
               }
           }
];

$(document).ready(function()
{
    $('#open_box').click(function(){
        jsUtil.smallbox.init($('#content'));
    });
    jsUtil.bind_from_json(json)
});