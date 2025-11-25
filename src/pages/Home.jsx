import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp, DollarSign } from "lucide-react";
import CurrencyDropdown from "../components/CurrencyDropdown";
import CurrencySearch from "../components/CurrencySearch";
import ConversionResult from "../components/ConversionResult";
import ThemeToggle from "../components/ThemeToggle";
import MultiCurrencyConverter from "../components/MultiCurrencyConverter";
import { currencies } from "../utils/currencyData";
import { fetchExchangeRates } from "../utils/api";

const Home = () => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch exchange rate
  useEffect(() => {
    if (fromAmount && fromCurrency && toCurrency) {
      fetchExchangeRate();
    } else {
      setToAmount("");
      setExchangeRate(null);
    }
  }, [fromCurrency, toCurrency, fromAmount]);

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchExchangeRates(fromCurrency.code);
      const rate = data.rates[toCurrency.code];

      if (!rate) {
        throw new Error(`Exchange rate not found for ${toCurrency.code}`);
      }

      setExchangeRate(rate);
      setToAmount((parseFloat(fromAmount) * rate).toFixed(2));
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setError("Failed to fetch exchange rates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
  };

  const handleToAmountChange = (value) => {
    setToAmount(value);
    if (value && exchangeRate) {
      setFromAmount((parseFloat(value) / exchangeRate).toFixed(2));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12"
        >
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <DollarSign className="text-yellow-400" />
              Currency Converter
            </h1>
            <p className="text-gray-400">Real-time exchange rates worldwide</p>
          </div>
        </motion.div>

        {/* Main Converter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-3xl p-6 md:p-8 shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* From Currency */}
            <div className="space-y-4">
              <CurrencyDropdown
                selectedCurrency={fromCurrency}
                onSelect={setFromCurrency}
                currencies={currencies}
                label="From"
              />
              <CurrencySearch
                value={fromAmount}
                onChange={handleFromAmountChange}
                currency={fromCurrency}
                placeholder="Enter amount"
              />
            </div>

            {/* To Currency */}
            <div className="space-y-4">
              <CurrencyDropdown
                selectedCurrency={toCurrency}
                onSelect={setToCurrency}
                currencies={currencies}
                label="To"
              />
              <CurrencySearch
                value={toAmount}
                onChange={handleToAmountChange}
                currency={toCurrency}
                placeholder="Converted amount"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-6">
            <motion.button
              onClick={handleSwapCurrencies}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              aria-label="Swap currencies"
            >
              <ArrowDownUp className="text-white w-6 h-6" />
            </motion.button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Conversion Result */}
          {fromAmount && toAmount && exchangeRate && !loading && !error && (
            <ConversionResult
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              fromAmount={parseFloat(fromAmount)}
              toAmount={parseFloat(toAmount)}
              rate={exchangeRate}
            />
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 mt-2">Fetching latest rates...</p>
            </motion.div>
          )}
        </motion.div>

        {/* Multi-Currency Converter */}
        <div className="max-w-4xl mx-auto">
          <MultiCurrencyConverter
            baseCurrency={fromCurrency}
            baseAmount={fromAmount}
          />
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-gray-400 text-sm"
        >
          <p>Exchange rates updated in real-time</p>
          <p className="mt-2">Powered by ExchangeRate-API</p>
          <p className="mt-4 text-xs">
            Supports 30+ currencies • Live rates • Instant conversion
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
