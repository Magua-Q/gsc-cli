const { Console } = require('console')
const fs = require('fs')
const path = require('path')

function includesUppercase (str) {
    return /[A-Z]/.test(str)
}

function includesDashOrUnderscore (str) {
    return /-|_/.test(str)
}

function conver2TagString(name) {
    // 1. 全部小写时怎么处理 index
    if (!includesUppercase(name) && !includesDashOrUnderscore(name)) {
        console.log(`组件名称输入的格式不规范，建议使用驼峰命名`)
        process.exit(1)
    }
    // 2. 包含-或者下划线
    if (includesDashOrUnderscore(name)) {
        return name.split('_').join('-').toLowerCase();
    }
    // 3. MyComponent / myComponent/ myTestComponent
    name = name.replace(/[A-Z]/g, (match) => {
        return '-' + match;
    })
    if (name.startsWith('-')) {
        name = name.substring(1)
    }
    return name.toLowerCase();
}


module.exports = async function generateJsComponent(name, folder) {
    console.log(name, folder)
    // 1. 读取模板文件
    fs.readFile(path.join(__dirname, '../templates', 'exampleComponent.js'), "utf-8", (err, data) => {
        if (err) throw err;
        console.log(data);
        // 2. 如果没有components文件夹，则创建components文件夹
        if (!fs.existsSync(folder)) {
            fs.mkdir(folder, err => {
                if (err) throw err;
                console.log(`文件夹${folder}创建成功！！！`)
            })
        }
        // 3. 解析读取到的代码
        let filName;
        if (name.includes(".")) {
            filName = name.split('.')[0]
        } else {
            filName = name
        }
        // console.log('name', filName)
        const tagName = conver2TagString(filName)
        const componenetName = filName.includes('-') ? filName.replace("-", "_") : filName
        data = data.replace(/MyComponent/g, componenetName).replace(/my-component/g, tagName)
        // console.log(data)
        folder = folder.endsWith('/') ? folder.slice(0, -1) : folder
        name = name.includes('.') ? name : (name + `.js`)
        fs.writeFile(`${folder}/${name}`, data, err => {
            if (err) throw err;
            console.log('文件内容', data)
            console.log("组件创建成功")
        })

    })
}