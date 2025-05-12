interface CreditCardProps {
  color: string
  secondaryColor: string
  rotation: string
  scale: number
  zIndex: number
  offsetX: string
  offsetY: string
}

export function CreditCard({ color, secondaryColor, rotation, scale, zIndex, offsetX, offsetY }: CreditCardProps) {
  return (
    <div
      className="relative"
      style={{
        transform: `rotate(${rotation}) scale(${scale}) translate(${offsetX}, ${offsetY})`,
        zIndex: zIndex,
      }}
    >
      <div
        className="w-[320px] h-[200px] rounded-2xl shadow-xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${secondaryColor} 100%)`,
        }}
      >
        <div className="p-6 h-full flex flex-col justify-between">
          {/* Chip */}
          <div className="flex justify-between items-start">
            <div className="w-12 h-10 bg-yellow-100/30 rounded-md flex items-center justify-center">
              <div className="w-8 h-6 bg-yellow-200/40 rounded-sm"></div>
            </div>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="2"
              />
              <path
                d="M15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="2"
              />
              <path
                d="M6 19C6.63819 16.6928 8.27998 15 12 15C15.72 15 17.3618 16.6928 18 19"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Card Number */}
          <div className="text-white/90 font-mono text-lg tracking-wider">•••• •••• •••• 4242</div>

          {/* Card Holder & Expiry */}
          <div className="flex justify-between">
            <div className="text-white/80 text-sm">
              <div className="opacity-70 text-xs mb-1">CARD HOLDER</div>
              <div>JOHN DOE</div>
            </div>
            <div className="text-white/80 text-sm">
              <div className="opacity-70 text-xs mb-1">EXPIRES</div>
              <div>12/25</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
