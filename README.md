# 💬 Semantic Kernel ChatBot UI - Frontend

A beautiful, responsive **React** chat interface for the Semantic Kernel ChatBot. Modern design with real-time messaging, animations, and seamless integration with the backend API.

> **Part of**: [Semantic Kernel ChatBot](https://github.com/yourusername/semantic-kernel-chatbot) - Full-stack AI chatbot project
> 
> **Backend Repository**: [chatbot-api](https://github.com/yourusername/chatbot-api)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Components](#components)
- [Styling](#styling)
- [API Integration](#api-integration)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## ✨ Features

### Current Version
- ✅ **Beautiful UI** - Modern purple gradient design
- ✅ **Real-time Chat** - Instant message sending/receiving
- ✅ **Responsive Design** - Works on desktop, tablet, mobile
- ✅ **Message History** - View conversation in real-time
- ✅ **Typing Indicators** - "Bot is thinking..." animation
- ✅ **Timestamps** - See when messages were sent
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Accessible** - WCAG compliant, keyboard navigation

### Planned Features
- 🎨 Dark mode theme
- 🔊 Voice input/output
- 📁 File sharing
- 🔍 Message search
- 💾 Export conversations
- 🎭 Multiple themes
- ⚙️ Settings panel

---

## 🛠️ Tech Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Framework** | React | 18+ | UI library |
| **Language** | JavaScript | ES6+ | Frontend code |
| **Styling** | CSS3 | - | Design & layout |
| **HTTP Client** | Axios | 1.6+ | API requests |
| **Package Manager** | npm | 9+ | Dependencies |
| **Build Tool** | Create React App | 5+ | Dev environment |
| **Icons** | Unicode/Emoji | - | Visual elements |

---

## 📋 Prerequisites

### System Requirements
- **[Node.js 18+](https://nodejs.org/)** - JavaScript runtime
- **[npm 9+](https://www.npmjs.com/)** - Package manager
- **[Git](https://git-scm.com/)** - Version control
- **[Visual Studio Code](https://code.visualstudio.com/)** - Code editor (optional)
  - Extensions: ES7+ React/Redux, Prettier

### Backend Requirements
- Running instance of [Semantic Kernel ChatBot API](https://github.com/yourusername/chatbot-api)
- Backend API URL (default: `http://localhost:5000/api`)

---

## 🚀 Quick Start

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/chatbot-frontend.git
cd chatbot-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure API URL

```bash
# Copy template
cp .env.template .env

# Edit .env file
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

### 4️⃣ Start Development Server

```bash
npm start
```

Expected output:
```
On Your Network: http://localhost:3000
Compiled successfully!
Webpack compiled successfully
```

Browser should automatically open at `http://localhost:3000`

### 5️⃣ Ensure Backend is Running

```bash
# In another terminal, ensure backend is running
# From the backend directory:
dotnet run
# Should show: 🤖 API running on: http://localhost:5000
```

### 6️⃣ Test the Chat

1. Type in the message input box
2. Press Enter or click Send
3. Wait for AI response
4. You should see the message appear with timestamp

---

## 📁 Project Structure

```
chatbot-frontend/
│
├── src/
│   ├── components/
│   │   ├── ChatBox.jsx              # Main chat component
│   │   │   ├── Message display
│   │   │   ├── Input form
│   │   │   ├── Error handling
│   │   │   └── Loading states
│   │   └── ChatBox.css              # Chat styling
│   │       ├── Messages
│   │       ├── Input area
│   │       ├── Animations
│   │       └── Responsive design
│   │
│   ├── services/                    # (Optional) API services
│   │   └── api.js                   # Axios instance & functions
│   │
│   ├── App.js                       # Root component
│   ├── App.css                      # Global styles
│   ├── index.js                     # React entry point
│   ├── index.css                    # Global styles
│   └── reportWebVitals.js           # Performance tracking
│
├── public/
│   ├── index.html                   # HTML template
│   ├── favicon.ico                  # Browser tab icon
│   └── manifest.json                # PWA manifest
│
├── .env.template                    # Environment template
├── .env                             # Environment variables
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Dependency lock file
├── README.md                        # This file
└── LICENSE                          # MIT License
```

---

## 🧩 Components

### ChatBox Component

**File**: `src/components/ChatBox.jsx`

Main chat interface component.

**Features:**
- Message display
- User input form
- Real-time message updates
- Error handling
- Loading indicators

**Props:** None (uses local state)

**State:**
```javascript
const [messages, setMessages] = useState([]); // Chat history
const [inputValue, setInputValue] = useState(''); // Current input
const [loading, setLoading] = useState(false); // Loading state
const [error, setError] = useState(null); // Error messages
```

**Key Methods:**
```javascript
handleSendMessage()     // Send message to API
addMessage()           // Add message to chat
handleKeyPress()       // Handle keyboard events
scrollToBottom()       // Auto-scroll chat
```

### App Component

**File**: `src/App.js`

Root component that wraps the ChatBox.

```javascript
import React from 'react';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
  return (
    <div className="App">
      <ChatBox />
    </div>
  );
}

export default App;
```

---

## 🎨 Styling

### CSS Architecture

**Global Styles** (`App.css`):
- Base HTML/body styles
- Typography
- Layout framework

**Component Styles** (`ChatBox.css`):
- Chat container
- Messages styling
- Input area
- Animations
- Responsive breakpoints

### Color Scheme

```css
/* Primary Colors */
--primary: #667eea;        /* Purple */
--secondary: #764ba2;      /* Dark purple */
--background: #f5f5f5;     /* Light gray */
--white: #ffffff;          /* White */

/* Semantic Colors */
--success: #51cf66;        /* Green */
--error: #ff6b6b;          /* Red */
--warning: #ffd93d;        /* Yellow */
--info: #4ecdc4;           /* Teal */
```

### Responsive Breakpoints

```css
/* Mobile First Approach */
/* Base styles: Mobile (< 480px) */
/* 768px: Tablet */
@media (max-width: 768px) { }

/* 1024px: Desktop */
@media (min-width: 1024px) { }

/* 1200px: Large Desktop */
@media (min-width: 1200px) { }
```

### Animations

```css
/* Message Fade-in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Loading Dots */
@keyframes blink {
  0%, 20%, 50%, 80%, 100% { opacity: 1; }
  40% { opacity: 0.5; }
  60% { opacity: 0.7; }
}

/* Button Hover */
@keyframes hover {
  from { transform: translateY(0); }
  to { transform: translateY(-2px); }
}
```

---

## 🔌 API Integration

### Configuration

**File**: `.env`

```env
# API Endpoint
REACT_APP_API_URL=http://localhost:5000/api

# Environment
REACT_APP_ENVIRONMENT=development
```

### API Client Setup

**File**: `src/services/api.js` (Optional)

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(config => {
  console.log('Sending request:', config.url);
  return config;
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export default api;
```

### Making API Calls

**In ChatBox Component:**

```javascript
const handleSendMessage = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/chat`,
      { message: inputValue }
    );
    
    const aiResponse = response.data.response;
    addMessage(aiResponse, 'bot');
  } catch (error) {
    console.error('Error:', error);
    setError('Failed to get response');
  }
};
```

### Error Handling

```javascript
catch (err) {
  let errorMessage = 'Unable to get response';
  
  if (err.response?.status === 503) {
    errorMessage = '⚠️ AI service unavailable';
  } else if (err.response?.status === 400) {
    errorMessage = '⚠️ Bad request';
  } else if (err.code === 'ERR_NETWORK') {
    errorMessage = '❌ Network error - backend not running?';
  } else if (err.response?.data?.error) {
    errorMessage = `❌ Error: ${err.response.data.error}`;
  }
  
  setError(errorMessage);
}
```

---

## ⚙️ Configuration

### Environment Variables

```bash
# .env file

# Required
REACT_APP_API_URL=http://localhost:5000/api

# Optional
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG=true
REACT_APP_TIMEOUT=10000
```

### Build Configuration

**File**: `package.json`

```json
{
  "name": "chatbot-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "axios": "^1.6.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app"]
  }
}
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm start
# Runs on http://localhost:3000
# Auto-reloads on file changes

# Build for production
npm run build
# Optimized build in ./build/ directory

# Run tests
npm test
# Watch mode for test files

# Eject configuration (one-way operation!)
npm run eject
# Exposes Create React App configuration
# Only do this if you need custom webpack config
```

### Development Workflow

```bash
# 1. Start backend (separate terminal)
cd ../backend
dotnet run

# 2. Start frontend
npm start

# 3. Make changes to src/ files
# 4. Browser automatically reloads
# 5. Check browser console for errors
```

### Debugging

**Browser DevTools:**

1. Open DevTools: F12 or Right-click → Inspect
2. Check Console tab for errors
3. Check Network tab for API calls
4. Check React DevTools extension

**VS Code Debugging:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "/static/js/*": "${workspaceFolder}/src/*"
      }
    }
  ]
}
```

### Code Quality

```bash
# Format code with Prettier
npm run format

# Lint with ESLint
npm run lint

# Run all checks
npm run check
```

### Adding Dependencies

```bash
# Add new package
npm install axios

# Add dev dependency
npm install --save-dev prettier

# Update package
npm update axios

# Remove package
npm uninstall axios
```

---

## 🚢 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Output directory: ./build/
# All files are minified and optimized
```

### Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Set environment variables in Vercel dashboard
# REACT_APP_API_URL=https://your-api-url.azurewebsites.net/api
```

### Deploy to Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build project
npm run build

# 3. Deploy
netlify deploy --prod --dir=build

# 4. Set environment variables in Netlify dashboard
```

### Deploy to Azure Static Web Apps

```bash
# 1. Create resource
az staticwebapp create \
  --name chatbot-frontend \
  --resource-group mygroup \
  --source https://github.com/yourusername/chatbot-frontend \
  --branch main \
  --token <github-token>

# 2. Configure API endpoint
# In Azure Portal → Configuration → Application Settings
# Add: REACT_APP_API_URL=https://your-api-url/api
```

### Docker Deployment

**Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
ENV REACT_APP_API_URL=http://localhost:5000/api
CMD ["serve", "-s", "build", "-l", "3000"]
```

```bash
# Build and run
docker build -t chatbot-frontend:latest .
docker run -p 3000:3000 -e REACT_APP_API_URL=http://api:5000/api chatbot-frontend:latest
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --watchAll=false

# Run with coverage
npm test -- --coverage
```

**Example Test** (`ChatBox.test.js`):

```javascript
import { render, screen } from '@testing-library/react';
import ChatBox from './ChatBox';

describe('ChatBox Component', () => {
  test('renders chat interface', () => {
    render(<ChatBox />);
    expect(screen.getByText(/how can i help/i)).toBeInTheDocument();
  });

  test('sends message on button click', async () => {
    render(<ChatBox />);
    const input = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByText(/send/i);
    
    userEvent.type(input, 'Hello');
    userEvent.click(sendButton);
    
    expect(input.value).toBe('');
  });
});
```

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Blank white screen | Check browser console (F12) for errors |
| API not responding | Ensure backend is running on port 5000 |
| "Network error" message | Verify `REACT_APP_API_URL` in .env |
| Dependencies won't install | Delete node_modules, package-lock.json; run `npm install` |
| Port 3000 already in use | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| CORS errors | Check backend has CORS enabled |

### Debugging Steps

1. **Check Browser Console** (F12)
   - Look for JavaScript errors
   - Check Network tab for API calls
   - Verify response from backend

2. **Check .env Configuration**
   ```bash
   # Verify settings
   cat .env
   
   # Should show correct API URL
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Test Backend Directly**
   ```bash
   curl http://localhost:5000/api/chat/health
   # Should return: {"status":"healthy",...}
   ```

4. **Check Network Requests**
   - Open DevTools → Network tab
   - Send a message
   - Look for POST request to /api/chat
   - Check response status and content

5. **Verify Backend Running**
   ```bash
   # In backend terminal, should see:
   # 🤖 API running on: http://localhost:5000
   ```

### Performance Issues

**Slow Typing/Input:**
```javascript
// Add React.memo to prevent unnecessary re-renders
export default React.memo(ChatBox);

// Use useCallback for event handlers
const handleChange = useCallback((e) => {
  setInputValue(e.target.value);
}, []);
```

**Slow Message Loading:**
```javascript
// Implement virtual scrolling for long conversations
// Use react-window or react-virtualized
import { FixedSizeList } from 'react-window';
```

---

## 🤝 Contributing

### Setup for Contributors

```bash
# 1. Fork repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/chatbot-frontend.git
cd chatbot-frontend

# 3. Create feature branch
git checkout -b feature/amazing-feature

# 4. Install dependencies
npm install

# 5. Make changes
# 6. Test locally
npm start

# 7. Commit changes
git commit -m "Add amazing feature"

# 8. Push to your fork
git push origin feature/amazing-feature

# 9. Create Pull Request on GitHub
```

### Code Style

```javascript
// Use arrow functions
const handleClick = () => { };

// Use const/let, never var
const message = 'Hello';

// Use meaningful names
const [isLoading, setIsLoading] = useState(false); // Good
const [loading, setLoading] = useState(false); // Acceptable
const [load, setLoad] = useState(false); // Bad

// Add comments for complex logic
// Scroll to bottom when new messages arrive
useEffect(() => {
  scrollToBottom();
}, [messages]);

// Use template literals
const greeting = `Hello, ${name}!`; // Good
const greeting = 'Hello, ' + name + '!'; // Old style
```

---

## 📚 Documentation

- **[Setup Guide](../docs/SETUP_GUIDE.md)** - Detailed setup
- **[Backend API](../backend/README.md)** - API documentation
- **[Architecture](../docs/ARCHITECTURE.md)** - System design
- **[React Docs](https://react.dev/)** - Official React docs
- **[Axios Docs](https://axios-http.com/)** - HTTP client docs

---

## 🔗 Related Repositories

- **[Backend API (C#)](https://github.com/yourusername/chatbot-api)** - Backend
- **[Main Project](https://github.com/yourusername/semantic-kernel-chatbot)** - Full-stack
- **[Documentation](https://github.com/yourusername/semantic-kernel-chatbot/tree/main/docs)** - Docs

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Create React App](https://create-react-app.dev/) - Development environment
- [Axios](https://axios-http.com/) - HTTP client
- [Semantic Kernel ChatBot](https://github.com/yourusername/semantic-kernel-chatbot) - Parent project

---

## 📞 Support

### Get Help

- 📖 Check [Documentation](../docs/)
- 🐛 Search [GitHub Issues](https://github.com/yourusername/chatbot-frontend/issues)
- 💬 [GitHub Discussions](https://github.com/yourusername/chatbot-frontend/discussions)

### Report Bugs

[Open an issue](https://github.com/yourusername/chatbot-frontend/issues/new) with:
- Clear description
- Steps to reproduce
- Screenshots
- Browser/OS details

---

## 🌟 Star This Repo

If this project helps you, please star it on GitHub! ⭐

---

## 🚀 Quick Links

- [Quick Start](#quick-start) - Get running in 5 minutes
- [Components](#components) - Component documentation
- [API Integration](#api-integration) - Backend connection
- [Deployment](#deployment) - Deploy to production
- [Contributing](#contributing) - How to contribute

---

**Made with ❤️ for the Gen AI community**

Happy coding! 🚀