// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/token/ERC721/utils/ERC721Holder.sol";
import "../TRC721m.sol";
import "./CheatCodes.sol";

contract Impl is TRC721m {
    constructor() TRC721m(3) ERC721("wf", "WhaleFish") {}
}

contract TRC721mTest is Test, ERC721Holder {
    Impl internal impl;
    string[] internal uris;

    function setUp() public {
        impl = new Impl();
        uris = ["whale", "shark", "fish"];
    }

    function testCanMint() public {
        impl.mint(uris);
        impl.mint(uris);
        impl.mint(uris);
        impl.mint(uris);
        impl.mint(uris);
        impl.mint(uris);
        string[] memory allURIs = impl.getAllTokenURIs();
        assertEq(allURIs.length, uris.length * 6);

        // string[] memory allURIs = impl.size();
        // emit log_uint(allURIs.length);
    }
}
