document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("Device Ready");
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
}
function onPause() {
    // Handle the pause event
}

function onResume() {
    // Handle the resume event
}

function onMenuKeyDown() {
    // Handle the menubutton event
}
//
//Check if enabled: 
function checkEnabled() { 
    nfc.enabled(onSuccess, onFailure);
} 

function onSuccess() { 
    alert("NFC Enabled");
}

function onFailure() { 
    alert("NFC Not Enabled");
}

function showSett() { 
    nfc.showSettings();
}

/* //NFC Reading tags: (Tag must be formatted first, else the default android window will notify of a blank tag, leaving the app)
function NFCRead() {
nfc.addTagDiscoveredListener  (
    function (nfcEvent) {
        var tag = nfcEvent.tag,
            ndefMessage = tag.ndefMessage;

        // dump the raw json of the message
        // note: real code will need to decode
        // the payload from each record
        alert(JSON.stringify(ndefMessage));

        // assuming the first record in the message has
        // a payload that can be converted to a string.
        alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
    },
    function () { // success callback
        alert("Waiting for NDEF tag");
    },
    function (error) { // error callback
        alert("Error adding NDEF listener " + JSON.stringify(error));
    }
);
} */
function NFCRead() {
nfc.addNdefListener(
    app.onNdef,
    function() {
        console.log("Listening for NDEF tags.");
    },
    failure
);
}

function nfcEvent() {

console.log(JSON.stringify(nfcEvent.tag));
//app.clearScreen();

var tag = nfcEvent.tag;

// BB7 has different names, copy to Android names
if (tag.serialNumber) {
    tag.id = tag.serialNumber;
    tag.isWritable = !tag.isLocked;
    tag.canMakeReadOnly = tag.isLockable;
}

//tagContents.innerHTML = app.tagTemplate(tag);
alert(app.tagTemplate(tag));

navigator.notification.vibrate(100);        
}