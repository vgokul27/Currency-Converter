import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

const ConversionResult = ({
  fromCurrency,
  toCurrency,
  fromAmount,
  toAmount,
  rate,
}) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  if (!fromAmount || !toAmount) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-4"
    >
      {/* Conversion Display */}
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{fromCurrency.flag}</span>
            <div>
              <p className="text-gray-400 text-sm">{fromCurrency.code}</p>
              <p className="text-white text-2xl font-bold">
                {fromCurrency.symbol} {formatNumber(fromAmount)}
              </p>
            </div>
          </div>

          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="text-purple-400 w-8 h-8" />
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-gray-400 text-sm">{toCurrency.code}</p>
              <p className="text-white text-2xl font-bold">
                {toCurrency.symbol} {formatNumber(toAmount)}
              </p>
            </div>
            <span className="text-4xl">{toCurrency.flag}</span>
          </div>
        </div>
      </div>

      {/* Exchange Rate Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-400 w-5 h-5" />
            <p className="text-gray-400 text-sm">Exchange Rate</p>
          </div>
          <p className="text-white font-semibold">
            1 {fromCurrency.code} = {formatNumber(rate)} {toCurrency.code}
          </p>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4"
      >
        <div className="flex-1 bg-gray-800/30 border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">From</p>
          <p className="text-white font-medium">{fromCurrency.name}</p>
        </div>
        <div className="flex-1 bg-gray-800/30 border border-gray-700 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-1">To</p>
          <p className="text-white font-medium">{toCurrency.name}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConversionResult;
