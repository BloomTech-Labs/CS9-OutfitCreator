## POST to /signup
Create a new User account in the database.
This request should have the following format:
```
{
    "username": "ellen",
    "password": "password123",
    "email": "ellen@email.com"
}
```

## POST to /item
Create a new Item in the database.
This request should have the following format:
```
{
	"user": "5b71ec57a606882af8753934",
    "name": "black flats",
	"image": "www.thisisarealurl.com/shoes",
	"type": "shoes",
	"tags": ["black", "formal"]
}
```

## POST to /item/:id/tags
Add an array of one or more tags to a specific item.
`:id` refers to the mongoDB _id of the item.
This request should have the following format:
```
{
	"tags": ["red", "business-casual"]
}
```

## DELETE to /item/:id
Delete an Item from the database.
`:id` refers to the mongoDB _id of the item to delete.

## POST to /outfit
Add an outfit to the database.
This request should have the following format:
```
{
	"user": "5b71ec57a606882af8753934",
    "name": "christmas party outfit",
	"tags": ["formal", "work"],
	"worn": [],
	"top": ["5b71ec57a606882af8789934", "5b71ec57a606882af8789937"],
	"bottom": ["5b71ec8ba606882af8789935"],
	"shoes": "5b71ecafa606882af8789936"
}
```

## DELETE to /outfit/:id
Delete an Outfit from the database.
`:id` refers to the mongoDB _id of the outfit to delete.

## GET to /:user/items
Get all Items for a User. Returns an array of Item objects.
`:user` refers to the mongoDB _id of the user.

## GET to /:user/outfits
Get all Outfits for a User. Returns an array of Outfit objects.
`:user` refers to the mongoDB _id of the user.

## GET to /item/:id
A GET request for a specific item by ID. Returns an object like this:
```
{
    "profile": "5b71ec57a606882af8753934",
    "tags": [
        "red",
        "christmas"
    ],
    "_id": "5b730ebe353aa20014aac581",
    "name": "red sweater",
    "image": "www.thisisarealurl.com/sweater",
    "type": "top",
    "__v": 0
}
```

## GET to /outfit/:id
A GET request for a specific outfit by ID. Returns an object like this:
```
{
    "profile": "5b71ec57a606882af8753934",
    "tags": [
        "formal",
        "work"
    ],
    "worn": [],
    "top": [
        "5b730e92353aa20014aac580",
        "5b730ebe353aa20014aac581"
    ],
    "bottom": [
        "5b730e67353aa20014aac57f"
    ],
    "_id": "5b730edf353aa20014aac582",
    "name": "christmas party outfit",
    "shoes": "5b730e26353aa20014aac57e",
    "__v": 0
}
```

## GET to /search/:user/:tag
A GET request for items with a specific tag. Returns an array of populated Item objects.
`:user` refers to the mongodb ID for that user profile.
`:tag` is a string to search for in item tags.