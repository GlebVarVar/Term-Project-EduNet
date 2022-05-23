const fs = require('fs');
const data = require('./newdata.json');


const arr = [];

for (let i = 0; i < data.nodes.length; i++) {
  data.nodes[i].id = data.nodes[i].name;
}

data.nodes.map((item, i ) => {
  if (data.nodes.length > i + 1) {
   const obj = {
    source: item.id,
    target: data.nodes[i+1].id,
  }
  arr.push(obj);
  }
})
data.links = arr;



const json = JSON.stringify(data)//Делаем json
console.log(json)
fs.writeFileSync('newdata.json', json);