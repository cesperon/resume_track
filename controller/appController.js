
const models = require('../models');
const responseHandler = require('../helpers/responseHandler.js');
const dateDifference = require('../helpers/dateDifference.js');
const { Sequelize } = require('sequelize');
const moment = require('moment'); 
const previousDate = require('../helpers/previousDate');
//operators and or ...
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const {postApplicationsRequest} = require('../requests/postApplicationsRequest');
require('sequelize-values')(Sequelize);

const GetApplications = async(req, res) => {
	try{
		let applications = await models.Applications.findAll()
		.then(apps => {
			console.log(apps);
			return Sequelize.getValues(apps);
		});
		return responseHandler(res, false, '', applications, 200);
	}
	catch(e){
		console.log(e);
	}
}

const SearchByCompany= async(req, res) => {
	try{
		let application = await models.Applications.findAll({
			where:{
				company_name: req.body.company_name
			}
		})
		.then(app => {
				console.log(app);
				return Sequelize.getValues(app);
		});
		return responseHandler(res, false, '', application, 200);
	}
	catch(e){
		console.log(e);
	}
}

const SearchByStack = async(req, res) => {
	try{

		let applications = await models.Applications.findAll({
			where: {
				//{ [Op.contains]: ["1"] }
				//check to see if values in array are in tech_stack array
				tech_stack:{ [Op.contains]: req.body.tech_stack }
			}
		})
		.then(app => {
			console.log(app);
			return Sequelize.getValues(app);
		});
		return responseHandler(res, false, '', applications, 200);
	}
	catch(e){

		console.log(e);
	}
}
	
const PostApplications = async(req, res) => {
	try{
		let validation = await postApplicationsRequest(req.body);
		if(validation.error == true){
			return responseHandler(res,true,validation.message, [], 404);
		}
		let newApp = await models.Applications.create({
			company_name: req.body.company_name,
			hiring_manager: req.body.hiring_manager,
			user_id: req.user.id,
			date_applied: req.body.date_applied,
			platform: req.body.platform,
			tech_stack: req.body.tech_stack,
			status: req.body.status,
			compensation: req.body.compensation,
			experience: req.body.experience,
			location: req.body.location,
			state: req.body.state,
			position_type: req.body.position_type,
			equity: req.body.equity,
			salary: req.body.salary,
			four_O_one: req.body.four_O_one,
			remote: req.body.remote,
			description: req.body.description,
			links: req.body.links
		});
		return responseHandler(res, false,'', [], responseCodes.SUCCESS);
	}
	catch(e){
		console.log(e)
		return responseHandler(res, false, '', [], 200);
	}
}

const DeleteApplication = async(req,res) => {
	try{
		await models.Applications.destroy({
			where:{
				id:req.body.id
			}
		});
		console.log(req.body.id)
		return responseHandler(res, false, '', [], 200);
	}
	catch(e){
		console.log(e);
		return responseHandler(res, true, 'error in delete application', [], 400);
	}

}

const UpdateApplication = async(req, res) => {

	try{
		await models.Applications.update({
			company_name: req.body.company_name,
			hiring_manager: req.body.hiring_manager,
			date_applied: req.body.date_applied,
			platform: req.body.platform,
			tech_stack: req.body.tech_stack,
			status: req.body.status,
			compensation: req.body.compensation,
			experience: req.body.experience,
			location: req.body.location,
			state: req.body.state,
			position_type: req.body.position_type,
			equity: req.body.equity,
			salary: req.body.salary,
			four_O_one: req.body.four_O_one,
			remote: req.body.remote,
			description: req.body.description,
			links: req.body.links

		}, 
		{
			where: {
				id:req.body.id
			}
		});
		return responseHandler(res, false,'', [], 200);

	}
	catch(e){
		console.log(e)
		return responseHandler(res,true,"error in application update",[],400)
	}
}

//goes through each records tech stack array and returns a dictionary that stores a specific langauage and occurrence.
const PopularStack = async(req, res) => {

	try{
		var stack = [];
		var result = [];
		var dict = {};

		let tech_stack = await models.Applications.findAll(
			{
				attributes: ["tech_stack"]

			}).then(app=>{
			return Sequelize.getValues(app);
		});
		//get languages that most occur in tech_stack arrays use dictionary data structure to count occurences
		for(i = 0; i < tech_stack.length; i++){
			if(tech_stack[i].tech_stack != null){
				for(j =0; j < tech_stack[i].tech_stack.length; j++){
					if(tech_stack[i].tech_stack[j] in dict){
						dict[tech_stack[i].tech_stack[j]] = dict[tech_stack[i].tech_stack[j]] + 1;			
					}
					else{
						dict[tech_stack[i].tech_stack[j]] = 1;
						stack.push(tech_stack[i].tech_stack[j]);
					}
				}
			}		
		}

		for(i = 0; i < stack.length; i++){
			result.push({key: stack[i], value: dict[stack[i]]});
		}
		// debug print return dictionary
		// console.log(result);
		return responseHandler(res, false, '', result, 200);

	}
	catch(e){
		console.log(e)
	}
}

const ApplicationStatistics = async(req, res) => {
	try{

		let last_month_count = await previousDate.LastMonthStats();
		let last_week_count = await previousDate.LastWeekStats();
		let last_day_count = await previousDate.LastDayStats();

		console.log('last_day', last_day_count);
		console.log('last_week', last_week_count);
		console.log('last_month', last_month_count);
		//get earliest date from date_applied column + latest date from date_applied column
		let first_date = await models.Applications.findAll(
		{
			limit: 1,
			attributes: ['createdAt'],
			order: [['createdAt', 'ASC']]
		}).then(date => {

			return Sequelize.getValues(date);

		})
		console.log("first_date",first_date[0].createdAt);

		let last_date = new Date();

		let total_applications = await models.Applications.findAndCountAll();
		let total_application_count = total_applications.count;
		console.log('total_applications', total_application_count);

		//diff in days
		let applications_per_day = dateDifference.differenceInDays(first_date[0].createdAt,last_date, total_application_count );
		console.log("application_per_day", applications_per_day);

		//diff in weeks
		let applications_per_week = dateDifference.differenceInWeeks(first_date[0].createdAt,last_date, total_application_count);
		console.log("applications_per_week", applications_per_week);

		//diff in months
		let applications_per_month = dateDifference.differenceInMonths(first_date[0].createdAt,last_date, total_application_count);
		console.log("applications_per_month", applications_per_month);

		//get total applications with status applied
		let applied_applications = await models.Applications.findAndCountAll({
			where: {
				"status" : "applied"
			}

		});
		let applied_count = applied_applications.count;
		console.log('applied_applications', applied_count);

		//get total applications with status denied
		let denied_applications = await models.Applications.findAndCountAll({
			where: {
				"status" : "denied"
			}

		});
		let denied_count = denied_applications.count;
		console.log('applied_applications', denied_count);

		var stats = {
			"total_applications": total_application_count,
			"total_applied": applied_count,
			"total_denied": denied_count,
			"daily": applications_per_day,
			"weekly": applications_per_week,
			"monthly": applications_per_month,
			"yesterday": last_day_count,
			"last_week": last_week_count,
			"last_month": last_month_count,
		}

		return responseHandler(res, false, '', stats, 200);

	}
	catch(e){
		console.log(e);
		return responseHandler(res,true,"error in application update",[],400)
	}
}



module.exports = {
	GetApplications,
	SearchByCompany,
	SearchByStack,
	PostApplications,
	DeleteApplication,
	UpdateApplication,
	PopularStack,
	ApplicationStatistics
}