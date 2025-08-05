import Joi from 'joi';

const salesOrderSchema = Joi.object({
    product_id: Joi.number().integer().required().messages({
        'any.required': 'Product ID is required',
        'number.base': 'Product ID must be a number',
        'number.integer': 'Product ID must be an integer'
      }),
      quantity: Joi.number().integer().min(1).required().messages({
          'any.required': 'Quantity is required',
          'number.base': 'Quantity must be a number',
          'number.integer': 'Quantity must be an integer',
          'number.min': 'Quantity must be at least 1'
        })
})

export default salesOrderSchema;