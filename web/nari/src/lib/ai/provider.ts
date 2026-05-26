import type { AiToolName } from './types'

export type AiMessageRole = 'system' | 'developer' | 'user' | 'assistant' | 'tool'

export interface AiProviderMessage {
  role: AiMessageRole
  content: string
}

export interface AiToolRequest {
  toolName: AiToolName
  arguments: Record<string, unknown>
}

export interface AiCompletionRequest {
  messages: AiProviderMessage[]
  language: string
  purpose: string
  responseFormat?: 'text' | 'json'
  requestedTool?: AiToolRequest
  timeoutMs?: number
}

export interface AiCompletion {
  content: string
  structured?: Record<string, unknown>
  toolCalls?: AiToolRequest[]
  metadata?: Record<string, unknown>
}

export interface AiProvider {
  completeChat(request: AiCompletionRequest): Promise<AiCompletion>
}

export class ProviderSafetyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProviderSafetyError'
  }
}

export class MockAiProvider implements AiProvider {
  async completeChat(request: AiCompletionRequest): Promise<AiCompletion> {
    const lastUserMessage =
      [...request.messages].reverse().find((message) => message.role === 'user')?.content ?? ''
    const normalized = lastUserMessage.toLowerCase()
    const topic = normalized.includes('pickle')
      ? 'pickle making'
      : normalized.includes('loan')
        ? 'financing'
        : normalized.includes('stitch') || normalized.includes('tailor')
          ? 'tailoring'
          : 'your business'

    return {
      content: `I can help with ${topic}. Here is one practical next step in simple language.`,
      toolCalls: request.requestedTool ? [request.requestedTool] : [],
      metadata: {
        provider: 'mock',
        model: 'deterministic-local',
        language: request.language,
      },
    }
  }
}

export function getAiProvider(): AiProvider {
  return new MockAiProvider()
}

export function getAiTimeoutMs() {
  const parsed = Number(process.env.AI_TIMEOUT_MS ?? 30000)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 30000
}
