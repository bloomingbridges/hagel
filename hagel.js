
Wikis = new Meteor.Collection("wikis");

if (Meteor.isClient) {

  window.onload = function() {

    Editor = function(input, preview) {
      this.update = function() {
        preview.innerHTML = markdown.toHTML(input.innerText);
        var myId = Wikis.findOne();
        if (myId && myId._id)
          Wikis.update(myId._id, {$set: {content: input.innerText}} );
      }
      input.editor = this;
      this.update();
    }

    var input = document.getElementById('documentBody');
    var editor = new Editor(input, document.getElementById('preview'));
    input.onkeypress = editor.update;

    // Session.set("current_wiki", this._id);
    
  }

  Template.meta.title = function () {
    var wiki = Wikis.findOne();
    return wiki && wiki.title;
  };

  Template.wiki.content = function () {
    var wiki = Wikis.findOne();
    return wiki && wiki.content;
  };

  Template.meta.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        document.getElementById('documentBody').innerText = ""
        // console.log("You pressed the button, sucker");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Wikis.find().count() === 0) {
      Wikis.insert({title: "Mein Wiki", content: "Lorem ipsum dolor sit amet.."});
    }
  });
}
