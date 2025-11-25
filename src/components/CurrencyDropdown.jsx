import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const CurrencyDropdown = ({
  selectedCurrency,
  onSelect,
  currencies,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <label className="text-sm font-medium text-gray-400 mb-2 block">
        {label}
      </label>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-4 flex items-center justify-between hover:border-purple-500 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">{selectedCurrency.flag}</span>
          <div className="text-left">
            <p className="text-white font-semibold">{selectedCurrency.code}</p>
            <p className="text-gray-400 text-sm">{selectedCurrency.name}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-purple-400 group-hover:text-purple-300" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-20 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-3 border-b border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search currency..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {filteredCurrencies.map((currency) => (
                  <motion.button
                    key={currency.code}
                    whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                    onClick={() => {
                      onSelect(currency);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-purple-900/20 transition-colors duration-200"
                  >
                    <span className="text-2xl">{currency.flag}</span>
                    <div className="text-left flex-1">
                      <p className="text-white font-medium">
                        {currency.code} - {currency.symbol}
                      </p>
                      <p className="text-gray-400 text-sm">{currency.name}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencyDropdown;
