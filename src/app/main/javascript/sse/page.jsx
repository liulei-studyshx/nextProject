'use client'

import { useEffect, useState } from 'react'

export default function SSE() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    console.log('useEffect')
    const eventSource = new EventSource(`${window.location.origin}/api/sse/sse`)
    eventSource.onmessage = (event) => {
      setMessages(JSON.parse(event.data))
    }
  }, [])

    return <div>{messages.time}</div>
}