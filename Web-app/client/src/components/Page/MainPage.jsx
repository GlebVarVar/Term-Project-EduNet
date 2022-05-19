import { getPostAPI } from "../../services/get";
import { useState, useEffect } from "react";

import {Table} from 'react-bootstrap';


const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getPostAPI();
                console.log(data.data);
                setPosts(data.data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>site</th>
                </tr>
            </thead>
            <tbody>
                { 
                    posts.map((post, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{post.name}</td>
                                <td>{post.description}</td>
                                <td>{post.site}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </Table>
    );
}

export default MainPage;