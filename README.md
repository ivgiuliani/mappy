## Setup

Requirments:

- python
- nvm
- yarn

```
pip install -r requirements.txt
nvm install $(cat .nvmrc)
yarn install
```

Start the backend:
```
./start-dev.sh
```

Start the frontend:
```
yarn start
```

API will be served on `http://localhost:5000`.
Frontend will be available on `http://localhost:8080`.
