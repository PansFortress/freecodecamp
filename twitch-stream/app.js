//TODO: Transform channelNames to an array of Objects and start populating the responses of channel and stream to the object to help draw on render later
var channelNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

window.onload = function(){
    console.log("Loaded");

    for(var i = 0; i < channelNames.length; i++){
        getChannelData('channels',channelNames[i])
        .done(function(data){
            console.log(data);
        });
    }
};

var getChannelData = function(type, channelName){
    var settings = {
        url: 'https://api.twitch.tv/kraken/' + type + '/' + channelName,
        headers:{
            'Client-ID': 'ay5sj1z6z10jovq449fit92yyvv9pe',
        },
    }
    return $.ajax(settings);
};