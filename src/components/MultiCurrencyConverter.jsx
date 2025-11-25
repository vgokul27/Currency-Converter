import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, TrendingUp, TrendingDown } from "lucide-react";
import { currencies } from "../utils/currencyData";
import { fetchExchangeRates } from "../utils/api";

const MultiCurrencyConverter = ({ baseCurrency, baseAmount }) => {
  const [selectedCurrencies, setSelectedCurrencies] = useState([
    currencies[1], // INR
    currencies[2], // EUR
    currencies[3], // GBP
  ]);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAddCurrency, setShowAddCurrency] = useState(false);

  useEffect(() => {
    if (baseAmount && baseCurrency) {
      fetchRates();
    }
  }, [baseCurrency, baseAmount]);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const data = await fetchExchangeRates(baseCurrency.code);
      setRates(data.rates);
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      setLoading(false);
    }
  };

  const addCurrency = (currency) => {
    if (!selectedCurrencies.find((c) => c.code === currency.code)) {
      setSelectedCurrencies([...selectedCurrencies, currency]);
    }
    setShowAddCurrency(false);
  };

  const removeCurrency = (currencyCode) => {
    setSelectedCurrencies(
      selectedCurrencies.filter((c) => c.code !== currencyCode)
    );
  };

  const getConvertedAmount = (targetCurrency) => {
    if (!baseAmount || !rates[targetCurrency.code]) return "0.00";
    return (parseFloat(baseAmount) * rates[targetCurrency.code]).toFixed(2);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  if (!baseAmount) return null;

  const availableCurrencies = currencies.filter(
    (c) =>
      c.code !== baseCurrency.code &&
      !selectedCurrencies.find((sc) => sc.code === c.code)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <TrendingUp className="text-green-400 w-5 h-5" />
          Multi-Currency Comparison
        </h3>
        <motion.button
          onClick={() => setShowAddCurrency(!showAddCurrency)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Currency
        </motion.button>
      </div>

      {/* Add Currency Dropdown */}
      <AnimatePresence>
        {showAddCurrency && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 bg-gray-800 border border-gray-700 rounded-xl p-4 overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
              {availableCurrencies.map((currency) => (
                <motion.button
                  key={currency.code}
                  onClick={() => addCurrency(currency)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-700 hover:bg-purple-600/30 border border-gray-600 hover:border-purple-500 rounded-lg p-3 text-left transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currency.flag}</span>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {currency.code}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        {currency.name}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Currency Comparison Table */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 px-6 py-4 border-b border-gray-700">
          <div className="grid grid-cols-4 gap-4 text-gray-300 text-sm font-semibold">
            <div>Currency</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Rate</div>
            <div className="text-right">Action</div>
          </div>
        </div>

        {/* Base Currency */}
        <div className="px-6 py-4 bg-purple-500/10 border-b border-gray-700">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{baseCurrency.flag}</span>
              <div>
                <p className="text-white font-semibold">{baseCurrency.code}</p>
                <p className="text-gray-400 text-sm">{baseCurrency.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-lg font-bold">
                {baseCurrency.symbol} {formatNumber(baseAmount)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Base</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">Original</span>
            </div>
          </div>
        </div>

        {/* Converted Currencies */}
        <AnimatePresence>
          {selectedCurrencies.map((currency, index) => {
            const amount = getConvertedAmount(currency);
            const rate = rates[currency.code];

            return (
              <motion.div
                key={currency.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-4 border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{currency.flag}</span>
                    <div>
                      <p className="text-white font-semibold">
                        {currency.code}
                      </p>
                      <p className="text-gray-400 text-sm">{currency.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-lg font-bold">
                      {currency.symbol} {formatNumber(amount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 text-sm">
                      1 {baseCurrency.code} ={" "}
                      {rate ? formatNumber(rate) : "..."} {currency.code}
                    </p>
                  </div>
                  <div className="text-right">
                    <motion.button
                      onClick={() => removeCurrency(currency.code)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <div className="px-6 py-8 text-center">
            <div className="inline-block w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-2 text-sm">Loading rates...</p>
          </div>
        )}

        {/* Empty State */}
        {selectedCurrencies.length === 0 && !loading && (
          <div className="px-6 py-8 text-center text-gray-400">
            <p>
              No currencies selected. Click "Add Currency" to compare rates.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MultiCurrencyConverter;
