Ti.include('../model/notes.js');
var da = new DALists();
var win = Ti.UI.currentWindow;
var pdfView = Ti.UI.createView({
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
});

Ti.App.addEventListener('fileOpenend', function(e){

    var foldername = e.id;
    var filetype = e.filetype;
    var filenamer = e.name;
    
    
    if (filetype == 'PDF') {
        var btnDrawNote = Titanium.UI.createButton({
            title: 'take note',
            height: 40,
            width: 200,
            top: 70,
            left: 50
        });
        
        var wv = Ti.UI.createWebView({
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
        });
        
        var f = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + filenamer, filenamer);
        wv.setUrl(f.nativePath);
        
        
        
        Ti.App.addEventListener('Scroll', function(e){
            scroller();
        });
        function scroller(){
        
            var scrollViewer = Ti.UI.createScrollView({
                contentWidth: 'auto',
                contentHeight: 'auto',
                width: "100%",
                height: 160,
                backgroundColor: '#ffffff',
                bottom: 0,
                showVerticalScrollIndicator: false,
                showHorizontalScrollIndicator: false,
            
            });
            
            
            pdfView.add(scrollViewer);
            lists = da.getImageLists();
            
            for (var i = 0; i < lists.length; i++) {
                var Notes = lists[i];
                var stickerImg = Titanium.UI.createImageView({
                    image: parent + '/files/' + foldername + '/' + filenamer + '/thumbnail/' + Notes.getName(),
                    width: 'auto',
                    height: 'auto',
                    left: i * 105,
                    stick_name: Notes.getName(),
                });
                stickerImg.addEventListener('click', add_stickers);
                stickerImg.addEventListener('doubletap', show_button);
                Ti.API.info(stickerImg)
                scrollViewer.add(stickerImg);
                pdfView.add(scrollViewer);
            }
            function add_stickers(e){
            
                Ti.App.fireEvent('noteView', {
                    foldername: foldername,
                    foldernamer: filenamer,
                    imagename: e.source.stick_name,
                    picturename: parent + '/files/' + foldername + '/' + filenamer + '/' + e.source.stick_name
                
                });
            }
            function show_button(e){
                var button = Titanium.UI.createButton({
                    title: 'Hello'
                });
				stickerImg.add(button);
                
            }
            
            
        };
        pdfView.add(wv, btnDrawNote);
        btnDrawNote.addEventListener('click', function(){
        
            var dfo = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + filenamer + '/temp');
            var fid = dfo.getDirectoryListing();
            if (fid != null) {
                fid = fid.splice(1, fid.length - 1);
                Ti.API.info(fid);
                
                for (var j = 0; j < fid.length; j++) {
                    var file = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + filenamer + '/temp/' + fid[j]);
                    file.deleteFile();
                }
            }
            var theMap = wv.toImage();
            var d = new Date();
            var filename = d.getTime() + ".png";
            
            var f = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + filenamer + '/temp/', filename);
            f.write(theMap);
            Ti.App.fireEvent('noteView', {
                foldername: foldername,
                foldernamer: filenamer,
                imagename: filename,
                picturename: parent + '/files/' + foldername + '/' + filenamer + '/temp/' + filename
            });
        });
    };
    
    scroller();
});

