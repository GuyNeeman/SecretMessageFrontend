import {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";

export default function ShowMessage() {
    const { uuid } = useParams();
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [exist, setExist] = useState(false);
    const [language, setLanguage] = useState("")
    const [error, setError] = useState("");
    const ref = useRef(null)

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

    useEffect(() => {
        if (message && language) {
            Prism.highlightAll();
        }
    }, [message, language]);

    async function fetchMessage() {
        try {
            const url = `http://localhost:8080/api/secretmessage/showmessage/${uuid}`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: password
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

            const data = await res.json();

            setMessage(data.message);
            setLanguage(data.language);

            Prism.highlightAll();
            setExist(false);
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
            {loading ? <p>Loading...</p> :
                <pre className={`language-${language}`}>
                    <code ref={ref} className={`language-${language}`}>
                    {message}
                    </code>
                </pre>}
        </div>
    );
}