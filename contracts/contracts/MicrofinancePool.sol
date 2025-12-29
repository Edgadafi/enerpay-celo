// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MicrofinancePool
 * @notice Smart contract for managing community lending pool on Celo
 * @dev Allows users to request loans based on reputation, with dynamic interest rates
 */
contract MicrofinancePool is ReentrancyGuard, Ownable {
    // ============ State Variables ============
    
    /// @notice cUSD token contract address
    IERC20 public cUSD;
    
    /// @notice Treasury address for collecting fees
    address public treasuryAddress;
    
    /// @notice Minimum loan amount (in cUSD)
    uint256 public minLoanAmount = 10 * 10**18; // 10 cUSD
    
    /// @notice Maximum loan amount (in cUSD)
    uint256 public maxLoanAmount = 10000 * 10**18; // 10,000 cUSD
    
    /// @notice Base interest rate in basis points (500 = 5% APR)
    uint256 public baseInterestRate = 500;
    
    /// @notice Minimum reputation score required (0-1000 scale)
    uint256 public minReputationScore = 100;
    
    /// @notice Pool balance (total available for lending)
    uint256 public poolBalance;
    
    /// @notice Mapping of loan ID to Loan struct
    mapping(uint256 => Loan) public loans;
    
    /// @notice Counter for loan IDs
    uint256 public loanCount;
    
    /// @notice Mapping of user address to array of loan IDs
    mapping(address => uint256[]) public userLoans;
    
    /// @notice Mapping of user address to reputation score (0-1000)
    mapping(address => uint256) public reputationScores;
    
    // ============ Structs ============
    
    /**
     * @notice Loan data structure
     * @param borrower Address of the borrower
     * @param amount Principal amount borrowed
     * @param interestRate Annual interest rate in basis points
     * @param duration Loan duration in months
     * @param startTime When the loan was disbursed
     * @param dueDate When the loan is due
     * @param amountPaid Total amount repaid so far
     * @param status Current status of the loan
     */
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 startTime;
        uint256 dueDate;
        uint256 amountPaid;
        LoanStatus status;
        string purpose;
    }
    
    // ============ Enums ============
    
    /**
     * @notice Status of a loan
     */
    enum LoanStatus {
        Pending,      // Loan requested, awaiting approval
        Approved,     // Loan approved, awaiting disbursement
        Active,       // Loan active, being repaid
        Repaid,       // Loan fully repaid
        Defaulted,    // Loan defaulted
        Liquidated    // Loan liquidated
    }
    
    // ============ Events ============
    
    event LoanRequested(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount,
        uint256 duration,
        string purpose
    );
    
    event LoanApproved(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount,
        uint256 interestRate
    );
    
    event LoanDisbursed(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount
    );
    
    event LoanRepaid(
        uint256 indexed loanId,
        address indexed borrower,
        uint256 amount,
        uint256 remainingBalance
    );
    
    event LoanLiquidated(
        uint256 indexed loanId,
        address indexed borrower
    );
    
    event PoolFunded(
        address indexed funder,
        uint256 amount
    );
    
    event ReputationScoreUpdated(
        address indexed user,
        uint256 newScore
    );
    
    // ============ Constructor ============
    
    constructor(address _cUSD, address _treasuryAddress) Ownable(msg.sender) {
        require(_cUSD != address(0), "Invalid cUSD address");
        require(_treasuryAddress != address(0), "Invalid treasury address");
        
        cUSD = IERC20(_cUSD);
        treasuryAddress = _treasuryAddress;
    }
    
    // ============ External Functions ============
    
    /**
     * @notice Request a loan
     * @param _amount Loan amount in cUSD
     * @param _duration Loan duration in months
     * @param _purpose Purpose of the loan
     * @return loanId The ID of the created loan
     */
    function requestLoan(
        uint256 _amount,
        uint256 _duration,
        string memory _purpose
    ) external nonReentrant returns (uint256) {
        require(_amount >= minLoanAmount, "Amount below minimum");
        require(_amount <= maxLoanAmount, "Amount above maximum");
        require(_duration >= 3 && _duration <= 24, "Invalid duration");
        require(bytes(_purpose).length > 0, "Purpose required");
        
        // Check reputation score
        uint256 reputation = reputationScores[msg.sender];
        require(reputation >= minReputationScore, "Insufficient reputation");
        
        // Note: Pool balance check is done in disburseLoan(), not here
        // This allows users to request loans even if pool is temporarily empty
        // The owner can add funds before approving/disbursing
        
        // Calculate interest rate based on reputation
        uint256 interestRate = calculateInterestRate(reputation, _amount);
        
        // Calculate due date (duration in seconds)
        uint256 dueDate = block.timestamp + (_duration * 30 days);
        
        // Create loan
        uint256 loanId = loanCount;
        loans[loanId] = Loan({
            borrower: msg.sender,
            amount: _amount,
            interestRate: interestRate,
            duration: _duration,
            startTime: 0, // Set when disbursed
            dueDate: dueDate,
            amountPaid: 0,
            status: LoanStatus.Pending,
            purpose: _purpose
        });
        
        // Add to user's loans
        userLoans[msg.sender].push(loanId);
        
        loanCount++;
        
        emit LoanRequested(loanId, msg.sender, _amount, _duration, _purpose);
        
        return loanId;
    }
    
    /**
     * @notice Approve a loan (only owner)
     * @param _loanId The ID of the loan to approve
     */
    function approveLoan(uint256 _loanId) external onlyOwner {
        Loan storage loan = loans[_loanId];
        require(loan.status == LoanStatus.Pending, "Loan not pending");
        require(loan.borrower != address(0), "Loan does not exist");
        
        loan.status = LoanStatus.Approved;
        
        emit LoanApproved(_loanId, loan.borrower, loan.amount, loan.interestRate);
    }
    
    /**
     * @notice Disburse an approved loan
     * @param _loanId The ID of the loan to disburse
     */
    function disburseLoan(uint256 _loanId) external onlyOwner nonReentrant {
        Loan storage loan = loans[_loanId];
        require(loan.status == LoanStatus.Approved, "Loan not approved");
        require(poolBalance >= loan.amount, "Insufficient pool funds");
        
        // Update loan status
        loan.status = LoanStatus.Active;
        loan.startTime = block.timestamp;
        
        // Update pool balance
        poolBalance -= loan.amount;
        
        // Transfer funds to borrower
        require(
            cUSD.transfer(loan.borrower, loan.amount),
            "Transfer failed"
        );
        
        emit LoanDisbursed(_loanId, loan.borrower, loan.amount);
    }
    
    /**
     * @notice Repay a loan
     * @param _loanId The ID of the loan to repay
     * @param _amount Amount to repay
     */
    function repayLoan(uint256 _loanId, uint256 _amount) external nonReentrant {
        Loan storage loan = loans[_loanId];
        require(loan.status == LoanStatus.Active, "Loan not active");
        require(loan.borrower == msg.sender, "Not the borrower");
        require(_amount > 0, "Amount must be greater than 0");
        
        // Calculate total amount owed
        uint256 totalOwed = calculateTotalOwed(_loanId);
        uint256 remainingBalance = totalOwed - loan.amountPaid;
        
        require(_amount <= remainingBalance, "Amount exceeds balance");
        
        // Transfer payment from borrower
        require(
            cUSD.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );
        
        // Update loan
        loan.amountPaid += _amount;
        
        // Add to pool balance
        poolBalance += _amount;
        
        // Check if fully repaid
        if (loan.amountPaid >= totalOwed) {
            loan.status = LoanStatus.Repaid;
            // Update reputation (positive action)
            updateReputation(loan.borrower, true);
        }
        
        emit LoanRepaid(_loanId, msg.sender, _amount, remainingBalance - _amount);
    }
    
    /**
     * @notice Liquidate a defaulted loan (only owner)
     * @param _loanId The ID of the loan to liquidate
     */
    function liquidateLoan(uint256 _loanId) external onlyOwner {
        Loan storage loan = loans[_loanId];
        require(loan.status == LoanStatus.Active, "Loan not active");
        require(block.timestamp > loan.dueDate, "Loan not due yet");
        
        // Check if defaulted
        uint256 totalOwed = calculateTotalOwed(_loanId);
        if (loan.amountPaid < totalOwed) {
            loan.status = LoanStatus.Defaulted;
            // Update reputation (negative action)
            updateReputation(loan.borrower, false);
            
            emit LoanLiquidated(_loanId, loan.borrower);
        }
    }
    
    /**
     * @notice Fund the pool (add liquidity)
     * @param _amount Amount to add to the pool
     */
    function fundPool(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        
        // Transfer cUSD to contract
        require(
            cUSD.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );
        
        poolBalance += _amount;
        
        emit PoolFunded(msg.sender, _amount);
    }
    
    /**
     * @notice Set reputation score for a user (only owner)
     * @param _user Address of the user
     * @param _score Reputation score (0-1000)
     */
    function setReputationScore(address _user, uint256 _score) external onlyOwner {
        require(_user != address(0), "Invalid user address");
        require(_score <= 1000, "Score exceeds maximum");
        
        reputationScores[_user] = _score;
        
        emit ReputationScoreUpdated(_user, _score);
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get user's loan IDs
     * @param _user Address of the user
     * @return Array of loan IDs
     */
    function getUserLoans(address _user) external view returns (uint256[] memory) {
        return userLoans[_user];
    }
    
    /**
     * @notice Calculate total amount owed for a loan
     * @param _loanId The ID of the loan
     * @return Total amount owed (principal + interest)
     */
    function calculateTotalOwed(uint256 _loanId) public view returns (uint256) {
        Loan memory loan = loans[_loanId];
        if (loan.startTime == 0) {
            return loan.amount; // Not yet disbursed
        }
        
        // Calculate interest: (amount * interestRate * duration) / (10000 * 12)
        uint256 interest = (loan.amount * loan.interestRate * loan.duration) / (10000 * 12);
        
        return loan.amount + interest;
    }
    
    /**
     * @notice Calculate interest rate based on reputation and amount
     * @param _reputation Reputation score (0-1000)
     * @param _amount Loan amount
     * @return Interest rate in basis points
     */
    function calculateInterestRate(uint256 _reputation, uint256 _amount) public view returns (uint256) {
        // Base rate
        uint256 rate = baseInterestRate;
        
        // Adjust based on reputation (lower reputation = higher rate)
        // Reputation 1000 = -200 bp, Reputation 100 = +300 bp
        if (_reputation >= 500) {
            rate -= ((_reputation - 500) * 200) / 500; // -200 bp max
        } else {
            rate += ((500 - _reputation) * 300) / 400; // +300 bp max
        }
        
        // Adjust based on amount (larger loans = slightly higher rate)
        if (_amount > 5000 * 10**18) {
            rate += 50; // +0.5% for large loans
        }
        
        // Ensure minimum rate of 2% and maximum of 15%
        if (rate < 200) rate = 200;
        if (rate > 1500) rate = 1500;
        
        return rate;
    }
    
    /**
     * @notice Get loan details
     * @param _loanId The ID of the loan
     * @return Loan struct
     */
    function getLoan(uint256 _loanId) external view returns (Loan memory) {
        return loans[_loanId];
    }
    
    // ============ Owner Functions ============
    
    /**
     * @notice Set minimum loan amount
     * @param _amount New minimum amount
     */
    function setMinLoanAmount(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        minLoanAmount = _amount;
    }
    
    /**
     * @notice Set maximum loan amount
     * @param _amount New maximum amount
     */
    function setMaxLoanAmount(uint256 _amount) external onlyOwner {
        require(_amount > minLoanAmount, "Amount must be greater than minimum");
        maxLoanAmount = _amount;
    }
    
    /**
     * @notice Set base interest rate
     * @param _rate New base rate in basis points
     */
    function setBaseInterestRate(uint256 _rate) external onlyOwner {
        require(_rate <= 2000, "Rate too high"); // Max 20%
        baseInterestRate = _rate;
    }
    
    /**
     * @notice Set minimum reputation score
     * @param _score New minimum score
     */
    function setMinReputationScore(uint256 _score) external onlyOwner {
        require(_score <= 1000, "Score exceeds maximum");
        minReputationScore = _score;
    }
    
    /**
     * @notice Set treasury address
     * @param _treasuryAddress New treasury address
     */
    function setTreasuryAddress(address _treasuryAddress) external onlyOwner {
        require(_treasuryAddress != address(0), "Invalid address");
        treasuryAddress = _treasuryAddress;
    }
    
    /**
     * @notice Add liquidity to the pool (only owner)
     * @param _amount Amount of cUSD to add
     */
    function addLiquidity(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(cUSD.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        poolBalance += _amount;
    }
    
    /**
     * @notice Emergency withdraw (only owner)
     * @param _amount Amount to withdraw
     */
    function emergencyWithdraw(uint256 _amount) external onlyOwner {
        require(_amount <= poolBalance, "Insufficient balance");
        poolBalance -= _amount;
        require(cUSD.transfer(treasuryAddress, _amount), "Transfer failed");
    }
    
    // ============ Internal Functions ============
    
    /**
     * @notice Update reputation score based on loan repayment behavior
     * @param _user Address of the user
     * @param _positive Whether the action is positive (repayment) or negative (default)
     */
    function updateReputation(address _user, bool _positive) internal {
        uint256 currentScore = reputationScores[_user];
        
        if (_positive) {
            // Increase reputation (max 1000)
            if (currentScore < 1000) {
                uint256 increase = currentScore < 500 ? 50 : 25; // Larger increase for lower scores
                reputationScores[_user] = currentScore + increase > 1000 
                    ? 1000 
                    : currentScore + increase;
            }
        } else {
            // Decrease reputation (min 0)
            if (currentScore > 0) {
                uint256 decrease = currentScore > 500 ? 100 : 50; // Larger decrease for higher scores
                reputationScores[_user] = currentScore < decrease 
                    ? 0 
                    : currentScore - decrease;
            }
        }
        
        emit ReputationScoreUpdated(_user, reputationScores[_user]);
    }
}

