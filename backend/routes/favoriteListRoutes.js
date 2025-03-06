const express = require('express');
const router = express.Router();
const favoriteListController = require('../controllers/favoriteListController');

router.post('/addPostToFavorites', favoriteListController.addPostToFavorites);
router.get('/favoriteLists/:id', favoriteListController.getFavoriteLists);
router.get('/addPostToFavorites/:id', favoriteListController.renderAddPostToFavorites);


module.exports = router;
