'use strict';
var app = app || {};

(module => {
  const bookView = {};

  bookView.initIndexPage = function(ctx) {
    $('.container').hide(); // hide anything with the container tag. Allows for easy view swapping
    $('.bookView').show(); //show the book section
    Book.all.map(book => $('#bookListUl').append(app.book.toHtml())); //for each book in the Book.all array make a new template li
  };

  bookView.initDetailView = function(ctx) {
    $('.container').hide();
    $('.singleBookView').show();
    let template = Handlebars.compile($('#detailTemplate').text());
    $('detailView').append(template(ctx.book));
  };

  bookView.initformView = function(ctx) {
    $('.container').hide();
    $('.singleBookView').show();
    //needs to work with pagejs
  };

  module.bookView = bookView;
})(app);

