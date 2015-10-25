var Backbone = require('backbone');
var _ = require("underscore");
var cardTemplate = require('raw!./card-view-template.ejs');

var cardView = Backbone.View.extend({
    template: _.template( cardTemplate ),
    model: null,
    tagName: 'li',
    className: 'git-board__card',
    render: function() {
        console.log(this.model);
        // if (this.model.get("fork")){
            var octo = this.model.octo;
            // var user = this.model.get("parent").owner.login;
            // var repoName = this.model.get("parent").name;
            
            // console.log(octo);
            // console.log(user);
            // console.log(repoName);
            // octo.repos(user,repoName).fetch().then(function(res){
            //     var fork = new data.Repo(res,{octo: octo});
            //     // return new cardView({model: repo}).render().$el;
            
            //     this.$el.html(this.template({
            //         repo: this.model,
            //         // fork: parent
            //     }));
            // })
            
        //     this.$el.html(this.template({repo: this.model}));

        // }
        // else
        // {
        //     this.$el.html(this.template({repo: this.model}));
        // }
        this.$el.html(this.template({repo: this.model}));
        return this;
    }
});

module.exports = cardView;