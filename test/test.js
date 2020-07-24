require('dotenv').config();
const chai = require('chai');
const axios = require('axios');
const { expect } = chai;
const should = chai.should();

const url =
  'https://jsmanifest.com/7-reasons-higher-order-functions-can-improve-your-life/';

describe('get crawled items', () => {
  it('GET /crawler-api/get-all', async () => {
    const response = await axios.get(
      `${process.env.API_URL}crawler-api/get-all`
    );

    const { data, status } = response;

    expect(status).to.equal(200);

    data.should.be.an(`array`);

    if (data.length) {
      data.forEach((item) => {
        item.h1.should.be.an('array');
        item.h2.should.be.an('array');
        item.h3.should.be.an('array');
        item.links.should.be.an('array');
        item._id.should.be.an('string').that.is.not.empty;
        item.url.should.be.an('string').that.is.not.empty;
        item.date_crawled.should.be.an('string').that.is.not.empty;
      });
    }
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

    const { data, status } = response;

    expect(status).to.equal(200);

    data.should.be
      .an(`object`)
      .that.is.not.empty.and.has.property(
        'h1',
        'h2',
        'h3',
        'links',
        '_id',
        'url',
        'date_crawled'
      );
    data.h1.should.be.an('array');
    data.h2.should.be.an('array');
    data.h3.should.be.an('array');
    data.links.should.be.an('array');
    data._id.should.be.an('string').that.is.not.empty;
    data.url.should.be.an('string').that.is.not.empty;
    data.date_crawled.should.be.an('string').that.is.not.empty;
  });
});
