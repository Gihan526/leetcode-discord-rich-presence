Show your current **LeetCode problem** as a **Discord Rich Presence** — like a real game status.  
When you open a problem on LeetCode, your Discord profile updates live.

How to Use

 What You'll Need
- Discord running on your computer
- Google Chrome browser
- Node.js installed

Step 1: Get the Code
```bash
git clone https://github.com/Gihan526/leetcode-discord-rich-presence.git
cd leetcode-discord-rich-presence
```

Step 2: Install Dependencies
```bash
npm install
```

Step 3: Start the Magic ✨
You need to run two things (open two terminal windows):

**Terminal 1 - Start the API Server:**
```bash
node leetcode-extension/server.js
```
You should see: `Server running on http://localhost:3000`

**Terminal 2 - Start Discord Integration:**
```bash
node presence.js
```
You should see: `✓ Discord RPC Connected!`

Step 4: Install the Chrome Extension
1. Open Chrome and go to `chrome://extensions/`
2. Turn on **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select the `leetcode-extension` folder from your project

Step 5: Try It Out!
1. Make sure Discord is open
2. Go to any LeetCode problem (like [Two Sum](https://leetcode.com/problems/two-sum/))
3. Check your Discord profile - it should show what problem you're working on! 🎉

How It Works
- **Chrome Extension** → Detects which LeetCode problem you're viewing
- **Server** → Receives problem data from the extension
- **Discord RPC** → Updates your Discord status in real-time

Configuration
Replace the `CLIENT_ID` in `presence.js` with your own Discord Application ID from the [Discord Developer Portal](https://discord.com/developers/applications).

---

That's it! Now your friends can see which problems you're grinding on LeetCode 💪
