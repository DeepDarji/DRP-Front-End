let web3;
let accounts;

async function initWeb3() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected:', accounts[0]);
      document.getElementById('connectWallet')?.addEventListener('click', async () => {
        try {
          accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          alert('Wallet connected: ' + accounts[0]);
          await initContract(); // Initialize contract after connection
        } catch (error) {
          alert('Failed to connect wallet: ' + error.message);
        }
      });

      // Handle account changes
      window.ethereum.on('accountsChanged', (newAccounts) => {
        accounts = newAccounts;
        console.log('Accounts changed:', accounts);
      });

      // Handle disconnect (replacing 'close')
      window.ethereum.on('disconnect', () => {
        accounts = [];
        console.log('MetaMask disconnected');
      });
    } catch (error) {
      console.error('User denied account access:', error);
      alert('Please connect MetaMask to use this application.');
    }
  } else {
    alert('Please install MetaMask!');
  }
}

window.addEventListener('load', initWeb3);