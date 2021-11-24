import * as vscode from "vscode";
import * as fs from "fs";

const name = "TM Extension";

async function readFile(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path,
      "utf8",
      function (err: NodeJS.ErrnoException | null, data: string) {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("test.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World from test!");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "test.openTranslationSettings",
      async (uri: vscode.Uri) => {
        if (uri?.fsPath) {
          const panel = vscode.window.createWebviewPanel(
            "TMExtension",
            "MT Extension",
            vscode.ViewColumn.One,
            {}
          );
          panel.webview.html = getWebviewContent();

          let textToBeTranslated;

          textToBeTranslated = await readFile(uri.fsPath);

          console.log(textToBeTranslated);
        } else {
          vscode.window.showInformationMessage(
            "Please select a file of one of the following types: html, properties"
          );
        }
      }
    )
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>${name}</title>
  </head>
  <body>
	  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
  </body>
  </html>`;
}

export function deactivate() {}
