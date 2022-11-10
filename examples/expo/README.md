# trustshare expo


## Install dependencies
```bash
npm i
# or yarn
yarn 
```

## Add API Keys
Rename the `.env.example` file to `.env` and add your API keys. 

There is a guide on how to generate API keys [here](https://docs.trustshare.io/guides/getting-started#generate-an-api-key).


## Running the server.
The server uses the api keys you have set up in the previous step to generate intents. It will not work without the API keys. 

Once the intents have been generated the client secret should be passed to the app. 

The client then uses the client secret to consume the intent and open a checkout or a verification.


## To run the iOS app 
```bash
npm run ios
# or yarn
yarn ios
```

## To run the iOS app 
```bash
npm run android
# or yarn
yarn android
```
