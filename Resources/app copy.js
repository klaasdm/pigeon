Titanium.include("data/jsonDataRetriever.js");
parent = Ti.Filesystem.applicationDataDirectory;
Ti.API.info(parent);

var new_foldertje = Titanium.Filesystem.getFile(parent, 'thumbnail');
if (!new_foldertje.exists()) {
    new_foldertje.createDirectory();
}
var win = Ti.UI.createWindow({
    backgroundColor: 'white'
});

var noteWin = Ti.UI.createWindow({
    backgroundColor: 'white',
    url: 'note.js'
});

var ind = Titanium.UI.createProgressBar({
    width: 200,
    height: 50,
    min: 0,
    max: 1,
    value: 0,
    style: Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
    top: 10,
    message: 'Downloading ' + ('PDF') + ' File',
    font: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    color: '#888'
});

win.add(ind);
ind.show();
var wv = Ti.UI.createWebView({

    bottom: 0,
    left: 0,
    right: 0,
    top: 170
});
wv.addEventListener('scroll', function(e){
    Ti.API.info('wtf');
});
var b1 = Titanium.UI.createButton({
    title: 'openPdf',
    height: 40,
    width: 200,
    top: 70
});
var b2 = Titanium.UI.createButton({
    title: 'take note',
    height: 40,
    width: 200,
    top: 70,
    left: 50
});
win.add(b1, b2);
var c = null;



b2.addEventListener('click', function(){
    var theMap = wv.toImage();
    var d = new Date();
    var filename = d.getTime() + ".png";
    var new_foldertje = Titanium.Filesystem.getFile(parent, 'pdfimg');
    if (!new_foldertje.exists()) {
        new_foldertje.createDirectory();
    }
    var f = Titanium.Filesystem.getFile(parent + '/pdfimg', filename);
    f.write(theMap);
    noteWin.open();
});



Ti.App.addEventListener('foo', function(data){
    win.remove(scrollViewer);
    scroller();
    Ti.API.info('scroller');
});




win.open();

scroller();


