module.exports = function (Item) {

  Item.afterRemote('prototype.__create__reviews', function (ctx, remoteMethodOutput, next) {                            // Set up a function to run after a review is created
    var itemId = remoteMethodOutput.itemId;                                                                             // Get the id of the item that the review was just created for

    console.log("calculating new rating for item: " + itemId);

    var searchQuery = {include: {relation: 'reviews'}};                                                                 // Set up the search query to find all the existing reviews for the item

    Item.findById(itemId, searchQuery, function findItemReviewRatings(err, findResult) {                                // Run the search and save the results to a variable called findResult
      var reviewArray = findResult.reviews();                                                                           // Store each of the reviews in an array
      var reviewCount = reviewArray.length;                                                                             // Count the number of reviews
      var ratingSum = 0;                                                                                                // Set up the baseline review score

      for (var i = 0; i < reviewCount; i++) {                                                                           // Add all the review scores
        ratingSum += reviewArray[i].rating;
      }

      var updatedRating = Math.round((ratingSum / reviewCount) * 100) / 100;                                            // Take an average of all the review scores

      console.log("new calculated rating: " + updatedRating);

      findResult.updateAttribute("rating", updatedRating, function (err) {                                              // Update the rating attribute of the item with the newly calculated review score
        if (!err) {
          console.log("item rating successfully updated");
        } else {
          console.log("error updating rating for item: " + err);
        }
      });

      next();
    });

  });

};
