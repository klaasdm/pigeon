/**
 * @author kd322
 */
var win = Titanium.UI.currentWindow;
var textView = Ti.UI.createView({
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
});


var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'note.txt');
Ti.API.info('file = ' + f.name);
var contents = f.read();
Ti.API.info('file = ' + f);
var contentText = contents.text;
Ti.API.info('Content Text is: ' + contentText);
var len = contentText.length;
Ti.API.info('Content Text length is: ' + len);
 
for (var i=0; i<len; i++){
    Ti.API.info('Char ' + i + ' : ' + contentText.charAt(i));
}
