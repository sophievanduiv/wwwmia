/**
 * Created by Sophie on 18-5-15.
 */

function scan() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var barcode =  ("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
            alert (barcode);
            return barcode;
            document.getElementById('barcode').value = barcode;

            document.getElementById("barcodetext").innerHTML = barcode;
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
};

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

/*
 function capturePhoto() {
 // Take picture using device camera and retrieve image as base64-encoded string
 navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
 quality: 50,
 correctOrientation: true
 });
 }*/

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URI,
        correctOrientation: true});
}

//Callback function when the picture has been successfully taken
function onPhotoDataSuccess(imageURI) {
    // Get image handle
    var smallImage = document.getElementById('smallImage');
    //get button to save image
    var saveImage = document.getElementById('saveImage');

    // Unhide image and button elements
    smallImage.style.display = 'block';
    saveImage.style.display = "block";
    //smallImage.src = imageData;

    smallImage.src = imageURI;
    if(sessionStorage.isprofileimage==1){
        getLocation();
    }
    //alert(imageURI);
    var imageLink = imageURI;
    document.getElementById('image').value = imageLink;
    document.getElementById("imagemain").innerHTML = imageLink;
}

//Callback function when the picture has not been successfully taken
function onFail(message) {
    alert('Failed to load picture because: ' + message);
}



