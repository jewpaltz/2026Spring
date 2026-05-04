import { useSessionStore } from '@/stores/session'

export default function MessageList() {
  const messages = useSessionStore((s) => s.messages)
  const removeMessage = useSessionStore((s) => s.removeMessage)

  return (
    <div>
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className={`message is-small is-${message.type}`}>
            <p className="message-body">
              <button className="delete" style={{ float: 'right' }} onClick={() => removeMessage(index)}></button>
              {message.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
