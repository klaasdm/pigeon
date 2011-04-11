/**
 * @author kd322
 */
Ti.include('sidebar_navigation.js');
Ti.include('../data/DataAccess.js');
Ti.include('../model/series.js');
//Ti.include('../windows/notes_list.js');
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
    text: "Folders",
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

sidebarTitleHeader.add(sidebarTitle);

var tableview = Titanium.UI.createTableView({
    top: 118,
    width: "100%",
    backgroundColor: 'transparent',
    bottom: 0,
    data: rowData,
    separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
});

tableview.addEventListener('click', function(e){

    Ti.App.fireEvent('NotesList', {
        id: e.row.listId, name: e.row.listName
    });
    
});
window.add(sidebarTitleHeader, tableview);


    rowData = [];
    lists = da.getCourseLists();
    
    for (var i = 0; i < lists.length; i++) {
    
        FileAmount = da.getFileAmount(lists[i].id,'DRAWNOTE');
        
        var listRow = Titanium.UI.createTableViewRow({
            height: 65,
            backgroundImage: '../images/note_item.png',
            selectedBackgroundImage: '../images/note_item_hover.png',
            listId: lists[i].id,
			listName: lists[i].title
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
            top: 13,
            left: 65,
            height: 40,
            width: 200,
            text: lists[i].title
        
        });
        var amount = Ti.UI.createLabel({
            color: '#fefefe',
            font: {
                fontSize: 12,
                fontWeight: 'regular'
            },
            top: 13,
            right: 15,
            height: 40,
            width: 'auto',
			textAlign: 'right',
            text: FileAmount[0]
        
        });
		
		if (FileAmount[0] == 0) {
			var emptyFolder = Ti.UI.createImageView({
				top: 5,
				left: 10,
				height: 55,
				width: 45,
				image: "../images/empty_folder.png"
			});
			listRow.add(emptyFolder);
		}else{
			var fullFolder = Ti.UI.createImageView({
				top: 5,
				left: 10,
				height: 55,
				width: 45,
				image: "../images/full_folder.png"
			});
			listRow.add(fullFolder);
		};
		
        listRow.add(title, amount);
        rowData.push(listRow);
    };
	tableview.setData(rowData);
