const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary');

const Item = require("../models/itemModel");

const router = require("express").Router();


require('dotenv').config();
cloudinary.config({
  cloud_name: 'cloudtesting',
  api_key: '465735684648442',
  api_secret: 'HVxIWBW7bQaBHJygz_qiprAfwok',
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })

const jekmsUpload = multer({ storage: storage });
// const upload = multer({ dest: './uploads' });
// Add a new item to the database
router.post("/", jekmsUpload.single('image'), (req, res) => {
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

// Get all items for a user
router.get("/:user", (req, res) => {
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

// Get a specific item of clothing by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

// Delete a specific item
router.delete("/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(res.status(200).json(`successfully deleted item ${req.params.id}`))
    .catch(err => {
      res.send(500).json({ error: err.message });
    });
});

// Add an array of tags to a specific item
router.post("/tags/:id", (req, res) => {
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

// Get items by type for a user
router.get("/:user/:type", (req, res) => {
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
        res
          .status(500)
          .json({ message: "Items could not be retreived at this time." });
      });
  });

  // Get all of a user's items with a certain tag
router.get("/search/:user/:tag", (req, res) => {
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

  module.exports = router;


// Get items by type
// Should probably be deprecated, keeping the code just in case
// router.get("/items/:type", (req, res) => {
//     const { type } = req.params;
//     Item.find({
//       type
//     })
//       .populate()
//       .then(items => {
//         res.status(200).json(items);
//       })
//       .catch(err => {
//         res.status(500).json({ message: 'Items could not be retreived at this time.' })
//       });
//   });

