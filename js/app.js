// $(document).foundation();

var searchGit = require("./lib/octo");


$('.keyword__item').on("click",function(){
    
    var $this = $(this);
    var keyword = $this.text();
    //console.log(keyword);
    
    //stick the hover style on the selected keyword
    $('div.search input').removeClass("selected");
    $this.siblings().removeClass("selected");
    $this.addClass("selected");
    
    $('div.search input').val('');
    searchGit(keyword);
});

$('div.search input').on("keyup",function(e){
    
    var $this = $(this);
    var keyword = $this.val();
    // console.log(keyword);
    
    if (keyword){

        if (e.keyCode === 13) {
            //remove any previous keyword selection style
            $(".keyword").children().removeClass("selected");
            
            $this.addClass("selected");

            searchGit(keyword);
        }
    }
    else {
        // console.log("empty");
        $this.removeClass("selected");
    }

});