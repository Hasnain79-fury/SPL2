const express = require('express');
const router = express.Router();

// Home route: Render the home page
router.get('/', (req, res) => {
  const user = req.user || null; // Optional: Pass user info if logged in
  res.render('pages/home', { user });
});



module.exports = router;
