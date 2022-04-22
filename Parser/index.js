const puppeteer = require('puppeteer');
const fs = require('fs');

async function start() {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    await page.goto('https://eduservices.2035.university/');


    await page.waitForTimeout(10000);
    

    await page.click(".v-window-closebox");
    await page.waitForTimeout(1500);
    const elements = await page.$x('/html/body/div[1]/div/div[2]/div/div[3]/div/div/div/div/div/div/div/div[2]/div/div/div/div[1]/div/div/div[2]/div/div[2]/div/div[4]/div')
    await elements[0].click()
    await page.waitForTimeout(1500);
    const edunet = await page.$x('/html/body/div[2]/div[2]/div/div/div[12]')
    await edunet[0].click()
    
    // Получение текста
    // const text = await page.evaluate(() => Array.from(document.querySelectorAll('div.product-item__link'), element => element.textContent));
    // console.log(text[0]);
    const findInfo =  async (companysList) => {
        const text = await page.evaluate(() => Array.from(document.querySelectorAll('div.v-slot-h1'), element => element.textContent));
        console.log(text[1]);
        let obj = {
            name: text[1],
            description: '',
            site: '',
            targetAudience: [],
            levelOfEducation: [],
        };
        for (let i = 0; i < 20; i++) {
            try {
                const [elements] = await page.$x(`/html/body/div[1]/div/div[2]/div/div[3]/div/div/div/div/div/div/div/div[2]/div/div/div/div/div/div/div[3]/div/div[1]/div/div[${i}]`)
                const getMsg = await page.evaluate(name => name.innerText, elements);
                if (getMsg.includes('Краткое описание')) {
                    const desc = getMsg.replace('Краткое описание', '').replace(/\n/g, '')
                    // console.log(desc) 
                    obj.description = desc;

                } else if (getMsg.includes('Уровень образования')) {
                    const levelsStr = getMsg.replace('Уровень образования', '')
                    const levels = levelsStr.split('\n')
                    // console.log(levels) 
                    obj.levelOfEducation = levels.filter(word => word.length > 0)

                } else if (getMsg.includes('Сайт')) {
                    const site = getMsg.replace('Сайт', '')
                    // console.log(site)
                    obj.site = site.replace('\n', '');

                } else if ( getMsg.includes('Целевая аудитория')) {
                    const audienceStr = getMsg.replace('Целевая аудитория', '').replace(/\n/g, '')
                    const audience = audienceStr.split(', ')
                    // console.log(audience)
                    obj.targetAudience = audience.map((elem) =>{
                        if (elem.length > 0) {
                            return elem
                        }
                    });

                }
               
                
            } catch {
                console.log('');
            }
        }
        
        
        
        // /html/body/div[1]/div/div[2]/div/div[3]/div/div/div/div/div/div/div/div[2]/div/div/div/div/div/div/div[3]/div/div[1]/div/div[9]
        // const description = await page.evaluate(() => Array.from(document.querySelectorAll("div.v-csslayout, div.v-layout,  div.v-widget, div.v-has-width"), element => element.textContent));
        // console.log(description);

       

      return obj  
    }

    
    // let elements = await page.$$('.product-item__content');
    // for (let i = 1; i < elements.length; i++) {
    //     elements = await page.$$('.product-item__content')
    //     await elements[i].click();
    //     await page.waitForTimeout(1500);
    //     await page.goto('https://landofsweets.ru/products/category/amerikanskie-sladosti');
    //     await page.waitForTimeout(1500);
    // }
    
    // /html/body/div[1]/div/div[2]/div/div[3]/div/div/div/div/div/div/div/div[2]/div/div/div/div[2]/div/div/div[2]/div/div/div/div[202]/div
    await page.waitForTimeout(10000);
    let companysList = [];
    // let companys = await page.$$([".c-image", ".v-widget", ".object-fit-none"]);
    for (let i = 1; i < 203; i++) {
        const item = await page.$x(`/html/body/div[1]/div/div[2]/div/div[3]/div/div/div/div/div/div/div/div[2]/div/div/div/div[2]/div/div/div[2]/div/div/div/div[${i}]/div`)
        await item[0].click();
        await page.waitForTimeout(2000);
        companysList.push(await findInfo(companysList));
        await page.goBack();
        await page.waitForTimeout(3000);
    }

    console.log(companysList);
    const json = JSON.stringify(companysList)
    fs.writeFileSync('companys.json', json);
    await page.waitForTimeout(10000);
    await browser.close();
}

start();