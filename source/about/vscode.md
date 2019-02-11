title: VSCode配置记录
---

**Extensions**
- Active File in StatusBar
- Activitus Bar
- Atom Keymap
- Atom One Dark Theme
- Clock in status bar
- BreadCrumb in StatusBar
- Debugger for Chrome
- EditorConfig for VS Code
- file-icons
- GitLens - Git supercharged
- Prettier - Code formatter
- SQLTools - Database tools
- Todo Tree
- Vetur
- VS Live Share

**User Setting**:
```javascript
{
    "workbench.colorTheme": "Atom One Dark",
    "workbench.activityBar.visible": false,
    "editor.renderControlCharacters": false,
    "atomKeymap.promptV3Features": true,
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.formatOnPaste": true,
    "workbench.iconTheme": "file-icons",
    "git.confirmSync": false,
    "editor.tabSize": 2,
    "workbench.statusBar.feedback.visible": false,
    "workbench.sideBar.location": "left",
    "activitusbar.alignment": "Left",
    "activitusbar.views": {
        "explorer": "file-text",
        "search": "search",
        "scm": "repo-forked",
        "debug": "bug",
        "extensions": "package",
        "extension.SQLTools-connectionExplorer": "database",
        "extension.gitlens": "git-compare"
    },
    "activitusbar.toggleSidebar": false,
    "sqltools.showStatusbar": false,
    "sqltools.telemetry": false,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": true,
    "files.trimTrailingWhitespace": false,
    "search.location": "panel",
    "ActiveFileInStatusBar.fullpath": false,
    "editor.fontSize": 14,
    "git.autofetch": true,
    "gitlens.currentLine.enabled": false
}
```
