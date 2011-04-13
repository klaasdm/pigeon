var win = Titanium.UI.currentWindow;
var detailViewOpen = true;
var pdfViewOpen = false;

Ti.include('../windows/detail_view.js');
Ti.include('../windows/pdf_view.js');
Ti.include('../windows/note_view.js')
Ti.include('../windows/image_view.js')
Ti.App.addEventListener('courseClicked', function(e){
    if (pdfViewOpen) {
        win.remove(pdfView);
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
    win.add(pdfView);
    detailViewOpen = false;
    pdfViewOpen = true;
    paper.zIndex = pdfView.zIndex + 1;
});
Ti.App.addEventListener('noteView', function(e){
    pdfView.hide();
    win.add(drawView);
    paper.zIndex = drawView.zIndex + 1;
});
Ti.App.addEventListener('imageView', function(e){
    pdfView.hide();
    win.add(imageView);
    paper.zIndex = imageView.zIndex + 1;
    
});
Ti.App.addEventListener('CloseNotes', function(e){
    pdfView.show();
    win.remove(drawView);
    paper.zIndex = pdfView.zIndex + 1;
});
Ti.App.addEventListener('CloseImage', function(e){
    pdfView.show();
    win.remove(imageView);
    paper.zIndex = pdfView.zIndex + 1;
});



win.add(detailView, paper);
