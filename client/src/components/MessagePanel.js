import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function MessagePanel() {
    const [showMessages, setShowMessages] = useState(false);
    // TODO feed from server logic. dummy data first.
    const [messages] = useState([
        { id: 1, severity: "severe", plant: "New Plant 01", stage: "Primary", text: "exceed max capacity!!" },
        { id: 2, severity: "normal", plant: "New Plant 02", stage: "Secondary", text: "running normally." },
        { id: 3, severity: "warning", plant: "New Plant 02", stage: "Primary", text: "BOD under standard." },
        { id: 4, severity: "severe", plant: "Plant 05", stage: "Primary", text: "exceed max capacity!!" }
    ]);
    
    const { t } = useTranslation();

    const messagepopup = useRef();
    const togglebutton = useRef();

    useEffect(() => {
      // add when mounted
      document.addEventListener("mousedown", handleClick);
      // return function to be called when unmounted
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, []);

    const handleClick = e => {
      if (messagepopup.current.contains(e.target) || togglebutton.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click 
      setShowMessages(false);
    };

    return (
        <div>
            <button ref={togglebutton} className="btn btn-outline-primary message-panel-ctl" onClick={() => setShowMessages(!showMessages)}>+</button>
            <div ref={messagepopup} className={`message-panel ${showMessages ? "active" : ""}`}>
                <h3>{t('title.messages')}</h3>
                <div className="overflow-auto message-list">
                    <ul>
                        {messages.map(message => {
                            let messageClass = "alert alert-success";
                            if (message.severity === 'severe') {
                                messageClass = "alert alert-danger";
                            } else if (message.severity === 'warning') {
                                messageClass = "alert alert-warning";
                            }
                            return (<li className={messageClass} key={message.id}>{message.plant}, {message.stage}: {message.text}</li>)
                        })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MessagePanel;
