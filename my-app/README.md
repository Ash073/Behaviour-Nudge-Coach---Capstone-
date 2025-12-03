# Behavior Nudge Coach App

## Setup Instructions

1. **Get API Key:**
   - Option A (Google Gemini): Go to [Google AI Studio](https://aistudio.google.com/), sign in with your Google account, and create a new API key
   - Option B (OpenAI): Go to [OpenAI API](https://platform.openai.com/api-keys), sign in, and create a new API key

2. **Configure API Key:**
   - Create a `.env` file in the project root
   - For Google Gemini: `REACT_APP_API_KEY=your_gemini_api_key_here`
   - For OpenAI: `REACT_APP_API_KEY=your_openai_api_key_here`

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## Troubleshooting

If you encounter errors:

1. **API Key Error ("API key not valid")**:
   - For Google Gemini: Ensure you have created a valid API key from [Google AI Studio](https://aistudio.google.com/)
   - For OpenAI: Ensure you have created a valid API key from [OpenAI API](https://platform.openai.com/api-keys)
   - Verify that your `.env` file contains the correct API key
   - Make sure the key is in the format: `REACT_APP_API_KEY=your_actual_api_key_here`
   - Restart the development server after updating the API key

2. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Node.js version:** Ensure you're using Node.js 14 or higher

4. **TypeScript errors:** The project uses TypeScript with strict mode enabled

