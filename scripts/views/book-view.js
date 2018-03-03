'use strict';
var app = app || {};

(module => {
  const bookView = {};

  bookView.reset = () => {
    $('.container').empty(); // Clear the contents of the container
    $('.container').hide(); // hide anything with the container tag. Allows for easy view swapping
    $('.containerHeader').hide();
  };
  bookView.initIndexPage = function() {
    bookView.reset();
    $('.bookView').show();
    module.Book.all.map(book => $('#bookListUl').append(book.toHtml())); //for each book in the Book.all array make a new template li
  };

  bookView.initDetailView = function(ctx) {
    bookView.reset();
    $('.detailView').show();
    let template = Handlebars.compile($('#detailTemplate').text());
    $('.detailView').append(template(ctx));
  };

  bookView.initFormView = function() {
    $('.container').hide();
    $('.formView').show();
    $('.newBookForm').off('submit');
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
  bookView.initUpdateView = function(ctx) { //added in lab 13 for update
    $('.container').hide();
    $('.updateView').show();
    let template = Handlebars.compile($('#updateTemplate').text());
    $('.updateView').append(template(ctx.book));
    $('.newBookForm').off('submit');
    $('.updateBookForm').on('submit', function(event) {
      event.preventDefault();
      let newBook = {
        id: ctx,
        title: event.target.title.value,
        author: event.target.author.value,
        isbn: event.target.isbn.value,
        image_url: event.target.image_url.value,
        description: event.target.description.value,
      };
      module.Book.update(newBook);
    });
  };

  module.bookView = bookView;
})(app);