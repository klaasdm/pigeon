/**
 * @author kd322
 */

Contact = {};
Contact.view = Ti.UI.createView();

Contact.init = function(){

var contactView = Titanium.UI.createLabel({
    text:'contactView',
      height:'auto',
    width:'auto',
    color:'000000',
    font:{fontSize:120},
    textAlign:'center'
});




	Contact.view.add(contactView);
}