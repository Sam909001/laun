// FLUFFI Website JavaScript

// Global variables
let web3;
let provider;
let currentAccount = null;
let presaleEndTime = new Date().getTime() + (15 * 24 * 60 * 60 * 1000); // 15 days from now
let stageEndTime = new Date().getTime() + (48 * 60 * 60 * 1000); // 48 hours from now
let currentStage = 1;
let tokensSold = 67431509;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    startLiveFeed();
    updateTokensSold();
    startPriceUpdates();
    initializeTokenChart();
    checkWalletConnection();
});

// Initialize the application
function initializeApp() {
    initializeWalletConnect();
    startPresaleTimer();
    startStageTimer();
    updateStageProgress();
    
    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
        document.getElementById('darkModeIcon').textContent = '☀️';
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDarkMode = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDarkMode.toString());
    document.getElementById('darkModeIcon').textContent = isDarkMode ? '☀️' : '🌙';
}

// Wallet Connection Functions
function initializeWalletConnect() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', function (accounts) {
            if (accounts.length === 0) {
                disconnectWallet();
            } else {
                connectWallet(accounts[0]);
            }
        });
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', function (chainId) {
            window.location.reload();
        });
        
        // Check if already connected
        window.ethereum.request({ method: 'eth_accounts' })
            .then(accounts => {
                if (accounts.length > 0) {
                    connectWallet(accounts[0]);
                }
            })
            .catch(console.error);
    }
}

