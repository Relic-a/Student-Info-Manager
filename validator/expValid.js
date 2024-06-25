const { check } = require('express-validator');
const _ = require('lodash');

const sanitizeFields = (fields, params = []) => {
  const validations = fields.map(field => check(field).escape());
  const paramValidations = params.map(param => check(param).escape());
  return [...validations, ...paramValidations];
};



const sanitizeValue = (value) => {
    return _.escape(value);
};
  
const modernSanitizeFields = (req, res, next) => {
    req.body = _.mapValues(req.body, sanitizeValue);
    req.params = _.mapValues(req.params, sanitizeValue);
    next();
};

module.exports = {sanitizeFields,modernSanitizeFields};
