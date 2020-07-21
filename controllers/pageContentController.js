const PageContent = require('../models/pageContentModel');
const scrapperService = require('./../services/scrapperService');

const savePageContent = () => {};

const getAllPageURLs = () => {};

const getPageContentByID = () => {};

const CrawlUrl = async (url) => {
  try {
    return await scrapperService.parsePage(url);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  savePageContent,
  getAllPageURLs,
  getPageContentByID,
  CrawlUrl,
};
