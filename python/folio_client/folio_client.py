import json
import re
import logging
import random
import copy
from datetime import datetime
import hashlib
import traceback
import requests


class FolioClient:
    """handles communication and getting values from FOLIO"""

    def __init__(self, okapi_url, tenant_id, username, password):
        self.okapi_url = okapi_url
        self.tenant_id = tenant_id
        self.username = username
        self.password = password
        self.login()
        self.okapi_headers = {
            "x-okapi-token": self.okapi_token,
            "x-okapi-tenant": self.tenant_id,
            "content-type": "application/json",
        }

    def login(self):
        """Logs into FOLIO in order to get the okapi token"""
        headers = {"x-okapi-tenant": self.tenant_id, "content-type": "application/json"}
        payload = {"username": self.username, "password": self.password}
        path = "/authn/login"
        url = self.okapi_url + path
        req = requests.post(url, data=json.dumps(payload), headers=headers)
        if req.status_code != 201:
            raise ValueError("Login Request failed {}".format(req.status_code))
        self.okapi_token = req.headers.get("x-okapi-token")
        self.refresh_token = req.headers.get("refreshtoken")

    def folio_get(self, path, key=None, query=""):
        """Fetches data from FOLIO and turns it into a json object"""
        url = self.okapi_url + path + query
        try:
            req = requests.get(url, headers=self.okapi_headers)
            req.raise_for_status()
            result = json.loads(req.text)[key] if key else json.loads(req.text)
            return result
        except Exception as ee:
            print(ee)
            traceback.print_exc()
            print(f"Failing url:\t {url}")
            return []
