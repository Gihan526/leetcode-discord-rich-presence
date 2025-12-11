import fetch from 'node-fetch';
import DiscordRPC from 'discord-rpc';

// IMPORTANT: Replace with your Discord Application Client ID
// Get it from: https://discord.com/developers/applications
const CLIENT_ID = '1447971972993781760';

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

async function getCurrentLeetCodeProblem() {
  try {
    const response = await fetch('http://localhost:3000/api/problem');
    const data = await response.json();
    
    if (data.title) {
      return {
        title: data.title,
        url: data.url,
        timestamp: data.timestamp
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching LeetCode problem:', error);
    return null;
  }
}

async function updatePresence() {
  const problem = await getCurrentLeetCodeProblem();
  
  if (problem) {
    console.log(`Current Problem: ${problem.title}`);
    console.log(`URL: ${problem.url}`);
    
    try {
      await rpc.setActivity({
        details: `Solving: ${problem.title}`,
        state: 'LeetCode Practice',
        startTimestamp: problem.timestamp,
        largeImageKey: 'leetcode',
        largeImageText: 'LeetCode',
        buttons: [
          { label: 'View Problem', url: problem.url }
        ]
      });
      console.log('✓ Discord presence updated!');
    } catch (error) {
      console.error('Error updating Discord:', error.message);
    }
  }
}

rpc.on('ready', () => {
  console.log('✓ Discord RPC Connected!');
  console.log(`Logged in as ${rpc.user.username}`);
  
  updatePresence();
  setInterval(updatePresence, 15000);
});

rpc.login({ clientId: CLIENT_ID }).catch((error) => {
  console.error('Failed to connect to Discord:', error.message);
  console.log('\nMake sure:');
  console.log('1. Discord is running on your computer');
  console.log('2. You replaced CLIENT_ID with your actual Discord Application ID');
  console.log('3. Get your Client ID from: https://discord.com/developers/applications');
});