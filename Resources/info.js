/**
 * @author kd322
 */

Info = {};
Info.view = Ti.UI.createView();


Info.init = function(){

	
var infoView = Titanium.UI.createLabel({
    text:'infoView',
    height:'auto',
    width:'auto',
    color:'000000',
    font:{fontSize:120},
    textAlign:'center'
});




	Info.view.add(infoView);
}