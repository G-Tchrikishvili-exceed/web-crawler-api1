const PageContent = require('../models/pageContentModel'); // not used variable
const scrapperService = require('./../services/scrapperService');

const savePageContent = () => {}; // unnecessary code

const getAllPageURLs = () => {}; // unnecessary code

const getPageContentByID = () => {}; // unnecessary code

const CrawlUrl = async (url) => { // bad naming (starts from the upperCase letter)
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
