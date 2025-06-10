import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");

    const sendMessage = async () => {
        const trimmed = userInput.trim();
        if (!trimmed) return;

        const newMessages = [...messages, { from: 'user', text: trimmed }];
        setMessages(newMessages);
        setUserInput("");

        try {
            const res = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: trimmed })
            });

            if (!res.ok) {
                throw new Error("Lỗi phản hồi từ server.");
            }

            const data = await res.json();

            const replyText = data.reply || "⚠️ Bot không có phản hồi.";
            setMessages([...newMessages, { from: 'bot', text: replyText }]);
        } catch (err) {
            setMessages([...newMessages, { from: 'bot', text: "❌ Lỗi kết nối đến server!" }]);
            console.error("Lỗi gửi tin nhắn:", err);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <div style={styles.body}>
            <h2 style={styles.title}>Chatbot AI Bán Hàng</h2>

            <div style={styles.chatContainer}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ ...styles.message, ...(msg.from === 'user' ? styles.user : styles.bot) }}>
                        <b>{msg.from === 'user' ? "Bạn" : "Bot"}:</b>&nbsp;
                        <span dangerouslySetInnerHTML={{ __html: String(msg.text || "") }} />
                    </div>
                ))}
            </div>

            <div style={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Nhập câu hỏi..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.button}>Gửi</button>
            </div>
        </div>
    );
};

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        background: '#f4f4f4',
        textAlign: 'center',
        minHeight: '100vh',
        padding: '20px',
    },
    title: { color: '#333' },
    chatContainer: {
        width: '80%',
        maxWidth: '600px',
        margin: 'auto',
        background: '#fff',
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
        maxHeight: '400px',
    },
    message: {
        padding: '10px',
        margin: '8px',
        borderRadius: '8px',
        maxWidth: '80%',
        display: 'inline-block',
        whiteSpace: 'pre-line',
        clear: 'both'
    },
    user: {
        background: '#d1e7fd',
        textAlign: 'right',
        float: 'right'
    },
    bot: {
        background: '#f1f1f1',
        textAlign: 'left',
        float: 'left'
    },
    inputContainer: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
    },
    input: {
        width: '70%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    button: {
        padding: '10px 15px',
        background: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default Chatbot;
