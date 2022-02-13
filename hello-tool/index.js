#!/usr/bin/env node

const path = require('path')
const {
    program
} = require('commander');
const fs = require('fs')
require("@babel/register")({
    configFile: path.resolve(__dirname, './babel.config.js'),
})

// 清空目录
const clearDir = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        let files = fs.readdirSync(dirPath)
        files.forEach((file) => {
            let curPath = path.join(dirPath, file)
            fs.statSync(curPath).isDirectory() ?
                clearDir(curPath) :
                fs.unlinkSync(curPath)
        })
        fs.rmdirSync(dirPath)
    }
}

// 编译多语言文件
const buildI18n = () => {
    // 多语言源目录
    let srcDir = path.join(process.cwd(), 'src/i18n')
    // 目标目录
    let destDir = path.join(process.cwd(), 'public/i18n')
    // 1.清空目标目录，clearDir是一个自定义方法，递归遍历目录进行删除
    clearDir(destDir)
    // 2.获取源多语言导出数据
    let data = {}
    let langDirs = fs.readdirSync(srcDir)
    langDirs.forEach((dir) => {
        let dirPath = path.join(srcDir, dir)
        // 读取/src/i18n/xxx/index.js文件，获取导出的多语言对象，存储到data对象上
        let indexPath = path.join(dirPath, 'index.js')
        if (fs.statSync(dirPath).isDirectory() && fs.existsSync(indexPath)) {
            // 使用require加载该文件模块，获取导出的数据
            data[dir] = require(indexPath).default
        }
    })
    // 3.写入到目标目录
    Object.keys(data).forEach((lang) => {
        // 创建public/i18n目录
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir)
        }
        let dirPath = path.join(destDir, lang)
        let filePath = path.join(dirPath, 'index.json')
        // 创建多语言目录
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath)
        }
        // 创建json文件
        fs.writeFileSync(filePath, JSON.stringify(data[lang], null, 4))
    })
    console.log('多语言编译完成');
}

program
    .command('i18n') // 添加i18n命令
    .action(buildI18n)

program.parse(process.argv);