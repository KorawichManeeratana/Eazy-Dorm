const express = require("express");
const insertCommentController = require("../../../controller/comment/insertComment");

const router = express.Router();

router.post('/submit_comment', (req, res) => {
    insertCommentController(req.body.dorm_id, req.body.user_id, req.body.comment, req.body.rating)
    .then(result => res.status(result.status).send(result))
    .catch(error => res.status(500).send(error));
});

module.exports = router;