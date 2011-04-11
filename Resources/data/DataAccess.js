/**
 * @author kd322
 */
function DALists(){
    this.initDatabase = function(){
        Titanium.API.info("initdatabase");
        try {
            var sql = 'CREATE TABLE IF NOT EXISTS series (S_id INTEGER PRIMARY KEY AUTOINCREMENT,Id,Title varchar(255),S_part varchar(255),LocationNotes varchar(255),TermDates_id int, S_notes varchar(255), S_createdBy varchar(255), S_faqdept varchar(255), S_location varchar(255), S_year varchar(255),S_term varchar(255), Additionalinformation varchar(255)) ';
            var sql2 = 'CREATE TABLE IF NOT EXISTS days (D_id INTEGER PRIMARY KEY AUTOINCREMENT,Sid INTEGER, Day varchar(255), Start string, End string, Lesson varchar(255) )';
            var sql3 = 'CREATE TABLE IF NOT EXISTS sevents (S_id INTEGER PRIMARY KEY AUTOINCREMENT,Sid INTEGER, Etitle varchar(255), Eorganizer string, EaggregatedTimes string, Enote varchar(255) )';
            var sql4 = 'CREATE TABLE IF NOT EXISTS notes (N_id INTEGER PRIMARY KEY AUTOINCREMENT,Sid INTEGER, Name varchar(255), Date date, Type varchar(255))';
            var sql5 = 'CREATE TABLE IF NOT EXISTS pdf (P_id INTEGER PRIMARY KEY AUTOINCREMENT,Sid INTEGER, Name varchar(255), Bool boolean)';
            var db = Titanium.Database.open("TimeTableList");
            db.execute(sql);
            db.execute(sql2);
            db.execute(sql3);
            db.execute(sql4);
            db.execute(sql5);
            db.close();
        } 
        catch (ex) {
            Titanium.API.info("initdatabase NOT OK");
            Titanium.API.info(ex);
        }
        Titanium.API.info("initdatabase OK");
    };
    
    this.insertSeriesList = function(listId, listTitle, lists_Part, listLocationNotes, listTermDates_id, listS_notes, listS_createdBy, listS_facdept, listS_location, listS_year, listS_term, listAdditionalinformation){
    
        var db = Titanium.Database.open("TimeTableList");
        var rows = db.execute('SELECT COUNT(*) FROM series WHERE Id = ?;', listId).field(0);
        if (rows == 0) {
            db.execute('INSERT INTO series (Id,Title,S_part,LocationNotes,TermDates_id, S_notes, S_createdBy, S_faqdept, S_location, S_year,S_term, Additionalinformation) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', listId, listTitle, lists_Part, listLocationNotes, listTermDates_id, listS_notes, listS_createdBy, listS_facdept, listS_location, listS_year, listS_term, listAdditionalinformation);
        };
        db.close();
    };
    this.insertDayList = function(listId, listDay, listStart, listEnd, listLesson){
    
        var db = Titanium.Database.open("TimeTableList");
        
        var rows = db.execute('SELECT COUNT(*) FROM days WHERE Sid = ? AND Day = ? AND Start = ?;', listId, listDay, listStart).field(0);
        if (rows == 0) {
            db.execute('INSERT INTO days (Sid,Day,Start,End,Lesson) VALUES(?,?,?,?,?);', listId, listDay, listStart, listEnd, listLesson);
        };
        db.close();
        
    };
    this.insertEventList = function(listId, listTitle, listOrganizer, listAggregatedTimes, listNote){
    
        var db = Titanium.Database.open("TimeTableList");
        var rows = db.execute('SELECT COUNT(*) FROM days WHERE Sid = ?;', listId).field(0);
        if (rows == 0) {
            db.execute('INSERT INTO sevents (Sid,Etitle,Eorganizer,EaggregatedTimes,Enote) VALUES(?,?,?,?,?);', listId, listTitle, listOrganizer, listAggregatedTimes, listNote);
        };
        db.close();
        
    };
    this.insertPdfList = function(listId, listName, listBool){
    
        var db = Titanium.Database.open("TimeTableList");
        var rows = db.execute('SELECT COUNT(*) FROM pdf WHERE Name = ?;', listName).field(0);
        if (rows == 0) {
            db.execute('INSERT INTO pdf (Sid,Name,Bool) VALUES(?,?,?);', listId, listName, listBool);
        };
        db.close();
        
    };
    this.insertNotesList = function(listId, listName, listDate, listType){
    
        var db = Titanium.Database.open("TimeTableList");
		var rows = db.execute('SELECT COUNT(*) FROM notes WHERE Name = ?;', listName).field(0);
        if (rows == 0) {
			db.execute('INSERT INTO notes (Sid,Name,Date,Type) VALUES(?,?,?,?);', listId, listName, listDate, listType);
		};
		db.close();
        
    };
    this.updatePdfList = function(listName){
    
        var db = Titanium.Database.open("TimeTableList");
        db.execute('Update pdf SET Bool = ? WHERE Name = ?;', 'true', listName);
        db.close();
        
    };
    this.getLists = function(day){
    
        var db = Titanium.Database.open("TimeTableList");
        var rows = db.execute('SELECT * FROM days WHERE Day = ? ORDER BY Start;', day);
        var result = [];
        while (rows.isValidRow()) {
            var item = new S_days(rows.fieldByName('Sid'), rows.fieldByName('Day'), rows.fieldByName('Start'), rows.fieldByName('End'), rows.fieldByName('Lesson'));
            result.push(item);
            rows.next();
        }
        rows.close();
        return result;
    };
    this.getPdfLists = function(id){
        var db = Titanium.Database.open("TimeTableList");
        var rows = db.execute('SELECT * FROM pdf WHERE Sid = ?;', id);
        var result = [];
        while (rows.isValidRow()) {
            var item = new Pdf(rows.fieldByName('Sid'), rows.fieldByName('Name'), rows.fieldByName('Bool'));
            result.push(item);
            rows.next();
        }
        rows.close();
        return result;
    };
    
    this.getCourseLists = function(){
    
        var db = Titanium.Database.open("TimeTableList");
        var rows = db.execute('SELECT Id,Title FROM series;');
        var result = [];
        while (rows.isValidRow()) {
        
            var series = new Series();
            
            series.id = rows.field(0);
            series.title = rows.field(1);
            result.push(series);
            rows.next();
        }
        rows.close();
        return result;
    };
    
    this.getFileAmount = function(id, Type){
        var result = [];
        var db = Titanium.Database.open("TimeTableList");
        var rows = db.execute('SELECT COUNT(*) FROM notes WHERE Sid  = ? AND Type != ?;', id,Type).field(0);
        result.push(rows);
		db.close();
        return result;
    };
    
    
    this.getNoteLists = function(id,Type){
    
        var db = Titanium.Database.open("TimeTableList");
        var rows = db.execute('SELECT * FROM notes WHERE Sid = ? AND Type != ?;', id,Type);
        var result = [];
        while (rows.isValidRow()) {
            var item = new Notes(rows.fieldByName('Sid'), rows.fieldByName('Name'), rows.fieldByName('Date'), rows.fieldByName('Type'));
            result.push(item);
            rows.next();
        }
        rows.close();
        return result;
    };
    this.getImageLists = function(){
        var db = Titanium.Database.open("TimeTableList");
        var rows = db.execute('SELECT * FROM notes WHERE Type = ?;', 'DRAWNOTE');
        var result = [];
        while (rows.isValidRow()) {
            var item = new Notes(rows.fieldByName('Sid'), rows.fieldByName('Name'), rows.fieldByName('Date'), rows.fieldByName('Type'));
            result.push(item);
            rows.next();
        }
        rows.close();
        return result;
    };
    
    
};
