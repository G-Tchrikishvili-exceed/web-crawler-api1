const cheerio = require('cheerio');
const got = require('got');

const getURLLinks = async (body) => {
  const result = { links: [], h1: [], h2: [], h3: [] };
  const $ = cheerio.load(body);
  const re = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi
  );
  const tags = $('a');
  const links = tags.filter((link) => link.attribs?.href);

  Object.keys(links).forEach((key) => {
    const link = links[key];
    Object.keys(link).forEach((k) => {
      const filteredLink = link[k].attribs?.href;
      if (filteredLink?.match(re)) {
        result.links.push(filteredLink);
      }
    });
  });

  result.h1 = tagsGenerator($, 'h1');
  result.h2 = tagsGenerator($, 'h2');
  result.h3 = tagsGenerator($, 'h3');
  //here ^^^  we can use looping method to create the result
  return result;
};

const tagsGenerator = ($, tagType) => {  //bad naming. functions should be called as verbs  $ - bad argument naming
  const tagarray = [];
  const tags = $(tagType);

  tags.map((_, element) => {  // why do you use map method and then push to another array? => tagarray = tags.map()
    tagarray.push($(element).text());
  });
  return tagarray;
};

const parsePage = async (url) => {
  try {
    const response = await got(url);
    const { body } = await response; // do we need `await` here?
    const crawledResults = await getURLLinks(body);
    return crawledResults;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  parsePage,
};
