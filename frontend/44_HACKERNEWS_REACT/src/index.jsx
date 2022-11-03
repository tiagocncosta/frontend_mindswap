import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const domContainer = document.getElementById("app");
const root = createRoot(domContainer);

function App() {
    const [news, setNews] = useState([]);

    useEffect(() => {

        async function fetchNews() {
            const response = await fetch('http://hn.algolia.com/api/v1/search');
            const json = await response.json();
            const hits = json.hits;

            setNews(hits);
        }

        fetchNews();

    }, []);

    const stories = news.map((story) => (
        <li key={story.objectID}>
            <Story title={story.title} url={story.url} id={story.objectID}/>
        </li>
    ));

    return (
        <>
            <header>
                HackerNews
            </header>
            <ol>
               {stories} 
            </ol>
            
        </>
    )
}



function Story(props) {
    const { title, url, id } = props;

    const [comments, setComments] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    
    const [areCommentsLoaded, setAreCommentsLoaded] = useState(false);
    const [areCommentsLoading, setAreCommentsLoading] = useState(false);

    async function loadComments() {
        setAreCommentsLoading(true);

        const response = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
        const json = await response.json();
        
        setComments(json.children);

        setAreCommentsLoading(false);
        setAreCommentsLoaded(true);
    }

    async function handleClick() {
        if (!isExpanded && !areCommentsLoaded) {
            await loadComments();
        }

        setIsExpanded(!isExpanded);
    }

    const commentsList = comments.map((comment, index) => (
        <li key={index}>
            {comment.text}
        </li>
    ))

    return (
        <>
            <a href={url}>{title}</a>
            <button 
                disabled={areCommentsLoading}
                onClick={handleClick}
            >
                {areCommentsLoading
                    ? `Loadind comments...`
                    : `load comments`}
                </button>
            {isExpanded && 
            <ol>
                {commentsList}
            </ol>}
        </>

    );
}

root.render(<App />);
