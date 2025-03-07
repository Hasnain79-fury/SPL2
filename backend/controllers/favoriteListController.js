const RegisteredUser = require('../models/RegisteredUser');
const FavoriteList = require('../models/FavoriteList');
const Blog = require('../models/Blog');


exports.getFavoriteLists = async (req, res) => {
  try {
    console.log('Request Params:', req.params); 
    const userId = req.params.id; // Correctly retrieve userId from req.params.id
    console.log('User ID:', userId); // Debugging line to check userId

    // Find the user by the default _id field
    const user = await RegisteredUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find favorite lists by the user's ObjectId
    const favoriteLists = await FavoriteList.find({ user: user._id }).populate('blogs');
    res.render('pages/favoriteLists', { favoriteLists, user }); // Pass the user object to the view
  } catch (error) {
    console.error('Error retrieving favorite lists:', error); // Log the error
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

// Function to create a new favorite list
// Function to create a new favorite list

exports.createFavoriteList = async (req, res) => {
  try {
    const { userId, favListName } = req.body;

    // Find the user by the default _id field
    const user = await RegisteredUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new favorite list
    const newFavoriteList = new FavoriteList({
      fav_list_name: favListName,
      user: user._id, // Use the user's ObjectId
      blogs: []
    });

    await newFavoriteList.save();
    res.status(201).json(newFavoriteList);
  } catch (error) {
    console.error('Error creating favorite list:', error); // Log the error
    res.status(500).json({ error: 'Failed to create favorite list' });
  }
};
exports.renderSelectFavoriteList = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?._id; // Assuming you have user information in req.user
    console.log('User ID:', userId);
    const favoriteLists = await FavoriteList.find({ user: userId });
     console.log('Favorite Lists:', favoriteLists);
    const blogId = req.query.blogId;
    console.log('Blog ID:',blogId);
    res.render('pages/selectFavoriteList', { favoriteLists, blogId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load favorite lists' });
  }
};

exports.addBlogToFavoriteList = async (req, res) => {
  try {
      console.log(req.body);
    const { favListId, blogId } = req.body;



    const favoriteList = await FavoriteList.findById(favListId);
    
    if (!favoriteList) {
      return res.status(404).json({ error: 'Favorite list not found' });
    }

    if (favoriteList.blogs.includes(blogId)) {
      return res.status(400).json({ error: 'Blog already in favorite list' });
    }

    favoriteList.blogs.push(blogId);
    await favoriteList.save();

    res.status(200).json(favoriteList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add blog to favorite list' });
  }
};


