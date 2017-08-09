window.onload = function(){
    console.log("Loaded");
    getChannelData('freecodecamp')
    .done(function(data){
        console.log(data);
    });
};

var getChannelData = function(channelName){
    var settings = {
        url: 'https://api.twitch.tv/kraken/channels/' + channelName,
        headers:{
            'Client-ID': 'ay5sj1z6z10jovq449fit92yyvv9pe',
        },
    }
    return $.ajax(settings);
};