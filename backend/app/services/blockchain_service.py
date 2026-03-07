import hashlib
import json

def create_transaction_hash(data):

    json_string=json.dumps(data,sort_keys=True)

    return hashlib.sha256(json_string.encode()).hexdigest()