"use client";
import React, {useState, useEffect} from "react";
import creation from "./createCalendar";


export default function App() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
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
                <div className ="flex flex-col absolute top-[350px] p-8 max-w-[800px] w-full max-h-[750px] h-full bg-white">
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
                    <button className="bg-blue-500 text-white font-semibold rounded-lg shadow-md mt-auto" onClick = {() => (setCurrentTask([...currentTask, ["meme"]]))}>meme</button>
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
        setDay(creation(date))
     }, [date])

    useEffect(() => {
        setCurrentData(currentData);
    }, [currentData])

    useEffect(() => {
        document.title = 'TachyTime';
        setCurrentTask(currentTask);
        currentData[4] = currentTask;
    }, [currentTask])


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
            <h1 className="text-5xl mt-4 ml-4 dark:text-white text-black">TachyTime</h1>
            {change ? (
                <div>
                    <p className="text-2xl hover:cursor-pointer hover:underline mt-4 ml-4 dark:text-white text-black" onClick={() => setChange(!change)}>Sign Out</p>
             
                    <h1 className = "text-center text-4xl mt-4 dark:text-white text-black">{getMonthYear(date)}</h1>
                    <div className = "flex gap-4 justify-center mt-4">
                        <button type = "button" className = "w-16 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75" onClick = {decreaseDate}>←</button>
                        <button type = "button" className = "w-48 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 disabled:bg-gray-400 focus:ring-blue-400 focus:ring-opacity-75" onClick = {getCurrentDay}>Todays Date:<br/>{today.toDateString()}</button>
                        <button type = "button" className = "w-16 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400  disabled:bg-gray-400 focus:ring-opacity-75 ml-1" onClick = {increaseDate}>→</button>
                    </div>
                    <ul className = "grid grid-cols-7 w-[1225px] mt-4 mb-12 m-auto justify-items-center">
                        <li className = "mb-4">Sunday</li>
                        <li className = "dark:text-white text-black">Monday</li>
                        <li className = "dark:text-white text-black">Tuesday</li>
                        <li className = "dark:text-white text-black">Wednsday</li>
                        <li className = "dark:text-white text-black">Thursday</li>
                        <li className = "dark:text-white text-black">Friday</li>
                        <li className = "dark:text-white text-black">Saturday</li>
                        {day.map(data => (
                            <li key = {data[0]}>
                            {data[1] === "inactive" ? (
                                <div className = "dark:text-gray-500 text-gray-400 box-border h-[175px] w-[175px] border-[2px] dark:border-gray-500 border-gray-400 text-center hover:cursor-pointer hover:bg-blue-700 hover:text-white" onClick={(e) => openPopup(e, data, data[5])}>
                                    <p className = "text-left ml-1 mt-1">{data[2]}</p>
                                    {data[4] ? (
                                        <ul className = "text-left ml-3 mt-1 mr-3">
                                            {data[4].length > 3 ? (
                                                data[4].slice(0, 2).map(tasks => (
                                                    <li className = "bg-blue-500 border-black dark:border-white dark:border-white text-white border rounded-full pl-2 mb-3" key = {makeid(8)}>{tasks}</li>
                                                ))
                                            ) : (
                                                data[4].slice(0, 3).map(tasks => (
                                                    <li className = "bg-blue-500 border-black dark:border-white dark:border-white text-white border rounded-full pl-2 mb-3" key = {makeid(8)}>{tasks}</li>
                                                ))
                                            )}
                                            {data[4].length > 3 ? (
                                                <li className = "bg-blue-500 border-black dark:border-white dark:border-white text-white border rounded-full pl-2 mb-3">Click for more...</li>
                                            ) : (
                                                <div></div>
                                            )}
                                        </ul>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            ) :

                            (data[3] === "today" ? (
                                <div className = "dark:text-white text-black box-border h-[175px] w-[175px] border-[2px] dark:border-white border-black text-center bg-blue-500 hover:cursor-pointer hover:bg-blue-700 hover:text-white" onClick={(e) => openPopup(e, data, data[5])}>
                                    <p className = "text-left ml-1 mt-1">{data[2]}</p>
                                    {data[4] ? (
                                        <ul className = "text-left ml-3 mt-1 mr-3">
                                            {data[4].length > 3 ? (
                                                data[4].slice(0, 2).map(tasks => (
                                                    <li className = "bg-blue-500 border-black dark:border-white dark:border-white text-white border rounded-full pl-2 mb-3" key = {makeid(8)}>{tasks}</li>
                                                ))
                                            ) : (
                                                data[4].slice(0, 3).map(tasks => (
                                                    <li className = "bg-blue-500 border-black dark:border-white dark:border-white text-white border rounded-full pl-2 mb-3" key = {makeid(8)}>{tasks}</li>
                                                ))
                                            )}
                                            {data[4].length > 3 ? (
                                                <li className = "bg-blue-500 border-black dark:border-white dark:border-white text-white border rounded-full pl-2 mb-3">Click for more...</li>
                                            ) : (
                                                <div></div>
                                            )}
                                        </ul>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            ) : 
                            
                            (
                                <div className = "dark:text-white text-black box-border h-[175px] w-[175px] border-[2px] dark:border-white border-black text-center hover:cursor-pointer hover:bg-blue-700 hover:text-white" onClick={(e) => openPopup(e, data, data[5])}>
                                    <p className = "text-left ml-1 mt-1">{data[2]}</p>
                                    {data[4] ? (
                                        <ul className = "text-left ml-3 mt-1 mr-3">
                                            {data[4].length > 3 ? (
                                                data[4].slice(0, 2).map(tasks => (
                                                    <li className = "bg-blue-500 border-black dark:border-white dark:border-white text-white border rounded-full pl-2 mb-3" key = {makeid(8)}>{tasks}</li>
                                                ))
                                            ) : (
                                                data[4].slice(0, 3).map(tasks => (
                                                    <li className = "bg-blue-500 border-black dark:border-white dark:border-white text-white border rounded-full pl-2 mb-3" key = {makeid(8)}>{tasks}</li>
                                                ))
                                            )}
                                            {data[4].length > 3 ? (
                                                <li className = "bg-blue-500 border-black dark:border-white dark:border-white text-white border rounded-full pl-2 mb-3">Click for more...</li>
                                            ) : (
                                                <div></div>
                                            )}
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
                <p className="text-2xl hover:cursor-pointer hover:underline mt-4 ml-4" onClick={() => setChange(!change)}>Sign in</p>
            )}
            <Popup></Popup>
        </main> 
    );
}