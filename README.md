# met4cast (weather application)

A **React.js** weather application that fetches real-time weather data from open-meteo.com API and Redux Toolkit and Async Thunks. This project separates the **API calls, state management, and components**.

## Features

✅ Fetch weather data using **Redux Async Thunks**  
✅ City list displayed with flag, city/town and country.
✅ Weather displayed for selected city (from the list)
✅ Information displayed as per the weather code.
✅ API state (**loading, success, error**) in **Redux Slice**  
✅ **Debounced search** for city lookup
✅ **Redux Store, API, and Components**
✅ Localisation implemented
✅ Unit test cases for core business logic

---

## Project Structure - Following is the folder structure

src

- api (has async api calls)
- assets (images / svg)
- components (layouts)
  - molecules (molecule for city selector and weather)
  - atoms (Input box, date box and no data component)
- locale (currently only en and fr files are handled)
- pages (Main page of the application)
- store (Redux store with async thunk and api calls)
  - slices of global state.
- tests (unit test cases)
- utils (utility functions e.g. date, constants)

## Installation Steps

### Prerequisite

    Recommended - Node JS - 18.20.x and above

### Clone the repository

```bash

git clone https://github.com/vickyroberts/met4cast.git
cd met4cast

npm install

npm start

```

This application will run on "<http://localhost:3000>"

### Running unit test case (Jest + React testing library)

```bash

npm test

```
