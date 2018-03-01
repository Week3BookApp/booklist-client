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
    $('.newBookForm').on('submit', function(event) {
      event.preventDefault();
      let newBook = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
    });
  };

  bookView.initUpdateView = function() { //added in lab 13 for update
    $('.container').hide();
    $('.formView').show();
    $('.newBookForm').on('submit', function(event) {
      event.preventDefault();
      let newBook = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
    });
  };
    
  module.bookView = bookView;
})(app);