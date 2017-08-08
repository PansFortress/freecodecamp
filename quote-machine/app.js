$("#magic").click(function(){
  $.getJSON("https://got-quotes.herokuapp.com/quotes", function(json_response){
    var quote = json_response.quote;
    var character = json_response.character;
    
    $(".message").html("<p>" + quote + "</p>" + "<h4>" + character + "</h4>");
  });
});


$("#tweet").click(function(){
  var quote = $(".message p").html();
  var character = $(".message h4").html();
  var params = "hashtags=quotes"
  if(character){
    window.open("https://twitter.com/intent/tweet?" + params + "&text='"+ encodeURIComponent(quote) + "' -" + character);
  }
  else{
    console.log("Nope");
  }
});
