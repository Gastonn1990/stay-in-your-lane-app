# Stay In Your Lane Radio — Starter App

A responsive, installable Progressive Web App (PWA) starter for iPhone and Android, using Jamaican black, green, and gold.

## Features in this starter
- Live radio player (connect your public stream URL)
- Add local music files and play them in the browser
- Add YouTube video links and watch embedded videos
- Add local audio files as podcast episodes
- Installable PWA shell and basic offline caching

## Important limitations
- Music and podcast files selected from a device are local to that browser session; they are not uploaded, synced, or available to other listeners.
- Video links and locally selected media are not saved permanently by this starter.
- To make radio work for listeners outside your own computer/network, your Icecast/Liquidsoap stream must be reachable through a public HTTPS URL. Do not expose administrator passwords.
- Use only audio and video you own or are authorized to stream.
- A PWA can be installed from a browser, but App Store / Google Play publishing is a separate process and may involve fees or developer-account requirements.

## Connect your radio
1. Open `app.js` in a text editor.
2. Find `const RADIO_STREAM_URL = "PASTE_YOUR_PUBLIC_STREAM_URL_HERE";`
3. Replace the text between quotes with your public stream URL, for example `https://radio.yourdomain.com/radio.mp3`.
4. Save the file.

Your previous local Icecast address such as `localhost` will only work on the computer running the server. It is not a public listener URL.

## Publish free with GitHub Pages
1. Create/sign into a GitHub account.
2. Create a new **public** repository, e.g. `stay-in-your-lane-app`.
3. Upload all files from this folder to the repository root (not the ZIP itself).
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
6. Wait for the published URL shown on the Pages settings screen.
7. Open that URL on your iPhone or Android.

GitHub Pages uses HTTPS, which is needed for service workers and installation features. Free plan features and policies can change, so check GitHub's current Pages guidance if the menu differs.

## Add to Home Screen
- **iPhone:** Open the published site in Safari → Share → Add to Home Screen.
- **Android:** Open the published site in Chrome → menu (⋮) → Install app or Add to Home screen.

## Next step
Connect and test the public radio stream before sharing the app with listeners. For persistent music catalogs, playlists, accounts, or uploading podcast episodes for everyone, a backend/storage service will be needed; the current starter deliberately avoids paid services.
