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

interface AIChatSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AIChatSidebar({ isOpen, onClose }: AIChatSidebarProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [pendingImages, setPendingImages] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

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

  const handleSend = useCallback(() => {
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

    setTimeout(() => {
      const model = MODELS.find(m => m.id === selectedModel)
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I'm ${model?.label}. I can help you explore skills, courses, marketplace listings, and financing options. What would you like to know?`,
          timestamp: new Date(),
        },
      ])
      setIsTyping(false)
    }, 1400)
  }, [input, pendingImages, selectedModel])

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
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        aria-label="AI Chat"
        className={`fixed top-0 right-0 bottom-0 z-50 flex flex-col w-full sm:w-[22rem] bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-stone-200 dark:border-stone-800 flex-shrink-0">
          <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center">
            <HiOutlineSparkles className="w-4 h-4 text-rose-500" />
          </span>

          {/* Model selector */}
          <div className="relative flex-1 min-w-0 flex items-center">
            <select
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value)}
              className="w-full text-sm font-semibold bg-transparent text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer appearance-none pr-5 truncate"
              aria-label="Select AI model"
            >
              {MODELS.map(m => (
                <option key={m.id} value={m.id} className="font-normal dark:bg-stone-900">
                  {m.label}{m.hint ? ` · ${m.hint}` : ''}
                </option>
              ))}
            </select>
            <HiOutlineChevronDown className="absolute right-0 w-3.5 h-3.5 text-stone-400 pointer-events-none flex-shrink-0" />
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Clear chat"
                aria-label="Clear chat"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Close chat"
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scroll-smooth">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center">
                <HiOutlineSparkles className="w-7 h-7 text-rose-400" />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">Sakhi AI</p>
                <p className="text-xs text-stone-400 dark:text-stone-500 leading-relaxed">
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
                <span className="flex-shrink-0 mb-5 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                  <HiOutlineSparkles className="w-3.5 h-3.5 text-rose-500" />
                </span>
              )}
              <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.images?.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt="Uploaded"
                    className="rounded-xl max-h-44 object-cover border border-stone-200 dark:border-stone-700"
                  />
                ))}
                {msg.content && (
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-rose-500 text-white rounded-br-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                )}
                <time className="text-[10px] text-stone-400 dark:text-stone-600 px-1">
                  {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </time>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-end gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center">
                <HiOutlineSparkles className="w-3.5 h-3.5 text-rose-500" />
              </span>
              <div className="bg-stone-100 dark:bg-stone-800 rounded-2xl rounded-bl-sm px-4 py-3.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:120ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:240ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Pending image previews */}
        {pendingImages.length > 0 && (
          <div className="flex gap-2 px-4 py-2.5 border-t border-stone-100 dark:border-stone-800 flex-wrap">
            {pendingImages.map((src, i) => (
              <div key={i} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover border border-stone-200 dark:border-stone-700"
                />
                <button
                  onClick={() => setPendingImages(prev => prev.filter((_, j) => j !== i))}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-stone-800 dark:bg-stone-600 text-white text-xs leading-none flex items-center justify-center hover:bg-rose-500 transition-colors"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-3 py-3 border-t border-stone-200 dark:border-stone-800 flex-shrink-0">
          <div className="flex items-end gap-2 bg-stone-100 dark:bg-stone-800 rounded-2xl px-3 py-2">
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
              className="flex-1 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 resize-none focus:outline-none leading-5"
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
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                title="Upload image"
                aria-label="Upload image"
              >
                <HiOutlinePhoto className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={toggleListening}
                className={`p-1.5 rounded-xl transition-colors ${
                  isListening
                    ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50 animate-pulse'
                    : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
                title={isListening ? 'Stop recording' : 'Voice input'}
                aria-label={isListening ? 'Stop recording' : 'Voice input'}
              >
                <HiOutlineMicrophone className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() && pendingImages.length === 0}
                className="ml-0.5 p-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
                title="Send message"
                aria-label="Send message"
              >
                <HiOutlinePaperAirplane className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-center text-[10px] text-stone-400 dark:text-stone-600">
            Enter ↵ to send · Shift+Enter for newline
          </p>
        </div>
      </aside>
    </>
  )
}
