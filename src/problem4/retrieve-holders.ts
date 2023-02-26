import { ethers, JsonRpcProvider } from "ethers";

const endpoint = "https://bsc-dataseed.binance.org/";
const swthTokenContractAddress = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468";

const abi = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

async function retrieveTokenHolders(): Promise<void> {
  const provider = new JsonRpcProvider(endpoint) as any;
  const swthToken = new ethers.Contract(
    swthTokenContractAddress,
    abi,
    provider
  );

  const addressesToLookup = [
    "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
    "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
    "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392",
  ];

  for (const address of addressesToLookup) {
    const balance = await swthToken.balanceOf(address);
    console.log(`${address} ${balance.toString()}`);
  }
}

retrieveTokenHolders().catch((err) => {
  console.error(err);
});
