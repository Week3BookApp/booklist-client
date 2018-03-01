'use strict';
var app = app || {};

(module => {
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide(); // hide anything with the container tag. Allows for easy view swapping
    $('.bookView').show(); //show the book section
    module.Book.all.map(book => $('#bookListUl').append(book.toHtml())); //for each book in the Book.all array make a new template li
  };

  bookView.initDetailView = function(ctx) {
    $('.container').hide();
    $('.singleBookView').show();
    let template = Handlebars.compile($('#detailTemplate').text());
    $('detailView').append(template(ctx.book));
  };

  bookView.initFormView = function() {
    $('.container').hide();
    $('.formView').show();
    let newBook = {
      
    };

    module.Book.newBook(newBook)
  };

  module.bookView = bookView;
})(app);

$(function() { //document.ready function. Runs on page load.
  app.Book.fetchAll(app.bookView.initIndexPage);
});