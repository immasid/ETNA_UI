import {
  memo,
  useEffect,
  useState,
} from 'react'
import type {
  CSSProperties,
  ReactNode,
} from 'react'
import {
  AnimatePresence,
  MotionConfig,
  motion,
} from 'motion/react'
import {
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  Settings,
} from 'lucide-react'
import { SettingsPanel } from './components/SettingsPanel'
import { ChatViewport } from './components/ChatViewport'
import { Composer } from './components/Composer'
import {
  defaultAccentTheme,
  getAccentTheme,
  isValidAccentThemeId,
  type AccentTheme,
  type AccentThemeId,
} from './lib/themes'
import {
  defaultSettings,
  uiSounds,
  type SoundSettings,
} from './lib/uiSounds'
import { useChat } from './lib/chat/chatStore'
import {
  WindowActivityProvider,
  useWindowActivity,
} from './lib/windowActivity'

const spring = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 32,
  mass: 0.7,
}

function loadSoundSettings(): SoundSettings {
  try {
    const saved = localStorage.getItem('ai-ui-sound-settings')
    if (!saved) return { ...defaultSettings }

    const parsed: unknown = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') return { ...defaultSettings }

    const record = parsed as Record<string, unknown>
    return {
      master:
        typeof record.master === 'boolean'
          ? record.master
          : defaultSettings.master,
      volume:
        typeof record.volume === 'number' && Number.isFinite(record.volume)
          ? Math.round(Math.max(0, Math.min(100, record.volume)))
          : defaultSettings.volume,
      hover:
        typeof record.hover === 'boolean'
          ? record.hover
          : defaultSettings.hover,
      buttons:
        typeof record.buttons === 'boolean'
          ? record.buttons
          : defaultSettings.buttons,
      navigation:
        typeof record.navigation === 'boolean'
          ? record.navigation
          : defaultSettings.navigation,
      typing:
        typeof record.typing === 'boolean'
          ? record.typing
          : defaultSettings.typing,
      chat:
        typeof record.chat === 'boolean'
          ? record.chat
          : defaultSettings.chat,
    }
  } catch {
    return { ...defaultSettings }
  }
}

function loadAccentTheme(): AccentThemeId {
  try {
    const saved = localStorage.getItem('ai-ui-accent-theme')
    return isValidAccentThemeId(saved) ? saved : defaultAccentTheme
  } catch {
    return defaultAccentTheme
  }
}

