"use client";
import {useState, useEffect, Grid, Item} from "react";
import creation from "./createCalendar";


export default function App() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


    const [date, setDate] = useState(new Date);
    const [currentDate, setCurrentDate] = useState(getDate(date));
    console.log(date);


    function getDate(today) {
        console.log(today);
        const realmonth = today.getMonth()+1;
        const realyear = today.getFullYear();
        const date = today. getDate();
        const day = today.getDay();
        return days[day] + " " + realmonth + "/" + date + "/" + realyear;
    }

    const decreaseDate = () => {
        setDate(new Date(date.getFullYear(), date.getMonth(), 0));
    }

    const increaseDate = () => {
        setDate(new Date(date.getFullYear(), date.getMonth()+2, 0));
    }

    useEffect(() => {
        setCurrentDate(getDate(date))
    }), currentDate;

    const layout = (date) => {
        return creation(date);;
    }





    return (
        <main>
            <div>{currentDate}</div>
            <div className = "flex gap-2">
                <button type = "button" className = "w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75" onClick = {decreaseDate}>-</button>
                <button type = "button" className = "w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400  disabled:bg-gray-400 focus:ring-opacity-75 ml-1" onClick = {increaseDate}>+</button>
            </div>
            <ul className = "grid grid-cols-7 ml-4 justify-items-center">
                <li className = "text-center mb-4">Sunday</li>
                <li className = "text-center">Monday</li>
                <li className = "text-center">Tuesday</li>
                <li className = "text-center">Wednsday</li>
                <li className = "text-center">Thursda</li>
                <li className = "text-center">Friday</li>
                <li className = "text-center">Saturday</li>
                {layout(date).map(data => (
                    <li key = {data[0]}>
                        <div className = "box-border h-48 w-48 border-2 border-white text-center mb-12">
                            <p>{data[2]} {data[0]}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </main> 
    );
}