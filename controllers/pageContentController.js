const PageContent = require('../models/pageContentModel');
const scrapperService = require('./../services/scrapperService');

const savePageContent = () => {};

const getAllPageURLs = () => {};

const getPageContentByID = () => {};

const CrawlUrl = async (url) => {
  return await scrapperService.parsePage(url);
};

module.exports = {
  savePageContent,
  getAllPageURLs,
  getPageContentByID,
  CrawlUrl,
};
