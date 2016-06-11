$.ajax({
  method: 'GET',
  url: 'https://www.reddit.com/r/javascript.json',
  dataType: 'json'
})
.done(function(data) {
  //handle successful response
  updateUI(data);
})
.fail(function() {
  //Handle errors
  handleError();
})
.always(function() {
  //Always update the UI with status
});

function updateUI(response){
  var postDiv = $('<div />');
  $('body').append(postDiv);
  
  var result = response.data.children;
  for(var i=0; i<result.length; i++){
    var containDiv = $('<div />').addClass("containDiv");
    postDiv.append(containDiv);

    var title = $('<h2 />');
    title.text(result[i].data.title);
    containDiv.append(title);

    var today = $('<h1 />');
    // today.text(result[i].data.created_utc).getUTCDate();
    containDiv.append(today);

    var showText = $('<p />');
    showText.text(result[i].data.selftext);
    containDiv.append(showText);

    var titleLink = $('<a />');
    titleLink.attr('href',result[i].data.permalink);
    titleLink.text(title);

    var author = $('<a />');
    author.attr('href',result[i].data.author);
    author.text(result[i].data.author);

    var commentPara = $('<p />');
    postDiv.append(commentPara);

    var commentLink = $('<a />');
    commentLink.attr('href', result[i].data.url);
    commentLink.text('Comments: ' + result[i].data.num_comments);

    var score = $('<span2 />');
    score.text(result[i].data.score);
    postDiv.append(score, " ", author, " ", commentLink);
    console.log(result);
  }

    return postDiv;
}

// $(titleLink).click(function (event){
//   event.preventDefault();
//   $(this).hide();
// });
