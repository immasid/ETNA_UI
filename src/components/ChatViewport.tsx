import { useRef, useEffect, useState, memo } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import type { ChatMessage } from '../lib/chat/types'
import type { AccentTheme } from '../lib/themes'
import { MessageItem } from './MessageItem'

interface ChatViewportProps {
  messages: ChatMessage[]
  theme: AccentTheme
  isStreaming: boolean
}

export const ChatViewport = memo(function ChatViewport({
  messages,
  theme,
  isStreaming,
}: ChatViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)
  const [showScrollBottom, setShowScrollBottom] = useState(false)

  const handleScroll = () => {
    const el = containerRef.current
    if (!el) return

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    const isNearBottom = distanceFromBottom <= 48

    isAtBottomRef.current = isNearBottom
    setShowScrollBottom(!isNearBottom)
  }

  // Bottom anchoring on message update or token stream
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (isAtBottomRef.current) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, isStreaming])

  const scrollToBottom = () => {
    const el = containerRef.current
    if (!el) return

    if (typeof el.scrollTo === 'function') {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      })
    } else {
      el.scrollTop = el.scrollHeight
    }
    isAtBottomRef.current = true
    setShowScrollBottom(false)
  }

  if (messages.length === 0) {
    return (
      <div
        className="relative flex h-full min-h-0 w-full min-w-0 flex-1 overflow-hidden"
        data-testid="empty-canvas"
      />
    )
  }

  return (
    <div className="relative flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="etna-chat-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden pt-5 pb-4 scroll-smooth"
        role="log"
        aria-live="polite"
        aria-label="Conversation history"
      >
        <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col space-y-3 pb-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <MessageItem key={msg.id} message={msg} theme={theme} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* FLOATING RESUME AUTO-SCROLL CONTROL */}
      <AnimatePresence>
        {showScrollBottom && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute bottom-3 right-6 z-20"
          >
          <button
            type="button"
            onClick={scrollToBottom}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full border bg-[#06121c]/95 px-3 py-1.5 text-xs text-white shadow-xl backdrop-blur-md transition hover:bg-[#0b1c2b]"
            style={{
              borderColor: theme.border,
              boxShadow: `0 0 16px ${theme.glow}`,
            }}
            aria-label="Resume auto-scroll"
          >
            <ArrowDown size={14} style={{ color: theme.primary }} />
            <span className="text-[11px] font-medium text-white/80">
              Resume Auto-Scroll
            </span>
          </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
