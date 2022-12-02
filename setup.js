const { execSync } = require ("child_process");

;(function(){
    console.log("========================================== WATCH AND INSTALL START ================================================");
    const commandList = [
        "echo ========================================== WATCH AND INSTALL START ================================================",
        "npm run bootstrap",
        "tsc -p ./packages/fuse/",
        "tsc -p ./packages/fuse_app/",
        "tsc -p ./packages/hooks/", 
        "tsc -p ./packages/utils-js/",
        "tsc -p ./packages/components/",
        "npm run bootstrap",
        "tsc -p ./packages/utils-ts/",
        "tsc -p ./packages/common-module/"
    ];
    for(var command of commandList){
        try {
            let res = execSync(command);
            console.log(res.toString())
        } catch(err){
            console.log(`========================================== ${command} failed ================================================`);
            continue;
        }

        console.log(`========================================== ${command} completed ================================================`);
    }
}());