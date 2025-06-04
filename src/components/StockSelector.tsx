
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StockSelectorProps {
  selectedStock: string;
  onStockChange: (stock: string) => void;
}

const StockSelector = ({ selectedStock, onStockChange }: StockSelectorProps) => {
  const stocks = [
    { value: 'AAPL', label: 'Apple Inc. (AAPL)' },
    { value: 'GOOGL', label: 'Alphabet Inc. (GOOGL)' },
    { value: 'MSFT', label: 'Microsoft Corp. (MSFT)' },
    { value: 'AMZN', label: 'Amazon.com Inc. (AMZN)' },
    { value: 'TSLA', label: 'Tesla Inc. (TSLA)' },
    { value: 'NVDA', label: 'NVIDIA Corp. (NVDA)' },
    { value: 'SPY', label: 'SPDR S&P 500 ETF (SPY)' },
  ];

  return (
    <div>
      <label className="text-sm font-medium mb-3 block">Select Stock</label>
      <Select value={selectedStock} onValueChange={onStockChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a stock..." />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
          {stocks.map((stock) => (
            <SelectItem key={stock.value} value={stock.value}>
              {stock.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StockSelector;
