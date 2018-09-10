# /auth
## /auth/signup
POST - Register a User
This request should have the following format:
```
{
    "username": "user123",
    "password": "password123",
    "email": "user@email.com"
}
```
## /auth/login 
POST - Login a User
This request should have the following format:
```
{
    "username": "user123",
    "password": "password123",
    "email": "user@email.com"
}
```

# /Pay
## /Pay/Charge
POST - Start a user subscription in Stripe.
## /Pay/Cancel
POST - End a user subscription in Stripe.

# /User
## /User/Info/:ID
GET - Get user information by ID. Returns the User object.
## /User/Subscribe/:ID
POST - Mark a user as subscribed: true.
## /User/Unsubscribe/:ID
POST - Mark a user as subscribed: false.

# /Items
## /Items/
POST - Create a new Item.
This request should have the following format:
```
{
	"user": "5b71ec57a606882af8753934",
    "name": "black flats",
	"image": "www.thisisarealurl.com/shoes",
	"type": "shoes",
    "subtype": "formal shoes",
	"tags": ["black", "formal"]
}
```
## /Items/User/:User
GET - Get items for a user by ID. Returns an array of Item objects.
## /Items/:ID
GET - Get a specific item by ID. Returns a single Item object:
```
{
    "user": "5b71ec57a606882af8753934",
    "tags": [
        "red",
        "christmas"
    ],
    "_id": "5b730ebe353aa20014aac581",
    "name": "red sweater",
    "image": "www.thisisarealurl.com/sweater",
    "type": "top",
    "subtype": "sweater",
    "__v": 0
}
```
PUT - Edit an item's name, type, and tags.
This request should have the following format:
```
{
    "name": "new item name",
    "type": "shoes",
    "subtype": "formal shoes",
    "tags": ["new tags", "in an array"]
}
```
DELETE - Delete a specific item by ID.
## /Items/Tags/:ID
POST - Add an array of tags to a specific item by ID.
This request should have the following format:
```
{
	"tags": ["red", "business-casual"]
}
```
## /Items/Type/:User/:Type
GET - Get items by Type for a specific User. Returns an array of Item objects.
## /Items/Subtype/:User/:Subtype
GET - Get items by Type for a specific User. Returns an array of Item objects.
## /Items/Search/:User/:Tag
GET - Get items by Tag for a specific User. Returns an array of Item objects.

# /Outfits
## /Outfits/
POST - Create a new Outfit.
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
## /Outfits/:User
GET - Get all outfits for a user by ID. Returns an array of Outfit objects.
## /Outfits/:ID
GET - Get a specific outfit by ID. Returns a single Outfit object:
```
{
    "user": "5b71ec57a606882af8753934",
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
PUT - Edit an outfit's name, tags, top(s), bottom(s), and shoes.
This request should have the following format:
```
{
    "name": "new outfit name",
    "tags": ["new tags", "in an array"],
    "top": [
        "5b730e92353aa20014aac580",
        "5b730ebe353aa20014aac581"
    ],
    "bottom": [
        "5b730e67353aa20014aac57f"
    ],
    "shoes": "5b730e26353aa20014aac57e"
}
```
DELETE - Delete a specific outfit by ID.
## /Outfits/Tags/:ID
POST - Add an array of tags to a specific item by ID.
This request should have the following format:
```
{
	"tags": ["red", "business-casual"]
}
```
## /Outfits/Search/:User/:Tag
GET - Get outfits by Tag for a specific User. Returns an array of Item objects.
## /Outfits/Wear/:ID
POST - Mark an outfit as worn on a specific date.
The body for this request should contain a date-format string.