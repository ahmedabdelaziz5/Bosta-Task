const dataMethods = ["body", "query"];
const { createResponse } = require("../utils/createResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.validator = (schema) => {
  return asyncHandler(async (req, res, next) => {
    let errList = [];
    dataMethods.forEach(async (method) => {
      if (schema[method]) {
        const validationResult = schema[method].validate(req[method]);
        if (validationResult.error) {
          errList.push(validationResult.error.details[0].message);
        }
      }
    });
    if (errList.length) {
      return res.status(400).json(createResponse(false, errList[0], 400, "validation error"));
    }
    return next();
  });
};