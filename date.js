module.exports.getDate = getDate;


function getDate()  
{
    let today = new Date();
    let options = {
        weekday: "long", //to get the weekday
        day: "numeric", //to get date
        month: "long" //to get month
    }
    let day = today.toLocaleDateString("en-US", options);
    //day = "Sunday, May 28"
    return day;
}




module.exports.getDay = getDay;


function getDay()  
{
    let today = new Date();
    let options = {
        weekday: "long"
    }
    let day = today.toLocaleDateString("en-US", options);
    //day = "Sunday, May 28"
    return day;
}
