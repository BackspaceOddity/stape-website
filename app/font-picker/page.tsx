'use client';

export default function FontPicker() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-bold text-white">Choose Your Typography</h1>
          <p className="text-xl text-gray-400">
            Three font options for the Kleos homepage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Font A: Space Grotesk */}
          <a
            href="/fonts?font=space-grotesk"
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center text-3xl font-bold text-blue-400">
                A
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Space Grotesk</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Modern geometric sans-serif
                </p>
                <div className="space-y-2 text-gray-500 text-xs">
                  <p>✓ Clean & professional</p>
                  <p>✓ Excellent readability</p>
                  <p>✓ Tech-forward aesthetic</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-xs">
                  Similar to: Lausanne, STK Bureau
                </p>
              </div>
            </div>
          </a>

          {/* Font B: Outfit */}
          <a
            href="/fonts?font=outfit"
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center text-3xl font-bold text-green-400">
                B
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Outfit</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Bold & characterful geometric
                </p>
                <div className="space-y-2 text-gray-500 text-xs">
                  <p>✓ Strong personality</p>
                  <p>✓ Heavy weights available</p>
                  <p>✓ Impactful headlines</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-xs">
                  Similar to: Wise Sans (character)
                </p>
              </div>
            </div>
          </a>

          {/* Font C: Inter */}
          <a
            href="/fonts?font=inter"
            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center text-3xl font-bold text-purple-400">
                C
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Inter Black</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Refined with heavy weights
                </p>
                <div className="space-y-2 text-gray-500 text-xs">
                  <p>✓ Industry standard</p>
                  <p>✓ Maximum flexibility</p>
                  <p>✓ Trusted & familiar</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-xs">
                  Familiar but pushed to 900 weight
                </p>
              </div>
            </div>
          </a>
        </div>

        <div className="text-center pt-8">
          <p className="text-gray-500 text-sm">
            Click each card to see the full homepage with that font
          </p>
        </div>
      </div>
    </div>
  );
}
