import React from 'react';
import ReactDOM from 'react-dom/client';
import ForceGraph2D from 'react-force-graph-2d';


fetch('./low_data.json').then(res => res.json()).then(data => {
    ReactDOM.render(
      <ForceGraph2D
        graphData={data}
       
        
        backgroundColor="linear-gradient(#e66465, #9198e5)"
        onNodeRightClick={(node) => {
          window.open(node.site);
        }}

        nodeAutoColorBy="group"
        linkCanvasObject = {(link, context, globalOffset, linkWidth) => {
          context.beginPath();
          context.moveTo(link.source.x, link.source.y);
          context.lineTo(link.target.x, link.target.y);
          context.strokeStyle = 'green';
          
          context.lineWidth = '0.5';
          context.stroke();
        }}

        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.description; // название узла
          let fontSize = 15/globalScale;
          if (node.id > 200) {
            fontSize = 40/globalScale;
          } 
          
          
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // цвет фона названия узла
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = "black"; // изменение цвета
          ctx.fillText(label, node.x, node.y); // наличие названия узла

          node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
        }}
      />,
      document.getElementById('graph')
    );
  });