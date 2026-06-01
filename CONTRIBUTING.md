# Contributing

Thank you for contributing to this React project.

## Prerequisites

Before running scripts, collaborators need:

- Node.js installed locally (includes `npm`)
- `npm install` run once in the repo root
- GitHub write/collaborator access to the repository
- A local shell such as PowerShell, Command Prompt, or Bash

## Setup

1. Clone the repository:

   `git clone <repo-url>`
2. Change into the project folder:

   `cd project`
3. Install dependencies:

   `npm install`

## Working on a Branch

Use feature branches for any new work:

- `git checkout -b feature/<your-name>-<short-description>`
- Make your changes
- `git add .`
- `git commit -m "Add <short description>"
`
- `git push -u origin feature/<your-name>-<short-description>`

## Common Scripts

- `npm start` — start the development server
- `npm test` — run tests
- `npm run build` — create a production build
- `npm run eject` — eject from Create React App (one-way operation)

## GitHub Permissions

Collaborators need write access to the repository to push branches. This is a GitHub setting, not a project script setting.

### How to add a collaborator on GitHub

1. Open the repository on GitHub.
2. Click `Settings`.
3. Choose `Manage access` from the left menu.
4. Click `Invite a collaborator`.
5. Enter the collaborator's GitHub username or email.
6. Send the invitation.
7. The collaborator must accept the invitation in their GitHub notifications.

Once accepted, collaborators can push branches and run local scripts.

If `git push` is refused, ask the repository owner to add you as a collaborator or review branch protection rules.

## Pull Requests

Once your branch is pushed:

1. Open a pull request against the default branch
2. Describe your changes clearly
3. Request reviews from other collaborators
4. Address review feedback before merging

## Notes

- Do not push directly to `main` or the default branch unless instructed.
- Keep branch names descriptive and concise.