// Connect Wallet
async function connectWallet(address) {
    currentAccount = address;
    document.getElementById('walletAddress').value = address;
    document.getElementById('connectedAddress').textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    document.getElementById('walletStatus').classList.add('show');
    document.getElementById('walletStatus').classList.remove('hidden');
    
    // Update wallet button
    const walletButton = document.getElementById('walletButton');
    walletButton.innerHTML = `<i class="fas fa-wallet"></i>${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    
    // Update referral section
    updateReferralSection();
    
    // Update user balances
    updateUserBalances();
    
    closeWalletModal();
}

// Disconnect Wallet
function disconnectWallet() {
    currentAccount = null;
    document.getElementById('walletAddress').value = '';
    document.getElementById('walletStatus').classList.remove('show');
    document.getElementById('walletStatus').classList.add('hidden');
    
    // Reset wallet button
    const walletButton = document.getElementById('walletButton');
    walletButton.innerHTML = '<i class="fas fa-wallet"></i>Connect Wallet';
    
    // Reset referral section
    document.getElementById('referralSection').innerHTML = `
        <p class="mb-4">Connect your wallet to access your referral link and start earning!</p>
        <button id="referralConnectBtn" onclick="connectReferralWallet()" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
            Connect Wallet for Referrals
        </button>
    `;
}

// Show Wallet Connect Modal
function showWalletModal() {
    document.getElementById('walletConnectModal').classList.remove('hidden');
}

// Close Wallet Connect Modal
function closeWalletModal() {
    document.getElementById('walletConnectModal').classList.add('hidden');
}

// Connect with MetaMask
async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            connectWallet(accounts[0]);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            showWalletError('Failed to connect to MetaMask. Please try again.');
        }
    } else {
        showWalletError('MetaMask is not installed. Please install MetaMask to continue.');
    }
}

// Connect with WalletConnect
async function connectWalletConnect() {
    showWalletError('WalletConnect integration coming soon!');
}

// Connect with Coinbase Wallet
async function connectCoinbaseWallet() {
    showWalletError('Coinbase Wallet integration coming soon!');
}

// Show Wallet Error
function showWalletError(message) {
    const errorDiv = document.getElementById('walletError');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    errorDiv.classList.remove('hidden');
    
    setTimeout(() => {
        errorDiv.classList.remove('show');
        errorDiv.classList.add('hidden');
    }, 5000);
}

// Connect Referral Wallet
function connectReferralWallet() {
    showWalletModal();
}

// Update Referral Section
function updateReferralSection() {
    if (currentAccount) {
        const referralLink = `${window.location.origin}?ref=${currentAccount}`;
        document.getElementById('referralSection').innerHTML = `
            <p class="mb-4">Share your referral link and earn <strong>10%</strong> of all purchases!</p>
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Your referral link:</p>
                <div class="flex gap-2">
                    <input type="text" value="${referralLink}" readonly 
                           class="flex-1 p-2 border rounded text-sm bg-white dark:bg-gray-600 text-black dark:text-white">
                    <button onclick="copyReferralLink()" class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm">
                        Copy
                    </button>
                </div>
            </div>
            <div class="text-center">
                <p class="text-lg font-semibold text-green-600">Referrals: <span id="referralCount">0</span></p>
                <p class="text-sm text-gray-600 dark:text-gray-300">Earnings: <span id="referralEarnings">0 FLUFFI</span></p>
            </div>
        `;
    }
}

// Copy Referral Link
function copyReferralLink() {
    const referralLink = `${window.location.origin}?ref=${currentAccount}`;
    navigator.clipboard.writeText(referralLink).then(() => {
        alert('Referral link copied to clipboard!');
    });
}

// Presale Timer
function startPresaleTimer() {
    updatePresaleTimer();
    setInterval(updatePresaleTimer, 1000);
}

function updatePresaleTimer() {
    const now = new Date().getTime();
    const distance = presaleEndTime - now;
    
    if (distance < 0) {
        document.getElementById('presale-timer').innerHTML = "PRESALE ENDED!";
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Stage Timer
function startStageTimer() {
    updateStageTimer();
    setInterval(updateStageTimer, 1000);
}

function updateStageTimer() {
    const now = new Date().getTime();
    const distance = stageEndTime - now;
    
    if (distance < 0) {
        // Move to next stage
        currentStage++;
        if (currentStage > 15) {
            document.getElementById('stage-time-left').textContent = "ENDED";
            return;
        }
        stageEndTime = now + (48 * 60 * 60 * 1000); // Reset to 48 hours
        updateStageProgress();
        updatePrice();
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('stage-time-left').textContent = 
        `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    
    // Update next price increase time
    document.getElementById('nextIncreaseTime').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update Stage Progress
function updateStageProgress() {
    document.getElementById('current-stage').textContent = currentStage;
    const progress = ((15 - currentStage + 1) / 15) * 100;
    document.getElementById('stageProgressBar').style.width = `${progress}%`;
}

// Update Price
function updatePrice() {
    const basePrice = 0.0001;
    const currentPrice = basePrice * Math.pow(1.05, currentStage - 1);
    document.getElementById('currentPrice').innerHTML = 
        `$${currentPrice.toFixed(6)} 
        <span class="price-tooltip">
            <i class="fas fa-info-circle text-blue-500" aria-hidden="true"></i>
            <span class="tooltip-text">
                <strong>Price Increase:</strong><br>
                +5% per stage (every 48 hours)<br>
                Next increase: <span id="nextIncreaseTime">00:00:00</span>
            </span>
        </span>`;
}

// Start Price Updates
function startPriceUpdates() {
    updatePrice();
}

// Update Tokens Sold
function updateTokensSold() {
    // Simulate increasing token sales
    setInterval(() => {
        const increment = Math.floor(Math.random() * 1000) + 500;
        tokensSold += increment;
        document.getElementById('tokensSold').textContent = tokensSold.toLocaleString();
    }, 5000);
}

// Buy FLUFFI Function
async function buyFluffi() {
    if (!currentAccount) {
        showWalletError('Please connect your wallet first!');
        showWalletModal();
        return;
    }
    
    const amountInput = document.getElementById('amountInput');
    const amount = parseFloat(amountInput.value);
    
    if (!amount || amount <= 0) {
        showWalletError('Please enter a valid amount!');
        return;
    }
    
    const refInput = document.getElementById('refInput').value;
    const chainCurrency = document.getElementById('chainCurrencySelect').value;
    
    showTransactionModal();
    
    // Simulate transaction processing
    setTimeout(() => {
        // Simulate successful transaction
        completePurchase(amount, refInput, chainCurrency);
    }, 3000);
}

// Complete Purchase
function completePurchase(amount, refInput, chainCurrency) {
    const transactionStatus = document.getElementById('transactionStatus');
    transactionStatus.innerHTML = `
        <div class="transaction-status success">
            <i class="fas fa-check-circle text-4xl mb-4"></i>
            <h3 class="text-xl font-bold mb-2">Purchase Successful!</h3>
            <p>You bought ${(amount * 10000).toLocaleString()} FLUFFI tokens</p>
            <p class="text-sm mt-2">Transaction confirmed</p>
        </div>
    `;
    
    // Add to live feed
    addToLiveFeed(`${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)} bought ${(amount * 10000).toLocaleString()} FLUFFI`);
    
    // Update tokens sold
    tokensSold += amount * 10000;
    document.getElementById('tokensSold').textContent = tokensSold.toLocaleString();
    
    // Close modal after 3 seconds
    setTimeout(() => {
        closeTransactionModal();
    }, 3000);
}

// Show Transaction Modal
function showTransactionModal() {
    document.getElementById('transactionModal').classList.remove('hidden');
    document.getElementById('transactionStatus').innerHTML = `
        <p>Processing your transaction...</p>
        <div class="loading mt-4 mx-auto"></div>
    `;
}

// Close Transaction Modal
function closeTransactionModal() {
    document.getElementById('transactionModal').classList.add('hidden');
}

// Claim Tokens
function claimTokens() {
    if (!currentAccount) {
        showWalletError('Please connect your wallet first!');
        showWalletModal();
        return;
    }
    
    alert('Token claiming will be available after the presale ends!');
}

// Update User Balances
function updateUserBalances() {
    if (currentAccount) {
        // Simulate user data
        document.getElementById('userBalance').textContent = '1,250,000';
        document.getElementById('userStaked').textContent = '500,000';
        document.getElementById('userRewards').textContent = '25,000';
        document.getElementById('userPresale').textContent = '750,000';
        
        document.getElementById('user-balance-value').textContent = '1,250,000';
        document.getElementById('user-earnings').textContent = '112,500';
    }
}

// Live Feed Simulation
function startLiveFeed() {
    const activities = [
        'bought 50,000 FLUFFI',
        'bought 100,000 FLUFFI',
        'bought 25,000 FLUFFI',
        'bought 75,000 FLUFFI',
        'bought 150,000 FLUFFI',
        'bought 200,000 FLUFFI'
    ];
    
    // Add initial activities
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            addToLiveFeed(generateRandomAddress() + ' ' + activities[Math.floor(Math.random() * activities.length)]);
        }, i * 2000);
    }
    
    // Continue adding activities
    setInterval(() => {
        addToLiveFeed(generateRandomAddress() + ' ' + activities[Math.floor(Math.random() * activities.length)]);
    }, 5000);
}

