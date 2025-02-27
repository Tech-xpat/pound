"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text[index])
        index++
      } else {
        clearInterval(timer)
      }
    }, 100) // Adjust speed here

    return () => clearInterval(timer)
  }, [text])

  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {displayText}
    </motion.span>
  )
}

