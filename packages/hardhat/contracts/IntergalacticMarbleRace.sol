// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IntergalacticMarbleRace is ERC20, Ownable {
    uint256 private nonce = 0;

    struct BoonOrBane {
        uint256 affectedMarble;
        uint256 rolls;
        uint256 strength;
        bool isBoon;
    }

    struct Bet {
        address owner;
        uint256 amount;
        uint256 winner;
    }

    struct Race {
        uint256 raceId;
        uint256 startTime;
        uint256 endTime;
        uint256[10] marbles;
        bool isCompleted;
        uint256 totalBets;
        uint256 winningMarbleId;
    }

    uint256 public raceCount = 0;
    Race public currentRace;
    mapping(uint256 => Race) public races;

    uint256 public betCount = 0;
    mapping(uint256 => Bet[]) public bets;

    uint256 public boonsBanesCount = 0;
    mapping(uint256 => BoonOrBane[]) public boonsBanes;

    uint256 public betCost = 1 ether;

    event BetPlaced(address indexed user, uint256 indexed raceId, uint256 amount, uint256 winner);
    event VoteCast(address indexed user, uint256 indexed raceId);
    event RacePrepared(uint256 indexed raceId, uint256 prepEndTime);
    event RaceSponsored(uint256 indexed raceId, uint256 raceEndTime, uint256[10] scores, uint256 winner);
    event BoonApplied(uint256 raceId, uint256 marbleId, uint256 points);
    event BaneApplied(uint256 raceId, uint256 marbleId, uint256 points);

    constructor() ERC20("Galactic Marbles", "GALM") {}

    function setBetCost(uint256 _newCost) public onlyOwner {
        betCost = _newCost;
    }

    function addBoon() private {
        boonsBanes[raceCount].push(BoonOrBane({
            affectedMarble: 99,
            rolls: getRandomNumber(nonce, 10),
            strength: getRandomNumber(nonce + 1, 100),
            isBoon: true
        }));
        nonce += 1;
    }

    function addBane() private {
        boonsBanes[raceCount].push(BoonOrBane({
            affectedMarble: 99,
            rolls: getRandomNumber(nonce, 10),
            strength: getRandomNumber(nonce, 100),
            isBoon: false
        }));
        nonce += 1;
    }

    // At this moment, betting and voting is available
    function prepareRace() public onlyOwner {
        require(block.timestamp >= currentRace.endTime, "Race is not ready yet");
        raceCount++;
        currentRace = Race({
            raceId: raceCount,
            startTime: block.timestamp,
            endTime: block.timestamp + 5 minutes,
            marbles: [uint256(0), 0, 0, 0, 0, 0, 0, 0, 0, 0],
            isCompleted: false,
            totalBets: 0,
            winningMarbleId: 0
        });
        races[raceCount] = currentRace;
        emit RacePrepared(raceCount, currentRace.endTime);
    }

    // Betting and voting is closed, race starts
    function sponsorRace() public onlyOwner {
        require(!currentRace.isCompleted, "Current race is completed");
        require(block.timestamp >= currentRace.endTime, "Prep phase is not over yet");
        require(currentRace.endTime != 0, "No race is currently active");
        
        // Apply effects
        for (uint256 i = 0; i < boonsBanes[raceCount].length; i++) {
            uint256 targetMarble = getRandomNumber(nonce, 10);
            boonsBanes[raceCount][i].affectedMarble = targetMarble;

            uint256 rolls = boonsBanes[raceCount][i].rolls;
            uint256 strength = boonsBanes[raceCount][i].strength;
            if (rolls == 0 || strength == 0) continue;

            if (boonsBanes[raceCount][i].isBoon) {
                currentRace.marbles[targetMarble] += strength * rolls;
                emit BoonApplied(currentRace.raceId, targetMarble, strength * rolls);
            } else {
                currentRace.marbles[targetMarble] -= strength * rolls;
                emit BaneApplied(currentRace.raceId, targetMarble, strength * rolls);
            }
        }
        
        // Determine the winner
        uint256 winner;
        uint256 highestScore = 0;
        for (uint256 i = 0; i < 10; i++) {
            if (currentRace.marbles[i] > highestScore) {
                highestScore = currentRace.marbles[i];
                winner = i;
            }
        }
        currentRace.winningMarbleId = winner;
        
        // Distribute winnings
        uint256 winnerBets = 0;
        for (uint256 i = 0; i < 10; i++) {
            if (bets[raceCount][i].winner == winner) {
                winnerBets = bets[raceCount][i].amount;
                if (winnerBets > 0) {
                    uint256 winnings = (winnerBets * 9) / currentRace.totalBets; // Winner gets 9x their bet
                    require(transfer(bets[raceCount][i].owner, winnings), "Failed to transfer winnings");
                }
            }
        }
    
        currentRace.isCompleted = true;
        emit RaceSponsored(currentRace.raceId, block.timestamp, currentRace.marbles, winner);
    }
    
    function getRandomNumber(uint256 seed, uint256 maxNumber) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender, seed))) % maxNumber;
    }
    
    function placeBet(uint256 _raceId, uint256 _marbleIndex, uint256 _amount) external {
        require(block.timestamp > currentRace.startTime, "Race is not in preparation phase");
        require(currentRace.endTime != 0, "No race is currently active");
        require(_marbleIndex < 10, "Invalid marble index");
        // require(msg.value >= minimumBetAmount, "Bet amount is below the minimum");
        // require(currentRace.bets[msg.sender] == 0, "You have already placed a bet for this race");

        require(transferFrom(msg.sender, address(this), _amount), "Token transfer failed");

        bets[raceCount].push(
            Bet({
                owner: msg.sender,
                amount: _amount,
                winner: _marbleIndex
            })
        );

        emit BetPlaced(msg.sender, _raceId, _amount, _marbleIndex);
    }
}