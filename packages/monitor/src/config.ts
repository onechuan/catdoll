const config = {
    url: "http://127.0.0.1:3000/api",
    projectName:"webMonitorSdk",
    appId: "20000902",
    userId:"90081",
    isImageUpload: false,
    batchSize: 20
};

export function setConfig(options){
    for(const key in config){
        if(options[key]){}
    }
}

export default config