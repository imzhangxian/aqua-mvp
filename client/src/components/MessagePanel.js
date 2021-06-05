import * as React from 'react';
import { useState } from 'react';

function MessagePanel() {
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([
        { severity: "severe", plant: "New Plant 01", stage: "Primary", text: "exceed max capacity!!" },
        { severity: "normal", plant: "New Plant 02", stage: "Secondary", text: "running normally." },
        { severity: "warning", plant: "New Plant 02", stage: "Primary", text: "BOD under standard." },
        { severity: "severe", plant: "Plant 05", stage: "Primary", text: "exceed max capacity!!" }
    ]);

    return (
        <div>
            <button className="btn btn-outline-primary message-panel-ctl" onClick={() => setShow(!show)}>+</button>
            <div className={`overflow-auto message-panel ${show ? "active" : ""}`}>
                <h3>Messages</h3>
                <div className="message-link">
                    <ul>
                        {messages.map(message => {
                            let messageClass = "alert alert-success";
                            if (message.severity === 'severe') {
                                messageClass = "alert alert-danger";
                            } else if (message.severity === 'warning') {
                                messageClass = "alert alert-warning";
                            }
                            return (<li className={messageClass}>{message.plant}, {message.stage}: {message.text}</li>)
                        })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MessagePanel;
