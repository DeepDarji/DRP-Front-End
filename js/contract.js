const CONTRACT_ADDRESS = '0xDd326b4472590943057258771453e286B75836D3'; // Replace with deployed contract address
const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "driverId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "AccidentAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "AdminAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "admin",
				"type": "address"
			}
		],
		"name": "AdminRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "driverId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "DriverAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "driverId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "regNumber",
				"type": "string"
			}
		],
		"name": "VehicleAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "accidents",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "dateTime",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cause",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "caseStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "claimStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "photoUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "firNumber",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_driverId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_dateTime",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cause",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_caseStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_claimStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_photoUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_firNumber",
				"type": "string"
			}
		],
		"name": "addAccident",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "addAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_mobile",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_licenseNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_permanentAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bloodGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_vehicleType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageUrl",
				"type": "string"
			}
		],
		"name": "addDriver",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_driverId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_company",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_model",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_registrationNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pucDates",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ownerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_insuranceProvider",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_policyNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_policyValidity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_insuranceType",
				"type": "string"
			}
		],
		"name": "addVehicle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "admins",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_driverId",
				"type": "uint256"
			}
		],
		"name": "driverExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "driverIdCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "drivers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "mobile",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "licenseNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "permanentAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bloodGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vehicleType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_driverId",
				"type": "uint256"
			}
		],
		"name": "getAccidentHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "dateTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cause",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "caseStatus",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "claimStatus",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photoUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "firNumber",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct DriverReputationPassport.AccidentInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_driverId",
				"type": "uint256"
			}
		],
		"name": "getDriverData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "mobile",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "licenseNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "permanentAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bloodGroup",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "vehicleType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageUrl",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct DriverReputationPassport.DriverInfo",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "company",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "registrationNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "pucDates",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ownerName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "insuranceProvider",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "policyNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "policyValidity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "insuranceType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct DriverReputationPassport.VehicleInfo",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "dateTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cause",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "caseStatus",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "claimStatus",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "photoUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "firNumber",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct DriverReputationPassport.AccidentInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_driverId",
				"type": "uint256"
			}
		],
		"name": "getDriverInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "mobile",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "licenseNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "permanentAddress",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "bloodGroup",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "vehicleType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageUrl",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct DriverReputationPassport.DriverInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_driverId",
				"type": "uint256"
			}
		],
		"name": "getVehicleInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "company",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "registrationNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "pucDates",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ownerName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "insuranceProvider",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "policyNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "policyValidity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "insuranceType",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct DriverReputationPassport.VehicleInfo",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "removeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vehicles",
		"outputs": [
			{
				"internalType": "string",
				"name": "company",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "model",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "registrationNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pucDates",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ownerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "insuranceProvider",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "policyNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "policyValidity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "insuranceType",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
let contract;
let contractInitialized = false;

async function initContract() {
  if (!web3 || !accounts) {
    console.error('Web3 or accounts not initialized');
    return false;
  }
  try {
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    contractInitialized = true;
    console.log('Contract initialized at:', CONTRACT_ADDRESS);
    return true;
  } catch (error) {
    console.error('Failed to initialize contract:', error);
    return false;
  }
}

// Ensure contract is initialized before use
async function getContract() {
  if (!contractInitialized) {
    await initContract();
  }
  if (!contract) {
    throw new Error('Contract not initialized. Ensure MetaMask is connected and CONTRACT_ADDRESS is valid.');
  }
  return contract;
}

window.addEventListener('load', async () => {
  await initContract();
});