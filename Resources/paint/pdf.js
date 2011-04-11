/**
 * @author kd322
 */
parent = Ti.Filesystem.applicationDataDirectory;

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

b1.addEventListener('click', function(){
    ind.value = 0;
    c = Titanium.Network.createHTTPClient();
    c.setTimeout(10000);
    c.onload = function(){
        Ti.API.info('IN ONLOAD ');
        
        var filename = 'test.pdf';
        var f = Titanium.Filesystem.getFile(parent + '/pdfs', filename);
        wv.setUrl(f.nativePath);
        
        
        
        win.add(wv);
    };
    c.ondatastream = function(e){
        ind.value = e.progress;
        Ti.API.info('ONDATASTREAM1 - PROGRESS: ' + e.progress);
    };
    c.onerror = function(e){
        Ti.API.info('XHR Error ' + e.error);
    };
    
    var new_folder = Titanium.Filesystem.getFile(parent, 'pdfs');
    if (!new_folder.exists()) {
        new_folder.createDirectory();
    }
    
    
    c.open('GET', 'http://st-hubertus.be/bertje.pdf');
    var new_pdf = Titanium.Filesystem.getFile(parent + '/pdfs', 'test.pdf');
    if (!new_pdf.exists()) {
        c.file = Titanium.Filesystem.getFile(parent + '/pdfs', 'test.pdf');
        
    }
    
    c.send();
});

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


var scrollViewer = Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 160,
    width: '768',
    height: 160,
    backgroundColor: '#c5c5c5',
    bottom: 0,
    showVerticalScrollIndicator: false,
    showHorizontalScrollIndicator: false,
    zIndex: 10
});
Ti.App.addEventListener('foo', function(data){
    win.remove(scrollViewer);
    scroller();
    Ti.API.info('scroller');
});
function add_stickers(e){
    Ti.API.info("Yay you clicked " + e.source.stick_name);
}

function scroller(){
    var fid = [];
    var dfo = Titanium.Filesystem.getFile(parent + '/thumbnail');
    fid = dfo.getDirectoryListing();
    fid = fid.splice(1, fid.length - 1);
    Ti.API.info(fid);
    
    for (var j = 0; j < fid.length; j++) {
    
        var stickerImg = Titanium.UI.createImageView({
            image: parent + '/thumbnail/' + fid[j],
            width: 'auto',
            height: 'auto',
            left: j * 105,
            stick_name: fid[j],
        });
        stickerImg.addEventListener('click', add_stickers);
        scrollViewer.add(stickerImg);
        Ti.API.info(stickerImg.stick_name);
        
    }
    Ti.API.info('niewe scrollViewer');
    win.add(scrollViewer);
    
};



win.open();

scroller();

