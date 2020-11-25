# Luis batch tester

This app takes your utterances and return it in JSON format which can be used for LUIS batch-testing.


## Installation

In the project directory, you can run:

```
$ npm install
$ npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To deploy the app

```
$ npm run deploy
```

You can visit the live version at: [https://bksahu.github.io/luis-batch-tester/](https://bksahu.github.io/luis-batch-tester/)

## Usage

For the app to work the each input utterance should be in one line followed by other utterances in the specified syntax.

### Output syntax

Upload excel `(.xlsx)` in this format

| Utterance              | IntentName  | EntityName | EntityType |
| ---------------------- |:-----------:| ----------:|-----------:|
| Book a meeting at 5 pm | BookMeeting | 5          | datetimeV2 |


### Output syntax

```
[
    {
        "text": string,
        "intent": string,
        "entites": [
            {
                "entity": string,
                "startPos": int,
                "endPos": int
            },
            {
                "entity": string,
                "startPos": int,
                "endPos": int
            }
        ]
    },
        {
        "text": string,
        "intent": string,
        "entites": [
            {
                "entity": string,
                "startPos": int,
                "endPos": int
            },
            {
                "entity": string,
                "startPos": int,
                "endPos": int
            }
        ]
    }
]
```
