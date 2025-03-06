const RegisteredUser = require('../models/RegisteredUser');
const FavoriteList = require('../models/FavoriteList');
const Blog = require('../models/Blog');

// Function to add post to favorite list
exports.addPostToFavorites = async (req, res) => {
  try {
    const { userId, postId, favListId } = req.body;
    console.log(req.body);


    const user = await RegisteredUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const favoriteList = await FavoriteList.findById(favListId);
    if (!favoriteList) {
      return res.status(404).json({ error: 'Favorite list not found' });
    }

    // Check if the post is already in the favorite list
    if (favoriteList.blogs.includes(postId)) {
      return res.status(400).json({ error: 'Post already in favorite list' });
    }

    favoriteList.blogs.push(postId);
    await favoriteList.save();
    res.status(200).json(favoriteList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add post to favorites' });
  }
};
// Function to render favorite lists
exports.getFavoriteLists = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favoriteLists = await FavoriteList.find({ user: userId }).populate('blogs');
    res.render('pages/favoriteLists', { favoriteLists });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve favorite lists' });
  }
};

// Function to render add post to favorite list form
exports.renderAddPostToFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favoriteLists = await FavoriteList.find({ user: userId });
    res.render('pages/addPostToFavorites', { favoriteLists, userId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load form' });
  }
};
