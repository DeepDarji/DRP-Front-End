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
          // Trigger contract initialization after wallet connection
          await initContract();
        } catch (error) {
          alert('Failed to connect wallet: ' + error.message);
        }
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