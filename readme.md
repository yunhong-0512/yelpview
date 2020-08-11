ROUTES

name      url                verb      desc.
========================================================================
INDEX     /campgrounds       GET     Display a list of all campgrounds
NEW       /campgrounds/new   GET     Display form to make a new campgrounds
CREATE    /campgrounds       POST    Add new campgrounds to DB
SHOW      /campgrounds/:id   GET     Show info about one dog  

NEW       /campgrounds/:id/comments/new  GET
CREATE    /campgrounds/:id/comments    POST