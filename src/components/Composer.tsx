import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
} from 'react'
import { motion } from 'motion/react'
import { ArrowUp, Square } from 'lucide-react'
import type { AccentTheme } from '../lib/themes'
import { uiSounds } from '../lib/uiSounds'

interface ComposerProps {
  onSend: (message: string) => void
  onStop: () => void
  isStreaming: boolean
  theme: AccentTheme
}

export function Composer({
  onSend,
  onStop,
  isStreaming,
  theme,
}: ComposerProps) {
  const [draft, setDraft] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lastTypingSound = useRef(0)

  // Auto-resize textarea height
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const newHeight = Math.min(el.scrollHeight, 180)
    el.style.height = `${Math.max(newHeight, 42)}px`
  }, [draft])

  const playTypingSound = () => {
    const now = performance.now()
    if (now - lastTypingSound.current < 35) return
    lastTypingSound.current = now
    uiSounds.play('typing')
  }

  const handleSend = () => {
    const trimmed = draft.trim()
    if (!trimmed) {
      uiSounds.play('click')
      return
    }

    uiSounds.play('send')
    onSend(trimmed)
    setDraft('')

    if (textareaRef.current) {
      textareaRef.current.style.height = '42px'
    }
  }

  const handleStop = () => {
    uiSounds.play('click')
    onStop()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isStreaming) {
        handleStop()
      } else {
        handleSend()
      }
      return
    }

    // Audio feedback on typing
    if (e.ctrlKey || e.metaKey || e.altKey) return
    const isTypingKey =
      e.key.length === 1 ||
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === ' ' ||
      e.key === 'Tab'

    if (isTypingKey) {
      playTypingSound()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(e.target.value)
    playTypingSound()
  }

  return (
    <div className="relative z-10 w-full shrink-0 px-4 pb-5 pt-3 sm:px-6">
      <div className="mx-auto w-full max-w-[780px]">
      <motion.div className="etna-composer-dock">
        <div className="etna-composer-row">
        <textarea
          id="etna-prompt"
          ref={textareaRef}
          rows={1}
          aria-label="Message prompt"
          value={draft}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            void uiSounds.unlock()
          }}
          placeholder="Ask ETNA"
          className="etna-composer-textarea max-h-[180px] min-h-[42px] min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-[14px] leading-relaxed text-white outline-none placeholder:text-white/35"
        />

        {isStreaming ? (
          <motion.button
            whileHover={{ scale: 1.035, y: -1 }}
            whileTap={{ scale: 0.94, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 460,
              damping: 32,
              mass: 0.5,
            }}
            type="button"
            onClick={handleStop}
            className="etna-composer-action etna-composer-stop mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/40 bg-red-950/30 text-red-400 transition hover:bg-red-900/40"
            aria-label="Stop generating response"
            title="Stop generation"
          >
            <Square size={15} fill="currentColor" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={draft.trim() ? { scale: 1.035, y: -1 } : undefined}
            whileTap={{ scale: 0.94, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 460,
              damping: 32,
              mass: 0.5,
            }}
            type="button"
            onClick={handleSend}
            disabled={!draft.trim()}
            className="etna-composer-action etna-composer-send mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed"
            style={{
              borderColor: draft.trim()
                ? theme.border
                : 'rgba(255,255,255,0.07)',
              color: draft.trim()
                ? theme.primary
                : 'rgba(210,220,230,0.28)',
            }}
            aria-label="Send message"
            title="Send (Enter)"
          >
            <ArrowUp size={16} strokeWidth={2} />
          </motion.button>
        )}
        </div>

      </motion.div>
      </div>
    </div>
  )
}
