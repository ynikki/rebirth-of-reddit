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

function collapsiblePara(para){
  $('.containPara').collapse({
    show: function(){
      this.slideDown(100);
    },
    hide: function(){
      this.slideUp(100);
    },
    accordion: true,
    persist: true,
  });
}

function updateUI(response){
  var postDiv = $('<div />');
  $('body').append(postDiv);
  
  var result = response.data.children;
  for(var i=0; i<result.length; i++){
    var containHeader = $('<div />').addClass("containHeader");
    postDiv.append(containHeader);

    var containDiv = $('<div />').addClass("containDiv");
    postDiv.append(containDiv);


    var titleLink = $('<a />');
    titleLink.attr('href', result[i].data.url);
    titleLink.text(result[i].data.title);
    
    var title = $('<h2 />').addClass('title');
    title.text(result[i].data.title);
    containHeader.append(title);
    
    var today = $('<h3 />');
    var showDate = new Date(result[i].data.created_utc * 1000);
    today.text(showDate);
    containDiv.append(today);    

    var containPara = $('<div />').addClass("containPara");
    containDiv.append(containPara);

    var showText = $('<p />');
    showText.html(marked(result[i].data.selftext));
    containPara.append(showText);

    var author = $('<a />').addClass("author");
    username = result[i].data.author;
    author.attr('href', 'https://www.reddit.com/user/' + username);
    author.text(username);

    var commentLink = $('<a />');
    var url = result[i].data.url;
    commentLink.attr('href',url);
    commentLink.text('Comments: ' + result[i].data.num_comments);

    var score = $('<span />').addClass(score);
    score.text(result[i].data.score);
    containDiv.append(score, " ", author, " ", commentLink);

    var image = $('<img />');
    image.attr('src','/images/halloweenghost.png');

    var thumbnail = null;
    if (result[i].data.hasOwnProperty('preview')){
      currThumbnail = $('<img />');
      thumbnail = result[i].data.preview.images[0].source.url;
      currThumbnail.attr('src', thumbnail);
      containDiv.append(currThumbnail);
    }else{
      thumbnail = containDiv.append(image);
    }

  }

    return postDiv;
}

// $(titleLink).click(function (event){
//   event.preventDefault();
//   $(this).hide();
// });
