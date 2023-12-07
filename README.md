# Calculator App
## Getting Started
Before starting any development work you will need a local copy of the Calculator repository.
```
git clone -b [https://github.com/lavanderaSonia/Task-App.git](https://github.com/lavanderaSonia/Calculator.git)

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
Here I will explain the decisions that I took in terms of user interface design and code.
1. I decided to use a string variable (Keyspressed) to save special characters such as negative numbers and decimals so that I could manage them more easily. Then I use a function to parse this string and save all the numbers and operators in an array of length 3 to operate with them. 
2. I decided to use a useState to save the full operation and its solution to show later in the display.
