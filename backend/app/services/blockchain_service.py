import hashlib
import time


def create_transaction_hash(data: dict) -> str:
    """
    Simple blockchain-style transaction hash generator
    """
    payload = str(data) + str(time.time())
    return hashlib.sha256(payload.encode()).hexdigest()