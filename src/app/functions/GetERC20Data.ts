export default function getERC20Data(contractName: string): string[] {
  if (contractName === "ERC20") {
    return [
      [
        {
          inputs: [
            {
              internalType: "address",
              name: "initialOwner",
              type: "address",
            },
            {
              internalType: "string",
              name: "tokenName",
              type: "string",
            },
            {
              internalType: "string",
              name: "tokenSymbol",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "allowance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "needed",
              type: "uint256",
            },
          ],
          name: "ERC20InsufficientAllowance",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "needed",
              type: "uint256",
            },
          ],
          name: "ERC20InsufficientBalance",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "approver",
              type: "address",
            },
          ],
          name: "ERC20InvalidApprover",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
          ],
          name: "ERC20InvalidReceiver",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
          ],
          name: "ERC20InvalidSender",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "ERC20InvalidSpender",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
          ],
          name: "OwnableInvalidOwner",
          type: "error",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "OwnableUnauthorizedAccount",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      "0x60806040523480156200001157600080fd5b5060405162001883380380620018838339818101604052810190620000379190620003ae565b82828281600390816200004b919062000693565b5080600490816200005d919062000693565b505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000d55760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620000cc91906200078b565b60405180910390fd5b620000e681620000f060201b60201c565b50505050620007a8565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001f782620001ca565b9050919050565b6200020981620001ea565b81146200021557600080fd5b50565b6000815190506200022981620001fe565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002848262000239565b810181811067ffffffffffffffff82111715620002a657620002a56200024a565b5b80604052505050565b6000620002bb620001b6565b9050620002c9828262000279565b919050565b600067ffffffffffffffff821115620002ec57620002eb6200024a565b5b620002f78262000239565b9050602081019050919050565b60005b838110156200032457808201518184015260208101905062000307565b60008484015250505050565b6000620003476200034184620002ce565b620002af565b90508281526020810184848401111562000366576200036562000234565b5b6200037384828562000304565b509392505050565b600082601f8301126200039357620003926200022f565b5b8151620003a584826020860162000330565b91505092915050565b600080600060608486031215620003ca57620003c9620001c0565b5b6000620003da8682870162000218565b935050602084015167ffffffffffffffff811115620003fe57620003fd620001c5565b5b6200040c868287016200037b565b925050604084015167ffffffffffffffff81111562000430576200042f620001c5565b5b6200043e868287016200037b565b9150509250925092565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200049b57607f821691505b602082108103620004b157620004b062000453565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200051b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620004dc565b620005278683620004dc565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620005746200056e62000568846200053f565b62000549565b6200053f565b9050919050565b6000819050919050565b620005908362000553565b620005a86200059f826200057b565b848454620004e9565b825550505050565b600090565b620005bf620005b0565b620005cc81848462000585565b505050565b5b81811015620005f457620005e8600082620005b5565b600181019050620005d2565b5050565b601f82111562000643576200060d81620004b7565b6200061884620004cc565b8101602085101562000628578190505b620006406200063785620004cc565b830182620005d1565b50505b505050565b600082821c905092915050565b6000620006686000198460080262000648565b1980831691505092915050565b600062000683838362000655565b9150826002028217905092915050565b6200069e8262000448565b67ffffffffffffffff811115620006ba57620006b96200024a565b5b620006c6825462000482565b620006d3828285620005f8565b600060209050601f8311600181146200070b5760008415620006f6578287015190505b62000702858262000675565b86555062000772565b601f1984166200071b86620004b7565b60005b8281101562000745578489015182556001820191506020850194506020810190506200071e565b8683101562000765578489015162000761601f89168262000655565b8355505b6001600288020188555050505b505050505050565b6200078581620001ea565b82525050565b6000602082019050620007a260008301846200077a565b92915050565b6110cb80620007b86000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063715018a611610071578063715018a6146101a35780638da5cb5b146101ad57806395d89b41146101cb578063a9059cbb146101e9578063dd62ed3e14610219578063f2fde38b14610249576100b4565b806306fdde03146100b9578063095ea7b3146100d757806318160ddd1461010757806323b872dd14610125578063313ce5671461015557806370a0823114610173575b600080fd5b6100c1610265565b6040516100ce9190610d1f565b60405180910390f35b6100f160048036038101906100ec9190610dda565b6102f7565b6040516100fe9190610e35565b60405180910390f35b61010f61031a565b60405161011c9190610e5f565b60405180910390f35b61013f600480360381019061013a9190610e7a565b610324565b60405161014c9190610e35565b60405180910390f35b61015d610353565b60405161016a9190610ee9565b60405180910390f35b61018d60048036038101906101889190610f04565b61035c565b60405161019a9190610e5f565b60405180910390f35b6101ab6103a4565b005b6101b56103b8565b6040516101c29190610f40565b60405180910390f35b6101d36103e2565b6040516101e09190610d1f565b60405180910390f35b61020360048036038101906101fe9190610dda565b610474565b6040516102109190610e35565b60405180910390f35b610233600480360381019061022e9190610f5b565b610497565b6040516102409190610e5f565b60405180910390f35b610263600480360381019061025e9190610f04565b61051e565b005b60606003805461027490610fca565b80601f01602080910402602001604051908101604052809291908181526020018280546102a090610fca565b80156102ed5780601f106102c2576101008083540402835291602001916102ed565b820191906000526020600020905b8154815290600101906020018083116102d057829003601f168201915b5050505050905090565b6000806103026105a4565b905061030f8185856105ac565b600191505092915050565b6000600254905090565b60008061032f6105a4565b905061033c8582856105be565b610347858585610652565b60019150509392505050565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6103ac610746565b6103b660006107cd565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546103f190610fca565b80601f016020809104026020016040519081016040528092919081815260200182805461041d90610fca565b801561046a5780601f1061043f5761010080835404028352916020019161046a565b820191906000526020600020905b81548152906001019060200180831161044d57829003601f168201915b5050505050905090565b60008061047f6105a4565b905061048c818585610652565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610526610746565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105985760006040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161058f9190610f40565b60405180910390fd5b6105a1816107cd565b50565b600033905090565b6105b98383836001610893565b505050565b60006105ca8484610497565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461064c578181101561063c578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161063393929190610ffb565b60405180910390fd5b61064b84848484036000610893565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036106c45760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016106bb9190610f40565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107365760006040517fec442f0500000000000000000000000000000000000000000000000000000000815260040161072d9190610f40565b60405180910390fd5b610741838383610a6a565b505050565b61074e6105a4565b73ffffffffffffffffffffffffffffffffffffffff1661076c6103b8565b73ffffffffffffffffffffffffffffffffffffffff16146107cb5761078f6105a4565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016107c29190610f40565b60405180910390fd5b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036109055760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016108fc9190610f40565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036109775760006040517f94280d6200000000000000000000000000000000000000000000000000000000815260040161096e9190610f40565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610a64578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610a5b9190610e5f565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610abc578060026000828254610ab09190611061565b92505081905550610b8f565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610b48578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610b3f93929190610ffb565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610bd85780600260008282540392505081905550610c25565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610c829190610e5f565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610cc9578082015181840152602081019050610cae565b60008484015250505050565b6000601f19601f8301169050919050565b6000610cf182610c8f565b610cfb8185610c9a565b9350610d0b818560208601610cab565b610d1481610cd5565b840191505092915050565b60006020820190508181036000830152610d398184610ce6565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d7182610d46565b9050919050565b610d8181610d66565b8114610d8c57600080fd5b50565b600081359050610d9e81610d78565b92915050565b6000819050919050565b610db781610da4565b8114610dc257600080fd5b50565b600081359050610dd481610dae565b92915050565b60008060408385031215610df157610df0610d41565b5b6000610dff85828601610d8f565b9250506020610e1085828601610dc5565b9150509250929050565b60008115159050919050565b610e2f81610e1a565b82525050565b6000602082019050610e4a6000830184610e26565b92915050565b610e5981610da4565b82525050565b6000602082019050610e746000830184610e50565b92915050565b600080600060608486031215610e9357610e92610d41565b5b6000610ea186828701610d8f565b9350506020610eb286828701610d8f565b9250506040610ec386828701610dc5565b9150509250925092565b600060ff82169050919050565b610ee381610ecd565b82525050565b6000602082019050610efe6000830184610eda565b92915050565b600060208284031215610f1a57610f19610d41565b5b6000610f2884828501610d8f565b91505092915050565b610f3a81610d66565b82525050565b6000602082019050610f556000830184610f31565b92915050565b60008060408385031215610f7257610f71610d41565b5b6000610f8085828601610d8f565b9250506020610f9185828601610d8f565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610fe257607f821691505b602082108103610ff557610ff4610f9b565b5b50919050565b60006060820190506110106000830186610f31565b61101d6020830185610e50565b61102a6040830184610e50565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061106c82610da4565b915061107783610da4565b925082820190508082111561108f5761108e611032565b5b9291505056fea2646970667358221220ed6e58b71de05f4f741acef7cb38a449bdafb429fefd5ae2365bcc8424b0282864736f6c63430008140033",
    ];
  }
}
