require('dotenv').config();
const chai = require('chai');
const axios = require('axios');
const { expect } = chai;
const should = chai.should();
// const productMockData = require('./mockdata/product.json');
// const { product, updateProduct } = productMockData;
describe('crawled', () => {
  it('GET /crawler-api/get-all', async () => {
    const response = await axios.get(
      `${process.env.API_URL}crawler-api/get-all`
    );
    expect(response.status).to.equal(200);
    response.data.should.be.an(`object`);
    console.log(response.data);
    // response.data.productData.should.be.an(`array`);
  });
});
