# Notation - Handwritten Math to LaTeX Converter

## Problem Statement
The goal is to build a web application that converts handwritten math notes into clean LaTeX. The application requires a Ruby on Rails backend to handle image processing and a React frontend for the user interface.

## Current State
The project directory `/Users/quynhan/Desktop/notation` currently only contains a README.md.

**Environment:**
- Ruby: v4.0.0
- Rails: Not installed
- Node: v25.1.0
- npm: v11.6.2

## Proposed Changes

### 1. Project Initialization

**Backend:**
- Install Rails gem.
- Initialize a new Rails API-only application in a `backend` directory.
- Configure CORS to allow requests from the React frontend.

**Frontend:**
- Initialize a new React application (using Vite) in a `frontend` directory.
- Install necessary dependencies for HTTP requests (axios) and LaTeX rendering (katex/react-latex-next).

### 2. Backend Implementation (Rails)

**File-to-LaTeX Conversion:**
- Service class using Gemini Vision API to extract text and math equations from handwritten notes.
- Support both image files (PNG, JPG) and PDF files as input.
- Gemini API natively supports PDF processing, so pass PDF files directly to the API.
- Single API call per file to convert image/PDF → LaTeX/Markdown output.

**Content Formatting Service (LLM):**
- Second Gemini API call to process the extracted content.
- Prompt Gemini to structure the content into a "pretty" LaTeX document, utilizing packages like tcolorbox to wrap definitions, theorems, and examples in colored boxes.

**API Endpoints:**
- `POST /convert`: Accepts an image file (PNG, JPG) or PDF file, pipelines it through Gemini Vision (extraction) and Gemini (formatting), and returns the styled LaTeX.

**Configuration:**
- Environment variable for Gemini API key only.

### 3. Frontend Implementation (React)

**Upload Component:**
- A drag-and-drop or file selection interface for users to upload images (PNG, JPG) or PDF files of their notes.

**Display Component:**
- Render the returned LaTeX string using a LaTeX rendering library.

**State Management:**
- Manage loading states and error handling during the conversion process.

### 4. Integration
Connect the frontend upload form to the backend `POST /convert` endpoint.
