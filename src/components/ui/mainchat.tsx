"use client"

import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Message, useChat } from "ai/react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Bot, Send, User, Loader2 } from "lucide-react"
import MessageBox from './MessageBox';


const MainChat = ({ history }: {
    history: Message[]
}) => {

    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    const [isThinking, setisThinking] = useState(false)
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        initialMessages: history,
        api: "/api/chat",
        onError: () => {
            setisThinking(false)
        },
        onFinish: () => {
            setisThinking(false)
            if (endOfMessagesRef.current) endOfMessagesRef.current.scrollTop = endOfMessagesRef.current.scrollHeight;
        }
    });


    const handletheSubmit = async (e: React.FormEvent) => {
        setisThinking(true)
        handleSubmit(e)
        if (endOfMessagesRef.current) endOfMessagesRef.current.scrollTop = endOfMessagesRef.current.scrollHeight;

    }
    return (
        <>
            <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                    <div className="text-center text-gray-500" ref={endOfMessagesRef}>Welcome to ChatX</div>
                    {messages.map((message, index) => (
                        <MessageBox message={message} index={index} key={`${message.content}-${index}`} />
                    ))}
                </div>
            </ScrollArea>
            {
                isThinking && (
                    <div className="flex items-center justify-center p-2 bg-gray-100">
                        <span className="text-sm text-gray-600 flex items-center gap-3 justify-center"><Bot size={20} />AI is thinking</span>
                        <Loader2 className="ml-4 w-4 h-4 animate-spin" />
                    </div>
                )
            }
            <div className="p-4 border-t border-gray-200">
                <form onSubmit={handletheSubmit} className="relative">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={input}
                        onChange={handleInputChange}
                        className="pr-10 rounded-full"
                    />
                    <Button
                        disabled={isThinking}
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0"
                    >
                        <Send size={16} />
                    </Button>
                </form>
            </div>
        </>
    )
}

export default MainChat