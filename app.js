const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// URL de connexion à MongoDB (remplacez <username>, <password>, <cluster-url> et <database> par vos informations)
const uri = 'mongodb+srv://armand1:P_ssword123@projet-mongodb.xtyctzk.mongodb.net/';

// Options de connexion à MongoDB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Route GET pour la racine de l'API
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API !');
});


// Fonction de connexion à MongoDB
async function connectToDatabase() {
    try {
        const client = new MongoClient(uri, options);
        await client.connect();
        console.log('Connecté à la base de données MongoDB');
        return client;
    } catch (error) {
        console.error('Erreur de connexion à la base de données MongoDB :', error);
    }
}

// Route POST pour ajouter des logs
app.post('/logs', async (req, res) => {
    const logs = req.body;
    
    // Connexion à la base de données
    const client = await connectToDatabase();
    const database = client.db('Projet-mongoDB');
    const collection = database.collection('Logging_App'); // Assurez-vous d'utiliser le bon nom de collection pour les logs

    // Insertion des logs dans la collection MongoDB
    try {
        const result = await collection.insertOne(logs);
        console.log('Logs insérés avec succès :', result.insertedId);
        res.send('Logs insérés avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'insertion des logs :', error);
        res.status(500).send('Erreur lors de l\'insertion des logs.');
    } finally {
        // Fermer la connexion client après l'insertion
        await client.close();
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'écoute sur le port ${port}`);
});
