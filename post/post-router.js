const express = require('express');
const router = express.Router();
const Posts = require('../data/db.js');

// Get /posts
router.get('/', (req, res) => {
  Posts.find(req.body)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        message: 'The post information could not be retrieved.',
      })
    })
})

// Get /post/:id
router.get('/:id', (req, res) => {
  Posts
    .findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The comments information could not be retrieved."
      })
    })
})

// Get /posts/:id/comments
/*router.get('/:id/comments', async (req, res) => {
  try {
      const comments = await Posts.findCommentsById(req.params.id);

      if (comments.length > 0) {
          res.status(200).json(comments);
      } else {
          res.status(404).json({ 
            message: 'The post with the specified ID does not exist.' 
          });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'The comments information could not be retrieved.',
      });
  }
});*/

// Post /posts
router.post('/', (req, res) => {
  Posts
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error retrieving the post',
    });
  });
});

// Post /posts/:id/comments
router.post('/:id/comments', async (req, res) => {
  const commentsInfo = { ...req.body, post_id: req.params.id}
  try {
    const comments = await Posts.insertComment(commentsInfo);
    res.status(201).json(comments);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: 'There was an error while saving the comment to the database'
    })
  }
})

// Delete /posts/:id
router.delete('/:id', (req, res) => {
  Posts
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "Your post has been removed"
        })
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The post could not be removed"
      })
    })
})

// Put /posts/:id
router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts
    .update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist." 
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "The post information could not be modified."
      })
    })
})

module.exports = router;