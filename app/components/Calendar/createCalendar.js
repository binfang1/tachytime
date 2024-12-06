import {useState} from "react"

export default function creation(date, tasks, setTasks) {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let year = date.getFullYear();
    let month = date.getMonth();
    let today = new Date;



    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Variable to store the generated calendar HTML
    let lit = [];

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        let temp = 11;
        if (month == 0){
            temp = 11;
        }
        else {
            temp = month - 1;
        }
        console.log(temp)
        lit.push([(months[temp] + " " + String(monthlastdate - i + 1) + " " + year), "inactive", (monthlastdate - i + 1), "", tasks, setTasks, []]);
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
        

        // Check if the current date is today
        let isToday = i === today.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "today"
            : "";
        lit.push([(months[month] + " " + String(i) + " " + year), "active", (i), isToday, tasks, setTasks, []]);
    }

    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        let temp = 0;
        if (month == 11){
            temp = 0;
        }
        else {
            temp = month + 1;
        }
        lit.push([(months[temp] + " " + String(i - dayend + 1) + " " + year), "inactive", (i - dayend + 1), "", tasks, setTasks, []]);
    }

    return lit;


}