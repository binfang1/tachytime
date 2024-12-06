"use client";
import React, {useState, useEffect} from "react";
import creation from "./createCalendar";
import Popup from "./popup";


export default function App() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const today = new Date;

    const [date, setDate] = useState(new Date);
    const [popupEnabled, popupIsEnabled] = useState(false);




    function getDate(today) {
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

    const layout = (date) => {
        return creation(date);;
    }

    const getMonthYear = (date) => {
        return months[date.getMonth()] + ", " + date.getFullYear()
    }

    const getCurrentDay = () => {
        setDate(new Date())
    }



    const openPopup = (e, data) => {
        data[5]([...data[4], ['meme']]);
        console.log(data[4]);
    }



    return (
        <main>
            <h1 className = "text-center text-4xl mt-4">{getMonthYear(date)}</h1>
            <div className = "flex gap-4 justify-center mt-4">
                <button type = "button" className = "w-16 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75" onClick = {decreaseDate}>←</button>
                <button type = "button" className = "w-48 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75" onClick = {getCurrentDay}>Today's Date:<br/>{today.toDateString()}</button>
                <button type = "button" className = "w-16 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400  disabled:bg-gray-400 focus:ring-opacity-75 ml-1" onClick = {increaseDate}>→</button>
            </div>
            <ul className = "grid grid-cols-7 w-[1000px] mt-4 mb-12 m-auto justify-items-center">
                <li className = "mb-4">Sunday</li>
                <li className = "">Monday</li>
                <li className = "">Tuesday</li>
                <li className = "">Wednsday</li>
                <li className = "">Thursday</li>
                <li className = "">Friday</li>
                <li className = "">Saturday</li>
                {layout(date).map(data => (
                    <li key = {data[0]}>
                    {data[1] === "inactive" ? (
                        <div className = "box-border h-48 w-48 border-2 border-gray-500 text-center hover:cursor-pointer hover:bg-blue-700" onClick={(e) => openPopup(e, data, data[5])}>
                            <p className = "text-left ml-1 mt-1">{data[2]}</p>
                        </div>
                    ) :

                    (data[3] === "today" ? (
                        <div className = "box-border h-48 w-48 border-2 border-white text-center bg-blue-500 hover:cursor-pointer hover:bg-blue-700" onClick={(e) => openPopup(e, data, data[5])}>
                            <p className = "text-left ml-1 mt-1">{data[2]}</p>
      
                        </div>
                    ) : 
                    
                    (
                        <div className = "box-border h-48 w-48 border-2 border-white text-center hover:cursor-pointer hover:bg-blue-700" onClick={(e) => openPopup(e, data, data[5])}>
                            <p className = "text-left ml-1 mt-1">{data[2]}</p>
    
                        </div>
                        
                    )
                    )}
                    </li>
                ))}
            </ul>
        </main> 
    );
}