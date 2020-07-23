require('dotenv').config();
const chai = require('chai');
const axios = require('axios');
const { expect } = chai;
const should = chai.should();
// const productMockData = require('./mockdata/product.json');
// const { product, updateProduct } = productMockData;
const url = 'https://en.wikipedia.org/wiki/Main_Page';
describe('get crawled items', () => {
  it('GET /crawler-api/get-all', async () => {
    const response = await axios.get(
      `${process.env.API_URL}crawler-api/get-all`
    );
    expect(response.status).to.equal(200);
    response.data.should.be.an(`array`);
    // response.data.should.have.property(`crawledItems`);
    console.log(response.data);
  });
});

describe('add cralwled item in db and get this item', () => {
  it('POST /crawler-api', async () => {
    const response = await axios.post(
      `${process.env.API_URL}crawler-api`,
      {
        url,
      },
      { timeout: 10000 }
    );
    expect(response.status).to.equal(200);
    response.data.should.be.an(`object`);
    response.data.should.have
      .property(`result`)
      .that.is.not.empty.and.has.property(
        'h1',
        'h2',
        'h3',
        'links',
        '_id',
        'url',
        'date_crawled'
      );
    // Object.values(response.data.result).map((key) => {
    //   key.should.be.an('array');
    // });
  });
});
