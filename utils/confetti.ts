import confetti from "canvas-confetti"

export const triggerConfetti = (options?: confetti.Options) => {
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FF5D3A", "#FFE03D", "#4DCCBD", "#111111"],
  }

  confetti({
    ...defaults,
    ...options,
  })
}

export const triggerSchoolPride = () => {
  const end = Date.now() + 1500

  const colors = ["#FF5D3A", "#FFE03D", "#4DCCBD"]
  ;(function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}

export const triggerFireworks = () => {
  const duration = 3000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#FF5D3A", "#FFE03D"],
      }),
    )
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#4DCCBD", "#111111"],
      }),
    )
  }, 250)
}
