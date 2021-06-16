// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract InfinityPadToken is Ownable, ERC20Burnable {
  constructor (string memory name, string memory symbol, uint256 amount)
    ERC20(name, symbol) {
      _mint(_msgSender(), amount);
  }

  /**
   * @dev Creates `amount` tokens and assigns them to `msg.sender`, increasing
   * the total supply.
   *
   * Requirements
   *
   * - `msg.sender` must be the token owner
   */
  function mint(address account, uint256 amount) external onlyOwner {
    _mint(account, amount);
  }
}
