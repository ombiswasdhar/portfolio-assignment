# Git and Deployment Automation Rule

## Automatic Commit and Push
- At the end of every task or code update, automatically stage all modified and new project files.
- Commit them with a clear, concise semantic message (e.g. `feat: ...`, `fix: ...`, `style: ...`).
- Push to GitHub `main` (`origin main`) using MinGit (`C:\Users\hp\AppData\Local\Programs\MinGit\cmd\git.exe`).
- Confirm that the changes will auto-deploy to Vercel (connected to `main`).

## Proactive Execution & Permissions
- Always proceed with necessary changes, terminal commands, builds, commits, and pushes autonomously.
- Do not stop or block execution to ask the user for permission for routine implementation or deployment steps.