// Add to Live Feed
function addToLiveFeed(message) {
    const feedList = document.getElementById('feed-list');
    const newItem = document.createElement('li');
    newItem.className = 'feed-item';
    newItem.textContent = message;
    
    feedList.insertBefore(newItem, feedList.firstChild);
    
    // Keep only last 10 items
    if (feedList.children.length > 10) {
        feedList.removeChild(feedList.lastChild);
    }
}

// Generate Random Address
function generateRandomAddress() {
    return '0x' + Math.random().toString(16).substring(2, 10) + '...' + Math.random().toString(16).substring(2, 6);
}

// Initialize Token Chart
function initializeTokenChart() {
    const ctx = document.getElementById('tokenChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Presale', 'Liquidity', 'Staking', 'Marketing', 'Team'],
            datasets: [{
                data: [40, 30, 20, 5, 5],
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#8b5cf6',
                    '#ef4444'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Check Wallet Connection on Page Load
function checkWalletConnection() {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_accounts' })
            .then(accounts => {
                if (accounts.length > 0) {
                    connectWallet(accounts[0]);
                }
            })
            .catch(console.error);
    }
}

// Reset Timer (for testing)
function resetTimer() {
    presaleEndTime = new Date().getTime() + (15 * 24 * 60 * 60 * 1000);
    stageEndTime = new Date().getTime() + (48 * 60 * 60 * 1000);
    currentStage = 1;
    updateStageProgress();
    updatePrice();
    alert('Timers reset for testing!');
}

// Close modals when clicking outside
window.onclick = function(event) {
    const walletModal = document.getElementById('walletConnectModal');
    const transactionModal = document.getElementById('transactionModal');
    
    if (event.target === walletModal) {
        closeWalletModal();
    }
    if (event.target === transactionModal) {
        closeTransactionModal();
    }
}

// Close modals with close buttons
document.querySelectorAll('.close').forEach(button => {
    button.onclick = function() {
        if (this.closest('#walletConnectModal')) {
            closeWalletModal();
        }
        if (this.closest('#transactionModal')) {
            closeTransactionModal();
        }
    };
});

// Handle referral parameter in URL
function handleReferralParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
        document.getElementById('refInput').value = ref;
    }
}

// Initialize referral handling
handleReferralParameter();

// Export functions for global access
window.connectMetaMask = connectMetaMask;
window.connectWalletConnect = connectWalletConnect;
window.connectCoinbaseWallet = connectCoinbaseWallet;
window.buyFluffi = buyFluffi;
window.claimTokens = claimTokens;
window.toggleDarkMode = toggleDarkMode;
window.showWalletModal = showWalletModal;
window.closeWalletModal = closeWalletModal;
window.closeTransactionModal = closeTransactionModal;
window.disconnectWallet = disconnectWallet;
window.connectReferralWallet = connectReferralWallet;
window.copyReferralLink = copyReferralLink;
window.resetTimer = resetTimer;
