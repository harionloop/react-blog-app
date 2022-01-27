const router = require("express").Router();
const User = require("../Model/User");
const Post = require("../Model/Post");
const bcrypt = require("bcrypt");

//Create New  Post


router.post("/", async(req, res) => {

    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }

})

// Update a Post


router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err)
            }
        } else { res.status(401).json("You can update only your posts!!!") }

    } catch (err) {
        res.status(500).json(err)
    }


})

//Delete a post 


router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...")
            } catch (err) {
                res.status(500).json(err)
            }
        } else { res.status(401).json("You can delete only your posts!!!") }

    } catch (err) {
        res.status(500).json(err)
    }


})

//Get Post


router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        res.status(200).json(post)

    } catch (err) {
        res.status(500).json(err)
    }
})




//Get User post by category


// router.get("/", async(req, res) => {
//     const username = req.query.user;
//     const catName = req.query.cat;

//     try {
//         let posts;
//         if (username) {
//             posts = await Post.find({ username: username });
//         } else if (catName) {
//             posts = await Post.find({ categories: { $in: [catName], }, });
//         } else {
//             posts = await Post.find();
//         }
//         res.status.json(posts);
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });

router.get("/", async(req, res) => {
    try {
        const post = await Post.find()

        res.status(200).json(post)

    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;