/**
 * @author kd322
 */
Ti.include('sidebar_navigation.js');
Ti.include('../data/DataAccess.js');
Ti.include('../model/notes.js');
var window = Titanium.UI.currentWindow;
var rowData = [];

var da = new DALists();

var sidebarTitleHeader = Ti.UI.createView({
    top: 70,
    left: 0,
    height: 48,
    width: 320,
    backgroundImage: '../images/sidebar_title.png'
});

var sidebarTitle = Titanium.UI.createLabel({
    text: window.data[0].name,
    left: 0,
    right: 0,
    width: 320,
    top: 13,
    height: 20,
    font: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    color: '#fefefe',
    textAlign: "center",
    shadowColor: '#1d2226',
    shadowOffset: {
        x: 0,
        y: 2
    }
});

var backButton = Titanium.UI.createButton({
	width: 54,
	height: 30,
	left: 10,
	backgroundImage: '../images/back_button.png',
	selectedBackgroundImage: '../images/back_button_hover.png'
});
backButton.addEventListener('click', function(e){
	Ti.App.fireEvent('openFolders',{});
});


sidebarTitleHeader.add(sidebarTitle, backButton);

Ti.API.info(window.data[0].id);

var tableview = Titanium.UI.createTableView({
    top: 118,
    width: "100%",
    backgroundColor: 'transparent',
    bottom: 0,
    data: rowData,
    separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
});

tableview.addEventListener('click', function(e){
    Ti.App.fireEvent('fileOpenend', {
        id: e.row.listId,
        filetype: e.row.listType,
        name: e.row.listTitle
    });
});

window.add(tableview, sidebarTitleHeader);

rowData = [];
lists = da.getNoteLists(window.data[0].id,'DRAWNOTE');

for (var i = 0; i < lists.length; i++) {

    var Notes = lists[i];
   
    var listRow = Titanium.UI.createTableViewRow({
        listId: Notes.getS_id(),
        listType: Notes.getType(),
        listTitle: Notes.getName(),
        height: 65,
        backgroundImage: '../images/note_item.png',
        selectedBackgroundImage: '../images/note_item_hover.png',
    
    });
    //List title
    var title = Ti.UI.createLabel({
        color: '#fefefe',
        font: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        shadowColor: '#1d2226',
        shadowOffset: {
            x: 0,
            y: 2
        },
        top: 5,
        left: 65,
        height: 30,
        width: 200,
        text: Notes.getName()
    
    });
    var date = Ti.UI.createLabel({
        color: '#fefefe',
        font: {
            fontSize: 14,
            fontWeight: 'regular'
        },
        shadowColor: '#1d2226',
        shadowOffset: {
            x: 0,
            y: 2
        },
        top: 35,
        left: 65,
        height: 20,
        width: 200,
        text: Notes.getDate()
    
    });
	
	if (Notes.getType() == "PDF") {
			var pdfIcon = Ti.UI.createImageView({
				top: 5,
				left: 10,
				height: 55,
				width: 45,
				image: "../images/pdf_icon.png"
			});
			listRow.add(pdfIcon);
		}else if(Notes.getType() == "DRAWNOTE"){
			var drawingIcon = Ti.UI.createImageView({
				top: 5,
				left: 10,
				height: 55,
				width: 45,
				image: "../images/drawing_icon.png"
			});
			listRow.add(drawingIcon);
		};
    
    
    listRow.add(title, date);
    rowData.push(listRow);
};

tableview.setData(rowData);
