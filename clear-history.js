const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function clearHistory() {
  rl.question('Enter your auth token (from browser localStorage): ', async (token) => {
    try {
      const response = await axios.delete('http://localhost:5000/api/payment/user/clear-history', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Success:', response.data.message);
      console.log(`Deleted ${response.data.deletedCount} transactions`);
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    } finally {
      rl.close();
    }
  });
}

clearHistory();
