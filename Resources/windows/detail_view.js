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
    contentHeight: "auto",
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
    text: "",
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
	text: "00:00 - 00:00",
	font: {
		fontSize: 14,
		fontWeight: 'regular'
	},
	color: '#21282c',
	height: 16,
	width: 200,
	left: 115,
	top: 70
});

var headerDivider = Ti.UI.createImageView({
	image: "../images/divider.png",
	width: 768,
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
	height: 120
});

var profilePicture = Titanium.UI.createImageView({
	image: "../images/empty_avatar.png",
	height: 55,
	width: 55,
	top: 30,
	left: 30
});

var lecturerTitle = Ti.UI.createLabel({
	text: "professor",
	font: {
		fontSize: 14,
		fontWeight: 'regular'
	},
	color: '#21282c',
	height: 16,
	width: 200,
	left: 115,
	top: 30
});

var lecturerName = Ti.UI.createLabel({
    text: "Thomas Heylen XV",
    font: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    color: '#21282c',
	textAlign: 'left',
	height: 30,
	width: 500,
	top: 50,
	left: 115
});

var emailButton = Ti.UI.createButton({
	backgroundImage: "../images/email_button.png",
	backgroundSelectedImage: "../images/email_button_hover.png",
	width: 151,
	height: 45,
	top: 37,
	right: 30
});

var lecturerDivider1 = Ti.UI.createImageView({
	image: "../images/divider.png",
	width: 768,
	height: 2,
	left: 0,
	top: 0
})

var lecturerDivider2 = Ti.UI.createImageView({
	image: "../images/divider.png",
	width: 768,
	height: 2,
	left: 0,
	bottom: 0
})

detailLecturer.add(profilePicture, lecturerTitle, lecturerName, emailButton, lecturerDivider1, lecturerDivider2)

var downloadIcon = Titanium.UI.createImageView({
    image: "../images/downloads.png",
    width: 31,
    height: 39,
    top: 550,
    left: 45
});

var downloadName = Ti.UI.createLabel({
    text: "Available Documents",
    font: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    color: '#1f8dcd',
	textAlign: 'left',
	height: 20,
	width: 500,
	top: 560,
	left: 95
});


var tableview = Titanium.UI.createTableView({
    top: 590,
    width: "100%",
	height: 0,
    backgroundColor: '#f7f8f8',
    data: rowData,
	scrollable:false,
	style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

tableview.addEventListener('click', pdfClicked);

function pdfClicked(e){

tableview.removeEventListener('click', pdfClicked);

    if (e.row.listBool == 'false') {
    
        var foldername = e.row.listId;
        var filename = e.row.title;
		
        var ind = Titanium.UI.createProgressBar({
            width: 150,
            height: 20,
            min: 0,
            max: 1,
            right: 20,
            value: 0,
            style: Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
            top: 15,
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
            
            tableview.addEventListener('click', pdfClicked);
            
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
    
};

detailView.add(detailHeader,detailMap, detailLecturer, downloadIcon, downloadName, tableview);

Ti.App.addEventListener('courseClicked', function(data){
    
    classHour.text = data.courseStart + " - " + data.courseEnd;
    classTitle.text = (da.getCourseDetails((data.courseId).toString()))[0].name;
    
    rowData = [];
    lists = da.getPdfLists(data.courseId);
	
	var tableHeight= 70;
    
    for (var i = 0; i < lists.length; i++) {
    
        var Pdf = lists[i];
		
		var downloadImage = "../images/download_false.png";
		
		if((Pdf.getBool()) == "true"){
			downloadImage = "../images/download_true.png";
		};
        
        var listRow = Titanium.UI.createTableViewRow({
            title: Pdf.getName(),
            height: 55,
            listBool: Pdf.getBool(),
            listId: Pdf.getS_id(),
            color: '#21282c',
            borderColor: '#000',
			backgroundColor: "#fff",
			selectedBackgroundColor: "#1f8dcd",
        	leftImage: "../images/small_download.png",
			rightImage: downloadImage
        });
		
		
		tableHeight += 55;
        
        rowData.push(listRow);
        
    };
	
	tableview.height = tableHeight;
	tableview.setData(rowData);
    detailView.contentHeight = 'auto';
	
    });
