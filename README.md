# 💱 Currency Converter

A modern, real-time currency converter application built with React and powered by live exchange rate APIs. Convert between 30+ global currencies with a beautiful, animated dark theme interface.

![Currency Converter](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔄 Real-Time Currency Conversion

- Convert between 30+ major world currencies
- Live exchange rates updated in real-time
- Bidirectional conversion (edit either field)
- Instant rate calculations

### 🌍 Multi-Currency Comparison

- Compare one amount across multiple currencies simultaneously
- Add/remove currencies dynamically
- Side-by-side rate comparison table
- Visual currency cards with flags and symbols

### 🎨 Beautiful UI/UX

- **Dark theme** with vibrant purple/pink gradients
- **Smooth animations** powered by Framer Motion
- **Responsive design** - works on mobile, tablet, and desktop
- **Animated background** with gradient orbs
- **Custom scrollbars** with gradient styling

### 🔍 Smart Search

- Searchable currency dropdowns
- Filter by currency code, name, or country
- Flag emojis for visual identification
- Currency symbols display (₹, $, €, £, etc.)

### 🎯 User-Friendly Features

- One-click currency swap button with rotation animation
- Currency symbols displayed in input fields
- Formatted number display with proper decimals
- Loading states and error handling
- Exchange rate information display

### 🎭 Theme Toggle

- Switch between dark and light themes
- Smooth theme transitions
- Persistent theme preference (localStorage)
- Animated toggle button

## 🛠️ Tech Stack

### Frontend Framework

- **React 18.3** - Modern React with hooks
- **Vite 6.0** - Fast build tool and dev server
- **JavaScript (ES6+)** - Modern JavaScript features

### Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **Lucide React** - Beautiful icon set

### API Integration

- **ExchangeRate-API** - Free real-time currency exchange rates
- **Fetch API** - Native browser API for HTTP requests

### Development Tools

- **ESLint** - Code linting and quality checks
- **PostCSS** - CSS processing
- **Hot Module Replacement (HMR)** - Fast development experience

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/currency-converter.git
cd currency-converter
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

5. **Preview production build**

```bash
npm run preview
```

## 🚀 Usage

1. **Select currencies**: Choose your source and target currencies from the dropdown menus
2. **Enter amount**: Type the amount you want to convert
3. **View results**: See instant conversion results with exchange rates
4. **Swap currencies**: Click the swap button to reverse conversion direction
5. **Multi-currency view**: Scroll down to see conversion across multiple currencies
6. **Add more currencies**: Click "Add Currency" to compare additional rates
7. **Toggle theme**: Use the theme toggle in the top-right corner

## 📁 Project Structure

```
currency-converter/
├── src/
│   ├── components/
│   │   ├── CurrencyDropdown.jsx      # Searchable currency selector
│   │   ├── CurrencySearch.jsx        # Amount input field
│   │   ├── ConversionResult.jsx      # Displays conversion results
│   │   ├── MultiCurrencyConverter.jsx # Multi-currency comparison
│   │   └── ThemeToggle.jsx           # Dark/Light theme toggle
│   ├── pages/
│   │   └── Home.jsx                  # Main page component
│   ├── utils/
│   │   ├── api.js                    # API utility functions
│   │   └── currencyData.js           # Currency data and helpers
│   ├── App.jsx                       # Root component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
├── public/                           # Static assets
├── index.html                        # HTML template
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.js                 # PostCSS configuration
└── package.json                      # Dependencies
```

## 🎨 Key Components

### CurrencyDropdown

- Searchable dropdown with 30+ currencies
- Flag emojis and currency symbols
- Smooth open/close animations
- Click-outside to close functionality

### CurrencySearch

- Number-only input validation
- Currency symbol prefix
- Animated focus states
- Bidirectional conversion support

### ConversionResult

- Exchange rate display
- Formatted conversion amounts
- Animated card reveal
- Country flags and currency info

### MultiCurrencyConverter

- Dynamic currency addition/removal
- Real-time rate comparison
- Responsive table layout
- Smooth list animations

### ThemeToggle

- Animated Sun/Moon icons
- Smooth toggle transition
- LocalStorage persistence
- Gradient glow effect

## 🌐 Supported Currencies

USD, INR, EUR, GBP, JPY, AUD, CAD, CHF, CNY, SEK, NZD, KRW, SGD, NOK, MXN, HKD, ZAR, BRL, AED, SAR, TRY, RUB, THB, IDR, MYR, PHP, DKK, PLN, ILS, CZK

## 🔧 Configuration

### API Configuration

The app uses the free tier of ExchangeRate-API. To use your own API key:

```javascript
// src/utils/api.js
const API_KEY = "YOUR_API_KEY_HERE";
```

### Tailwind Configuration

Customize colors, themes, and styles in:

```javascript
// tailwind.config.js
// index.css - @theme section
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [ExchangeRate-API](https://www.exchangerate-api.com/) for free exchange rate data
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/currency-converter](https://github.com/yourusername/currency-converter)

---

**Made with ❤️ using React + Vite + Tailwind CSS**
