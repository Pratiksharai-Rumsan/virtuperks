// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.0;

interface IAccessManagerV1 {
  function updateAdmin(address _address, bool _status) external;

  function updateMinter(address _address, bool _status) external;

  function updateProjectManager(address _address, bool _status) external;

  function isAdmin(address _address) external view returns (bool _status);

  function isMinter(address _address) external view returns (bool _status);

  function isProjectManager(
    address _address
  ) external view returns (bool _status);
}
