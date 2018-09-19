$(document).ready(function(){
    var ns = [];
    
    $('.name_col').each(function(index,value) {
        $(this).attr('id','name_col'+index); // let's separate headers
        ns[index] = true; //not sticky headers
    });
    
    var borders = [];// where on and off headers

    for (var i = 0; i < ns.length; i++) {
        var b =[];
        b[0] = $('#name_col'+i).offset().top-200; // const is empirically
        b[1] = typeof $('#name_col'+(i+1)).offset() != "undefined" ? $('#name_col'+(i+1)).offset().top-350 : 30000; // const is empirically near prev minus 100
        borders[i] = b;
    }

    /**
    *   fix and unfix headers
    * @var int index - header index
    * @var bool fix - fix or unfix
    * @return bool - current state of sticky
    */
    function fixhead(index,fix) {
        if (fix) {
            $('tr#name_col'+index+' *').css('position','sticky').css('top','40px');
            return false;
        } else {
            $('tr#name_col'+index+' *').css('position','').css('top','');
            return true;
        }
    }
    
    /**
    * onscroll check position and fixate headers
    */
    $(window).scroll(function(){
        let sp = $(window).scrollTop(); // scroll position
        for (var i = 0; i < ns.length; i++) {
            var inrange = ( sp > borders[i][0] && sp < borders[i][1] );
            if (ns[i]) {
                if ( inrange ) { // in the range and not sticky
                    ns[i] = fixhead(i,true);
                } 
            } else {
                // sticky
                if (!inrange) {
                    ns[i] = fixhead(i,false);
                }
            }
        }
    });
});

