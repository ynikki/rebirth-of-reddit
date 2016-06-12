var username;

$.ajax({
  method: 'GET',
  url: 'https://www.reddit.com/r/halloween.json',
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

    var titleLink = $('<a />');
    titleLink.attr('href', result[i].data.url);
    titleLink.text(result[i].data.title);
    
    var title = $('<h2 />');
    title.text(result[i].data.title);
    containDiv.append(title);
    
    var today = $('<h3 />');
    var showDate = new Date(result[i].data.created_utc * 1000);
    today.text(showDate);
    containDiv.append(today);    

    var showText = $('<p />');
    showText.html(marked(result[i].data.selftext));
    containDiv.append(showText);

    var author = $('<a />').addClass("author");
    username = result[i].data.author;
    author.attr('href', 'https://www.reddit.com/user/' + username);
    author.text(username);

    var commentPara = $('<p />');
    postDiv.append(commentPara);

    var commentLink = $('<a />');
    var url = result[i].data.url;
    commentLink.attr('href',url);
    commentLink.text('Comments: ' + result[i].data.num_comments);

    var score = $('<span />');
    score.text(result[i].data.score);
    containDiv.append(score, " ", author, " ", commentLink);
    console.log(result);

    var imgLink = $('<img />');
    imgLink.append(result[i].data.thumbnail);
  }

    return postDiv;
}

// $(titleLink).click(function (event){
//   event.preventDefault();
//   $(this).hide();
// });
