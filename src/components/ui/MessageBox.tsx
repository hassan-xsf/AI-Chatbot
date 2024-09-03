import React from 'react'
import { Message } from "ai/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from 'lucide-react';


const MessageBox = ({ message, index }: { message: Message, index: number }) => {
    return (
        <div key={`${message}-${index}`} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
                <Avatar className="w-8 h-8">
                    <AvatarFallback><Bot size={20} /></AvatarFallback>
                </Avatar>
            )}
            <div className={`rounded-lg p-3 max-w-[80%] ${message.role === 'user' ? 'bg-black text-white' : 'bg-gray-100'}`}>
                <p>{message.content}</p>
            </div>
            {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                    <AvatarFallback><User size={20} /></AvatarFallback>
                </Avatar>
            )}
        </div>
    )
}

export default MessageBox