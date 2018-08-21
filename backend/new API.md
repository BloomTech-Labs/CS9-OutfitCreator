# /Auth
## /Auth/Login
## /Auth/Logout
## /Auth/Google
## /Auth/Google/Redirect

# /Profile
## /Profile/

# /Pay
## /Pay/Charge
POST - Start a user subscription in Stripe.
## /Pay/Cancel
POST - End a user subscription in Stripe.

# /User
## /User/Info/:ID
GET - Get user information by ID
## /User/Info/Subscribe/:ID
POST - Mark a user as subscribed: true
## /User/Info/Unsubscribe/:ID
POST - Mark a user as subscribed: false

# /Items
## /Items/
POST - Create a new Item
## /Items/:User
GET - Get items for a user by ID
## /Items/:ID
GET - Get a specific item by ID
DELETE - Delete a specific item by ID
## /Items/Tags/:ID
POST - Add an array of tags to a specific item
## /Items/:User/:Type
GET - Get items by Type for a specific User
## /Items/Search/:User/:Tag
GET - Get items by Tag for a specific User

# /Outfits
## /Outfits/
POST - Create a new Outfit
## /Outfits/:User
GET - Get all outfits for a user by ID
## /Outfits/:ID
GET - Get a specific outfit by ID
DELETE - Delete a specific outfit by ID
