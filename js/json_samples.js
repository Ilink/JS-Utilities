var test = function(){
    $('body').append('hi!')
}

var json = [{
           'selector' : '#test',
           'bind_to' : 'click',
           'func' : test
           },
           {
           'selector' : '#test2',
               'bind_to' : 'click',
               'func' : function(){
                   $('body').append('hello!')
               }
           }
];