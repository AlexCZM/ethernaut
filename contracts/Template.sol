// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Template {
    address public owner;
    uint256 public value;

    constructor() {
        owner = msg.sender;
    }

    function store(uint _val) public {
        value = _val;
    }
}
