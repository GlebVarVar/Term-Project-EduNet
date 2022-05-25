

const fileName = './json/lowDataFinal.json';

fetch(fileName).then(res => res.json()).then(data => {
    ReactDOM.render(
        <ForceGraph3D
        graphData={data}
        nodeAutoColorBy="group"
        nodeThreeObject={node => {

            const sprite = new SpriteText(node.description);
            sprite.color = node.color;
            sprite.textHeight = 8;
            if (node.id > 200) {
            sprite.textHeight = 20;
            }
            
            return sprite;
        }}
        />,
        document.getElementById('graph')
    );
});