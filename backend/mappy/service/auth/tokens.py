from mappy import config


def is_valid(token):
    return token == config.API_KEY


def get_key(raw_header):
    if raw_header.startswith("Bearer "):
        return raw_header[len("Bearer "):]
    return ""


def is_valid_auth(authorization_header):
    key = get_key(authorization_header or "")
    print("HEADER: %s" % authorization_header)
    print("KEY: %s" % key)
    return is_valid(key)
