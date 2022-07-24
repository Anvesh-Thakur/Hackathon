//SPDX-License-Identifier: None
pragma solidity 0.8.0;
contract Funder{

    struct User{
        string email;
    }

    struct ContentCreator{
        string email;
        string photo;
        string websiteLink;
        string social;
    }

    uint256 creatorCount;
    uint256 userCount;

    //Mapping
    mapping(address => mapping(address => uint256)) transaction;

    //Mapping for Users
    mapping(address => User) users;
    
    //Mapping for contentCreators
    mapping(address => ContentCreator) contentCreators;
    
    //Mapping for isUser
    mapping(address => bool) isUser;
    
    //Mapping for isContentCreator
    mapping(address => bool) isContentCreator; 

    address[] public contentCreatorsArray; 
    address[] public usersArray;

    event Donate(address indexed _from, address indexed _to, uint value);

    function addUser(User memory user) public{
        require(
            isUser[msg.sender] == false && isContentCreator[msg.sender] == false, 
            "You are already registered");
        userCount++;
        users[msg.sender] = user;
        usersArray.push(msg.sender);
        isUser[msg.sender] = true;
    }

    function addContentCreator(ContentCreator memory contentCreator) public{
        require(
            isContentCreator[msg.sender] == false &&  isUser[msg.sender] == false , 
            "You are already registered");
        creatorCount++;
        contentCreators[msg.sender] = contentCreator;
        contentCreatorsArray.push(msg.sender);
        isContentCreator[msg.sender] = true;
    }

    function getCreator(address creator) public view returns(ContentCreator memory contentCreator){
        return contentCreators[creator];
    }

    function getUser(address userAddress) public view returns(User memory user){
        return users[userAddress];
    }

    function getAllUser() public view returns(address[] memory){
        return contentCreatorsArray;
    }

    function getAllContentCreator() public view returns(address[] memory){
        return usersArray;
    }

    function getTransaction(address creator, address user) view public returns(uint256){
        return transaction[creator][user];
    }

    function donate(address payable creator) payable public{
        require(msg.value > 0, "The value should be greater than 0 ether");
        require(isUser[msg.sender] == true, "You should be a user to donate");
        require(isContentCreator[creator] == true, "You should donate to a Content Creator");
        uint256 value = transaction[creator][msg.sender];
        transaction[creator][msg.sender] = value + msg.value; 
        creator.transfer(msg.value);
        emit Donate(msg.sender, creator, msg.value);
    }   
}