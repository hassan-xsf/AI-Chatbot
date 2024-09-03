import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { ragChat } from "@/lib/rag-chat";
import { cookies } from "next/headers";

export async function POST(req: Request) {

    const sessionCookie = cookies().get("sessionId")?.value;

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const response = await ragChat.chat(lastMessage, { streaming: true, sessionId : sessionCookie });
    // auto saves messaage on sessionCookie

    return aiUseChatAdapter(response);
}