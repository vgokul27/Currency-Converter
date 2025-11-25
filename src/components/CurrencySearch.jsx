import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const CurrencySearch = ({ value, onChange, currency, placeholder }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Allow only numbers and decimal point
    if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <label className="text-sm font-medium text-gray-400 mb-2 block">
        Amount
      </label>

      <div className="relative group">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <span className="text-2xl">{currency.symbol}</span>
        </div>

        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder || "0.00"}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-16 pr-4 py-4 text-white text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-500"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: value ? 1 : 0 }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
        >
          <TrendingUp className="text-green-400 w-5 h-5" />
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mt-1 origin-left rounded-full"
      />
    </motion.div>
  );
};

export default CurrencySearch;
