import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ChatViewport } from '../components/ChatViewport'
import { accentThemes } from '../lib/themes'
import type { ChatMessage } from '../lib/chat/types'

describe('ChatViewport and Auto-Scroll', () => {
  const theme = accentThemes[0]
  const sampleMessages: ChatMessage[] = [
    {
      id: '1',
      role: 'user',
      content: 'Hello',
      status: 'completed',
      createdAt: Date.now() - 5000,
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Greetings operative',
      status: 'completed',
      createdAt: Date.now(),
    },
  ]

  it('renders empty VMark state when messages array is empty', () => {
    render(<ChatViewport messages={[]} theme={theme} isStreaming={false} />)
    expect(screen.getByTestId('empty-canvas')).toBeInTheDocument()
  })

  it('renders messages when present', () => {
    render(
      <ChatViewport
        messages={sampleMessages}
        theme={theme}
        isStreaming={false}
      />,
    )
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Greetings operative')).toBeInTheDocument()
  })

  it('keeps conversation scrolling inside a bounded scroll region', () => {
    render(
      <ChatViewport
        messages={sampleMessages}
        theme={theme}
        isStreaming={false}
      />,
    )

    const scrollContainer = screen.getByRole('log')
    expect(scrollContainer.className).toContain('etna-chat-scroll')
    expect(scrollContainer.className).toContain('min-h-0')
    expect(scrollContainer.className).toContain('overflow-y-auto')
  })

  it('displays Resume Auto-Scroll when user scrolls up away from bottom', async () => {
    const { container } = render(
      <ChatViewport
        messages={sampleMessages}
        theme={theme}
        isStreaming={true}
      />,
    )

    const scrollContainer = container.querySelector('[role="log"]')!

    // Mock scrollHeight, clientHeight, scrollTop
    Object.defineProperty(scrollContainer, 'scrollHeight', {
      value: 1000,
      configurable: true,
    })
    Object.defineProperty(scrollContainer, 'clientHeight', {
      value: 300,
      configurable: true,
    })
    Object.defineProperty(scrollContainer, 'scrollTop', {
      value: 100, // Distance from bottom = 1000 - 100 - 300 = 600px (> 48px)
      configurable: true,
      writable: true,
    })

    fireEvent.scroll(scrollContainer)

    const resumeButton = screen.getByLabelText('Resume auto-scroll')
    expect(resumeButton).toBeInTheDocument()

    // Clicking resume scrolls to bottom
    fireEvent.click(resumeButton)
    await waitFor(() => {
      expect(screen.queryByLabelText('Resume auto-scroll')).not.toBeInTheDocument()
    })
  })
})
