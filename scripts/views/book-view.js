'use strict';
var app = app || {};

(module => {
  const bookView = {};

  bookView.initIndexPage = function() {
    $('.container').hide(); // hide anything with the container tag. Allows for easy view swapping
    $('.bookView').show(); //show the book section
    module.Book.all.map(book => $('#bookListUl').append(book.toHtml())); //for each book in the Book.all array make a new template li
  };

  bookView.reset = () => {
    $('.container').hide();
  };

  bookView.initDetailView = function(ctx) {
    bookView.reset();
    $('.detailView').show();
    let template = Handlebars.compile($('#detailTemplate').text());
    $('.detailView').append(template(ctx));
  };

  bookView.initFormView = function() {
    bookView.reset();
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
      module.Book.newBook(newBook);
    });
  };

  bookView.initUpdateView = function() { //added in lab 13 for update
    bookView.reset();
    $('.formView').show();
    $('.newBookForm').on('submit', function(event) {
      event.preventDefault();
      let updateBook = {
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      module.Book.update(updateBook);
    });
  };

  module.bookView = bookView;
})(app);