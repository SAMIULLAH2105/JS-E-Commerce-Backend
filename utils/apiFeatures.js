// this.query is Product.find() and this.queryStr is jo postman mai key-value de rhe hain

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // will make search case in sensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    console.log(this.queryStr);
    return this;
  }

  // filter for category: querystr is obj, when we assign it to var it pass ref i.e the changes in original querystr we will below use spread operator to overcome.
  filter() {
    const queryCopy = { ...this.queryStr };

    // console.log(queryCopy); gave both when i gave in postman keyword and category.

    // CATEGORY FILTER: Removing fields bcz we need only category not below fields.
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((field) => delete queryCopy[field]); // console.log(queryCopy); gave only category as removed keyword

    // Filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
