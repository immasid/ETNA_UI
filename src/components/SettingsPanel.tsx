import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  Check,
  Volume2,
  VolumeX,
  Palette,
  X,
} from 'lucide-react'
import type { SoundSettings } from '../lib/uiSounds'
import {
  accentThemes,
  getAccentTheme,
  type AccentThemeId,
} from '../lib/themes'

type SettingsPanelProps = {
  settings: SoundSettings
  onChange: (settings: SoundSettings) => void
  accentThemeId: AccentThemeId
  onAccentChange: (id: AccentThemeId) => void
  onClose: () => void
}

const soundRows: Array<{
  key: keyof Omit<SoundSettings, 'master' | 'volume'>
  label: string
  description: string
}> = [
  {
    key: 'hover',
    label: 'Hover feedback',
    description: 'Proximity and focus audio cues.',
  },
  {
    key: 'buttons',
    label: 'Button feedback',
    description: 'Tactile control clicks.',
  },
  {
    key: 'navigation',
    label: 'Navigation',
    description: 'Sidebar and settings transitions.',
  },
  {
    key: 'typing',
    label: 'Typing feedback',
    description: 'Key pulses while composing.',
  },
  {
    key: 'chat',
    label: 'Chat feedback',
    description: 'Transmission and synthesis audio.',
  },
]

