import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ShowMessage() {
    const { uuid } = useParams();
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [exist, setExist] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function checkExistance() {
            try {
                const url = `http://localhost:8080/api/secretmessage/checkExistance/${uuid}`;

                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const text = await res.text();

                switch (res.status){
                    case 200:
                        setExist(true);
                }

                setMessage(text);
            } catch (e) {
                setError("Could not connect to server");
            } finally {
                setLoading(false);
            }
        }

        checkExistance();
    }, [uuid]);

    async function fetchMessage() {
        try {
            const url = `http://localhost:8080/api/secretmessage/showmessage/${uuid}`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: password,
                }),
            });

            if (res.status === 404) {
                setError("Message not found");
                return;
            }

            if (res.status === 405) {
                setError("Password is wrong!");
                return;
            }

            if (!res.ok) {
                setError("Message found");
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
            {exist && (
                <>
            <label>Password</label><br />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button onClick={fetchMessage}>Submit</button>
                </>
            )}
            <h2>Secret Message</h2>
            {loading ? <p>Loading...</p> : <div>{error || message}</div>}
        </div>
    );
}