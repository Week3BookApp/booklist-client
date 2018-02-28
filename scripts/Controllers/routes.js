'use strict';

page('/', app.bookView.initIndexPage);
page('/detailView/:id',ctx => app.Book.fetchOne(ctx, app.bookView.initDetailView));
page('/formView', app.bookView.initformView);

page();