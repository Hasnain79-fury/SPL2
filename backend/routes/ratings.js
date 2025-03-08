const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Route to update the rating
router.post('/:id/update-rating', ratingController.updateRating);

module.exports = router;