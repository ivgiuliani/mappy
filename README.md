# Mappy

Render geolocalised images on a map.

![Screenshot](_docs/screenshot.jpg?raw=true)

## Setup

Requirments:

- python
- nvm
- yarn

```
cd backend
pip install -r requirements.txt
cd ..

cd frontend
nvm install $(cat .nvmrc)
yarn install
```

Start the backend:
```
cd backend
./start-dev.sh
```

Start the frontend:
```
cd frontend
yarn start
```

API will be served on `http://localhost:5000`.
Frontend will be available on `http://localhost:8080`.
