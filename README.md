# AddressBook

This React app was created as a practice project. User can basically add, search, sort, edit and delete contact informations.


## Learn More

Link to website https://kitupala-addressbook.netlify.app/


### Refactoring App 6/7/23

I decided to refactor this project and code. All basic functionality and UI remained the same (except option to use 'Enter' / 'Esc' keys and input focus on InputForm) but what lies under the hood changed drastically. Components are now separated on 'components' folder and App.js uses useReducer hook. Components also take advantage of useState, useRef, useEffect and custom hook called useKey. I managed to reduce prop drilling a lot thanks to useReducer hook. You'll find App-V1.js from repo so you can compare original code versus existing one.

### Refactoring App 16/07/23:

Some more refactoring... App now uses Context API for state management and all prop drilling is gone! You'll find previous versions of the code from 'src-no-context' folder. 
