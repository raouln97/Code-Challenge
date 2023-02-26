// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TokenMock {
    string public name;
    string public symbol;
    uint8 public decimals;
    mapping(address => uint256) public balances;

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    function mint(address _to, uint256 _amount) public {
        balances[_to] += _amount;
    }
}

contract TokenBalanceRetriever {
    function getBalances(address wallet, address[] memory tokenContracts) public view returns (uint256[] memory) {
        uint256[] memory balances = new uint256[](tokenContracts.length);
        for (uint256 i = 0; i < tokenContracts.length; i++) {
            TokenMock token = TokenMock(tokenContracts[i]);
            balances[i] = token.balances(wallet);
        }
        return balances;
    }
}

contract TestTokenBalanceRetriever {
    TokenBalanceRetriever public balanceRetriever;

    constructor(TokenBalanceRetriever _balanceRetriever) {
        balanceRetriever = _balanceRetriever;
    }

    function testGetBalances(address wallet, address[] memory tokens) public view returns (uint256[] memory) {
        return balanceRetriever.getBalances(wallet, tokens);
    }
}

// Deploy the contracts and test the getBalances function
async function deployContracts() {
  const { ethers } = require("hardhat");

  const TokenMock = await ethers.getContractFactory("TokenMock");
  const token1 = await TokenMock.deploy("Token 1", "TOK1", 18);
  const token2 = await TokenMock.deploy("Token 2", "TOK2", 18);

  const TokenBalanceRetriever = await ethers.getContractFactory("TokenBalanceRetriever");
  const balanceRetriever = await TokenBalanceRetriever.deploy();

  const TestTokenBalanceRetriever = await ethers.getContractFactory("TestTokenBalanceRetriever");
  const testBalanceRetriever = await TestTokenBalanceRetriever.deploy(balanceRetriever.address);

  // Mint some tokens to the test wallet
  const [owner, wallet] = await ethers.getSigners();
  await token1.mint(wallet.address, 1000);
  await token2.mint(wallet.address, 2000);

  // Test the getBalances function
  const balances = await testBalanceRetriever.testGetBalances(wallet.address, [token1.address, token2.address]);
  console.log("Balances:", balances);
}

deployContracts().catch(console.error);
