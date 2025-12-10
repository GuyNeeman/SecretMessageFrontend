import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ShowMessage() {
    const { uuid } = useParams();
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

        async function fetchMessage() {
            try {
                const url = (`http://localhost:8080/api/secretmessage/showmessage/${uuid}`);

                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: password,
                    })
                });
                if (res.status === 404) {
                    setError("Message not found");
                    setLoading(false);
                    return;
                }

                if (res.status === 405) {
                    setError("Password is wrong!");
                    setLoading(false);
                    return;
                }

                if (!res.ok) {
                    setError("Server error");
                    setLoading(false);
                    return;
                }

                const text = await res.text();
                setMessage(text);
            } catch (e) {
                setError("Could not connect to server");
            } finally {
                setLoading(false);
            }
        }

    return (

        <div>
            <label>Password</label><br/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <button onClick={fetchMessage}>Submit</button>

            <h2>Secret Message</h2>
            <div>
                {message}
            </div>
        </div>
    );
}
