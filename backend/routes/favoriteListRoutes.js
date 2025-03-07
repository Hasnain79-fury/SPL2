const express = require('express');
const router = express.Router();
const favoriteListController = require('../controllers/favoriteListController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/favoriteLists/:id', favoriteListController.getFavoriteLists);
router.get('/addPostToFavorites/:id', favoriteListController.renderAddPostToFavorites);
router.post('/createFavoriteList', favoriteListController.createFavoriteList); // Add this line


router.post('/addBlogToFavoriteList', favoriteListController.addBlogToFavoriteList);
router.get('/selectFavoriteList', authMiddleware, favoriteListController.renderSelectFavoriteList); // Add authMiddleware

module.exports = router;
