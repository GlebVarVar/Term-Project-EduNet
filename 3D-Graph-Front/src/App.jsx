import {ForceGraph3D} from 'react-force-graph';
import { useState, useEffect } from 'react';    
import SpriteText from 'three-spritetext';

const App = () => {

    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3001/').then(res => res.json()).then(data => {
            setData(data);
        });
    }, []);

    return (
        <>
        {
            data && (
                <ForceGraph3D
                    graphData={data}
                    nodeAutoColorBy="group"
                    linkWidth={1}
                    linkCurvature={0.2}
                    linkOpacity={0.5}
                    onNodeRightClick={(node) => {
                        window.open(node.site);
                    }}
                    onNodeDragEnd={node => {
                        node.fx = node.x;
                        node.fy = node.y;
                        node.fz = node.z;
                    }}
                    nodeThreeObject={node => {
                        const sprite = new SpriteText(node.description);
                        sprite.color = node.color;
                        sprite.textHeight = 6;
                        if (node.id > 200) {
                        sprite.textHeight = 18;
                    }
                
                        return sprite;
                    }}
                />
            )
        }
        </>
    )
}

export default App;
