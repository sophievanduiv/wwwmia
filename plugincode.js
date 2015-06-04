/**
 * Created by Sophie on 18-5-15.
 */

//----------------------------------------ONLOAD OF THE PAGE FOR DEVICE READY------------------------------------------
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

//Check if it is Cordova
var isCordova = typeof window.cordova !== 'undefined' ? true : false;

//Deciding what it should load
if(isCordova) {
    document.addEventListener('deviceready', onDeviceReady, false);
} else {
    window.addEventListener('load', onDeviceReady, false);
}

//necessary variables for taking the picture (that we need later)
var pictureSource;                                                  // picture source
var destinationType;                                                // sets the format of returned value

//everything that needs to load for the application
function onDeviceReady() {
    Phonon.Navigator().start('01-meldingstart');                    //load the content for the indexscreen: 00-welkomscherm.html
    pictureSource=navigator.camera.PictureSourceType;               //to see which part of the phone is used to take the picture
    destinationType=navigator.camera.DestinationType;               //to see where the photo should go after taking the picture
}

//----------------------------------------------------CODE FOR THE BARSCANNER------------------------------------------
function scan() {

    /*
    Next to result.txt information you can get from the barcode (the number belows the stripes) you can also get
    information as format or if it's cancalled.
    Examples:
    result.txt (to see the number)
    result.format (to see the format of the file)
    result.cancelled (true or false)
    */
    //var checkbarcodenext = false;

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var barcodenummers = result.text;                              //to get the code in text
            document.getElementById('barcode').value = barcodenummers;     //the value of barcode goes into a form (invisible)
            //window.localStorage.setItem("barcode", barcode);        //safe the code in temporary memory
            //alert(document.getElementById('barcode').value);
            $(".barcodetext").css("opacity", "1");
            $(".barcodetext").css("pointer-events", "auto");
        },
        function (error) {
            alert("Scanning failed: " + error);                     //if something goes wrong
            checkbutton (checkbarcodenext);
        }
    );
    /*TEST WITHOUT BARCODE
    var barcode = "123456789789";
    document.getElementById('barcode').value = barcode;
    window.localStorage.setItem("key", barcode);*/
}

//----------------------------------------------------CODE FOR THE CAMERA(PIC)------------------------------------------

function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URI,
        correctOrientation: true});
}

//Callback function when the picture has been successfully taken
function onPhotoDataSuccess(imageURI) {
    var smallImage = document.getElementById('smallImage');         //to show the image when it's taken
    var saveImage = document.getElementById('saveImage');           //the button to save the image information

    smallImage.style.display = 'block';                             //show the image
    saveImage.style.display = "block";                              //show the save button

    smallImage.src = imageURI;                                      //to get the URI (some kinda format) as src

    var imageLink = imageURI;

    document.getElementById('image').value = imageLink;
    //window.localStorage.setItem("foto", imageLink);                 //to save the image src temporary
    //alert(imageLink);
}

//Callback function when the picture has not been successfully taken
function onFail(message) {
    alert('Failed to load picture because: ' + message);
}

//--------------------------------------------HERE IS ALL THE EXTRA CODE FOR PHONON-------------------------------------

//function to render some text on a element
function write (el, text) {
    if(!('textContent' in el)) {
        el.innerText = text;
    } else {
        el.textContent = text;
    }
}

//the first content for the page loaded in index
Phonon.Navigator({
    defaultPage: '01-meldingstart',
    templatePath: 'pages',
    pageAnimations: true
});

//functions for the second page: melding start
//more functions necessary because it needs to load after clicking on the link to get to this page.
Phonon.Navigator().on({page: '01-meldingstart', template: '01-meldingstart', asynchronous: false}, function(activity) {

    activity.onCreate(function(self, el, req) {

        $('.header-bar').css('display','none');
        $('.container').css('display','none');
        $('footer').css('display','none');
        console.log('01-meldingstart: onCreate');                                              //after creating the page it loads the content
    });

    activity.onReady(function(self, el, req) {

        //hide loading gif and show buttons to login
        setTimeout(function(){
            $("#background-start").fadeOut("slow", function() {
                $('.header-bar').fadeIn("slow");
                $('.container').fadeIn("slow");
                $('footer').fadeIn("slow");
            });

        }, 1000);

        console.log('01-meldingstart: onReady');
    });

    activity.onTransitionEnd(function() {
        console.log('01-meldingstart: onTransitionEnd');
    });

    activity.onQuit(function(self) {
        console.log('01-meldingstart: onQuit');
    });

    activity.onHidden(function(el) {
        console.log('01-meldingstart: onHidden');
    });

});

//functions for the third page: barcode
//more functions necessary because it needs to load after clicking on the link to get to this page.
Phonon.Navigator().on({page: '02-barcode', template: '02-barcode', asynchronous: false}, function(activity) {

    activity.onCreate(function(self, el, req) {

        $(".barcodetext").css("opacity", "0.6");
        $(".barcodetext").css("pointer-events", "none");

                                               //after creating the page it loads the content
    });
});

