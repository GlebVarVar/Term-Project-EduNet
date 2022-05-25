

const fileName = './json/lowDataFinal.json';

fetch(fileName).then(res => res.json()).then(data => {
    ReactDOM.render(
        <ForceGraph3D
        graphData={data}
        nodeAutoColorBy="group"
        linkWidth = {1}
        linkCurvature = {0.2}
        linkOpacity = {0.5}
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
        />,
        document.getElementById('graph')
    );
});