# **Closet Roulette**

### *Create your own style, combine your latest fashion trends, save your best collections and be bold and randomize for a new outfit everyday with Closet Roulette!*

Closet Roulette is an app for the fashion-oriented. After logging in, you can upload and categorize your clothing to form your virtual wardrobe. Then, with your guidance, Closet Roulette will generate a random outfit for you to wear. If you like the results, you can save the ensemble -- and even track the dates you've worn it.

## **Deployment**

Closet Roulette is deployed with [Heroku](https://www.heroku.com/) and developed with the MERN Stack.
- [MongoDB](https://www.mongodb.com/)
- [Express](https://www.npmjs.com/package/express)
- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org)


![MERN](MERNSTACK.jpg)

### **Frontend**
```
https://lambda-outfit-creator.herokuapp.com 
```
The frontend of Closet Roulette is created with [React.js](https://reactjs.org/), structured with [react-router](https://www.npmjs.com/package/react-router) and connected via [axios](https://www.npmjs.com/package/axios) to the backend. 
A clean presentation with a pastel color palette has been chosen in order to provide the smoothest experience to the users by following UX design guidelines.

The general frontend structure consists on:
- The Landing page, with sign up and log in modal with OAuth option and email verification.
- The "New Outfit" clothing collection creating page.
- The "Add Item" for users to add their own articles of clothing via Cloudinary by url, phone camera, Facebook, Instagram or local files.
- The "My Closet" page to review previously saved collections.
- The "Archive" page
- The "Settings" page, accessed by clicking on the username on the top right corner of the application. Here the premium subscription can be aquired by [Stripe](https://stripe.com) payment, as well as the option to change the password.

### **Backend** 
```
https://lambda-outfit-creator-api.herokuapp.com
```
Closet Roulette's backend is created with [Node.js](https://nodejs.org) and [Express](https://www.npmjs.com/package/express) to communicate with the databases needed for the frontend. We have implemented [Stripe](https://stripe.com), [OAuth](https://oauth.net), [Cloudinary](https://cloudinary.com/), [SendGrid](https://sendgrid.com/), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [cors](https://www.npmjs.com/package/cors), [helmet](https://www.npmjs.com/package/helmet), [mongoose](https://www.npmjs.com/package/mongoose), [morgan](https://www.npmjs.com/package/morgan) and [Passport](http://www.passportjs.org/) with [Google](https://www.npmjs.com/package/passport-google-oauth20), [Facebook](https://www.npmjs.com/package/passport-facebook) and [GitHub](https://www.npmjs.com/package/passport-github2) strategies.

### **Additional Information**

- Progress has been managed in the following Trello board: 
  - https://trello.com/b/Y8dfhfIR/outfit-maker.
- The styling BEM convention is followed by this project.
- The code has been formatted uniformly by using [Prettier](https://prettier.io/).

## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### **Prerequisites**

You will need [Node.js](https://nodejs.org) to run Closet Roulette locally.

Start installing the necessary modules with 
```
yarn
```

On the `root`, `backend` and `frontend/outfitcreator` folder.

Start the servers with 
```
yarn start
```

By running the command on the `backend` and `frontend/outfitcreator` folder simultaneously.

Next, create a `.env` file in the backend folder to store all sensitive infomation. In this file you will store API client IDs, keys and Secrets as well as URIs and additional data of confidential nature.

### *MongoDB setup and URI retrieval*

We will need to create an [mLab](https://mlab.com/) account and database to retrieve the Mongo URI and get it ready to store the necessary data.

The Mongo URI should be then copied and pasted in the newly created `.env` file. It should look like this:
```
 DB_URI=mongodb://user:password@dsXXXXX.mlab.com:XXXXX/your-db-name
```
### *APIs Setup*

Next, we need to create the necessary APIs to enable OAuth:

*Google+ API*

You need a standard [Google](www.gmail.com) account, create one if needed.

Go to Google's [*developers page*](https://console.developers.google.com) and create the Google + API.

Copy the client ID and secret and paste it in your `.env` file. It should look like this:
```
CLIENT_ID=XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
CLIENT_SECRET=XXXX_XXXXXXXXXXXXXXXXXXX
```
 Then, add the following credentials:
 - Authorized origins
   - https://localhost:5000/
   - http://localhost:5000/

- Authorized Redirect URIs
  - https://localhost:5000/auth/google/redirect
  - http://localhost:5000/auth/google/redirect

Finally, don't forget to enable the API.

*Facebook API*

You need a standard [Facebook](www.facebook.com) account, create one if needed.

Go to Facebook's [*developers page*](https://developers.facebook.com), create a new app and add the Facebook Login product.

To enable the API is necessary to provide a Privacy Policy, copy and paste the link to the Closet Roulette's Privacy Policy to the Privacy Policy URL:
- https://docs.google.com/document/d/1DUa1d93umrnLQn0njLuOpy0CBs_QSEFEYoQl5EYaQu8/edit?usp=sharing

Copy the client ID and secret and paste it in your `.env` file. It should look like this:
```
FB_CLIENT_ID=XXXXXXXXXXXXXXX
FB_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
 Then, add the following credentials:
 - Authorized origins
   - https://localhost:5000/
   - http://localhost:5000/

- Authorized Redirect URIs
  - https://localhost:5000/auth/facebook/callback

Take note that in order to make Facebook OAuth operational in localhost we need to provide a local SSL to host in HTTPS. Facebook no longer accepts unsecured connections. A tutorial to implement this will be added in the future.

*GitHub API*

You need a standard [GitHub](www.github.com) account, create one if needed.

Go to GitHub's [*developers settings*](https://github.com/settings/developers) and click on "New OAuth App" to start.

Copy the client ID and secret and paste it in your `.env` file. It should look like this:
```
GH_CLIENT_ID=XXXXXXXXXXXXXXXXXXXX
GH_CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
 Then, add the following credentials:
 - Homepage URL
   - https://localhost:5000/
   - http://localhost:5000/

- Authorized Redirect URIs
  - https://localhost:5000/auth/github/callback, http://localhost:5000/auth/github/callback

Finally, enable the API.

*Stripe, SendGrid, etc.*

The credentials and keys should be added to your local `.env` file.


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

* **[Devon Bacon](https://github.com/metalogicoder)**
* **[Ellen Nitchals](https://github.com/enitchals)** 
* **[Julian Alexander Pineyro](https://github.com/Julian-Alexander)** 
* **[Justin Mathew](https://github.com/jekm321)** 
* **[Nedu Robert](https://github.com/Nedu)** 

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Acknowledgments

The authors of this project would like to thank our friends at Lambda School for their support.