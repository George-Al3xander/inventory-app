const express = require('express');
const router = express.Router();
const controller = require("../controllers/categoryController.js")


router.get('/', controller.index);
router.get('/new', controller.new_category_page);
router.post('/new', controller.new_category_page_send);
router.get("/:id", controller.details);
router.get("/:id/update", controller.update_page);
router.post("/:id/update", controller.update_page_send);
router.get("/:id/delete", controller.delete_req);

module.exports = router;

