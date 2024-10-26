'use client'

import { useState } from 'react'
import { Menu, MessageSquare, Mic, Send, FileText, UserPlus, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkReport } from "@/components/work-report"
import { ServiceRequest } from "@/components/service-request"

export function ChatInterfaceComponent() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'システム', content: 'チャットを開始しました。', timestamp: new Date().toLocaleTimeString() },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [currentView, setCurrentView] = useState('chat')

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'あなた', content: inputMessage, timestamp: new Date().toLocaleTimeString() }])
      setInputMessage('')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon"><Menu /></Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4">
              <Button variant="ghost">グループチャット</Button>
              <Button variant="ghost">個別チャット</Button>
              <Button variant="ghost">設定</Button>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">介護サポートチャット</h1>
        <Button variant="ghost" size="icon"><UserPlus /></Button>
      </header>

      <div className="flex-1">
      {currentView === 'chat' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'あなた' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'あなた' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                <p className="font-semibold">{msg.sender}</p>
                <p>{msg.content}</p>
                <p className="text-xs text-right mt-1">{msg.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {currentView === 'report' && <WorkReport onClose={() => setCurrentView('chat')} />}
      {currentView === 'request' && <ServiceRequest onClose={() => setCurrentView('chat')} />}
      </div>

      <footer className="bg-white p-4">
        {currentView === 'chat' && (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="ユーザーアバター" />
                <AvatarFallback>ユ</AvatarFallback>
              </Avatar>
              <Input 
                placeholder="メッセージを入力..." 
                value={inputMessage} 
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button size="icon" onClick={sendMessage}><Send /></Button>
              <Button size="icon" className="w-12 h-12"><Mic className="w-6 h-6" /></Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => setCurrentView('report')} className="py-6 text-lg">作業報告作成</Button>
              <Button onClick={() => setCurrentView('request')} className="py-6 text-lg">依頼書作成</Button>
            </div>
          </>
        )}
      </footer>
    </div>
  )
}
