# Dex Angular Client Example

Install coreos/dex from binary or build with golang

```
git clone https://github.com/coreos/dex
cd dex
make
```

edit the path src/app/app.component.ts replace example.com with the test domain

```
    src/app/app.component.ts:    this.oauthService.issuer = 'https://example.com:5556';
```

Set the api keys in this dex-run file, create the config.yaml, example
follows, change example.com to your preferred test domain and change
the redirect port for your deployment port and URI path 

```
  redirectURIs: 
  - 'https://example.com:4200/home'
  - 'https://example.com:4200'

```

```
#!/bin/bash
# dex-run
# decouple auth ids from repo by setting the vars in environment startup file

# update the file and run this chmod +x dex-run; ./dex-run

export GOOGLE_CLIENT_ID=...51891........apps.googleusercontent.com
export GOOGLE_CLIENT_SECRET=........
sudo -EH dex serve config.yaml
```

config.yaml

```
# Based on dex/examples/config-dev.yaml

# The base path of dex and the external name of the OpenID Connect service.
# This is the canonical URL that all clients MUST use to refer to dex. If a
# path is provided, dex's HTTP service will listen at a non-root URL.
issuer: https://example.com:5556

# The storage configuration determines where dex stores its state. Supported
# options include SQL flavors and Kubernetes third party resources.
#
# See the storage document at Documentation/storage.md for further information.
storage:
  type: sqlite3
  config:
    file: examples/dex.db

web:
  allowedOrigins: ['*']
  https: example.com:5556
  tlsCert:     /etc/certs/example.com/server.crt
  tlsKey:      /etc/certs/example.com/server.key
  tlsClientCA: /etc/certs/example.com/ca.crt

grpc:
 addr: example.com:5557
 tlsCert:     /etc/certs/example.com/server.crt
 tlsKey:      /etc/certs/example.com/server.key
 tlsClientCA: /etc/certs/example.com/ca.crt

# Uncomment this block to enable configuration for the expiration time durations.
# expiry:
#   signingKeys: "6h"
#   idTokens: "24h"

# Options for controlling the logger.
logger:
  level: "debug"
  format: "text" # can also be "json"

# Uncomment this block to control which response types dex supports. For example
# the following response types enable the implicit flow for web-only clients.
# Defaults to ["code"], the code flow.
oauth2:
  responseTypes: ['id_token', 'token', 'code']

# Instead of reading from an external storage, use this list of clients.
#
# If this option isn't chosen clients may be added through the gRPC API.
staticClients:
# - id: dex-example
#   redirectURIs:
#   - 'https://example.com:5555/callback'
#   name: 'Dex Example'
#   secret: ZXhhbXBsZS1hcHAtc2VjcmV0
- id: angular-example

# validates, points to the endpoint after returning from
# authentication

  redirectURIs: 
  - 'https://example.com:4200/home'
  - 'https://example.com:8888/home'
  - 'https://example.com:4200'
  - 'https://example.com:8888'
  name: 'Angular Dex Example'
  secret: ZXhhbXBsZS1hcHAtc2VjcmV0

connectors:
- type: mockCallback
  id: mock
  name: Dex Example
- type: oidc
  id: google
  name: Google
  config:
    issuer: https://accounts.google.com
    # Connector config values starting with a "$" will read from the environment.
    clientID: $GOOGLE_CLIENT_ID
    clientSecret: $GOOGLE_CLIENT_SECRET
    redirectURI: https://example.com:5556/callback
#     hostedDomains:
#     - $GOOGLE_HOSTED_DOMAIN

# Let dex keep a list of passwords which can be used to login to dex.
enablePasswordDB: true

# A static list of passwords to login the end user. By identifying here, dex
# won't look in its underlying storage for passwords.
#
# If this option isn't chosen users may be added through the gRPC API.
staticPasswords:
- email: "admin@example.com"
  # bcrypt hash of the string "password"
  hash: "$2a$10$2b2cU8CPhOTaGrs1HRQuAueS7JTT5ZHsHSzYiFPm1leZck7Mc8T4W"
  username: "admin"
  userID: "08a8684b-db88-4b73-90a9-3cd1661f5466"

```

Run example-app to serve as credential intermediary

```
. environment; 
sudo -EH ./bin/example-app \
  --issuer https://example.com:5556 \
  --listen https://example.com:5555 \
  --redirect-uri https://example.com:5555/callback \
  --debug \
  --tls-key /etc/certs/example.com/example.com.key \
  --tls-cert /etc/certs/example.com/example.com.crt \
  --issuer-root-ca /etc/certs/example.com/ca.crt \
  --client-id angular-example
```


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
