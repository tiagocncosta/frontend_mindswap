import {createRoot} from "react-dom/client";
import React, { useState } from 'react';


const domContainer = document.getElementById("app");
const root = createRoot(domContainer);


function App(){
    
    return (
        <>
            <Spoiler />
          
        </>
    )
}

function Spoiler(props){
const [show, setShow] = useState(false);

function handleClick(){
    setShow(!show)
}

    return (<div>
        <button type="button" onClick={handleClick}>Click</button>
        {
            show && <p> Text </p>
        }
        </div>)
   
}


root.render(<App/>)