import React, {useState, useEffect} from 'react'
import { IconButton, FormControl, InputLabel, Input } from '@material-ui/core';
import './styles/App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';

const App = () =>{
    const [input,setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() =>{
        db.collection('messages')
        .orderBy('timestamp','desc')
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

  return (
      <div className="App">
      <h1>Realtime Messager</h1>
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"/>
        <h2>Welcome {username}</h2>
        <form className="app__form">
           <FormControl className="app__formControl">
            <InputLabel>Enter a message...</InputLabel>
                <Input className="app__input" value={input} onChange={event => setInput(event.target.value)}/>
                <IconButton className="app__iconButton" type='submit' disabled={!input} variant="contained" color="primary" onClick={sendMessage}>
                    <SendIcon/>
                </IconButton>
                
            </FormControl>
            
        </form>
        <FlipMove>
        {
            messages.map(({id, message}) => 
            (   
                <Message key={id} username={username} message={message}/>
                ))
        }
        </FlipMove>
    </div>
  );
};

export default App;