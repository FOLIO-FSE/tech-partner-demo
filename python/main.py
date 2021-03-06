import argparse
import datetime
import json
from folio_client.folio_client import FolioClient


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("okapi_url", help=("OKAPI base url"))
    parser.add_argument("tenant_id", help=("id of the FOLIO tenant."))
    parser.add_argument("username", help=("the api user"))
    parser.add_argument("password", help=("the api users password"))
    args = parser.parse_args()
    print("\tOkapi URL:\t", args.okapi_url)
    print("\tTenanti Id:\t", args.tenant_id)
    print("\tUsername:\t", args.username)
    print("\tPassword:\tSecret")
    folio_client = FolioClient(
        args.okapi_url, args.tenant_id, args.username, args.password
    )
    res = folio_client.folio_get("/addresstypes")
    print(json.dumps(res, indent=4))


if __name__ == "__main__":
    main()
