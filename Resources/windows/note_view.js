/**
 * @author kd322
 */
var win = Ti.UI.currentWindow;
var draw = true;
var text = false;
var remove = false;
var x;
var y;
var drawView = Ti.UI.createView({

    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
});

Ti.App.addEventListener('noteView', function(e){
    var picturename = e.picturename;
	var imagename = e.imagename;
    var foldername = e.foldername;
	var foldernamer = e.foldernamer;
    Titanium.Painter = require('ti.paint');
    var painter = Titanium.Painter.createView({
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        strokeWidth: 20,
        strokeColor: '#2a81df',
        backgroundImage: picturename
    
    });
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
    var blueView = Ti.UI.createView({
        bottom: 20,
        width: 40,
        height: 40,
        backgroundColor: 'blue'
    });
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
    
    var btnClear = Titanium.UI.createButton({
        title: 'Clear',
        height: 35,
        bottom: 10,
        left: 100,
        width: 150
    
    });
    var btnSave = Titanium.UI.createButton({
        title: 'save',
        height: 35,
        bottom: 60,
        left: 100,
        width: 150
    
    });
    var btnBack = Titanium.UI.createButton({
        title: 'back',
        height: 35,
        bottom: 110,
        left: 100,
        width: 150
    
    });
    var btnText = Titanium.UI.createButton({
        title: 'write',
        height: 35,
        bottom: 110,
        left: 250,
        width: 150
    
    });
    var btnDraw = Titanium.UI.createButton({
        title: 'draw',
        height: 35,
        bottom: 60,
        left: 250,
        width: 150
    
    });
    var btnHighlight = Titanium.UI.createButton({
        title: 'highlight',
        height: 35,
        bottom: 10,
        left: 250,
        width: 150
    
    });
    var ta1 = Titanium.UI.createTextArea({
        value: 'I am a textarea',
        height: 150,
        font: {
            fontSize: 20,
            fontFamily: 'Marker Felt',
            fontWeight: 'bold'
        },
        color: '#888',
        textAlign: 'left',
        appearance: Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 5,
        backgroundColor: 'transparent',
        text: 'type text',
        suppressReturn: false
    
    });
    btnText.addEventListener('click', function(){
        draw = false;
        text = true;
        painter.strokeColor = 'transparent';
        
    });
    btnDraw.addEventListener('click', function(){
        draw = true;
        text = false;
        painter.lineOpacity = 1;
    });
    btnHighlight.addEventListener('click', function(){
        painter.lineOpacity = 0.2;
    });
    drawView.addEventListener('touchend', function(e){
    
        if (text == true && e.x != null && e.y != null) {
            y = e.y;
            ta1.setTop(e.y);
            ta1.setLeft(e.x);
            ta1.setRight(10);
            painter.add(ta1);
            painter.top -= y - 10;
            var myTimer;
            myTimer = setInterval(function(){
                ta1.focus();
                Ti.API.info('test');
                clearInterval(myTimer);
                text = false;
                remove = true;
            }, 10);
            
        };
            });
    
    blueView.addEventListener('touchend', f);
    redView.addEventListener('touchend', f);
    blackView.addEventListener('touchend', f);
    drawView.add(painter, blueView, redView, blackView, btnBack, btnClear, btnSave, btnDraw, btnText, btnHighlight);
    
    
    btnSave.addEventListener('click', function(){
    
        var theMap = painter.toImage();
        var thumbnail = painter.toImage();
        thumbnail = thumbnail.imageAsThumbnail(100);
        var d = new Date();
        var ft = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + foldernamer + '/thumbnail', imagename);
        ft.write(thumbnail);
        var f = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + foldernamer, imagename);
        f.write(theMap);
        
        var Pdate = d.getDay() + '-' + d.getDay() + '-' + d.getFullYear();
        da.insertNotesList(foldername, imagename, Pdate, 'DRAWNOTE');
       
        Ti.App.fireEvent('CloseNotes', {});
        Ti.App.fireEvent('Scroll', {});
    });
    
    btnClear.addEventListener('click', function(){
        painter.clear();
        var dfostart = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + foldernamer + '/temp');
        var fidstart = dfostart.getDirectoryListing();
        fidstart = fidstart.splice(1, fidstart.length - 1);
        painter.setBackgroundImage(parent + '/files/' + foldername + '/' + foldernamer + '/temp/' + fidstart[0]);
    });
    
    btnBack.addEventListener('click', function(){
    
        var dfo = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + foldernamer + '/temp');
        var fid = dfo.getDirectoryListing();
        fid = fid.splice(1, fid.length - 1);
        var lengte = fid.length - 1;
        Ti.API.info(lengte);
        if (lengte != 0) {
            var lengte2 = lengte - 1;
            painter.clear();
            painter.setBackgroundImage(parent + '/back.png');
            painter.setBackgroundImage(parent + '/files/' + foldername + '/' + foldernamer + '/temp/' + fid[lengte2]);
            var file = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + foldernamer + '/temp/' + fid[lengte]);
            file.deleteFile();
            
        }
        
    });
    painter.addEventListener('touchend', function(e){
    
        if (remove == true) {
            painter.top += y - 10;
            ta1.blur();
            saveTemp();
            ta1.setValue('I am a textarea');
            painter.remove(ta1);
            remove = false;
            var dfo = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + foldernamer + '/temp');
            var fid = dfo.getDirectoryListing();
            fid = fid.splice(1, fid.length - 1);
            var lengte = fid.length - 1;
            if (lengte != 0) {
            
                painter.clear();
                painter.setBackgroundImage(parent + '/back.png');
                painter.setBackgroundImage(parent + '/files/' + foldername + '/' + foldernamer + '/temp/' + fid[lengte]);
                
                
            }
        }
        
        if (draw == true) {
            saveTemp();
        }
    });
    
    function saveTemp(){
        var dfo = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + foldernamer + '/temp');
        var fid = dfo.getDirectoryListing();
        if (fid != null) {
            fid = fid.splice(1, fid.length - 1);
            var lengte = fid.length - 1;
            var theMap = painter.toImage();
            var d = new Date();
            var filename = d.getTime() + ".png";
            var f = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + foldernamer + '/temp', filename);
            f.write(theMap);
            if (lengte != -1) {
                painter.setBackgroundimage(parent + '/files/' + foldername + '/' + foldernamer + '/temp/' + fid[lengte]);
                
            }
        }
    }
});

Ti.App.addEventListener('rotate', function(e) 
{
     tableview.width = '100%';
});

