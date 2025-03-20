// routes/roadmapRoutes.js
const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');

router.get('/roadmap/:userId', roadmapController.getUserRoadmap);

module.exports = router;
   