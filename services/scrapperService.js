const cheerio = require('cheerio');
const got = require('got');

const getURLLinks = async (body) => {
  try {
    const result = { links: [], h1: [], h2: [], h3: [] };
    const $ = cheerio.load(body);
    const re = new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
    );
    const allLinks = $('a');
    const linksWithAttr = allLinks.filter((link) => link.attribs?.href);

    Object.keys(linksWithAttr).forEach((key) => {
      const link = linksWithAttr[key];
      Object.keys(link).forEach((k) => {
        const filteredLink = link[k].attribs?.href;
        if (filteredLink?.match(re)) {
          result.links.push(filteredLink);
        }
      });
    });

    let tags = ['h1', 'h2', 'h3'];
    tags.forEach((tag) => {
      result[tag] = tagsGenerator($, tag);
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

const tagsGenerator = (body, tagType) => {
  const tagarray = [];
  const tags = body(tagType);

  tags.map((_, element) => {
    tagarray.push(body(element).text());
  });

  return tagarray;
};

const parsePage = async (url) => {
  try {
    const response = await got(url);
    const { body } = response;
    const crawledResults = await getURLLinks(body);
    return crawledResults;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  parsePage,
};
