
const express = require('express')
const router = express.Router();

const { sendPageViewData, getPageViewData, updateTableData } = require('../controllers/pageEventApi');

router.route('/').get(getPageViewData).post(sendPageViewData).patch(updateTableData);

module.exports = router;