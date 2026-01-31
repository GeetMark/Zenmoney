# ZenMoney - Personal Finance Tracker

ZenMoney is a modern, mobile-first, and offline-ready personal finance application designed to help users track spending, manage budgets, and receive intelligent financial advice.

**You can view the source code at: https://appsgm.com/code/zenmoney**

## 🚀 Features

- **Offline-First Architecture**: Your data stays on your device using LocalStorage. No account required.
- **Smart Insights**: Powered by **Appsgm AI**, the app analyzes your spending patterns to provide actionable financial tips.
- **Visual Analytics**: Interactive bar and pie charts to visualize your weekly spending and category breakdown.
- **Modern UI**: A clean, responsive interface built with Tailwind CSS and Lucide icons.
- **Transaction History**: Easily add, view, and delete transactions with automatic daily grouping.

## 🛠️ Tech Stack

- **React 19** (via ESM)
- **Tailwind CSS** (Styling)
- **Recharts** (Data Visualization)
- **Appsgm AI (Google GenAI)** (Financial Analysis)
- **Lucide React** (Iconography)

## 📥 Installation

Since ZenMoney uses modern ES modules and import maps, no complex build step is required for basic local development.

1. **Clone the Repository**:
   ```bash
   git clone <your-repo-url>
   cd zen-money
   ```

2. **Set up API Key**:
   The application requires a Google GenAI API Key for the AI Insights feature. Ensure `process.env.API_KEY` is available in your environment.

3. **Run the App**:
   You must serve the files through a web server (browsers block ES modules via `file://` protocol).
   ```bash
   # Using Node.js serve
   npx serve .

   # Or using Python
   python -m http.server 8000
   ```

4. **Access the App**:
   Open your browser and navigate to `http://localhost:3000` (or the port provided by your server).

## 💡 Usage

- **Dashboard**: View your total balance, income vs. expenses, and weekly trends.
- **Wallet**: Check your full transaction history and manage individual entries.
- **AI Tips**: Click the "AI Tips" tab to let **Appsgm AI** analyze your data and give you saving suggestions.
- **Add Transaction**: Use the floating "+" button to log new income or expenses.

---
*Note: This project is open-source and follows clean architecture principles for easy extensibility.*