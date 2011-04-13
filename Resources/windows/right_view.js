var win = Titanium.UI.currentWindow;
var detailViewOpen = true;
var pdfViewOpen = false;
var noteViewOpen = false;

Ti.include('../windows/detail_view.js');
Ti.include('../windows/pdf_view.js');
Ti.include('../windows/note_view.js')
Ti.include('../windows/image_view.js')
Ti.App.addEventListener('courseClicked', function(e){
    if (pdfViewOpen) {
        win.remove(pdfView);
        win.remove(drawView);
    };
    win.add(detailView);
    pdfViewOpen = false;
    detailViewOpen = true;
    paper.zIndex = detailView.zIndex + 1;
});

var paper = Ti.UI.createImageView({
	image: "../images/paper_rip.png",
	width: 890,
	height: 10,
	top: 0,
	left: 0,
	zIndex: detailView.zIndex + 1
});

Ti.App.addEventListener('fileOpenend', function(e){
    if (detailViewOpen) {
        win.remove(detailView);
    };
    if (noteViewOpen) {
        win.remove(drawView);
       
    };
    win.add(pdfView);
    pdfView.show();
    noteViewOpen = false;
    detailViewOpen = false;
    pdfViewOpen = true;
    paper.zIndex = pdfView.zIndex + 1;
});
Ti.App.addEventListener('noteView', function(e){
    Ti.API.info("NOTE VIEW OPENED");
    pdfView.hide();
    noteViewOpen = true;
    win.add(drawView);
    paper.zIndex = drawView.zIndex + 1;
});
Ti.App.addEventListener('imageView', function(e){
    Ti.API.info("IMAGE VIEW OPENED");
    pdfView.hide();
    noteViewOpen = true;
    win.add(imageView);
    paper.zIndex = imageView.zIndex + 1;
    
});
Ti.App.addEventListener('CloseNotes', function(e){
    pdfView.show();
    win.remove(drawView);
    noteViewOpen = false;
    paper.zIndex = pdfView.zIndex + 1;
});
Ti.App.addEventListener('CloseImage', function(e){
    pdfView.show();
    win.remove(imageView);
    paper.zIndex = pdfView.zIndex + 1;
});



win.add(detailView, paper);
