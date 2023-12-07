// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Base is ERC721, Ownable {
    string inBaseURI;
    uint256 private _nextTokenId;
    uint256 private _nftPrice;
    address[] private _whitelisters;
    uint256 private _whitelistPrice;

    constructor(
        address initialOwner,
        string memory tokenName,
        string memory tokenSymbol,
        string memory baseURI,
        uint256 nftPrice,
        address[] memory whitelisters,
        uint256 whitelistPrice
    ) ERC721(tokenName, tokenSymbol) Ownable(initialOwner) {
        inBaseURI = baseURI;
        _nftPrice = nftPrice;
        _whitelisters = whitelisters;
        _whitelistPrice = whitelistPrice;
    }

    function _baseURI() internal view override returns (string memory) {
        return inBaseURI;
    }

    function safeMint() public payable {
        require(msg.value >= _nftPrice, "Not enough ETH sent; check price!");
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
    }

    function whitelistMint() public payable {
        require(
            msg.value >= _whitelistPrice,
            "Not enough ETH sent; check price!"
        );
        require(isWhitelisted(msg.sender), "Not whitelisted!");
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
    }

    function isWhitelisted(address addr) private view returns (bool) {
        for (uint256 i = 0; i < _whitelisters.length; i++) {
            if (_whitelisters[i] == addr) {
                return true;
            }
        }
        return false;
    }

    function changeBaseURI(string memory baseURI) public onlyOwner {
        inBaseURI = baseURI;
    }
}
