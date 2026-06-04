# Classroom Lesson App (Expo)

Beginner-friendly offline lesson app for iPads, built with Expo + React Native + TypeScript.

## Run the app

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start Expo:

   ```bash
   npx expo start
   ```

3. In the Expo terminal:
   - Press `i` to open iOS simulator, or
   - Scan QR with Expo Go on an iPad.

## Public website deployment (GitHub Pages)

This project includes a GitHub Actions workflow to build and deploy web output from
`main` to GitHub Pages.

After the workflow runs, your public URL will be:

`https://sfagma.github.io/ChessApp/`

If it shows a 404 at first, enable Pages in GitHub:

1. Open repository Settings
2. Open Pages
3. Source: GitHub Actions

## Current MVP Flow

- Home screen shows lesson cards.
- `Lesson 1` opens a lesson player with locked/unlocked step dots.
- Steps:
  - Video placeholder (with simulate-finished button)
  - Image placeholder
  - Border puzzle
  - Path puzzle
  - Success screen
