/*
 * Creates a paint view, and allows you to change colors.
 */
// open a single window

var window = Titanium.UI.currentWindow;
parent = Ti.Filesystem.applicationDataDirectory;
Titanium.Painter = require('ti.paint');

var new_folder = Titanium.Filesystem.getFile(parent, 'test');
if (!new_folder.exists()) {
    new_folder.createDirectory();
}

var kanker = Titanium.UI.createImageView({
    top: 10,
    left: 10,
    right: 10,
    height: 800

});
var dfostart = Titanium.Filesystem.getFile(parent + '/pdfimg');
var fidstart = dfostart.getDirectoryListing();
fidstart = fidstart.splice(1, fidstart.length - 1);


function eerstekeer(){


    var dfo = Titanium.Filesystem.getFile(parent + '/test');
    var fid = dfo.getDirectoryListing();
    fid = fid.splice(1, fid.length - 1);
    
    for (var j = 0; j < fid.length; j++) {
        var file = Titanium.Filesystem.getFile(parent + '/test/' + fid[j]);
        file.deleteFile();
    }
    
    
    
    var theMap = painter.toImage();
    var d = new Date();
    var filename = d.getTime() + ".png";
    var f = Titanium.Filesystem.getFile(parent + '/test', filename);
    f.write(theMap);
    
}

var painter = Titanium.Painter.createView({
    top: 10,
    left: 10,
    right: 10,
    height: 800,
    strokeWidth: 25,
    backgroundImage: parent + '/pdfimg/' + fidstart[0]


});

window.add(kanker, painter);

eerstekeer();

function f(e){
    painter.strokeColor = e.source.backgroundColor;
    
}

var redView = Ti.UI.createView({
    bottom: 20,
    left: 20,
    width: 40,
    height: 40,
    backgroundColor: 'red'
});
window.add(redView);
redView.addEventListener('touchend', f);

var blueView = Ti.UI.createView({
    bottom: 20,
    width: 40,
    height: 40,
    backgroundColor: 'blue'
});
window.add(blueView);
blueView.addEventListener('touchend', f);

var blackView = Ti.UI.createView({
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: 'black'
});
var blackView = Ti.UI.createView({
    bottom: 20,
    right: 30,
    width: 40,
    height: 40,
    
    backgroundColor: 'green'
});

var b1 = Titanium.UI.createButton({
    title: 'Clear',
    height: 35,
    bottom: 10,
    left: 100,
    width: 150

});
var b2 = Titanium.UI.createButton({
    title: 'save',
    height: 35,
    bottom: 60,
    left: 100,
    width: 150

});
var b3 = Titanium.UI.createButton({
    title: 'back',
    height: 35,
    bottom: 110,
    left: 100,
    width: 150

});


b1.addEventListener('click', function(){
    painter.clear();
    painter.setBackgroundImage(parent + '/back.png');
});
b2.addEventListener('click', function(){

    var theMap = painter.toImage();
    var thumbnail = painter.toImage();
    thumbnail = thumbnail.imageAsThumbnail(100);
    var d = new Date();
    var filename = d.getTime() + ".png";
    var f = Titanium.Filesystem.getFile(parent + '/test', filename);
    f.write(theMap);
    var ft = Titanium.Filesystem.getFile(parent + '/thumbnail', filename);
    ft.write(thumbnail);
    
    
    var dfo = Titanium.Filesystem.getFile(parent + '/pdfimg');
    var fid = dfo.getDirectoryListing();
    fid = fid.splice(1, fid.length - 1);
    var lengte = fid.length - 1;
    if (lengte != -1) {
        painter.clear();
        painter.setBackgroundImage(parent + '/back.png');
        var file = Titanium.Filesystem.getFile(parent + '/pdfimg/' + fid[lengte]);
        file.deleteFile();
        
    }
    
    window.close();
    Ti.App.fireEvent('foo', {
        name: 'scroller'
    });
});


b3.addEventListener('click', function(){

    var dfo = Titanium.Filesystem.getFile(parent + '/test');
    var fid = dfo.getDirectoryListing();
    fid = fid.splice(1, fid.length - 1);
    var lengte = fid.length - 1;
    Ti.API.info(lengte);
    if (lengte != 0) {
        var lengte2 = lengte - 1;
        painter.clear();
        painter.setBackgroundImage(parent + '/back.png');
        painter.setBackgroundImage(parent + '/test/' + fid[lengte2]);
        var file = Titanium.Filesystem.getFile(parent + '/test/' + fid[lengte]);
        file.deleteFile();
        
    }
    else {
        alert('going back is at his end');
        
    }
});
painter.addEventListener('touchend', function(e){
    var new_folder = Titanium.Filesystem.getFile(parent, 'test');
    if (!new_folder.exists()) {
        new_folder.createDirectory();
    }
    var dfo = Titanium.Filesystem.getFile(parent + '/test');
    var fid = dfo.getDirectoryListing();
    fid = fid.splice(1, fid.length - 1);
    var lengte = fid.length - 1;
    var theMap = painter.toImage();
    var d = new Date();
    var filename = d.getTime() + ".png";
    var f = Titanium.Filesystem.getFile(parent + '/test', filename);
    f.write(theMap);
    if (lengte != -1) {
        painter.setBackgroundimage(parent + '/test/' + fid[lengte]);
        
    }
    
});


window.add(blackView, b1, b2, b3);
blackView.addEventListener('touchend', f);

window.open();
