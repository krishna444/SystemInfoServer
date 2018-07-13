let shell = require('shelljs');
shell.config.verbose = false;


class ShellUtilities {

    /**
     * 
     * @param {Tool} tool 
     */
    isInstalled(tool) {
        return shell.which(tool) !== null;
        shell.find
    }

    /**
     * Executes a given command, the user executing the command should have right to execute the command
     */
    executeCommandSync(command) {
        //const execSync = require('child_process').execSync;
        //return execSync(command).toString();
        return shell.exec(command, { silent: false })
    }

    executeCommand(command, callback) {
        shell.exec(command, { silent: true }, function (code, stdout, stderr) {
            callback(code, stdout, stderr);
        });
    }
}

module.exports = new ShellUtilities();

let utils = new ShellUtilities();
console.log(utils.executeCommandSync("java -version"));