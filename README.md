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

## Usage

For the app to work the each input utterance should be in one line followed by other utterances in the specified syntax.

### Input syntax

```
utteranceA; intentA; entityA1; entityA2; ... 
utteranceB; intentB; entityB1; entityB2; ... 
utteranceC; intentC; entityC1; entityC2; ... 
```

For example

```
Book me a flight to Rio next week; BookFlight; Rio:place ; next week:dateTimeV2
Fly me to Rio on the 24th; BookFlight; Rio:place; 24th:dateTimeV2
What's the weather like in Boston?; CheckWeather; Boston:place
I need a plane ticket next Sunday to Rio de Janeiro; BookFlight; Rio de Janeiro:place
```

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

For example the output of the previous input example will look like this

```
[
    {
        "text": "Book me a flight to Rio next week",
        "intent": "BookFlight",
        "entities": [
            {
                "entity": "place",
                "startPos": 20,
                "endPos": 22
            },
            {
                "entity": "dateTimeV2",
                "startPos": 24,
                "endPos": 32
            }
        ]
    },
    {
        "text": "Fly me to Rio on the 24th",
        "intent": "BookFlight",
        "entities": [
            {
                "entity": "place",
                "startPos": 10,
                "endPos": 12
            },
            {
                "entity": "dateTimeV2",
                "startPos": 21,
                "endPos": 24
            }
        ]
    },
    {
        "text": "What's the weather like in Boston?",
        "intent": "CheckWeather",
        "entities": [
            {
                "entity": "place",
                "startPos": 27,
                "endPos": 32
            }
        ]
    },
    {
        "text": "I need a plane ticket next Sunday to Rio de Janeiro",
        "intent": "BookFlight",
        "entities": [
            {
                "entity": "place",
                "startPos": 37,
                "endPos": 50
            }
        ]
    }
]
```