function MainApp() {
  const [sidebarExpanded, setSidebarExpanded] = useState(
    () => typeof window === 'undefined' || window.innerWidth > 760,
  )
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(loadSoundSettings)
  const [accentThemeId, setAccentThemeId] = useState<AccentThemeId>(loadAccentTheme)

  // Collapse the sidebar automatically when the window becomes compact.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 760) {
        setSidebarExpanded(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { isActive } = useWindowActivity()
  const { messages, isStreaming, sendMessage, stopGeneration, clearChat } = useChat()

  const accentTheme = getAccentTheme(accentThemeId)

  useEffect(() => {
    uiSounds.setSettings(soundSettings)
  }, [soundSettings])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      localStorage.setItem(
        'ai-ui-sound-settings',
        JSON.stringify(soundSettings),
      )
    }, 250)

    return () => window.clearTimeout(timeoutId)
  }, [soundSettings])

  useEffect(() => {
    localStorage.setItem('ai-ui-accent-theme', accentThemeId)
  }, [accentThemeId])

  useEffect(() => {
    const unlock = () => {
      void uiSounds.unlock()
    }

    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)

    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  const handleToggle = () => {
    void uiSounds.unlock()
    uiSounds.play('toggle')
    setSidebarExpanded((value) => !value)
  }

  const handleNewChat = () => {
    void uiSounds.unlock()
    uiSounds.play('newChat')
    clearChat()
    setSettingsOpen(false)
  }

  const handleSettings = () => {
    void uiSounds.unlock()
    uiSounds.play('settings')
    setSettingsOpen((value) => !value)
  }

  const themeStyle: CSSProperties & Record<`--${string}`, string> = {
    '--accent': accentTheme.primary,
    '--accent-border': accentTheme.border,
    '--accent-soft': accentTheme.soft,
    '--accent-glow': accentTheme.glow,
    '--accent-glow-strong': accentTheme.glowStrong,
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex h-screen w-screen overflow-hidden bg-[#020509] p-3 text-white sm:p-5"
      style={themeStyle}
    >
      {/* BACKGROUND GRID & RADIAL GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 42%, ${accentTheme.glow}, transparent 42%)`,
          }}
        />

        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `linear-gradient(${accentTheme.soft} 1px, transparent 1px), linear-gradient(90deg, ${accentTheme.soft} 1px, transparent 1px)`,
            backgroundSize: '46px 46px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full min-h-0 w-full min-w-0 gap-3 sm:gap-5">
        {/* SIDEBAR */}
        <motion.aside
          animate={{
            width: sidebarExpanded ? 256 : 76,
          }}
          transition={spring}
          className="etna-glass-sidebar relative flex h-full shrink-0 flex-col overflow-hidden rounded-[26px] border backdrop-blur-2xl"
          style={{
            borderColor: 'rgba(205,225,240,0.14)',
            background: 'rgba(8,14,21,0.60)',
            boxShadow: '0 22px 70px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.07)',
          }}
        >
          {/* STATIC GLASS EDGE */}
          <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/[0.045]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* ETNA SIDEBAR BRANDING */}
          <div className="relative flex h-[94px] shrink-0 items-center px-4">
            <motion.div
              animate={{
                opacity: sidebarExpanded ? 1 : 0,
                scale: sidebarExpanded ? 1 : 0.94,
              }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
              aria-hidden="true"
            >
              <span className="etna-sidebar-wordmark">ETNA</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              transition={spring}
              type="button"
              onMouseEnter={() => uiSounds.play('hover')}
              onClick={handleToggle}
              className="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-white/65 transition-colors hover:bg-white/[0.09] hover:text-white"
              aria-label={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <motion.div
                animate={{ rotate: sidebarExpanded ? 0 : 180 }}
                transition={spring}
              >
                {sidebarExpanded ? (
                  <ChevronLeft size={18} strokeWidth={1.7} />
                ) : (
                  <ChevronRight size={18} strokeWidth={1.7} />
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* BRAND SEPARATOR */}
          <div className="mx-5 mb-5 h-px shrink-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* SIDEBAR ACTIONS */}
          <nav className="mt-1 flex flex-col gap-2 px-3">
            <SidebarButton
              icon={<MessageSquarePlus size={19} strokeWidth={1.7} />}
              label="New Chat"
              expanded={sidebarExpanded}
              onClick={handleNewChat}
              accent={accentTheme}
            />

            <SidebarButton
              icon={<Settings size={19} strokeWidth={1.7} />}
              label="Settings"
              expanded={sidebarExpanded}
              active={settingsOpen}
              onClick={handleSettings}
              accent={accentTheme}
            />
          </nav>

        </motion.aside>

        {/* MAIN CHAT & CANVAS WINDOW */}
        <motion.section
          className="etna-glass-main relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[26px] border backdrop-blur-2xl"
          style={{
            borderColor: accentTheme.border,
            background: 'rgba(8,14,21,0.54)',
            boxShadow: `0 0 45px ${accentTheme.glow}`,
          }}
        >
          {isActive ? (
            <motion.div
              animate={{
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute inset-0 rounded-[26px]"
              style={{
                boxShadow: `inset 0 0 0 1px ${accentTheme.border}`,
              }}
            />
          ) : (
            <div
              className="pointer-events-none absolute inset-0 rounded-[26px] opacity-20"
              style={{
                boxShadow: `inset 0 0 0 1px ${accentTheme.border}`,
              }}
            />
          )}

          {/* VIEWPORT (MESSAGES OR CENTRAL VMARK) */}
          <ChatViewport
            messages={messages}
            theme={accentTheme}
            isStreaming={isStreaming}
          />

          {/* COMPOSER */}
          <Composer
            onSend={(text) => void sendMessage(text)}
            onStop={stopGeneration}
            isStreaming={isStreaming}
            theme={accentTheme}
          />

          {/* SETTINGS MODAL */}
          <AnimatePresence>
            {settingsOpen && (
              <SettingsPanel
                settings={soundSettings}
                onChange={setSoundSettings}
                accentThemeId={accentThemeId}
                onAccentChange={(id) => {
                  void uiSounds.unlock()
                  uiSounds.play('click')
                  setAccentThemeId(id)
                }}
                onClose={() => setSettingsOpen(false)}
              />
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </motion.main>
  )
}

export default function App() {
  return (
    <WindowActivityProvider>
      <MotionConfig reducedMotion="user">
        <MainApp />
      </MotionConfig>
    </WindowActivityProvider>
  )
}

type SidebarButtonProps = {
  icon: ReactNode
  label: string
  expanded: boolean
  active?: boolean
  onClick: () => void
  accent: AccentTheme
}

const SidebarButton = memo(function SidebarButton({
  icon,
  label,
  expanded,
  active = false,
  onClick,
  accent,
}: SidebarButtonProps) {
  return (
    <motion.button
      whileHover={{
        scale: 1.015,
        x: expanded ? 2 : 0,
        backgroundColor: active
          ? 'rgba(255,255,255,0.095)'
          : 'rgba(255,255,255,0.065)',
        borderColor: active
          ? 'rgba(215,230,240,0.22)'
          : 'rgba(255,255,255,0.12)',
        color: '#F1F5F9',
      }}
      whileTap={{
        scale: 0.96,
      }}
      transition={spring}
      type="button"
      aria-label={label}
      aria-expanded={label === 'Settings' ? active : undefined}
      title={!expanded ? label : undefined}
      data-active={active ? 'true' : 'false'}
      onMouseEnter={() => uiSounds.play('hover')}
      onClick={onClick}
      className={[
        'etna-sidebar-button relative flex h-12 items-center rounded-xl border',
        expanded ? 'gap-3 px-3' : 'justify-center',
      ].join(' ')}
      style={{
        borderColor: active ? 'rgba(215,230,240,0.15)' : 'rgba(255,255,255,0.065)',
        background: active ? 'rgba(255,255,255,0.075)' : 'rgba(255,255,255,0.025)',
        color: active ? '#F1F5F9' : 'rgba(255,255,255,0.72)',
      }}
    >
      {active && (
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-0 top-3 w-[2px] rounded-full"
          style={{ background: accent.primary }}
        />
      )}

      {icon}

      <motion.span
        animate={{
          opacity: expanded ? 1 : 0,
          width: expanded ? 'auto' : 0,
        }}
        transition={spring}
        className="overflow-hidden whitespace-nowrap text-sm font-medium"
      >
        {label}
      </motion.span>
    </motion.button>
  )
})
