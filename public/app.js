// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append(
        "<div class='article-block'><p class='article-title' data-id='" + data[i]._id + "'>" + data[i].title + "</p><img class='article-img'" + " src='" + data[i].img + "'/><a href=" + data[i].link + " class='article-link' target='_blank'>" + "Read Article</a><div data-id='" + data[i]._id + "' class='article-link write-note'>" + "Write Note</div></div>"
      );
    }
  });
  
  
  // Whenever someone clicks the write note button
  $(document).on("click", ".write-note", function () {
    // Empty the notes from the note section
    $("#notes").empty();

    $("#notes").css("display", "inline-block");
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
        $("#notes").append("<p>" + data.title + "</p>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' placeholder='Note Title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body' placeholder='Note Content'></textarea>");
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
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    $("#notes").css("display", "none");

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

// // Saved Notes button
// $("#saved-btn").on("click", function (event) {
//     $.get("/notes", function (data) {
//     });
// });