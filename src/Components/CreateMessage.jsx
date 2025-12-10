import { useState } from "react";

export default function CreateMessage() {
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [day, setDay] = useState("0");
    const [hour, setHour] = useState("0");
    const [minute, setMinute] = useState("0");
    const [selfdelete, setSelfdelete] = useState(true);
    const [error, setError] = useState("");
    const [response, setResponse] = useState("");
    const [sent, setSent] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();

        const url = "http://192.168.77.16:8080/api/secretmessage/createmessage";
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message,
                    password,
                    expirationday: day,
                    expirationhour: hour,
                    expirationminute: minute,
                    selfdelete
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
                    <label>Self Delete</label><br/>
                    <input
                        type="checkbox"
                        checked={selfdelete}
                        onChange={() => setSelfdelete(!selfdelete)}
                    /> <br/>
                    {!selfdelete && (
                        <>
                            <label>Expiration Day</label><br/>
                            <input type="number" value={day} onChange={(e) => setDay(e.target.value)}/><br/>
                            <label>Duration Hour</label><br/>
                            <input type="number" value={hour} onChange={(e) => setHour(e.target.value)}/><br/>
                            <label>Expiration Minute</label><br/>
                            <input type="number" value={minute} onChange={(e) => setMinute(e.target.value)}/><br/>

                        </>
                    )}
                    <button type="submit">Submit</button>
                </form>
            )}

            {sent && (
                <div>
                    <p>Your link is:</p>
                    <p>http://192.168.77.16:5173/show/{response}</p>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`http://192.168.77.16:5173/show/${response}`);
                        }}
                    >
                        Copy Link
                    </button>
                </div>
            )}
        </>
    );
}