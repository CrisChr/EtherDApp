pragma solidity ^0.4.17;

contract BatchSender {
    
    function transfer(address[] _tos, uint[] _values) public payable {
        require(_tos.length > 0);
        for(uint i=0;i<_tos.length;i++) {
            _tos[i].transfer(_values[i]);
        }
    }
}