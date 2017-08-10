window.onload = function(){
    var channelNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    for(var i = 0; i < channelNames.length; i++){
        getTwitchData('streams', channelNames[i])
        .done(function(data){
            render(data);
        });
    }
};

var getTwitchData = function(type, channelName){
    var settings = {
        url: 'https://api.twitch.tv/kraken/' + type + '/' + channelName,
        headers:{
            'Client-ID': 'ay5sj1z6z10jovq449fit92yyvv9pe',
        },
    }
    return $.ajax(settings);
};

var render = function(twitchData){
    var link = twitchData._links.self.slice(twitchData._links.self.lastIndexOf('/')+1);
    var image = "http://i.picresize.com/images/2017/08/10/NQiBk.png";
    var game = null
    var status = null;
    if(twitchData.stream){
        image = twitchData.stream.preview.small;
        game = twitchData.stream.game;
        status = twitchData.stream.channel.status;
    }

    $("#results").append("<div class='media result-item mt-2'>"
        + "<a href=" + "https://twitch.tv/" + link + ">"
        + (image ? "<img class='d-flex mr-3' alt = 'Channel Preview Image' src = '" + image + "'>" : "" )
        + "<div class='media-body'>"
        + "<h5 class='mt-0'>" + "Channel: " + link + "</h5>"
        + (game ? "<p class = 'mb-0'> Game: " + game + "</p>" : "")
        + (status ? "<p> Status: " + status + "</p>" : "<p>Status: Not Currently Streaming</p>")
        +"</a><hr/></div></div>");
};