'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
  HiOutlineXMark,
  HiOutlineMicrophone,
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
  HiOutlinePhoto,
  HiOutlineChevronDown,
  HiOutlineTrash,
} from 'react-icons/hi2'

const MODELS = [
  { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6', hint: 'Recommended' },
  { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5', hint: 'Fast' },
  { id: 'claude-opus-4-7', label: 'Claude Opus 4.7', hint: 'Powerful' },
  { id: 'gpt-4o', label: 'GPT-4o', hint: null },
  { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', hint: null },
  { id: 'llama-3.3-70b', label: 'Llama 3.3 70B', hint: 'Open' },
]

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  images?: string[]
  timestamp: Date
}

interface AIChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

export function AIChatWindow({ isOpen, onClose }: AIChatWindowProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [pendingImages, setPendingImages] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 128) + 'px'
  }, [input])

  const handleSend = useCallback(async () => {
    if (!input.trim() && pendingImages.length === 0) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      images: pendingImages.length > 0 ? [...pendingImages] : undefined,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setPendingImages([])
    setIsTyping(true)

    try {
      let activeSessionId = sessionId
      if (!activeSessionId) {
        const sessionRes = await fetch('/api/ai/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ purpose: 'chat' }),
        })
        if (!sessionRes.ok) throw new Error('Could not start AI session')
        const session = await sessionRes.json()
        activeSessionId = session.id
        setSessionId(activeSessionId)
      }

      const messageRes = await fetch(`/api/ai/sessions/${activeSessionId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userMsg.content }),
      })
      if (!messageRes.ok) throw new Error('Could not send AI message')
      const response = await messageRes.json()

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.assistantMessage.content,
          timestamp: new Date(),
        },
      ])
    } catch {
      const model = MODELS.find(m => m.id === selectedModel)
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I'm ${model?.label}. I could not reach the AI service right now. Please try again.`,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }, [input, pendingImages, selectedModel, sessionId])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    Array.from(e.target.files ?? []).forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => {
        setPendingImages(prev => [...prev, ev.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const toggleListening = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SR) return

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition: any = new SR()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-IN'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (e: any) => {
      const transcript = Array.from(e.results as ArrayLike<{ 0: { transcript: string } }>)
        .map(r => r[0].transcript)
        .join('')
      setInput(transcript)
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognition.start()
    recognitionRef.current = recognition
    setIsListening(true)
  }, [isListening])

  return (
    <aside
      aria-label="AI Chat"
      className={`
        fixed top-16 right-0 bottom-0 z-40
        w-full sm:w-[22rem]
        flex flex-col
        bg-base-100 border-l border-base-300
        transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-base-300 flex-shrink-0">
        <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <HiOutlineSparkles className="w-4 h-4 text-primary" />
        </span>

        <div className="relative flex-1 min-w-0 flex items-center">
          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            className="w-full text-sm font-semibold bg-transparent text-base-content focus:outline-none cursor-pointer appearance-none pr-5 truncate"
            aria-label="Select AI model"
          >
            {MODELS.map(m => (
              <option key={m.id} value={m.id} className="font-normal bg-base-100">
                {m.label}{m.hint ? ` · ${m.hint}` : ''}
              </option>
            ))}
          </select>
          <HiOutlineChevronDown className="absolute right-0 w-3.5 h-3.5 text-base-content/40 pointer-events-none flex-shrink-0" />
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="p-2 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors"
              title="Clear chat"
              aria-label="Clear chat"
            >
              <HiOutlineTrash className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors"
            aria-label="Close chat"
            title="Close"
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-4 scroll-smooth">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <HiOutlineSparkles className="w-7 h-7 text-primary" />
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-base-content">Sakhi AI</p>
              <p className="text-xs text-base-content/40 leading-relaxed">
                Ask about skills, courses, marketplace listings, or financing. Send an image or use your voice.
              </p>
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {msg.role === 'assistant' && (
              <span className="flex-shrink-0 mb-5 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
                <HiOutlineSparkles className="w-3.5 h-3.5 text-primary" />
              </span>
            )}
            <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.images?.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt="Uploaded"
                  className="rounded-xl max-h-44 object-cover border border-base-300"
                />
              ))}
              {msg.content && (
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-content rounded-br-sm'
                      : 'bg-base-200 text-base-content rounded-bl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              )}
              <time className="text-[10px] text-base-content/40 px-1">
                {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </time>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-end gap-2">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center">
              <HiOutlineSparkles className="w-3.5 h-3.5 text-primary" />
            </span>
            <div className="bg-base-200 rounded-2xl rounded-bl-sm px-4 py-3.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-base-content/40 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-base-content/40 animate-bounce [animation-delay:120ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-base-content/40 animate-bounce [animation-delay:240ms]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Pending image previews */}
      {pendingImages.length > 0 && (
        <div className="flex gap-2 px-4 py-2.5 border-t border-base-300 flex-wrap flex-shrink-0">
          {pendingImages.map((src, i) => (
            <div key={i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-14 h-14 rounded-xl object-cover border border-base-300"
              />
              <button
                onClick={() => setPendingImages(prev => prev.filter((_, j) => j !== i))}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-content/80 text-base-100 text-xs leading-none flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-3 border-t border-base-300 flex-shrink-0">
        <div className="flex items-end gap-2 bg-base-200 rounded-2xl px-3 py-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Ask Sakhi AI…"
            rows={1}
            className="flex-1 bg-transparent text-sm text-base-content placeholder:text-base-content/40 resize-none focus:outline-none leading-5"
            style={{ minHeight: '20px', maxHeight: '128px' }}
          />
          <div className="flex items-center gap-0.5 pb-px flex-shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded-xl text-base-content/40 hover:text-base-content hover:bg-base-300 transition-colors"
              title="Upload image"
              aria-label="Upload image"
            >
              <HiOutlinePhoto className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={toggleListening}
              className={`p-1.5 rounded-xl transition-colors ${
                isListening
                  ? 'text-primary bg-primary/10 animate-pulse'
                  : 'text-base-content/40 hover:text-base-content hover:bg-base-300'
              }`}
              title={isListening ? 'Stop recording' : 'Voice input'}
              aria-label={isListening ? 'Stop recording' : 'Voice input'}
            >
              <HiOutlineMicrophone className="w-[18px] h-[18px]" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim() && pendingImages.length === 0}
              className="ml-0.5 p-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-content disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
              title="Send message"
              aria-label="Send message"
            >
              <HiOutlinePaperAirplane className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-center text-[10px] text-base-content/40">
          Enter ↵ to send · Shift+Enter for newline
        </p>
      </div>
    </aside>
  )
}
