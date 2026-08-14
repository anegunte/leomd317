from urllib.parse import parse_qs, urlsplit

import certifi
from pymongo import MongoClient

from config import MONGO_URI, DB_NAME


def _uses_tls(uri: str) -> bool:
    """Return whether the MongoDB URI is configured to use TLS."""
    if uri.lower().startswith("mongodb+srv://"):
        # MongoDB SRV connection strings enable TLS by default.
        return True

    options = parse_qs(urlsplit(uri).query.lower())
    return options.get("tls", options.get("ssl", ["false"]))[-1] == "true"


client_options = {}
if _uses_tls(MONGO_URI):
    # Use certifi instead of the OS CA store. This fixes certificate-verification
    # failures on Python installations whose local CA store is incomplete.
    client_options["tlsCAFile"] = certifi.where()

client = MongoClient(MONGO_URI, **client_options)
db = client[DB_NAME]
