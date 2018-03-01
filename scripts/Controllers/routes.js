'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/detailView/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailView));
page('/formView', ctx => app.bookView.initformView);

page();