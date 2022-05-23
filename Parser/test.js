const fs = require('fs');

const data = fs.readFileSync('companys.json', 'utf8');
const companys = JSON.parse(data);
// console.log(companys);

const obj = {
    nodes: [],
    links: []
}

companys.map((company, i ) => {
    let tempObj = {
        id: null,
        group: null
    }

    tempObj.id = company.name;
    tempObj.group = Math.floor(Math.random() * 10) + 1;

    obj.nodes.push(tempObj);
    console.log(i);
    if ( i +1   < companys.length ) {
        let link = {
            source: company.name,
            target: companys[i + 1].name,
            value: 1
        }
        obj.links.push(link);
    }
    

    

    

})

const json = JSON.stringify(obj)//Делаем json
fs.writeFileSync('newdata.json', json);
console.log(obj);