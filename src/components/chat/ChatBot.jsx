


export const ChatBot = () => {
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState('');


    const sendChat = () => {
        socket.emit('chat', { content: input });
        setInput('');
      };
return (

    <div>
      <div>
        {chats.map((chat) => (
          <div key={chat.id}>{chat.content}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendChat}>Send</button>
      </div>
    </div>
)
}