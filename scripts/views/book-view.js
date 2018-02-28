'use strict';
var app = app || {};
// const __API_URL__ = 'http://localhost:3000';

(module => {
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide(); // hide anything with the container tag. Allows for easy view swapping
    $('.bookView').show(); //show the book section
    module.Book.all.map(book => $('#bookListUl').append(book.toHtml())); //for each book in the Book.all array make a new template li
  };

  module.bookView = bookView;
})(app);

$(function() { //document.ready function. Runs on page load.
  app.Book.fetchAll(app.bookView.initIndexPage);
});