# Calculator App
## Getting Started
Before starting any development work you will need a local copy of the Calculator repository.
```
git clone -b https://github.com/lavanderaSonia/Calculator.git

```
### Installing

```
npm install
```
### Running tests
If you want to run the tests to check them you will need this command.
```
npm run test
```
### Running
```
npm run dev
```
### Building
If you want to build the project to deploy it you will need this command.
```
npm run build
```
## Decisions
Here I will explain the decisions that I took in terms of code.
1. I decided to use a string variable (keysPressed) to save special characters such as negative numbers and decimals so that I could manage them more easily. Then I use a function to parse this string and save all the numbers and operators in an array of length 3 to operate with them. In this case I use a useRef to save the keys that the user types and don´t cause a re-render when operate with them. 
2. I decided to use a useState to save the full operation (operation) and its solution (solution) to keep the state of the calculator and trigger re-render when update the state and reflect it in the display. 
