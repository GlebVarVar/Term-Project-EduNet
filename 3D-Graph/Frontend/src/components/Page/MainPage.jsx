import { getPostAPI } from "../../services/get";
import { useState, useEffect } from "react";

// import { Table } from 'react-bootstrap';
import ForceGraph from "./Forcegraph";
import "./styles.css";



const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getPostAPI();
                setData(data.data);
                setLoading(false);

            } catch (error) {
                setError(error);
                setLoading(false);
            }
            
        }
        fetchData();
    }, []);

    if (loading) {
        console.log("loading");
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else if(!loading && !error) {
        return (
            <div className="App">
                <ForceGraph data={data} />
            </div>
        );
    }

}

export default MainPage;
