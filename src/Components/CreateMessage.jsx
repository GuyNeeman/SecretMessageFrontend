import { useState } from "react";

export default function CreateMessage() {
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [language, setLanguage] = useState("");
    const [day, setDay] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [minute2, setMinute2] = useState("");
    const [selfdelete, setSelfdelete] = useState(true);
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");
    const [sent, setSent] = useState(false);
    async function onSubmit(e) {
        let totalMinutes;
        e.preventDefault();


        if(selfdelete === true ) {
            totalMinutes = null;
        } else {
            totalMinutes = Number(minute) + Number(day) * 1440 + Number(hour) * 60;
        }
        setMinute2(totalMinutes);
        console.log(totalMinutes);
        const url = "http://localhost:8080/api/secretmessage/createmessage";
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message,
                    password,
                    expirationminute: totalMinutes,
                    selfdelete,
                    language
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const json = await res.text();
            setResponse(json);
            console.log(response)
        } catch (err) {
            console.error("error", err);
            setError(err.message);
        }
        setSent(true);
    }

    return (
        <>
            {!sent && (
                <form onSubmit={onSubmit}>
                    <h1>Secret Message Box</h1>
                    <label>Message</label><br/>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)}/><br/>
                    <label>Password</label><br/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                    <label>Syntax Highlighting</label><br/>
                    <select onChange={e => setLanguage(e.target.value)}>
                        <option value="text"></option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select><br/>
                    <label>Self Delete</label><br/>
                    <input
                        type="checkbox"
                        checked={selfdelete}
                        onChange={() => setSelfdelete(!selfdelete)}
                    /> <br/>
                    {!selfdelete && (
                        <>
                            <label>Duration Day</label><br/>
                            <input type="number" value={day} onChange={(e) => setDay(e.target.value)}/><br/>
                            <label>Duration Hour</label><br/>
                            <input type="number" value={hour} onChange={(e) => setHour(e.target.value)}/><br/>
                            <label>Duration Minute</label><br/>
                            <input type="number" value={minute} onChange={(e) => setMinute(e.target.value)}/><br/>

                        </>
                    )}
                    <button type="submit">Submit</button>
                </form>
            )}

            {sent && (
                <div>
                    <p>Your link is:</p>
                    <p>http://localhost:5173/show/{response}</p>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`http://localhost:5173/show/${response}`);
                        }}
                    >
                        Copy Link
                    </button>
                </div>
            )}
        </>
    );
}