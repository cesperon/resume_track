
const differenceInDays = (date1, date2, total_applications) => {
	try{
		let difference_in_time = date2.getTime() - date1.getTime();
		let difference_in_days = Math.floor(difference_in_time/ (1000 * 3600 *24));
		if(difference_in_days == 0){
			difference_in_days = 1;
		}
		let applications_per_day = total_applications/difference_in_days;
		return applications_per_day;

	}catch(e){
		console.log(e);
		return null;
	}
}

const differenceInWeeks = (date1, date2, total_applications) => {
	try{
		var diff_weeks = (date2.getTime() - date1.getTime())/ 1000;
		diff_weeks /= (60 * 60 * 24 * 7);
		diff_weeks = Math.abs(Math.floor(diff_weeks));
		if(diff_weeks == 0){
			diff_weeks = 1;
		}
		let applications_per_week = total_applications/diff_weeks;
		return applications_per_week;

	}catch(e){
		console.log(e);
		return null;
	}
}

const differenceInMonths = (date1, date2, total_applications) => {
	try{
		var diff_months = (date2.getTime() - date1.getTime())/ 1000;
		diff_months /= (60 * 60 * 24 * 7*4);
		diff_months = Math.abs(Math.floor(diff_months));
		if(diff_months == 0){
			diff_months = 1;
		}
		let applications_per_month = total_applications/diff_months;
		return applications_per_month;

	}catch(e){
		console.log(e);
		return null;
	}
}

module.exports = {
	differenceInDays,
	differenceInWeeks,
	differenceInMonths
}