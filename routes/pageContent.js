const express = require('express');
const router = express.Router();
const scrapperService = require('./../services/scrapperService');
const model = require('./../models/pageContentModel');
const crawledModel = model.crawled;
/* GET URLs listing. */
router.post('/', async (req, res) => {
  try {
    const { url } = req.body;
    const content = await scrapperService.parsePage(url);
    const { h1, h2, h3, links } = content;

    const item = {
      url,
      h1,
      h2,
      h3,
      links,
      created_at: new Date(),
    };

    const crawledItem = new crawledModel(item);

    await crawledItem.save();

    res.status(200).send(crawledItem);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/all', async (req, res) => {
  try {
    const crawledItems = await crawledModel.find();
    res.status(200).send(crawledItems);
  } catch (error) {
    res.status(500).send({ code: 'error', error });
  }
});

module.exports = router;
