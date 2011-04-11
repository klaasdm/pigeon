/**
 * @author kd322
 */


 function S_events(s_id,e_title,e_organiser,e_aggregatedTimes,e_note){
 
 
var s_id,e_title, e_organiser,e_aggregatedTimes,e_note;

	this.getEtitle = function()
	{
		return e_title;
	};

	this.getSid = function()
	{
		return s_id;
	};
	this.getEorganiser = function()
	{
		return e_organiser;
	};
	this.getEaggregatedTimer = function()
	{
		return e_aggregatedTimes;
	};
	this.getEnote = function()
	{
		return e_note;
	};
}
