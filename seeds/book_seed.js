'use strict';

exports.seed = function(knex, Promise) {
  return knex('books').insert([
  {
    title: "Protest Photographs",
    photographer : "Chauncey Hare",
    nationality : "American",
    type : "Monograph",
    genre : "Documentary",
    textby : "Chauncey Hare, Judy Wyatt, Jack von Euw",
    publisher : "SteidlKasher",
    isbn : "978-3-86521-495-9",
    year : "2009",
    tags : "B&W, domesticity, interiors, home, family, political, California, labor, Suburbs",
    comments : "",
    signed : "",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
   title : "Incidents",
   photographer : "Henry Wessel",
   nationality : "American",
   type : "Monograph",
   genre : "Street",
   textby : "",
   publisher : "Steidl",
   isbn : "978-3-86930-697-1",
   year : "2013",
   tags : "B&W, California, Bay Area, American West",
   comments : "Has a sense of humor",
   signed : "Signed",
   created_at: new Date(),
   updated_at: new Date()
  },
])
}
