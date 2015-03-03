'use strict';

exports.seed = function(knex, Promise) {
  return knex('books').insert([
  {
    title: "Secondhand",
    photographer : "Misc.",
    nationality : "Misc.",
    type : "Exhibition Catalog",
    genre : "",
    textby : "",
    publisher : "Pier 24 Photography",
    isbn : "978-0-9839917-5-5",
    year : "2014",
    tags : "archives, appropriation, institutions, Bay Area, curation",
    comments : "What an interesting show.",
    signed : false,
    created_at: new Date(),
    updated_at: new Date(),
    user_id: 7
  },
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
  signed : false,
  created_at: new Date(),
  updated_at: new Date(),
  user_id: 7
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
  signed : true,
  created_at: new Date(),
  updated_at: new Date(),
  user_id: 7
},
])
}
