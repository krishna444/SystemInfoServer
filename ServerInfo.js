const os = require('os');
const drivelist = require('drivelist');
const shellUtils = require('./ShellUtilites');
const fs = require('fs');

class ServerInfo {
    constructor() {
        this.drives = new Array();
        this.getDriveList();
    }

    getNetworkInterfaces() {
        return os.networkInterfaces();
    }

    getHostName() {
        return os.hostname();
    }

    getUsers() {
        return os.userInfo();
    }

    getCPUs() {
        return os.cpus();
    }

    getOSInfo() {
        return { "arch": os.arch(), "type": os.type(), "platform": os.platform() };
    }

    /**
     * Gets total memory in gigabytes
     */
    getTotalMemory() {
        return os.totalmem() / (1024 * 1024 * 1024);
    }

    /**
     * Gets free memory
     */
    getFreeMemory() {
        return os.freemem() / (1024 * 1024 * 1024);
    }

    /**
     * Gets used memory
     */
    getUsedMemory() {
        return this.getTotalMemory() - this.getFreeMemory();
    }

    getDriveList() {
        drivelist.list((error, drives) => {
            if (error)
                throw error;
            this.drives = drives;
        });
    }

    getDrives() {
        return this.drives.map(drive => drive.device + " " + (drive.size / (1024 * 1024 * 1024)).toFixed(2) + "GB");
    }

    isInstalled(tool) {
        return shellUtils.isInstalled(tool);
    }

    readFile(filename) {
        let lines = new Array();
        fs.readFileSync(filename).toString().split("\n").forEach(line => lines.push(line));
        return lines;
    }

    getSpecificLinesofFile(filename, expression) {
        let lines = new Array();
        let regex = new RegExp("^.*" + expression + ".*$", 'm');
        fs.readFileSync(filename).toString().split("\n").forEach(line => { if (regex.exec(line)) lines.push(line) });
        return lines;
    }

    /**
     * Checks if file or directory exists
     */
    exists(path) {
        try {
            return fs.statSync(path);
        } catch (ex) {
            return false;
        }
    }

    /**
     * Checks if path is a directory
     */
    directoryExists(path) {
        let exists = this.exists(path);
        if (exists && exists.isDirectory())
            return true;
        return false;

    }


    /**
     * Check if path is a file
     */
    fileExists(path) {
        let exists = this.exists(path);
        if (exists && exists.isFile())
            return true;
        return false;
    }

    executeSync(command){
        return shellUtils.executeCommandSync(command);
    }
}

module.exports = new ServerInfo();


const serverInfo = new ServerInfo();
//console.log("network:" + JSON.stringify(serverInfo.getNetworkInterfaces()));


//serverInfo.getNetworkInterfaces.forEach(interface=> console.log(interface))
// console.log(serverInfo.getOSInfo())
//Object.keys(serverInfo.getNetworkInterfaces()).forEach(key=>console.log(key))
// console.log(serverInfo.getTotalMemory());
// console.log(serverInfo.getFreeMemory());
// console.log(serverInfo.getUsedMemory());
//console.log(serverInfo.getSpecificLinesofFile("/etc/default/grub", "CMD"));
//console.log(serverInfo.executeSync("ls"))
//console.log(serverInfo.executeSync('java -version'))