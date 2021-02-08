import React,{ useRef, useEffect }  from 'react'
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

const EmojiBlock = ({showEmoji, currentInput, emojiRef, setInput, setVisibility}) => {

    const ref = useRef();
  useEffect(()=>{
        const clickEventListener =(event)=>{  
            if(emojiRef.current.contains(event.target)){
                return null
            }  
            if(ref.current.contains(event.target)){
                return null;
            }
            setVisibility(false);

        }
        document.addEventListener("click", clickEventListener)

        return ()=>{
            document.removeEventListener("click", clickEventListener)
        }
    },[])


    const styles ={
        container: {
            visibility: `${!showEmoji ? 'hidden' : 'visible'}`
        }
    }
    const onEmojiClick = (event, emojiObject) => {
        setInput(currentInput+emojiObject.emoji)
      };
    return (
        <div 
        ref={ref}
        style={styles.container}
        className={`app__emoji`}>
            <Picker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            groupNames={{ smileys_people: "PEOPLE" }}
            native
            />
        </div>
    )
}

export default EmojiBlock
