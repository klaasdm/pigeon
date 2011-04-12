var win = Titanium.UI.currentWindow;
var detailViewOpen = true;
var pdfViewOpen = false;

Ti.include('../windows/detail_view.js');
Ti.include('../windows/pdf_view.js');
Ti.include('../windows/note_view.js')
Ti.include('../windows/text_view.js')
Ti.App.addEventListener('courseClicked', function(e){
    if (pdfViewOpen) {
        win.remove(pdfView);
    };
    win.add(detailView);
    pdfViewOpen = false;
    detailViewOpen = true;
});

Ti.App.addEventListener('fileOpenend', function(e){
    if (detailViewOpen) {
        win.remove(detailView);
    };
    win.add(pdfView);
    detailViewOpen = false;
    pdfViewOpen = true;
});
Ti.App.addEventListener('noteView', function(e){
    pdfView.hide();
    win.add(drawView);
});
Ti.App.addEventListener('imageView', function(e){
    pdfView.hide();
    win.add(imageView);
    
});
Ti.App.addEventListener('textView', function(e){
    pdfView.hide();
    win.add(textView);
    
});
Ti.App.addEventListener('CloseNotes', function(e){
    pdfView.show();
    win.remove(drawView);
    
});
Ti.App.addEventListener('CloseImage', function(e){
    pdfView.show();
    win.remove(imageView);
    
});



win.add(detailView);
