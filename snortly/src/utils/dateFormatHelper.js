// Here we write helper functions that can be used somewhere later


// ## DATE FORMATTING HELPERS  ##

function getDaysDifference(targetDate) {

    /*
        This function will return difference between date vs current date 
        So with targetDate 2023-06-02 we will get '1' (1 day is the difference) 
        Used mainly for post and comments 
        */

    const today = new Date();
    const target = new Date(targetDate);

    // Calculate the difference in milliseconds
    const differenceInMs = target - today;

    // Convert milliseconds to days, rounding down using Math.floor
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    return Math.abs(differenceInDays);
}


function extractHourAndMinutes(dateString) {
    /*
        This function will return date in HH:MM format from '2023-06-02 14:30:00' (dateString)
    */


    const date = new Date(dateString);
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hour}:${minutes}`;
}


function convertDateToDayAndMonth(dateString) {

    /*
        Converts date string 2023-06-02 to 02.06 
    */

    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit' };

    return date.toLocaleDateString(undefined, options);
}

function convertDateToDayMonthYear(dateString) {

    /*
        Converts date string 2023-06-02 to 2023.06.02 (yyyy-mm-dd)
    */

    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    return date.toLocaleDateString(undefined, options).replace(/\//g, '.');
}


function isInCurrentYear(dateString) {

    /*
        Check if dateString 2023-06-02 is in current year
        returns true if year is in users current year 
    */

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const date = new Date(dateString);

    return date.getFullYear() === year;
}

export { getDaysDifference, convertDateToDayAndMonth, isInCurrentYear, convertDateToDayMonthYear, extractHourAndMinutes }