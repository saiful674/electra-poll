import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMessage } from "react-icons/ai";
import { BiSolidSend } from "react-icons/bi";
import { FiMinimize } from "react-icons/fi";

import chatbotImage from '../../assets/chatbot/chatbot.jpg';

const ChatBot = () => {
    const chatContainerRef = useRef(null);
    const [inputMessage, setInputMessage] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bounceTime, setBounceTime] = useState(false);


    useEffect(() => {
        // Retrieve chat history from session storage
        const storedChatHistory = sessionStorage.getItem('chatHistory');

        if (storedChatHistory) {
            setChatHistory(JSON.parse(storedChatHistory));

        }

        // Check if the chat box should be opened automatically
        setTimeout(() => {
            setIsChatOpen(true)

            // welcome message request
            if (!storedChatHistory && chatHistory.length === 0) {
                axios.post('http://localhost:5000/send-message', { message: 'Welcome Message' })
                    .then(response => {
                        const botResponse = response.data.response;
                        setChatHistory([...chatHistory, { text: botResponse, sender: 'bot' }]);
                    })
            }
        }, 8000);

        const intervalId = setInterval(() => {
            setBounceTime(true)
            setTimeout(() => {
                setBounceTime(false)
            }, 1000); // Keep the chat box open for 1 second
        }, 7000); // Bounce every 10 seconds

        return () => {
            clearInterval(intervalId);
        };

    }, []);



    useEffect(() => {
        // Store chat history in session storage whenever it changes
        if (chatHistory.length > 0) {
            sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
        }
        // Scroll the chat container to the bottom
        // chatContainerRef.current.scrollTop += 100;
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [chatHistory]);


    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const newUserMessage = { text: inputMessage, sender: 'user' };
        setChatHistory([...chatHistory, newUserMessage]);
        setInputMessage('');

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:5000/send-message', { message: inputMessage });
            const botResponse = response.data.response;
            setChatHistory([...chatHistory, newUserMessage, { text: botResponse, sender: 'bot' }]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }

    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            <div className={`fixed bottom-6 right-6 p-4 bg-green-100 border rounded-lg shadow-md w-[360px] z-50 h-fit ${isChatOpen ? '' : 'hidden'}`}>
                <div className="flex justify-between mb-2">
                    <div className='flex items-center gap-2'>
                        <figure className='h-10 w-10 rounded-full border-2 border-green-500'>
                            <img src={chatbotImage} alt="chatbot image" className='h-full w-full rounded-full object-cover' />
                        </figure>
                        <span className="font-bold text-green-800">ElectraPollAgent</span>
                    </div>
                    <button onClick={toggleChat}>
                        <FiMinimize className='h-6 w-6 text-green-800 hover:text-red-700 duration-300' />
                    </button>
                </div>
                <div ref={chatContainerRef} className="custom-scrollbar h-[350px] overflow-auto scroll-smooth mb-4 p-2 bg-slate-100 rounded duration-300">
                    <>
                        {chatHistory.map((message, index) => (
                            <div
                                key={index}
                                className={`p-2  ${message.sender === 'user' ? 'bg-green-400 text-white' : 'bg-gray-200'
                                    } rounded-lg mb-3`}
                            >
                                {message.text}
                            </div>
                        ))}
                        {/* animation pulse during bot's response */}
                        {isLoading &&
                            <div className="flex justify-end items-center h-5 mt-1">
                                <div className="dot-pulse">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        }
                    </>
                </div>
                {/* text input for user's message */}
                <div className="flex items-center">
                    <input
                        type="text"
                        className="flex-grow p-2 border rounded-lg mr-2 focus:outline-green-800"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="bg-green-800 text-white p-2 rounded-lg"
                        onClick={sendMessage}
                    >
                        <BiSolidSend />
                    </button>
                </div>
            </div>


            {/* message icon */}
            {!isChatOpen &&
                <div className="fixed bottom-4 right-4 z-50">
                    <button
                        className={`bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transform hover:scale-105 transition duration-200 ${bounceTime ? 'animate-bounce-once' : ''
                            }`}
                        onClick={() =>toggleChat()}
                    >
                        <AiOutlineMessage className='h-6 w-6' />
                    </button>
                </div>
            }

        </>
    );
};

export default ChatBot;
