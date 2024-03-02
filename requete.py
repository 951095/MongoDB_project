import requests
import json
from datetime import datetime

# URL de base de l'API
base_url = 'http://localhost:3000'

# Endpoint pour ajouter des logs
endpoint = '/logs'

# URL complète pour l'endpoint
url = base_url + endpoint

# Obtenir l'heure actuelle au format ISO 8601
current_time = datetime.now().isoformat()

# Données de faux logs avec l'heure actuelle
logs_data = {
    'timestamp': current_time,
    'level': 'info',
    'message': 'Ceci est un faux log'
}

# Convertir les données en JSON
logs_json = json.dumps(logs_data)

# En-têtes de la requête
headers = {'Content-Type': 'application/json'}

# Envoi de la requête POST à l'API
response = requests.post(url, data=logs_json, headers=headers)

# Vérification de la réponse
if response.status_code == 200:
    print('Logs envoyés avec succès à l\'API.')
else:
    print('Erreur lors de l\'envoi des logs à l\'API :', response.text)
