const Tour = require('./../models/tourModel');
class ApiQueryFeatures {
  constructor(queryObj, urlQueryObj) {
    this.queryObj = queryObj;
    this.urlQueryObj = urlQueryObj;
  }
  filter() {
    // console.log('filtering...');
    //hard storing the query from url
    let urlQueryObj = { ...this.urlQueryObj };
    //formatting the hard copy to fit the parameter spec for mongoose methods
    const excludeFields = ['sort', 'page', 'limit', 'fields'];
    excludeFields.forEach((value) => delete urlQueryObj[value]);
    let queryStr = JSON.stringify(urlQueryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    urlQueryObj = JSON.parse(queryStr);
    //filter using the formatted hard copy
    //receives object of type query since await is not used here
    this.queryObj = Tour.find(urlQueryObj);
    //for method chaining
    return this;
  }
  sorting() {
    if (this.urlQueryObj.sort) {
      // console.log('sorting...');
      // console.log(this.urlQueryObj);
      const sortVars = this.urlQueryObj.sort.split(',').join(' ');
      this.queryObj = this.queryObj.sort(sortVars);
      // console.log('sorting end');
    }
    return this;
  }
  fielding() {
    if (this.urlQueryObj.fields) {
      // console.log('fielding...');
      const fields = this.urlQueryObj.fields.split(',').join(' ');
      this.queryObj = this.queryObj.select(fields);
    }
    return this;
  }
  async pagination() {
    if (this.urlQueryObj.page) {
      // console.log('paginating...');
      const page = this.urlQueryObj.page * 1 || 1;
      const limit = this.urlQueryObj.limit * 1 || 30;
      const skip = (page - 1) * limit;
      this.queryObj = this.queryObj.skip(skip).limit(limit);

      const numOfTours = await Tour.countDocuments();
      if (skip >= numOfTours) {
        throw new Error('no more data at this page');
      }
    }
    return this;
  }
}
module.exports = ApiQueryFeatures;
