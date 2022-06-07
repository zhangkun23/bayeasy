const ci = require('miniprogram-ci')
const { type, version = '', desc = '', buildId = ""} = getEnvParams(process.argv);

console.log("########################## Params ##########################")
console.log(process.argv);

if (type === 'publish') {
    if(!version){
        console.error('version不能为空!!!');
        process.exit(1);
    }
    if(!desc){
        console.error('desc不能为空!!!');
        process.exit(1);
    }
}

if(!buildId){
    console.error('buildId不能为空!!!');
    process.exit(1);
}

const appid = 'wx8c15bc82c287b2b7';
const privateKeyPath = '/export/jenkins/miniprogram/private.wx8c15bc82c287b2b7.key';

function getEnvParams(options) {
    const envParams = {}
    for (let i = 2, len = options.length; i < len; i++) {
        let arg = options[i].split('=');
        envParams[arg[0]] = arg[1]
    }
    return envParams
}

const preview = async () => {
    const project = new ci.Project({
        appid: appid,
        type: 'miniProgram',
        projectPath: './',
        privateKeyPath: privateKeyPath,
        ignores: ['node_modules/**/*'],
    })
    const previewResult = await ci.preview({
        project,
        desc: desc, // 此备注将显示在“小程序助手”开发版列表中
        setting: {
            es6: true,
        },
        qrcodeFormat: 'image',
        qrcodeOutputDest: `/export/jenkins/home/workspace/output/qrcode/preview_qrcode_${buildId}.png`,
        onProgressUpdate: console.log,
    })
    console.log("########################## previewResult ##########################")
    console.log(previewResult)
    return project
}

const publish = async (project) => {
    // 上传文件处理设置参数
    const uploadParams = {
        es6: true, //  "es6 转 es5"
        es7: true, // "增强编译"
        minify: true, // "样式自动补全"
        codeProtect: true, // "代码保护"
        autoPrefixWXSS: true, // "样式自动补全"
    };

    const uploadResult = await ci.upload({
        project,
        version,
        desc,
        setting: uploadParams,
        onProgressUpdate: console.log,
    });
    console.log("########################## uploadResult ##########################")
    console.log( uploadResult);
}

;(async () => {
    console.log("########################## Preview ##########################")
    const project = await preview()
    if (type === 'publish') {
        console.log("########################## Publish ##########################")
        await publish(project)
    }
})()

