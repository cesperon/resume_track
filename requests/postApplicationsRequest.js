const Joi = require('joi')

const postApplicationsRequest = async (data) => {

	const Schema = Joi.object({
		company_name: Joi.string(),
		position: Joi.string(),
		hiring_manager: Joi.string(),
	    date_applied: Joi.date(),
	    platform: Joi.string(),
	    tech_stack: Joi.array().items(Joi.string()),
	    status: Joi.string(),
	    compensation: Joi.number().integer(),
	    experience: Joi.string(),
	    location: Joi.string(),
	    state: Joi.string(),
	    position_type: Joi.string(),
	    equity: Joi.boolean(),
	    salary: Joi.boolean(),
	    four_0_one: Joi.boolean(),
	    remote: Joi.boolean(),
	    description: Joi.string(),
	    links: Joi.array().items(Joi.string())
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