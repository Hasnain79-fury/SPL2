const Blog = require('../models/Blog');
const Rating = require('../models/Rating');

exports.updateRating = async (req, res) => {
  try {
    const { userId, rating } = req.body;
    const blogId = req.params.id;

    // Find existing rating
    let userRating = await Rating.findOne({ blog: blogId, user: userId });
    if (userRating) {
      userRating.rating = rating;
    } else {
      userRating = new Rating({ blog: blogId, user: userId, rating });
    }
    await userRating.save();

    // Calculate average rating
    const ratings = await Rating.find({ blog: blogId });
    const averageRating = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;

    // Update blog with average rating
    const blog = await Blog.findById(blogId);
    blog.rating_point = averageRating;
    await blog.save();

    res.redirect('/blogs');
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send('Server error');
  }
};