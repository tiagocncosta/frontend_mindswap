import {createRoot} from "react-dom/client";
import React, { useState } from 'react';


const domContainer = document.getElementById("app");
const root = createRoot(domContainer);


function App(){
    const[inputs, setInputs] = useState([]);
    const comment = inputs.map(elm => < CommentBox username={elm.username} comment={elm.comment}/>);

    return (
        <>
         <Form inputs = {inputs} setInputs = {setInputs} />
         {comment}
        </>

    )
}

function CommentBox(props){
    const [like, onClick] = useState(false);
    const {username, comment} = props;

    function handleClick(){
        onClick(!like)
    }

    return (
    <>
    <div id = "commentBox"> Username: {username} Comment: {comment} </div>
    <div><button onClick= {handleClick}> {like ? ":(":":)"}</button></div>
    </>
    )
}

function Form(props){
    const { inputs, setInputs } = props;

    function handleSubmit(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const comment = event.target.comment.value;
        event.target.username.value = "";
        event.target.comment.value = "";
        setInputs([...inputs, { username, comment }]);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: <input type="text" name="username" />
                </label>
                <label>
                    Comment: <input type="text" name="comment" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

root.render(<App />);