const Joi = require('joi')

const postApplicationsRequest = async (data) => {

	const Schema = Joi.object({
	    company_name: Joi.string().optional().allow('').allow(null),
	    position: Joi.string().optional().allow('').allow(null),
	    hiring_manager: Joi.string().optional().allow(null),
	    date_applied: Joi.date(),
	    platform: Joi.string().optional().allow('').allow(null),
	    tech_stack: Joi.array().items(Joi.string()).optional().allow(null),
	    status: Joi.string().optional().allow('').allow(null),
	    compensation: Joi.number().integer().optional().allow('').allow(null),
	    experience: Joi.string().optional().allow('').allow(null),
	    location: Joi.string().optional().allow('').allow(null),
	    state: Joi.string().optional().allow('').allow(null),
	    position_type: Joi.string().optional().allow('').allow(null),
	    equity: Joi.boolean().optional().allow(null),
	    salary: Joi.boolean().optional().allow(null),
	    four_O_one: Joi.boolean().optional().allow(null),
	    remote: Joi.boolean().optional().allow(null),
	    description: Joi.string().optional().allow('').allow(null),
	    links: Joi.array().items(Joi.string()).optional().allow('').allow(null),
	});
	let validate = Schema.validate(data);
	let error =  false;
	let message = '';
	if(validate.error){
		message = 'error in validation of postApplication';
		error = true;
	}

	return{error: error, message, message};

};

exports.postApplicationsRequest = postApplicationsRequest;