//functions for the fourth page: keuzemenu
//more functions necessary because it needs to load after clicking on the link to get to this page.
Phonon.Navigator().on({page: '03-keuzemenu', template: '03-keuzemenu', asynchronous: false}, function(activity) {

});


//functions for the sixth page: overzicht
//more functions necessary because it needs to load after clicking on the link to get to this page.
Phonon.Navigator().on({page: '05-redenen', template: '05-redenen', asynchronous: false}, function(activity) {

    activity.onCreate(function(self, el, req) {
        console.log('05-redenen: onCreate');

        $(".redenennext").css("opacity", "0.6");
        $(".redenennext").css("pointer-events", "none");

        self.runReady();                                                //after creating the page it loads the content
    });

    activity.onReady(function(self, el, req) {

        $("#overigecontent").focusin(function(){
            $(".container").css('margin-top','-30%');
            $(".redenennext").css('bottom','50%');
        });

        $("#overigecontent").focusout(function(){
            $(".container").css('margin-top','23%');
            $(".redenennext").css('bottom','10%');
        });

        //set the reasons for sending the message
        //need unbind: without unbind it runs the function 2 times (for some reason)
        $('#ruiktvies').unbind('click');
        $('#ruiktvies').on('click',function () {
            //alert('hallo');
            document.getElementById('stankcontent').value = "Het stinkt hier <br>"
        });

        $('#vies').unbind('click');
        $('#vies').on('click',function () {
            //alert('hallo');
            document.getElementById('viescontent').value = "Het is hier vies <br>"
        });

        $('#prullenbak').unbind('click');
        $('#prullenbak').on('click',function () {
            //alert('hallo');
            document.getElementById('prullenbakcontent').value = "De prullenbak zit vol."
        });

        $('#wcpapier').unbind('click');
        $('#wcpapier').on('click',function () {
            //alert('hallo');
            document.getElementById('wcpapiercontent').value = "Het WC papier is op."
        });

        $('#zeep').unbind('click');
        $('#zeep').on('click',function () {
            //alert('hallo');
            document.getElementById('zeepcontent').value = "De zeep is op."
        });

        $('#handdoekjes').unbind('click');
        $('#handdoekjes').on('click',function () {
            //alert('hallo');
            document.getElementById('handdoekjescontent').value = "De handdoekjes zijn op."
        });

        //To see if there is something check or a value
        $(".redenenlijst div label").click(function(e) {
            (state= $(this).find("input:checkbox").attr("checked"))
                if (state==true){ // WITH TOGGLE
                    $(".redenennext").css("opacity", "0.6");
                    $(".redenennext").css("pointer-events", "none");
                }else {
                    $(".redenennext").css("opacity", "1");
                    $(".redenennext").css("pointer-events", "auto");
                }
        });

        console.log('05-redenen: onReady');
    });

});

//functions for the seventh page: overzicht
//more functions necessary because it needs to load after clicking on the link to get to this page.
Phonon.Navigator().on({page: '06-overzicht', template: '06-overzicht', asynchronous: false}, function(activity) {

    activity.onCreate(function(self, el, req) {

        //set the barcode in this page
        document.getElementById("barcodetext").innerHTML = document.getElementById('barcode').value;
        //alert(document.getElementById('barcode').value);

        //Get the information for the reason (if they are checked)
        document.getElementById("redenenoverzichtstank").innerHTML = document.getElementById('stankcontent').value;
        document.getElementById("redenenoverzichtsvies").innerHTML = document.getElementById('viescontent').value;
        document.getElementById("redenenoverzichtsprullenbak").innerHTML = document.getElementById('prullenbakcontent').value;
        document.getElementById("redenenoverzichtswcpapier").innerHTML = document.getElementById('wcpapiercontent').value;
        document.getElementById("redenenoverzichtszeep").innerHTML = document.getElementById('zeepcontent').value;
        document.getElementById("redenenoverzichtshanddoekjes").innerHTML = document.getElementById('handdoekjescontent').value;
		
		//Formuliertje
        document.getElementById("redenenoverzichtsoverige").innerHTML = document.getElementById('overigecontent').value;

        //load the image in this page
        document.getElementById("imagemain").src = document.getElementById("smallImage").src;
        //alert(document.getElementById("smallImage").src);

        //If there is no image taken, don't show an image element in de end.
        if ($('#smallImage').attr('src')=="") {
            $('#imagemain').css('display','none');
        }
        else {
            ('#imagemain').css('display','block');
        }

        console.log('06-overzicht: onCreate');
        self.runReady();                                                //after creating the page it loads the content
    });


});

//functions for the last page: overzicht
//more functions necessary because it needs to load after clicking on the link to get to this page.
Phonon.Navigator().on({page: '07-verzonden', template: '07-verzonden', asynchronous: false}, function(activity) {

    activity.onCreate(function(self, el, req) {
        console.log('07-verzonden: onCreate');
        self.runReady();                                                //after creating the page it loads the content
    });

});







