const puppeteer = require('puppeteer');
const fs = require('fs');
const { getFips } = require('crypto');

const list = {
    nodes: [],
    links: []
}

async function start() {

    const table = fs.readFileSync('D:/Voenmech-Study/Proga/CourseProject/indexVoenmech.html', 'utf8');

    console.log(table)

    /*const link = 'https://www.voenmeh.ru/education/programs';
    const browser = await puppeteer.launch({ 
        headless: true, // false: enables one to view the Chrome instance in action
        defaultViewport: null, // (optional) useful only in non-headless mode
    });
    const page = await browser.newPage();
    await page.goto(link);
    await page.waitForTimeout(5000);

    const text = await page.evaluate(() =>(document.querySelectorAll('table'), element => console.log(element)));

    console.log(text);*/






    // fs.writeFileSync('indexVoenmech.html', html);
}

start();






