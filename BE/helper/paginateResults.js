const paginateResults = async (model, query = {}, options = {}) => {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skipIndex = (page - 1) * limit;
    const sortField = options.sortField || '_id';
    const sortOrder = options.sortOrder || 1;
  
    try {
      const total = await model.countDocuments(query);
      const results = await model.find(query)
        .sort({ [sortField]: sortOrder })
        .limit(limit)
        .skip(skipIndex)
        .exec();
  
      return {
        results,
        totalItems: total,
      };
    } catch (error) {
      throw new Error(`Lỗi khi phân trang: ${error.message}`);
    }
  };
  
  module.exports = paginateResults;