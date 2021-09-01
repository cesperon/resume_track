const models = require('../models');
const moment = require('moment'); 
const { Sequelize } = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
require('sequelize-values')(Sequelize);

const LastMonthStats = async(req, res) => {
	try{
		let last_month = await models.Applications.findAndCountAll({
			where: {
				createdAt: {
					[Op.gte]: moment().subtract(1, 'months').toDate()
				}
			}
		});
		return last_month.count;
	}catch(e){
		console.log('error in LastMonthStats helper');

	}
}

const LastWeekStats = async() => {
	try{
		let last_week = await models.Applications.findAndCountAll({
			where: {
				createdAt: {
					[Op.gte]: moment().subtract(1, 'weeks').toDate()
				}
			}
		});
		return last_week.count;
	}catch(e){
		console.log('error in LastWeekStats helper');
	}
}

const LastDayStats = async() => {
	try{
		let last_day = await models.Applications.findAndCountAll({
			where: {
				createdAt: {
					[Op.gte]: moment().subtract(1, 'days').toDate()
				}
			}
		});
		return last_day.count;
	}catch(e){
		console.log('error in LastWeekStats helper');
	}

}

module.exports = {

	LastMonthStats,
	LastWeekStats,
	LastDayStats
}
