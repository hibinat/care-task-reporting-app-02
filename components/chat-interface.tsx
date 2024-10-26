'use client'

import { useState } from 'react'
import { Menu, MessageSquare, Mic, Send, FileText, UserPlus, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

function WorkReport({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">作業報告</h2>
        <Button onClick={onClose} variant="outline" size="lg" className="px-6">
          <X className="mr-2 h-4 w-4" /> 閉じる
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            担当者
            <Input type="text" placeholder="担当者名" />
          </label>
          <label className="block">
            利用者
            <Input type="text" placeholder="利用者名" />
          </label>
        </div>
        <label className="block">
          日時
          <Input type="datetime-local" />
        </label>
        <label className="block">
          対応内容
          <div className="flex items-center space-x-2">
            <textarea className="w-full p-2 border rounded" rows={4}></textarea>
            <Button size="icon" className="w-12 h-12"><Mic className="w-6 h-6" /></Button>
          </div>
        </label>
        <label className="block">
          その他詳細
          <div className="flex items-center space-x-2">
            <textarea className="w-full p-2 border rounded" rows={4}></textarea>
            <Button size="icon" className="w-12 h-12"><Mic className="w-6 h-6" /></Button>
          </div>
        </label>
      </div>
      <Button className="w-full">報告を送信</Button>
    </div>
  )
}

function ServiceRequest({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">サービス依頼書</h2>
        <Button onClick={onClose} variant="outline" size="lg" className="px-6">
          <X className="mr-2 h-4 w-4" /> 閉じる
        </Button>
      </div>
      <div className="space-y-4">
        <label className="block">
          サービス内容
          <Input type="text" />
        </label>
        <Button size="icon" className="w-12 h-12"><Mic className="w-6 h-6" /></Button>
        <label className="block">
          担当者
          <Input type="text" />
        </label>
        <label className="block">
          依頼日時
          <Input type="datetime-local" />
        </label>
      </div>
      <Button className="w-full">依頼書を送信</Button>
    </div>
  )
}