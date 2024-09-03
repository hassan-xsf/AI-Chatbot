
import { ragChat } from '@/lib/rag-chat'
import { cookies } from 'next/headers'
import MainChat from '@/components/ui/mainchat'

export default async function Component() {


  const sessionCookie = cookies().get("sessionId")?.value;

  const sessionHistory = await ragChat.history.getMessages({
    amount: 10,
    sessionId: sessionCookie
  });

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      <header className="flex items-center justify-center p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">ChatX</h1>
      </header>

      <MainChat history={sessionHistory}/>
    </div >
  )
}