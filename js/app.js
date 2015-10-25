$(document).foundation();
var Octokat = require('octokat');

var data = require("./lib/data");
var ReposBoardView = require("./lib/repos-board-view");

var git = $('#git');
var user = "noratop";


$.fn.offScreen = function(){
    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();
    var bounds = {};
    bounds.top = this.offset().top;
    bounds.bottom = bounds.top + this.outerHeight();
    return ((bounds.top <= viewport.top) || (bounds.bottom >= viewport.bottom));
}


$('.keyword__item').on("click",function(){
    
    var $this = $(this);
    var keyword = $this.text();
    //console.log(keyword);
    
    //stick the hover style on the selected keyword
    $this.siblings().removeClass("selected");
    $this.addClass("selected");
    
    //Setup the gitHub API instance
    var octo = new Octokat({
        username:"noratop",
        password:"raspig84"
    });
    
    var repos = octo.search('repositories');
    
    //var search contains the search definition for the API request
    var qualifiers = keyword +" user:"+user+" fork:true";
    var search = {
        q: qualifiers,
        sort : "updated",
        order: "asc"
    };
    
    //search a callback (if not given -> Promises) and a config that is passed through toQueryString
    repos.fetch(search)
    .then(function(result) {
        
        var reposCollection = new data.RepoCollection(result.items,{
            octo: octo,
            keyword: keyword,
            user: user
        });
        
        var repos = new ReposBoardView({
            collection: reposCollection
        });
        
        if(!$.trim(git.html())) {git.append(repos.render().$el);}
        else {
            var initialScroll = $(window).scrollTop();
            var board = git.find(".git-board");
            board.replaceWith(repos.render().$el);
            
        }
        
        if (git.offScreen()){
            $('body').animate({scrollTop: $(".keyword").offset().top - 5},'1000');
        }
    });
});