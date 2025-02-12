'use client'

import { useEffect, useState } from 'react'

export default function SSE() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const eventSource = new EventSource(`${window.location.origin}/api/sse/sse`)

    eventSource.onmessage = (event) => {
        console.log(event.data)
      setMessages(JSON.parse(event.data))
    }
  }, [])

    return <div>{messages.time}</div>
}