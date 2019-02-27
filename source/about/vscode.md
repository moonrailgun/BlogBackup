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
  "editor.formatOnPaste": false,
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
    "extension.gitlens": "git-compare"
  },
  "activitusbar.toggleSidebar": false,
  "files.insertFinalNewline": true,
  "files.trimFinalNewlines": true,
  "files.trimTrailingWhitespace": true,
  "search.location": "panel",
  "ActiveFileInStatusBar.fullpath": false,
  "editor.fontSize": 14,
  "git.autofetch": false,
  "workbench.settings.useSplitJSON": true,
  "gitlens.codeLens.enabled": false,
  "gitlens.currentLine.enabled": false,
  "problems.decorations.enabled": false, // 仅取消问题的explorer.decorations
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  },
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": false,
    "files.trimTrailingWhitespace": false,
  },
  "prettier.requireConfig": true,
  "prettier.singleQuote": true,
  "liveshare.showInStatusBar": "whileCollaborating",
  "gitlens.blame.dateFormat": "YYYY-MM-DD",
  "gitlens.blame.format": "${date|10?} ${author|10-}",
}
```
