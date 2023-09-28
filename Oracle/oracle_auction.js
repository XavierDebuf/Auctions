const Web3 = require('web3');
const axios = require('axios');

// Configurer le fournisseur Web3 pour se connecter à Ethereum
const web3 = new Web3('YOUR_ETHEREUM_NODE_URL'); // Remplacez par l'URL RPC de votre nœud Ethereum

// Adresse du smart contract
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Remplacez par l'adresse de votre contrat

// ABI (Interface du contrat)
const contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "data",
                "type": "uint256"
            }
        ],
        "name": "updateData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getData",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Adresse de l'oracle (vous pouvez le gérer comme une variable d'environnement)
const oracleAddress = 'YOUR_ORACLE_ADDRESS';

// Fonction pour récupérer les données externes
async function fetchDataFromExternalSource() {
    try {
        const response = await axios.get('YOUR_EXTERNAL_API_URL'); // Remplacez par l'URL de l'API externe
        return response.data.data; // Supposons que l'API renvoie un objet avec une clé "data"
    } catch (error) {
        throw new Error('Erreur lors de la récupération des données externes : ' + error.message);
    }
}

// Fonction principale pour mettre à jour le smart contract avec les données externes
async function updateContractWithData() {
    try {
        // Récupérer les données externes
        const newData = await fetchDataFromExternalSource();

        // Créer une instance du contrat
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Envoyer la transaction pour mettre à jour les données dans le contrat
        const accounts = await web3.eth.getAccounts();
        const gas = await contract.methods.updateData(newData).estimateGas();
        const tx = await contract.methods.updateData(newData).send({ from: oracleAddress, gas });

        console.log('Transaction réussie, hash :', tx.transactionHash);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du contrat :', error.message);
    }
}

// Appel de la fonction de mise à jour
updateContractWithData();
