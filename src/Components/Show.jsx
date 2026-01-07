import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Show() {
    const [uuid, setUuid] = useState("");
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();
        navigate(`/show/${uuid}`);
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Enter the UUID of the Message you want to show!</label><br/>
            <input
                onChange={(e) => setUuid(e.target.value)}
                type="text"
            /><br/>
            <button type="submit">Submit</button>
        </form>
    );
}