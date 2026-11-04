interface EtnaEmblemProps {
  accentColor: string
  state?: 'idle' | 'processing' | 'generating'
}

export function EtnaEmblem({
  accentColor,
  state = 'idle',
}: EtnaEmblemProps) {
  return (
    <svg
      viewBox="0 0 280 350"
      className="etna-emblem-svg h-full w-full"
      data-state={state}
      role="img"
      aria-label="ETNA holographic android identity"
    >
      <defs>
        <linearGradient id="etna-skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8F6FF" stopOpacity=".96"/>
          <stop offset="36%" stopColor="#A7CDE5" stopOpacity=".91"/>
          <stop offset="72%" stopColor="#5686AB" stopOpacity=".92"/>
          <stop offset="100%" stopColor="#203F5C" stopOpacity=".96"/>
        </linearGradient>

        <linearGradient id="etna-hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9EC9E8"/>
          <stop offset="18%" stopColor="#426A91"/>
          <stop offset="58%" stopColor="#142A42"/>
          <stop offset="100%" stopColor="#7299BC"/>
        </linearGradient>

        <linearGradient id="etna-hair-light" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D5E9F8" stopOpacity=".1"/>
          <stop offset="50%" stopColor="#A6D9F5" stopOpacity=".8"/>
          <stop offset="100%" stopColor="#D5E9F8" stopOpacity=".08"/>
        </linearGradient>

        <linearGradient id="etna-suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BCD6E9" stopOpacity=".88"/>
          <stop offset="35%" stopColor="#547895" stopOpacity=".8"/>
          <stop offset="70%" stopColor="#192F45" stopOpacity=".96"/>
          <stop offset="100%" stopColor="#9BBBD4" stopOpacity=".75"/>
        </linearGradient>

        <linearGradient id="etna-circuit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accentColor} stopOpacity=".15"/>
          <stop offset="50%" stopColor={accentColor}/>
          <stop offset="100%" stopColor="#DDF3FF" stopOpacity=".9"/>
        </linearGradient>

        <radialGradient id="etna-hologram">
          <stop offset="0%" stopColor={accentColor} stopOpacity=".17"/>
          <stop offset="65%" stopColor="#5AB8EB" stopOpacity=".055"/>
          <stop offset="100%" stopColor="#5AB8EB" stopOpacity="0"/>
        </radialGradient>

        <linearGradient id="etna-eye" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4F7FF"/>
          <stop offset="50%" stopColor={accentColor}/>
          <stop offset="100%" stopColor="#3989C3"/>
        </linearGradient>
      </defs>

      {/* Soft holographic field */}
      <ellipse
        cx="140"
        cy="180"
        rx="126"
        ry="160"
        fill="url(#etna-hologram)"
      />

      {/* Rear hair silhouette */}
      <path
        d="M140 17
           C83 17 51 59 57 119
           C61 151 54 188 43 221
           C36 245 26 262 13 280
           C49 273 77 247 88 215
           L101 167
           L179 167
           L192 215
           C203 247 231 273 267 280
           C254 262 244 245 237 221
           C226 188 219 151 223 119
           C229 59 197 17 140 17Z"
        fill="url(#etna-hair)"
        stroke="#B8D8EF"
        strokeOpacity=".6"
        strokeWidth="1.3"
      />

      {/* Long flowing hair details */}
      <g fill="none" stroke="url(#etna-hair-light)" strokeLinecap="round">
        <path d="M75 69 C55 121 80 176 63 234" strokeWidth="2"/>
        <path d="M89 46 C73 99 98 160 80 216" strokeWidth="1.4"/>
        <path d="M205 69 C225 121 200 176 217 234" strokeWidth="2"/>
        <path d="M191 46 C207 99 182 160 200 216" strokeWidth="1.4"/>
      </g>

      {/* Elegant upper torso and narrow shoulders */}
      <path
        d="M104 207
           C84 211 58 222 36 244
           C22 258 17 282 14 332
           L266 332
           C263 282 258 258 244 244
           C222 222 196 211 176 207
           L158 233
           Q140 244 122 233Z"
        fill="url(#etna-suit)"
        stroke="#BAD6E9"
        strokeOpacity=".78"
        strokeWidth="1.7"
      />

      {/* Shoulder contours */}
      <path
        d="M102 218 C79 226 60 242 43 268"
        fill="none"
        stroke="#E0F2FC"
        strokeOpacity=".6"
        strokeWidth="1.8"
      />
      <path
        d="M178 218 C201 226 220 242 237 268"
        fill="none"
        stroke="#E0F2FC"
        strokeOpacity=".6"
        strokeWidth="1.8"
      />

      {/* Neck */}
      <path
        d="M113 174
           L109 211
           Q140 232 171 211
           L167 174Z"
        fill="url(#etna-skin)"
        stroke="#D9EEFA"
        strokeOpacity=".7"
        strokeWidth="1.2"
      />

      {/* High-tech collar */}
      <path
        d="M105 207 Q140 239 175 207"
        fill="none"
        stroke="url(#etna-circuit)"
        strokeWidth="2"
      />

      <path
        d="M93 229 Q140 251 187 229"
        fill="none"
        stroke="#B5DBF1"
        strokeOpacity=".55"
        strokeWidth="1.2"
      />

      {/* Face: softer human proportions */}
      <path
        d="M140 42
           C109 42 88 63 88 101
           L92 142
           C94 170 112 193 140 202
           C168 193 186 170 188 142
           L192 101
           C192 63 171 42 140 42Z"
        fill="url(#etna-skin)"
        stroke="#DDEFFA"
        strokeOpacity=".78"
        strokeWidth="1.5"
      />

      {/* Face lighting and contours */}
      <path
        d="M101 103 Q103 158 129 183"
        fill="none"
        stroke="white"
        strokeOpacity=".2"
        strokeWidth="1.5"
      />
      <path
        d="M179 103 Q177 158 151 183"
        fill="none"
        stroke="#D4EDFA"
        strokeOpacity=".28"
        strokeWidth="1.5"
      />

      {/* Hairline and front framing */}
      <path
        d="M84 113
           C76 63 99 31 140 30
           C181 31 204 63 196 113
           C183 82 166 67 140 65
           C114 67 97 82 84 113Z"
        fill="url(#etna-hair)"
        stroke="#A9C9E2"
        strokeOpacity=".65"
        strokeWidth="1.2"
      />

      {/* Front hair strands */}
      <path
        d="M94 76 C103 47 119 38 139 38"
        fill="none"
        stroke="#D5EAF8"
        strokeOpacity=".72"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M177 77 C170 51 155 42 143 39"
        fill="none"
        stroke="#A8CDE9"
        strokeOpacity=".65"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Fine eyebrows */}
      <path
        d="M103 112 Q116 103 128 111"
        fill="none"
        stroke="#395A77"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M152 111 Q164 103 177 112"
        fill="none"
        stroke="#395A77"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Almond-shaped eyes */}
      <path
        d="M101 125 Q115 113 130 125 Q116 137 101 125Z"
        fill="#10283E"
        stroke="#D7F0FC"
        strokeOpacity=".85"
        strokeWidth="1.1"
      />
      <path
        d="M150 125 Q165 113 179 125 Q164 137 150 125Z"
        fill="#10283E"
        stroke="#D7F0FC"
        strokeOpacity=".85"
        strokeWidth="1.1"
      />

      <g className="etna-eye-core">
        <circle cx="116" cy="125" r="5.2" fill="url(#etna-eye)"/>
        <circle cx="164" cy="125" r="5.2" fill="url(#etna-eye)"/>
        <circle cx="116" cy="125" r="2.1" fill="#F4FCFF"/>
        <circle cx="164" cy="125" r="2.1" fill="#F4FCFF"/>
      </g>

      {/* Nose bridge */}
      <path
        d="M140 124 L136 151 Q140 155 144 151"
        fill="none"
        stroke="#E3F3FB"
        strokeOpacity=".67"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Subtle mouth */}
      <path
        d="M127 170 Q140 175 153 170"
        fill="none"
        stroke="#E0F1FA"
        strokeOpacity=".8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Synthetic temple interfaces */}
      <g
        fill="none"
        stroke="url(#etna-circuit)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M91 132 L77 141 L77 159"/>
        <path d="M189 132 L203 141 L203 159"/>
        <path d="M93 171 L83 181 L83 194"/>
        <path d="M187 171 L197 181 L197 194"/>
      </g>

      <g fill={accentColor}>
        <circle cx="77" cy="159" r="2.4"/>
        <circle cx="203" cy="159" r="2.4"/>
        <circle cx="83" cy="194" r="2"/>
        <circle cx="197" cy="194" r="2"/>
      </g>

      {/* Forehead signature sensor */}
      <path
        d="M140 76 L145 83 L140 90 L135 83Z"
        fill="url(#etna-circuit)"
      />

      {/* Chest panel */}
      <path
        d="M112 246 L140 258 L168 246 L157 300
           Q140 315 123 300Z"
        fill="#10283D"
        fillOpacity=".68"
        stroke="#B6D6EC"
        strokeOpacity=".55"
        strokeWidth="1.1"
      />

      <path
        d="M140 264 L145 275 L140 283 L135 275Z"
        fill="url(#etna-circuit)"
      />

      {/* Fine torso circuitry */}
      <g
        fill="none"
        stroke={accentColor}
        strokeOpacity=".75"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M89 252 L99 267 L99 291"/>
        <path d="M191 252 L181 267 L181 291"/>
        <path d="M105 312 L113 317"/>
        <path d="M175 312 L167 317"/>
      </g>

      {/* Bottom holographic fade */}
      <path
        d="M40 332 Q140 342 240 332"
        fill="none"
        stroke="#BBDCF2"
        strokeOpacity=".65"
        strokeWidth="1.2"
      />

      {/* Small hologram particles */}
      <g fill={accentColor} opacity=".7">
        <circle cx="36" cy="97" r="1.6"/>
        <circle cx="244" cy="97" r="1.6"/>
        <circle cx="47" cy="188" r="1.2"/>
        <circle cx="233" cy="188" r="1.2"/>
      </g>
    </svg>
  )
}
