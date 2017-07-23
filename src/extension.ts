import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let taskList: Array<any> = vscode.workspace.getConfiguration('startuptask').get('taskList');

    taskList.forEach((item, index) => {
        if (item.command && item.args) {
            let term = vscode.window.createTerminal("startupTask_" + index);
            let strCmd = "node_modules\\.bin\\" + item.command + ".cmd" + " " + item.args;
            term.sendText(strCmd);
        }
    });
}

export function deactivate() {
}