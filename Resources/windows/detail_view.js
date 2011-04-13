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
	backgroundColor: 'transparent',
    contentWidth: "100%",
    contentHeight: "auto"
});

var detailHeader = Titanium.UI.createView({
	top: 0,
	left: 0,
	right: 0,
	height: 120
});

var classIcon = Titanium.UI.createImageView({
	left: 30,
	top: 25,
	height: 61,
	width: 57,
	image: "../images/class_icon.png"
});

var classTitle = Ti.UI.createLabel({
    text: "Course",
    font: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    color: '#1f8dcd',
	textAlign: 'left',
	height: 35,
	width: 500,
	top: 30,
	left: 115
});

var classHour = Ti.UI.createLabel({
	text: "10:00 - 11:00",
	font: {
		fontSize: 14,
		fontWeight: 'regular'
	},
	color: '#21282c',
	height: 16,
	width: 300,
	left: 115,
	top: 70
});

var headerDivider = Ti.UI.createImageView({
	image: "../images/divider.png",
	widht: 768,
	height: 2,
	left: 0,
	bottom: 0
})

detailHeader.add(classIcon, classTitle, classHour, headerDivider);

var detailMap = Titanium.UI.createView({
	top:120,
	left: 0,
	right: 0,
	height: 280
});

var annotation = Titanium.Map.createAnnotation({
    latitude: 52.2015992,
    longitude: 0.1164893,
    title: "CARET",
    subtitle: 'Centre for Applied Research in Educational Technologies',
    animate: true,
	image: "../images/pin.png"
});

var cambridge = {
    latitude: 52.2015992,
    longitude: 0.1164893,
    latitudeDelta: 0.010,
    longitudeDelta: 0.018
};

var smallMap = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: cambridge,
    animate: true,
    regionFit: true,
    userLocation: false,
	touchEnabled: false,
	height: "100%",
	width: "100%",
    annotations: [annotation]
});

detailMap.add(smallMap);

var detailLecturer = Titanium.UI.createView({
	top: 400,
	left: 0,
	right: 0,
	height: 110
});

var lecturerDivider1 = Ti.UI.createImageView({
	image: "../images/divider.png",
	widht: 768,
	height: 2,
	left: 0,
	top: 0
})

var lecturerDivider2 = Ti.UI.createImageView({
	image: "../images/divider.png",
	widht: 768,
	height: 2,
	left: 0,
	bottom: 0
})

detailLecturer.add(lecturerDivider1, lecturerDivider2)

var tableview = Titanium.UI.createTableView({
    top: 510,
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

detailView.add(detailHeader,detailMap, detailLecturer, tableview);

Ti.App.addEventListener('courseClicked', function(data){

    rowData = [];
    lists = da.getPdfLists(data.courseId);
	
	var tableHeight= 70;
    
    for (var i = 0; i < lists.length; i++) {
    
        var Pdf = lists[i];
        
        var listRow = Titanium.UI.createTableViewRow({
            title: Pdf.getName(),
            height: 55,
            listBool: Pdf.getBool(),
            listId: Pdf.getS_id(),
            color: '#21282c',
            borderColor: '#000',
			backgroundColor: "#fff",
			selectedBackgroundColor: "#1f8dcd"
        
        });
        
        var bool = Ti.UI.createLabel({
            color: '#323639',
            font: {
                fontSize: 14,
                fontWeight: 'light'
            },
			textAlign: 'right',
            top: 13,
            right: 30,
            width: 100,
            height: 14,
            text: Pdf.getBool()
        
        });
		
		tableHeight += 55;
        
        listRow.add(bool);
        rowData.push(listRow);
        
    };
	
	tableview.height = tableHeight;
	tableview.setData(rowData);
    detailView.contentHeight = 'auto';
	
    });