export function SettingsPanel({
  settings,
  onChange,
  accentThemeId,
  onAccentChange,
  onClose,
}: SettingsPanelProps) {
  const selectedTheme = getAccentTheme(accentThemeId)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [activeCategory, setActiveCategory] = useState<'sounds' | 'themes'>('sounds')

  // Focus management and Escape key handling
  useEffect(() => {
    // Focus the close button on open
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      // Simple focus trap inside dialog
      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const toggle = (key: keyof SoundSettings) => {
    onChange({
      ...settings,
      [key]: !settings[key],
    })
  }

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Interface Settings"
      initial={{
        opacity: 0,
        scale: 0.985,
        y: 10,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.99,
        y: 8,
      }}
      transition={{
        duration: 0.26,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute inset-x-4 bottom-4 top-4 z-30 overflow-hidden rounded-[22px] border bg-[#050b10]/98 shadow-2xl backdrop-blur-2xl sm:inset-x-6 sm:bottom-6 sm:top-6"
      style={{
        borderColor: selectedTheme.border,
        boxShadow: `0 0 55px ${selectedTheme.glow}`,
      }}
    >
      <div className="flex h-full flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.34em]"
              style={{
                color: selectedTheme.primary,
              }}
            >
              Configuration
            </div>

            <div className="mt-1 text-sm font-medium text-white/95">
              Interface Settings
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 text-white/60 transition hover:bg-white/5 hover:text-white"
            aria-label="Close settings"
          >
            <X size={17} strokeWidth={1.8} />
          </button>
        </div>

        {/* SETTINGS CATEGORY NAVIGATION */}
        <nav
          aria-label="Settings categories"
          className="grid grid-cols-2 gap-2 border-b border-white/10 px-5 py-3 sm:px-6"
        >
          <button
            type="button"
            aria-pressed={activeCategory === 'sounds'}
            onClick={() => setActiveCategory('sounds')}
            className="flex min-h-[58px] items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              borderColor: activeCategory === 'sounds'
                ? selectedTheme.border
                : 'rgba(255,255,255,0.07)',
              background: activeCategory === 'sounds'
                ? selectedTheme.soft
                : 'rgba(255,255,255,0.015)',
              color: activeCategory === 'sounds'
                ? selectedTheme.primary
                : 'rgba(255,255,255,0.7)',
            }}
          >
            <Volume2 size={19} strokeWidth={1.7} />
            <span className="flex flex-col items-start gap-0.5">
              <span className="text-xs font-semibold">Sounds</span>
              <span className="text-[10px] text-white/45">Audio and feedback</span>
            </span>
          </button>

          <button
            type="button"
            aria-pressed={activeCategory === 'themes'}
            onClick={() => setActiveCategory('themes')}
            className="flex min-h-[58px] items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              borderColor: activeCategory === 'themes'
                ? selectedTheme.border
                : 'rgba(255,255,255,0.07)',
              background: activeCategory === 'themes'
                ? selectedTheme.soft
                : 'rgba(255,255,255,0.015)',
              color: activeCategory === 'themes'
                ? selectedTheme.primary
                : 'rgba(255,255,255,0.7)',
            }}
          >
            <Palette size={19} strokeWidth={1.7} />
            <span className="flex flex-col items-start gap-0.5">
              <span className="text-xs font-semibold">Themes</span>
              <span className="text-[10px] text-white/45">Colour and appearance</span>
            </span>
          </button>
        </nav>

        {/* CONTENT */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 overflow-y-auto px-5 py-5 sm:px-6"
        >
          {activeCategory === 'sounds' ? (
            <>
  {/* MASTER SOUND TOGGLE */}
            <div
              className="rounded-2xl border p-4"
              style={{
                borderColor: selectedTheme.border,
                background: selectedTheme.soft,
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: selectedTheme.border,
                      background: selectedTheme.soft,
                      color: selectedTheme.primary,
                    }}
                  >
                    {settings.master ? (
                      <Volume2 size={18} strokeWidth={1.6} />
                    ) : (
                      <VolumeX size={18} strokeWidth={1.6} />
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-medium text-white/90">
                      Master sounds
                    </div>

                    <div className="mt-0.5 text-xs text-white/65">
                      Enable or disable the complete interface audio synthesizer.
                    </div>
                  </div>
                </div>

                <Toggle
                  label="Master sounds"
                  enabled={settings.master}
                  accent={selectedTheme.primary}
                  onClick={() => toggle('master')}
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Volume2
                  size={17}
                  strokeWidth={1.7}
                  className="shrink-0 text-white/55"
                />

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="etna-master-volume"
                      className="text-xs font-medium text-white/70"
                    >
                      Master volume
                    </label>

                    <span className="text-xs tabular-nums text-white/65">
                      {settings.volume}%
                    </span>
                  </div>

                  <input
                    id="etna-master-volume"
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={settings.volume}
                    disabled={!settings.master}
                    onChange={(event) =>
                      onChange({
                        ...settings,
                        volume: Number(event.currentTarget.value),
                      })
                    }
                    className="etna-volume-slider w-full disabled:cursor-not-allowed disabled:opacity-35"
                    style={{
                      background: `linear-gradient(90deg, ${selectedTheme.primary} 0%, ${selectedTheme.primary} ${settings.volume}%, rgba(255,255,255,0.12) ${settings.volume}%, rgba(255,255,255,0.12) 100%)`,
                    }}
                    aria-label="Master volume"
                  />
                </div>
              </div>
            </div>

  {/* SOUND CHANNELS */}
            <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
              Sound channels
            </div>

            <div className="mt-3 divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/20">
              {soundRows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between gap-4 px-4 py-3.5"
                >
                  <div>
                    <div className="text-sm font-medium text-white/85">
                      {row.label}
                    </div>

                    <div className="mt-0.5 text-xs text-white/55">
                      {row.description}
                    </div>
                  </div>

                  <Toggle
                    label={row.label}
                    enabled={settings[row.key] && settings.master}
                    disabled={!settings.master}
                    accent={selectedTheme.primary}
                    onClick={() => toggle(row.key)}
                  />
                </div>
              ))}
            </div>

            {/* FOOTER NOTICE */}
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <Check
                size={16}
                className="mt-0.5 shrink-0"
                style={{
                  color: selectedTheme.primary,
                }}
              />

              <p className="text-xs leading-relaxed text-white/60">
                Interface audio is generated procedurally on-device via Web Audio.
                Preferences and conversation history persist across sessions.
              </p>
            </div>
            </>
          ) : (
            <>
  {/* ACCENT THEME SELECTOR */}
            <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
              Accent color theme
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {accentThemes.map((theme) => {
                const active = theme.id === accentThemeId

                return (
                  <button
                    key={theme.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onAccentChange(theme.id)}
                    className="group flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition"
                    style={{
                      borderColor: active
                        ? theme.border
                        : 'rgba(255,255,255,0.12)',
                      background: active
                        ? theme.soft
                        : 'rgba(255,255,255,0.02)',
                      boxShadow: active ? `0 0 20px ${theme.glow}` : 'none',
                    }}
                  >
                    <span
                      className="h-4 w-4 shrink-0 rounded-full border"
                      style={{
                        background: theme.primary,
                        borderColor: theme.primary,
                        boxShadow: `0 0 10px ${theme.glowStrong}`,
                      }}
                    />

                    <span className="min-w-0">
                      <span
                        className="block truncate text-xs font-medium"
                        style={{
                          color: active ? theme.primary : 'rgba(255,255,255,0.85)',
                        }}
                      >
                        {theme.name}
                      </span>

                      <span
                        className="mt-0.5 block text-[9px] uppercase tracking-[0.18em]"
                        style={{
                          color: active ? theme.primary : 'rgba(255,255,255,0.45)',
                        }}
                      >
                        {active ? 'Active' : 'Select'}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

type ToggleProps = {
  label: string
  enabled: boolean
  onClick: () => void
  disabled?: boolean
  accent: string
}

function Toggle({
  label,
  enabled,
  onClick,
  disabled = false,
  accent,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-label={label}
      aria-checked={enabled}
      disabled={disabled}
      onClick={onClick}
      className={[
        'relative h-7 w-12 shrink-0 rounded-full border transition-all',
        disabled ? 'cursor-not-allowed opacity-30' : 'cursor-pointer',
      ].join(' ')}
      style={{
        borderColor: enabled ? accent : 'rgba(255,255,255,0.15)',
        background: enabled ? `${accent}18` : 'rgba(255,255,255,0.03)',
        boxShadow: enabled ? `0 0 16px ${accent}22` : 'none',
      }}
    >
      <motion.span
        animate={{
          x: enabled ? 20 : 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        className="absolute left-0 top-1 h-5 w-5 rounded-full border"
        style={{
          borderColor: enabled ? accent : 'rgba(255,255,255,0.25)',
          background: enabled ? accent : 'rgba(255,255,255,0.30)',
          boxShadow: enabled ? `0 0 10px ${accent}aa` : 'none',
        }}
      />
    </button>
  )
}
