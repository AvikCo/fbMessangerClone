import React, {useState, useEffect, useRef } from 'react'
import { IconButton, FormControl, Input } from '@material-ui/core';
import './styles/App.css';
import db from './firebase';
import firebase from 'firebase';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import EmojiBlock from './Emoji';


const App = () =>{
    const [input,setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');
    const [isShowEmoji, setIsShowEmoji] = useState(false);
    const lastdiv = useRef(); //accessing last div by useRef to scroll down to last on each message sent/receive
    const emojiRef = useRef(); //defined useRef to access the emoji button, passing the ref to the emoji component

    //fetching all messages from firebase and putting all those in message state
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

    //using ref to scrolldown to last message after new message sent / receive
    const scrollToBottom = () => {
        lastdiv.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(()=>{
        scrollToBottom();
    },[messages])


    //conecting to firebase to send message after send button click
    const sendMessage = (event) => {
        event.preventDefault();  //to stop refresing 
        db.collection('messages').add({
            message: input.trim(),
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
         })
        setMessages([...messages, {username:username, message: input}]);
        setInput('');
        
    }
    
    // setting emoji state true or false on each click
   const onEmojiButtonClick = () =>{
    setIsShowEmoji(!isShowEmoji)
   }

//ignoring blank spaces and inserting valid values on input change
   const onInputChange = (event) => {
    if(input.length > 0){
        setInput(event.target.value)
    }else{
        setInput(event.target.value.trim())
    }
    
   }

  return (
      <div className="App">
      <h1>Realtime Messager</h1>
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"/>
        <h2>Welcome {username}</h2>
    {/* the emoji block component that appears / disappears on each emoji button click */}    
        <EmojiBlock 
            emojiRef={emojiRef}
            currentInput ={input}
            setInput = {setInput}
            setVisibility={setIsShowEmoji}
            showEmoji={isShowEmoji}/>
        <form className="app__form">
           <FormControl className="app__formControl">   
                <IconButton ref={emojiRef} className="app__iconButton" onClick={onEmojiButtonClick}>
                    <EmojiEmotionsIcon/>
                </IconButton>
                <Input className="app__input" placeholder="Type your message here" value={input} onChange={onInputChange}/>
                <IconButton className="app__iconButton" type='submit' disabled={!input} variant="contained" color="primary" onClick={sendMessage}>
                    <SendIcon/>
                </IconButton> 
            </FormControl>
        </form>
        {/* mapping through all messages using message component */}
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