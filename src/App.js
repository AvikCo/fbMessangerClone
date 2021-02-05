import React, {useState, useEffect, useRef } from 'react'
import { IconButton, FormControl, Input } from '@material-ui/core';
import './styles/App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import EmojiBlock from './Emoji';


const App = () =>{
    const [input,setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [isShowEmoji, setIsShowEmoji] = useState(false);
    const lastdiv = useRef();

    useEffect(() =>{
        db.collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => (
            {id: doc.id, message: doc.data()}
            )
            ));
        })
    },[])

    useEffect(() => {
        setUsername(prompt("Pleae enter your name"));
    }, [])
    const scrollToBottom = () => {
        lastdiv.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(()=>{
        scrollToBottom();
    },[messages])

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection('messages').add({
            message: input,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
         })
        setMessages([...messages, {username:username, message: input}]);
        setInput('');
        
    }
    

    // const [chosenEmoji, setChosenEmoji] = useState(null);
   const onEmojiButtonClick = () =>{
    setIsShowEmoji(!isShowEmoji)
   }

  return (
      <div className="App">
      <h1>Realtime Messager</h1>
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"/>
        <h2>Welcome {username}</h2>
            <EmojiBlock 
            currentInput ={input}
            setInput = {setInput}
            setVisibility={setIsShowEmoji}
            showEmoji={isShowEmoji}/>
        <form className="app__form">
           <FormControl className="app__formControl">   
                <IconButton className="app__iconButton" onClick={onEmojiButtonClick}>
                    <EmojiEmotionsIcon/>
                </IconButton>
                <Input className="app__input" placeholder="Type your message here" value={input} onChange={event => setInput(event.target.value)}/>
                <IconButton className="app__iconButton" type='submit' disabled={!input} variant="contained" color="primary" onClick={sendMessage}>
                    <SendIcon/>
                </IconButton> 
            </FormControl>
        </form>
    
        {/*<FlipMove >*/}
        {
            messages.map(({id, message}) => 
            (   
                <Message key={id} username={username} message={message}/>
                ))
        }
        <div className="app__messages" ref={lastdiv}></div>
    </div>
    
  );
};

export default App;