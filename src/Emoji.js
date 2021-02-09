import React,{ useRef, useEffect }  from 'react'
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";


//the Emoji block that appears and disappreas on each emoji button click
const EmojiBlock = ({showEmoji, currentInput, emojiRef, setInput, setVisibility}) => {

    const ref = useRef(); //declaring ref to identify where user clicks when emoji block in open
  useEffect(()=>{
    //   if the user clicks on the emoji button dont hide block, if clicks on the emoji block dont hide the block
    //if the user clocks on outside of the emoji block, hide the emoji block
        const clickEventListener =(event)=>{  
            if(emojiRef.current.contains(event.target)){
                return null
            }  
            if(ref.current.contains(event.target)){
                return null;
            }
            setVisibility(false);

        }
        //addin click event listener on the body of the document
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
    // set the emoji next to the current input on each emoji select
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
