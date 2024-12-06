"use client";
import React, {useState, useEffect} from "react";

export default function Popup(change) {

    const [popupEnabled, popupIsEnabled] = useState(change.trigger);
    if (popupEnabled) {
        console.log(change)
        console.log(popupEnabled);
    }
    return (popupEnabled) ? (
        <main className = "">
            <div className ="">
                <button>X</button>
            </div>
        </main>
    ) : "";
}