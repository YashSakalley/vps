/* =========== 
 Function to get the location coordinates using geolocation api
=========== */
var getPosition = (position) => {
    var locationObj = {};
    locationObj.lat = position.coords['latitude'];
    locationObj.lng = position.coords['longitude'];
    // Call the google api to create the map
    initMap(locationObj);
    // call the getHumanReadableAddress function to get the address in human readable format
    getHumanReadableAddress(position.coords['latitude'], position.coords['longitude']);
}

/* =========== 
 Function that gets triggered when we have the error while fetch the co-ordinates
 using HTML5 geoolocation api
=========== */
var locationNotReceived = (positionError) => {
    console.log(positionError);
}

/* =========== 
 Function to get the address using the coordinates
=========== */
var getHumanReadableAddress = (latitude, longitude) => {
    var tempURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCm_GrSti6BA79AerJkEcrmCusdDhDCsko`;
    $.ajax({
        url: tempURL,
        success: function (result) {
            if (result.status == 'OK') {
                $('#address').val(result['results'][0]['formatted_address']);
            }
        }
    }
    );
}

/* =========== 
  Function to create the map with an id selector (target the id and generate the map)
=========== */
var createMapWithCoordinates = (selector, latLongObj) => {
    var map = new google.maps.Map(
        document.getElementById(selector),
        {
            zoom: 15, center: latLongObj
        });
    marker = new google.maps.Marker({
        position: latLongObj,
        map: map,
        title: 'Default Marker',
        draggable: true
    });
}

/* =========== 
  Function to initialize the map on page load
=========== */
var initMap = (locationObj) => {
    // create a map using the co-ordinates and the target id
    createMapWithCoordinates('map', locationObj);
    // The marker, positioned at the given lat and long
    google.maps.event.addListener(marker, 'dragend', function (event) {
        var tempObj = {};
        tempObj.lat = this.position.lat();
        tempObj.lng = this.position.lng();
        getHumanReadableAddress(this.position.lat(), this.position.lng());
    });
}

/* =========== 
  HTML5 geolocation api to get the coordinates
=========== */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, locationNotReceived);
} else {
    alert('Geolocation is not supported in your browser');
}

answers = []

questions = [
    'What is your name',
    'Hi ' + answers[answers.length - 1],
    'Okay what was the crime?',
    'What was the time of ' + answers[answers.length - 1],
    'Where did it happened',
    'Now please be descriptive. (Describe your problem)'
]


var i = 1;

function sendMsg() {

    var msg = document.getElementById('chat_text');
    var msgBox = document.getElementById('chat_message');
    var finalName = document.getElementById('finalName');
    var finalAadhaarNumber = document.getElementById('finalAadhaarNumber');
    var hiddenInput = document.getElementById('hidden_input');
    var chatWindow = document.getElementById('chat_messages');

    if (i == 1) {
        questions[1] = "Hi " + msg.value + '. How can I help you?';
    }
    if (i == 3) {
        questions[3] = 'What was the time of ' + msg.value;
    }

    msgBox.innerHTML += '<br><div class="chat-answer btn btn-primary">' + msg.value + '</div>';

    setTimeout(() => {
        if (i < questions.length) {
            msgBox.innerHTML += '<br><div class="chat-question btn btn-info">' + questions[i] + '</div><br>';
        }

        answers.push(msg.value);
        msg.value = '';
        i += 1;



        if (i == questions.length + 1) {

            msg.disabled = true;
            msgBox.innerHTML += '<br><div class="chat-question btn btn-success"> Thank You. We got all we need. <br> Please preview your fir before submiting it<br>';
            finalString = answers.toString();
            finalString += (',' + finalName.value + ',' + finalAadhaarNumber.value);

            console.log('finally', finalString);
            hiddenInput.value = finalString;
        }
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 500);

    chatWindow.scrollTop = chatWindow.scrollHeight;
}