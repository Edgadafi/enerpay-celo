require("dotenv").config();
const hre = require("hardhat");

async function main() {
  console.log("🔍 Checking contract transactions...\n");

  const network = hre.network.name;
  const chainId = await hre.ethers.provider.getNetwork().then((n) => n.chainId);
  console.log(`📡 Network: ${network} (Chain ID: ${chainId})\n`);

  // Contract address
  const contractAddress = "0x8aB940E40F64306E1C6af7B80429B4D0Bd2C65eb";
  console.log(`📋 Contract Address: ${contractAddress}\n`);

  // Get contract instance
  const EnerpayRemittance = await hre.ethers.getContractFactory("EnerpayRemittance");
  const contract = EnerpayRemittance.attach(contractAddress);

  // Get remittance count
  const remittanceCount = await contract.remittanceCount();
  console.log(`📊 Remittance Count: ${remittanceCount.toString()}\n`);

  // Get recent transactions for the contract
  console.log("🔍 Checking recent transactions...");
  console.log("   (This may take a moment)\n");

  // Get current block
  const currentBlock = await hre.ethers.provider.getBlockNumber();
  console.log(`📦 Current Block: ${currentBlock}\n`);

  // Check last 10 blocks for transactions
  const blocksToCheck = 1000;
  const startBlock = Math.max(0, currentBlock - blocksToCheck);
  
  console.log(`🔍 Checking blocks ${startBlock} to ${currentBlock}...\n`);

  let foundTransactions = 0;
  let failedTransactions = 0;

  // Check recent blocks
  for (let i = currentBlock; i >= startBlock && foundTransactions < 20; i--) {
    try {
      const block = await hre.ethers.provider.getBlock(i, true);
      
      if (block && block.transactions) {
        for (const txHash of block.transactions) {
          try {
            const tx = await hre.ethers.provider.getTransaction(txHash);
            
            if (tx && tx.to && tx.to.toLowerCase() === contractAddress.toLowerCase()) {
              foundTransactions++;
              
              try {
                const receipt = await hre.ethers.provider.getTransactionReceipt(txHash);
                
                if (receipt) {
                  const status = receipt.status;
                  const isSuccess = status === 1;
                  
                  console.log(`📋 Transaction ${foundTransactions}:`);
                  console.log(`   Hash: ${txHash}`);
                  console.log(`   Block: ${receipt.blockNumber}`);
                  console.log(`   Status: ${isSuccess ? "✅ Success" : "❌ Failed"}`);
                  console.log(`   Gas Used: ${receipt.gasUsed.toString()}`);
                  
                  if (!isSuccess) {
                    failedTransactions++;
                    console.log(`   ⚠️  FAILED TRANSACTION`);
                    
                    // Try to decode the transaction to see what function was called
                    try {
                      const iface = new hre.ethers.Interface([
                        "function sendRemittance(address _beneficiary, uint256 _amount, string _destinationType, string _destinationId) external returns (uint256)"
                      ]);
                      
                      const decoded = iface.parseTransaction({ data: tx.data });
                      if (decoded) {
                        console.log(`   Function: ${decoded.name}`);
                        console.log(`   Args:`, decoded.args);
                      }
                    } catch (decodeError) {
                      console.log(`   Function: Unknown (could not decode)`);
                    }
                  }
                  
                  console.log("");
                }
              } catch (receiptError) {
                // Transaction might not be mined yet
              }
            }
          } catch (txError) {
            // Skip if transaction not found
          }
        }
      }
    } catch (blockError) {
      // Skip if block not found
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total transactions found: ${foundTransactions}`);
  console.log(`   Failed transactions: ${failedTransactions}`);
  console.log(`   Successful transactions: ${foundTransactions - failedTransactions}`);

  console.log(`\n🔗 View on CeloScan:`);
  console.log(`   https://sepolia.celoscan.io/address/${contractAddress}#internaltx`);
  console.log(`\n🔗 View on Celo Explorer:`);
  console.log(`   https://explorer.celo.org/sepolia/address/${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });

