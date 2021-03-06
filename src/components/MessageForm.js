import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';

export default function MessageForm (props) {
    const [value, setValue] = useState("");
    const { chatId, creds } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = value.trim();

        if (text.length > 0) sendMessage(creds, chatId, { text });
        setValue("");
    }

    const handleChange = (e) => {
        setValue(e.target.value);
        isTyping(props, chatId);
    }

    const handleUpload = (e) => {
        sendMessage(creds, chatId, { files: e.target.files, text: ''});
    }

    return (
            <form className="message-form" onSubmit={handleSubmit}>
                <input 
                    className="message-input"
                    placeholder="Say Hi!"
                    value={value}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
                <label htmlFor="upload-button">
                    <span className="image-button">
                        <ImageIcon className="picture-icon"/>
                    </span>
                </label>
                <input 
                    type="file"
                    multiple={false}
                    id="upload-button"
                    style={{display: "none"}}
                    onChange={handleUpload}
                />
                <button type='submit' className="send-button">
                    <SendIcon className='send-icon'/>
                </button>
            </form>
        );
}