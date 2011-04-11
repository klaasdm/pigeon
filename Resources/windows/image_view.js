/**
 * @author kd322
 */
var win = Ti.UI.currentWindow;
var imageView = Ti.UI.createView({
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
});
Ti.App.addEventListener('imageView', function(e){

    var picture = e.picturename;
    
    var image = Titanium.UI.createImageView({
        image: picture
    });
    var btnBack = Titanium.UI.createButton({
        title: 'back',
        height: 35,
        bottom: 110,
        left: 100,
        width: 150
    
    });
    imageView.add(image, btnBack);
    btnBack.addEventListener('click', function(){
    
        Ti.App.fireEvent('CloseImage', {});
        
    });
    
    
});
