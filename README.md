# Closet Roulette

Closet Roulette is an app for the fashion-oriented. After logging in, you can upload and categorize your clothing to form your virtual wardrobe. Then, with your guidance, Closet Roulette will generate a random outfit for you to wear. If you like the results, you can save the ensemble -- and even track the dates you've worn it.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

For OAuth with MongoDB, you will need:
 - knowledge of Node.js and Express with routing
 - an Mlab account with database
 - the Google+ API set up in Google's developers console

Additionally, you will need to download Passport with the desired strategy. In this example, we will use Google:
```
yarn add passport passport-google-oauth20
```
You will also need to install mongoose and cookie-session:
```
yarn add mongoose
yarn add cookie-session
```

### Installing

After implementing a server with Express, the routes used by OAuth need to be created. For this 'routes' and the file 'auth.routes.js' are made.
Inside 'auth-routes.js' Express and Passport are needed:

```
const router = require("express").Router();
const passport = require("passport");
```

With the auth login route ready to implement in front end,

```
router.get("/login", (req, res) => {
  res.send("Please login");
});
```
The logout route,

```
router.get("/logout", (req, res) => {
  // handle with passport
  req.logout();
  res.redirect("/");
});
```
the authentication with Google+

```
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);
```
and the callback route for Google to redirect to

```
```

## Built With

* React
* Node
* MongoDB

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

* **Devon Bacon** 
* **Nedu Robert** 
* **Ellen Nitchals** 
* **Julian Alexander Pineyro** 
* **Justin Mathew** 


## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Acknowledgments

The authors of this project would like to thank our friends at Lambda School for their support.