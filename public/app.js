// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one

    var articlesZone = $('#articles')
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      var articleDiv = $('<div>');
      articleDiv.addClass('article-block');

      var articleTitle = $('<p>');
      articleTitle.addClass('article-title');
      articleTitle.text(data[i].title);

      var articleImage = $('<img>');
      articleImage.attr('src', data[i].img);
      articleImage.addClass('article-img');

      var articleLink = $('<a>');
      articleLink.attr({'href': data[i].link,
                        'target': '_blank' });
      articleLink.addClass('read-article-link');
      articleLink.text('Read Article');

      var articleSaveLink = $('<a>');
      articleSaveLink.attr({'href': data[i].title,
                            'target': '_blank'});
      articleSaveLink.attr('data-id', data[i].id);
      articleSaveLink.addClass('save-article-link');
      articleSaveLink.text('Save Article');
      
      articleDiv.append(articleTitle);
      articleDiv.append(articleImage);
      articleDiv.append(articleLink);
      articleDiv.append(articleSaveLink);

     articlesZone.append(articleDiv);
     
      // $("#articles").append(
      //   "<div class='article-block'><p class='article-title' data-id='" + data[i]._id + 
      //   "'>" + data[i].title + "</p><img class='article-img'" + " src='" + data[i].img + "'/><a href=" + data[i].link + " class='article-link' target='_blank'>" + "Read Article</a><a href=" + data[i].title + " class='article-link' target='_blank'>" + "Save Article</a></div>"
      // );

      // $("#articles").append(
      //   "<div class='article-block'><p class='article-title' data-id='" + data[i]._id + "'>" + data[i].title + "</p><img class='article-img'" + " src='" + data[i].img + "'/><a href=" + data[i].link + " class='article-link' target='_blank'>" + "Read Article</a><a href=" + data[i].title + " class='article-link' target='_blank'>" + "Save Article</a></div>"
      // );

     articlesZone.on("click", '.save-article-link', function () {
      // Empty the notes from the note section
      $("#notes").empty();
      // Save the id from the p tag
      var thisId = $(this).attr("data-id");
    
      // Now make an ajax call for the Article
      $.ajax({
          method: "GET",
          url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .then(function (data) {
          console.log(data);
          // The title of the article
          $("#notes").append("<h2>" + data.title + "</h2>");
          // An input to enter a new title
          $("#notes").append("<input id='titleinput' name='title' >");
          // A textarea to add a new note body
          $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
          // A button to submit a new note, with the id of the article saved to it
          $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
    
          // If there's a note in the article
          if (data.note) {
            // Place the title of the note in the title input
            $("#titleinput").val(data.note.title);
            // Place the body of the note in the body textarea
            $("#bodyinput").val(data.note.body);
          }
        });
    });
    }
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          // Value taken from title input
          title: $("#titleinput").val(),
          // Value taken from note textarea
          body: $("#bodyinput").val()
        }
      })
      // With that done
      .then(function (data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  
// Home button
$("#home-btn").on("click", function () {
    $.get("/", function (data) {
    });
});

// Scrape button
$(document).on("click", "#scrape-btn", function (event) {
  event.preventDefault();
    $.get("/scrape", function (data) {
      location.reload();
      // alert("You have scraped " + data.length + " new articles.");
      alert("Article scraping successful.");
    });
});