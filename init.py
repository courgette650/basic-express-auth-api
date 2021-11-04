#!/usr/bin/env python
import uuid


def for_local():
    fd = open(".env", "rw")
    db_name = input("Specify the database's name : ")
    username = input("Specify " + db_name + " username : ")
    password = input("Specify " + username + " password : ")
    secret = uuid.uuid4().hex + uuid.uuid4().hex
    fd.write("TOKEN_KEY={0}\nPORT={1}\n")

def for_atlas():
    fd = open(".env", "rw")
    print("Please specify MONGO_URI inside .env file")
    secret = uuid.uuid4().hex + uuid.uuid4().hex
    fd.write("TOKEN_KEY={0}\nPORT=4001\nMONGO_URI=<url_to_atlas_mongo_db>")


local = input("Are you using Atlas or Local ? (a/l): ")
if "l" == local:
    for_local()
elif "a" == local:
    print("Please specify MONGO_URI inside .env file")
else:
    print("Failed : Wrong db type")
    exit(2)
