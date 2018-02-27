'use strict';
var app = app || {};
(module => {
  var bookview = {};

  bookView.create = () => {
    var book;
    $('.my-books').empty();

    book = new Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      isbn: $('#book-isbn').val(),
      image_url: $('#book-image').val(),
      description: $('#book-desription').val(),
    });

    $('.my-books').append(Book.toHtml());
    // $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  bookView.initIndexPage = () => {
    app.Books.all.forEach(a => $('.).append(a.toHtml());
    // $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  module.articleView = articleView;
})(app);