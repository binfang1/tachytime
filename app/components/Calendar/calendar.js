"use client";
import React, {useState, useEffect} from "react";
import creation from "./createCalendar";


export default function App() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const [tasks, setTasks] = useState([]);
    const today = new Date;


    const [date, setDate] = useState(new Date);
    
    const [day, setDay] = useState(creation(date));

    const [change, setChange] = useState(false);

    const [popupEnabled, popupIsEnabled] = useState(false);

    const [currentData, setCurrentData] = useState([]);

    const [currentTask, setCurrentTask] = useState([]);

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    function Popup() {
        return (popupEnabled) ? (
            <main className = "absolute top-0 left-0 flex justify-center items-center w-full h-[150%]  bg-slate-950/50">
                <div className ="flex flex-col absolute top-[375px] p-8 max-w-[800px] w-full max-h-[750px] h-full bg-white">
                    <div className="flex justify-end">
                        <button className="text-black" onClick = {() => popupIsEnabled(false)}>X</button>
                    </div>
                    <h1 className="text-black text-2xl mb-4">{currentData[0]}</h1>
                    {currentTask ? (
                            <ul>
                                {currentTask.map(tasks => (
                                    <li className="text-black" key = {makeid(8)}>{tasks}</li>
                                ))}
                            </ul>
                        ) : (
                            <div></div>
                        )}
                    <button className="text-black mt-auto" onClick = {() => (currentData[4].push("meme"))}>meme</button>
                </div>
            </main>
        ) : "";
    }

    const decreaseDate = () => {
        setDate(new Date(date.getFullYear(), date.getMonth(), 0));
    }

    const increaseDate = () => {
        setDate(new Date(date.getFullYear(), date.getMonth()+2, 0));

    }

    useEffect(() => {
        setDay(creation(date, tasks, setTasks))
     }, [date])

    useEffect(() => {
        setCurrentData(currentData);
    }, [currentData])

    useEffect(() => {
        console.log("changed");
        console.log(currentTask);
        console.log(currentData[4]);
        console.log(currentData)
        setCurrentTask(currentData[4]);
    }, [currentData[4]])


    const getMonthYear = (date) => {
        return months[date.getMonth()] + ", " + date.getFullYear()
    }

    const getCurrentDay = () => {
        setDate(new Date())
    }

    const openPopup = (e, data) => {
        popupIsEnabled(!popupEnabled);
        setCurrentData(data);
        setCurrentTask(data[4])
    }



    return (
        <main>
            <h1 className="text-5xl">TachyTime</h1>
            {change ? (
                <div>
                    <p className="text-2xl hover:cursor-pointer hover:underline" onClick={() => setChange(!change)}>Sign Out</p>
             
                    <h1 className = "text-center text-4xl mt-4">{getMonthYear(date)}</h1>
                    <div className = "flex gap-4 justify-center mt-4">
                        <button type = "button" className = "w-16 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75" onClick = {decreaseDate}>←</button>
                        <button type = "button" className = "w-48 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75" onClick = {getCurrentDay}>Today's Date:<br/>{today.toDateString()}</button>
                        <button type = "button" className = "w-16 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400  disabled:bg-gray-400 focus:ring-opacity-75 ml-1" onClick = {increaseDate}>→</button>
                    </div>
                    <ul className = "grid grid-cols-7 w-[1330px] mt-4 mb-12 m-auto justify-items-center">
                        <li className = "mb-4">Sunday</li>
                        <li className = "">Monday</li>
                        <li className = "">Tuesday</li>
                        <li className = "">Wednsday</li>
                        <li className = "">Thursday</li>
                        <li className = "">Friday</li>
                        <li className = "">Saturday</li>
                        {day.map(data => (
                            <li key = {data[0]}>
                            {data[1] === "inactive" ? (
                                <div className = "box-border h-48 w-48 border-2 border-gray-500 text-center hover:cursor-pointer hover:bg-blue-700" onClick={(e) => openPopup(e, data, data[5])}>
                                    <p className = "text-left ml-1 mt-1">{data[2]}</p>
                                    {data[4] ? (
                                        <ul>
                                            {data[4].map(tasks => (
                                                <li key = {makeid(8)}>{tasks}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            ) :

                            (data[3] === "today" ? (
                                <div className = "box-border h-48 w-48 border-2 border-white text-center bg-blue-500 hover:cursor-pointer hover:bg-blue-700" onClick={(e) => openPopup(e, data, data[5])}>
                                    <p className = "text-left ml-1 mt-1">{data[2]}</p>
                                    {data[4] ? (
                                        <ul>
                                            {data[4].map(tasks => (
                                                <li key = {makeid(8)}>{tasks}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            ) : 
                            
                            (
                                <div className = "box-border h-48 w-48 border-2 border-white text-center hover:cursor-pointer hover:bg-blue-700" onClick={(e) => openPopup(e, data, data[5])}>
                                    <p className = "text-left ml-1 mt-1">{data[2]}</p>
                                    {data[4] ? (
                                        <ul>
                                            {data[4].map(tasks => (
                                                <li key = {makeid(8)}>{tasks}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                                
                            )
                            )}
                            </li>
                        ))}
                    </ul>
 
                </div>
            ) : (
                //<p className="text-2xl hover:cursor-pointer hover:underline" onClick={() => setChange(!change)}>Sign in</p>
                <p className="text-2xl hover:cursor-pointer hover:underline" onClick={() => setChange(!change)}>Sign in</p>
            )}
            <Popup></Popup>
        </main> 
    );
}