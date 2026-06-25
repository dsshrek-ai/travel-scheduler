# Travel Scheduler

A web app that reads your travel data from Google Sheets and displays trip details with smart address and phone number detection.

## Features

- **Trip selector** — pick any trip from the dropdown to view its entries
- **Address detection** — any address entry gets a Map button that opens Google Maps
- **Phone detection** — any phone number gets a Call button
- **Packing list** — collapsible packing list grouped by list name
- **Live data** — always reads directly from your Google Sheet (no sync needed)

## Setup

### 1. Install Node.js

Download and install from [nodejs.org](https://nodejs.org) (LTS version recommended).

### 2. Install dependencies

```bash
npm install
```

### 3. Make sure your Google Sheet is public

In your Google Sheet: **Share → Anyone with the link → Viewer**

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173/travel-scheduler/](http://localhost:5173/travel-scheduler/)

## Deploy to GitHub Pages

```bash
npm run build
# then push the dist/ folder to the gh-pages branch, or use:
npx gh-pages -d dist
```

## Google Sheet Structure

| Col A | Col B | Col C | Col D | Col E | Col F | Col G | Col H | Col I |
|-------|-------|-------|-------|-------|-------|-------|-------|-------|
| List Name | Type | Description | Quantity | Unit | *(empty)* | Trip Name | Entry Description | Entry Value |

- Packing list data: columns A–E
- Trip data: columns G–I (trip name repeats for each row of that trip)
