'use strict';
var app = app || {};

(module => {
  const bookView = {};

  bookView.reset = () => {
    $('.container').empty();
    $('.container').hide();
    $('.containerHeader').hide();
  };
  bookView.initIndexPage = function() {
    bookView.reset();
    $('.bookView').show();
    module.Book.all.map(book => $('#bookListUl').append(book.toHtml())); 
  };

  bookView.initDetailView = function(ctx) {
    bookView.reset();
    $('.detailView').show();
    let template = Handlebars.compile($('#detailTemplate').text());
    $('.detailView').append(template(ctx));

    $('#deleteBook').on('click', function() {
      module.Book.delete($(this).data('book_id'));
    });
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
  bookView.initUpdateView = function(ctx) {
    $('.container').hide();
    $('.updateView').show();
    let template = Handlebars.compile($('#updateTemplate').text());
    $('.updateView').append(template(ctx));
    $('.updateBookForm').on('submit', function(event) {
      event.preventDefault();
      let updateBook = {
        id: event.target.book_id.value,
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