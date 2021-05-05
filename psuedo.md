# Database

mongodb@atlas

Collections:
users: {
first_name:'
last_name:'
email:,
password:
}

person: {
name:,
shirt_size:,
pants_size:,
dress_size:,
shoe_size
}

wardrobe:
shirt:
{
item: "" //..shirt,pants,dress,shoes
season: "" //..winter,spring,summer,fall
size: "",
picture: "",
in_storage: "",
storage_name: "",
keep: true/false
},
}

- keep: (extra feature: default is true, if false the items is marked to be donated, dold or thrown away)

# Features

- Setup
  create account
  create person (child or the user)
  create wardrobe

- Filters

list all items of person
list items of person by one of [ shirt, pants, dress, shoes ] and one of [season, size]

- Opeations

users, persons, wardrobes: add/edit/modify/delete

# Extra Features

- validations for all inputs and address bar
- token in httppnly cookie
- public area for donations/sales for all users

<!-- --------------------------------------------------------- -->
