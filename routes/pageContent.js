const express = require('express');
const router = express.Router();
const pageContentController = require('../controllers/pageContentController');
const model = require('./../models/pageContentModel');
const crawledModel = model.crawled;
/* GET URLs listing. */
router.get('/', async (req, res) => {
  try {
    const { url } = req.query;
    const content = await pageContentController.CrawlUrl(url);
    const { h1, h2, h3, links } = content;
    const saveit = {
      url,
      h1,
      h2,
      h3,
      links,
      date_crawled: new Date(),
    };

    const crawledItem = new crawledModel(saveit);

    await crawledItem.save();

    console.log(saveit);
    res.status(200).send({ result: crawledItem });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/all-crawled', async (req, res) => {
  try {
    const crawledItems = await crawledModel.find();
    res.send({ crawledItems });
  } catch (error) {
    res.send({ code: 'error', error });
  }
});

module.exports = router;
