var shortenResults = function(longForm){
  return longForm.map(function(object){
    return{
      title: object.title,
      title_link: "https://en.wikipedia.org/wiki/" + object.title,
      snippet: object.snippet
    }
  });
};

var renderResults = function(results){
  var htmlToRender = results.reduce(function(blob, object){
    var item = "<div class='row mb-2 mt-2'><a href='"+object.title_link+"' target='_blank'>"+
        "<h3>" + object.title + "</h3></a>"+
        "<div class='snippet'>"+object.snippet+"</div>"+
        "</div>";
    return blob += item;
  },"");
  
  $("#results").html(htmlToRender);
};

var getWikipediaData = function(searchTerm){
  var settings = {
    url:"https://en.wikipedia.org/w/api.php",
    data:{
      action: "query",
      list: "search",
      format: "json",
      srsearch: searchTerm,
      origin: "*"
    },
    type: "GET",
    dataType: "json"
  };
  
  return $.ajax(settings);
};

$("#search-form").submit(function(event){
  event.preventDefault();
  
  var values = $(this).serializeArray();
  var searchTerm = values[0].value;
  
  getWikipediaData(searchTerm)
  .done(function(json){
    var short = shortenResults(json.query.search);
    renderResults(short);
  })
  .fail(function(){
    alert("Call to Wiki API failed");
  });
  
});


