const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary');
const fs = require('fs');

const port = process.env.PORT || 5000;
const User = require("./models/userModel");
const Item = require("./models/itemModel");
const Outfit = require("./models/outfitModel");

const keys = require("./config/keys");

require('dotenv').config();
// to be changed later when cloud is changed to a clean non testing one
// key and secret will be stored in the .env
cloudinary.config({
  cloud_name: 'cloudtesting',
  api_key: '465735684648442',
  api_secret: 'HVxIWBW7bQaBHJygz_qiprAfwok',
});



const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");

const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const stripeRoutes = require("./routes/stripe-routes");
const userRoutes = require("./routes/user-routes");

// set up server
const server = express();
const corsOptions = {
  origin: "*",
  credentials: true
}

// set up middlewares
server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());
server.use(cors());

//set up cookie-session
server.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: process.env.COOKIE_KEY
  })
);

// const upload = multer({
//   dest: './uploads/',
//   rename: (fieldname, filename) => {
//     return (filename + '.png');
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

// set up passport. Initialize
server.use(passport.initialize());
server.use(passport.session());

// set up routes
server.use("/auth", authRoutes);
server.use("/profile", profileRoutes);
server.use("/pay", stripeRoutes);
server.use("/user", userRoutes)

mongoose.connect(process.env.DB_URI, {useNewUrlParser:true}).then(() => {

  console.log("Connected to MongoDB");
});

server.get("/", (req, res) => {
  res.status(200).json("Server running");
});


// Add a new user to the database
server.post("/signup", (req, res) => {
  const { username, password, email } = req.body;
  User.create({ username, password, email })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

const jekmsUpload = multer({ storage: storage });
// const upload = multer({ dest: './uploads' });
// Add a new item to the database
server.post("/item", jekmsUpload.single('image'), (req, res) => {
  // console.log('req.body: ' + req.body);
  const { user, name, type, tags } = req.body;
  const { originalname } = req.file;
  // console.log(req.file);
  cloudinary.uploader.upload(`./uploads/${originalname}`, (result) => {
    fs.unlinkSync(`./uploads/${originalname}`);
    const {width, height, url} = result;
    let cropWidth = width, cropHeight = height;
    while(cropWidth >= 300 || cropHeight >= 200) {
      cropWidth *= .9, cropHeight *= .9;
    }
    const crop = `/upload/w_${cropWidth.toFixed(0)},h_${cropHeight.toFixed(0)}/`;
    const [partOne, partTwo] = url.split('/upload/');
    const image = partOne + crop + partTwo;
    Item.create({ user, name, image, type, tags })
      .then(item => {
        res.status(201).json(item);
      })
      .catch(err => {
        res.send(500).json(err);
      });
  });
});

// Delete a specific item
server.delete("/item/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(res.status(200).json(`successfully deleted item ${req.params.id}`))
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Add a new outfit to the database
server.post("/outfit", (req, res) => {
  const { user, name, tags, worn, top, bottom, shoes } = req.body;
  Outfit.create({ user, name, tags, worn, top, bottom, shoes })
    .then(outfit => {
      res.status(201).json(outfit);
    })
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Delete a specific outfit
server.delete("/outfit/:id", (req, res) => {
  Outfit.findByIdAndRemove(req.params.id)
    .then(res.status(200).json(`successfully deleted outfit ${req.params.id}`))
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Add an array of tags to a specific item
server.post("/item/tags/:id", (req, res) => {
  const { tags } = req.body;
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      item.tags = item.tags.concat(tags);
      item.save();
    })
    .then(res.status(200).json("success!"))
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Get a specific item of clothing by ID
server.get("/item/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Get a specific outfit by ID
server.get("/outfit/:id", (req, res) => {
  const id = req.params.id;
  Outfit.findById(id)
    .then(outfit => {
      res.status(200).json(outfit);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Get all of a user's items with a certain tag
server.get("/search/:user/:tag", (req, res) => {
  const { tag, user } = req.params;
  Item.find({
    tags: tag,
    user: user
  })
    .populate()
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Get all items for a user
server.get("/:user/items", (req, res) => {
  const user = req.params.user;
  Item.find({
    user
  })
    .populate()
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Get all outfits for a user
server.get("/:user/outfits", (req, res) => {
  const user = req.params.user;
  Outfit.find({
    user
  })
    .populate()
    .then(outfits => {
      res.status(200).json(outfits);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Get items by type
server.get("/items/:type", (req, res) => {
  const { type } = req.params;
  Item.find({
    type
  })
    .populate()
    .then(items => {
      res.status(200).json(items);
    })
    .catch(err => {
      res.status(500).json({ message: 'Items could not be retreived at this time.' })
    });
});

// Get items by type for a user
server.get("/:user/items/:type", (req, res) => {
  const { user, type } = req.params;
  Item.find({
    type,
    user
  })
  .populate()
  .then(items => {
    res.status(200).json(items);
  })
  .catch(err => {
    res.status(500).json({ message: 'Items could not be retreived at this time.'})
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
