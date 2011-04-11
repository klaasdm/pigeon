var win = Ti.UI.currentWindow;
Ti.include('../data/DataAccess.js');
Ti.include('../model/pdf.js');
var window = Titanium.UI.currentWindow;
var rowData = [];
parent = Ti.Filesystem.applicationDataDirectory;
var da = new DALists();

var detailView = Titanium.UI.createScrollView({
    top: 0,
    left: 0,
    contentWidth: "auto",
    contentHeight: "auto"
});

var tableview = Titanium.UI.createTableView({
    top: 390,
    width: "100%",
	height: 600,
    backgroundColor: '#f7f8f8',
    data: rowData,
	scrollable:false,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

tableview.addEventListener('click', function(e){

    if (e.row.listBool == 'false') {
    
        var foldername = e.row.listId;
        var filename = e.row.title;
        
        
        
        var ind = Titanium.UI.createProgressBar({
            width: 200,
            height: 20,
            min: 0,
            max: 1,
            left: 90,
            value: 0,
            style: Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
            top: 40,
            font: {
                fontSize: 12,
                fontWeight: 'bold'
            },
            color: '#888'
        });
        e.row.add(ind);
        ind.show();
        
        ind.value = 0;
        c = Titanium.Network.createHTTPClient();
        c.setTimeout(10000);
        c.onload = function(){
        
            var d = new Date();
            var Pdate = d.getDay() + '-' + d.getDay() + '-' + d.getFullYear();
            
            ind.hide();
            da.updatePdfList(filename);
            da.insertNotesList(foldername, filename, Pdate, 'PDF');
            Ti.App.fireEvent('courseClicked', {
                courseId: e.row.listId
            });
            
            
        };
        c.ondatastream = function(e){
            ind.value = e.progress;
            Ti.API.info('ONDATASTREAM1 - PROGRESS: ' + e.progress);
        };
        c.onerror = function(e){
            Ti.API.info('XHR Error ' + e.error);
        };
        var pdfFolder = Titanium.Filesystem.getFile(parent + '/files/');
        if (!pdfFolder.exists()) {
            pdfFolder.createDirectory();
        }
        
        var new_folder = Titanium.Filesystem.getFile(parent + '/files/' + foldername);
        if (!new_folder.exists()) {
            new_folder.createDirectory();
        }
        var new_folder = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + filename);
        if (!new_folder.exists()) {
            new_folder.createDirectory();
        }
        var dfo = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + filename + '/temp');
        if (!dfo.exists()) {
            dfo.createDirectory();
        }
        var dfo = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + filename + '/thumbnail');
        if (!dfo.exists()) {
            dfo.createDirectory();
        }
        c.open('GET', 'http://klaasdm.be/cambridge/' + filename);
        var new_pdf = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + filename, filename);
        if (!new_pdf.exists()) {
            c.file = Titanium.Filesystem.getFile(parent + '/files/' + foldername + '/' + filename, filename);
            
        }
        
        c.send();
        
    }
    
});

detailView.add(tableview);

Ti.App.addEventListener('courseClicked', function(data){

    rowData = [];
    lists = da.getPdfLists(data.courseId);
    
    for (var i = 0; i < lists.length; i++) {
    
        var Pdf = lists[i];
        
        var listRow = Titanium.UI.createTableViewRow({
            title: Pdf.getName(),
            height: 80,
            listBool: Pdf.getBool(),
            listId: Pdf.getS_id(),
            color: '#fff',
            borderColor: '#000',
        
        });
        //List title
        var title = Ti.UI.createLabel({
            color: '#323639',
            font: {
                fontSize: 20,
                fontWeight: 'bold'
            },
            top: 13,
            left: 10,
            height: 20,
            width: 300,
            text: Pdf.getName()
        
        });
        
        var bool = Ti.UI.createLabel({
            color: '#323639',
            font: {
                fontSize: 14,
                fontWeight: 'light'
            },
            top: 40,
            left: 30,
            width: 100,
            height: 14,
            text: Pdf.getBool()
        
        });
        
        
        listRow.add(title, bool);
        rowData.push(listRow);
        
    };
	
	tableview.setData(rowData);
    detailView.contentHeight = 'auto';
	
    });
