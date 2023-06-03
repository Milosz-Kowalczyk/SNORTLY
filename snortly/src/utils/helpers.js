// Here we write helper functions that can be used somewhere later

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

    // Convert milliseconds to days
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

    return Math.abs(differenceInDays);
}


function convertDateToDayAndMonth(dateString) {

    /*
    Converts date string 2023-06-02 to 02.06 
    */

    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit' };
    return date.toLocaleDateString(undefined, options);
}

export { getDaysDifference, convertDateToDayAndMonth }