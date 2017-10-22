this.Documents = new Mongo.Collection("documents");
this.EditingUsers = new Mongo.Collection("editingusers");

if (Meteor.isClient) {
// find the first document in the Documents colleciton and send back its id
  Template.editor.helpers({
    docid:function(){
      var doc = Documents.findOne();
      if (doc){
        return doc._id;
      }
      else {
        return undefined;
      }
    }, 
    // template helper that configures the CodeMirror editor
    // you might also want to experiment with the ACE editor
    config:function(){
      return function(editor){
        editor.setOption("mode", "html");
        editor.on("change", function(cm_editor, info){
          //console.log(cm_editor.getValue());
          $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
          Meteor.call("addEditingUser");
        });        
      }
    }, 
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // startup code that creates a document in case there isn't one yet. 
    if (!Documents.findOne()){// no documents yet!
        Documents.insert({title:"my new document"});
    }
  });

  Meteor.methods({
    addEditingUser:function(){
      EditingUsers.insert({user:"Tomy"});
    }
  })
}
