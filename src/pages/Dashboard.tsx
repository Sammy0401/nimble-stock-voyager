import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import StockSelector from '@/components/StockSelector';

interface StockData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timeframe: string;
}

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1min');
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [playbackSpeed, setPlaybackSpeed] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayData, setDisplayData] = useState<StockData[]>([]);

  const timeframes = ['1min', '2min', '5min', '15min'];

  // Load stock data from uploaded files
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Generate sample data based on selected stock and timeframe
        const loadedData = generateSampleData(selectedTimeframe, selectedStock);
        
        setStockData(loadedData);
        setDisplayData(loadedData.slice(0, 50)); // Start with first 50 data points
        setCurrentIndex(50);
      } catch (error) {
        console.error('Error loading data:', error);
        // Generate sample data as fallback
        const sampleData = generateSampleData(selectedTimeframe, selectedStock);
        setStockData(sampleData);
        setDisplayData(sampleData.slice(0, 50));
        setCurrentIndex(50);
      }
      setLoading(false);
    };

    loadData();
  }, [selectedTimeframe, selectedStock]);

  // Generate sample stock data for demonstration
  const generateSampleData = (timeframe: string, stock: string): StockData[] => {
    const data: StockData[] = [];
    
    // Different base prices for different stocks
    const basePrices: { [key: string]: number } = {
      'AAPL': 180,
      'GOOGL': 140,
      'MSFT': 350,
      'AMZN': 150,
      'TSLA': 250,
      'NVDA': 450,
      'SPY': 420
    };
    
    const basePrice = basePrices[stock] || 100;
    let currentPrice = basePrice;
    
    const intervals = {
      '1min': 1000,
      '2min': 500,
      '5min': 200,
      '15min': 96
    };

    const dataPoints = intervals[timeframe as keyof typeof intervals] || 1000;

    for (let i = 0; i < dataPoints; i++) {
      const timestamp = new Date(Date.now() - (dataPoints - i) * 60000).toISOString();
      const volatility = Math.random() * 2 - 1; // -1 to 1
      const open = currentPrice;
      const change = volatility * (basePrice * 0.01); // 1% volatility relative to base price
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.003);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.003);
      const volume = Math.floor(Math.random() * 10000) + 1000;

      data.push({
        timestamp,
        open,
        high,
        low,
        close,
        volume,
        timeframe
      });

      currentPrice = close;
    }

    return data;
  };

  // Playback simulation
  useEffect(() => {
    if (!isPlaying || currentIndex >= stockData.length) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const newIndex = Math.min(prev + 1, stockData.length);
        setDisplayData(stockData.slice(0, newIndex));
        return newIndex;
      });
    }, 1000 / playbackSpeed[0]);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, stockData, currentIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(50);
    setDisplayData(stockData.slice(0, 50));
  };

  const chartConfig = {
    close: {
      label: "Close Price",
      color: "hsl(var(--chart-1))",
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Stock Data...</h2>
          <p className="text-gray-600">Processing {selectedStock} {selectedTimeframe} timeframe data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Trading Strategy Dashboard</h1>
          <p className="text-gray-600">Interactive backtesting environment for multiple timeframes</p>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Playback Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Stock Selection */}
            <StockSelector 
              selectedStock={selectedStock} 
              onStockChange={setSelectedStock} 
            />

            {/* Timeframe Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">Time Frequency</label>
              <RadioGroup 
                value={selectedTimeframe} 
                onValueChange={setSelectedTimeframe}
                className="flex flex-row space-x-4"
              >
                {timeframes.map((tf) => (
                  <div key={tf} className="flex items-center space-x-2">
                    <RadioGroupItem value={tf} id={tf} />
                    <label htmlFor={tf} className="text-sm font-medium cursor-pointer">
                      {tf}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Playback Speed */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Playback Speed: {playbackSpeed[0]}x
              </label>
              <Slider
                value={playbackSpeed}
                onValueChange={setPlaybackSpeed}
                max={10}
                min={0.1}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center space-x-4">
              <Button onClick={handlePlayPause} className="flex items-center space-x-2">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </Button>
              <Badge variant="secondary">
                {currentIndex} / {stockData.length} data points
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{selectedStock} Price Chart - {selectedTimeframe}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={displayData}>
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="close" 
                    stroke="var(--color-close)" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Current Price</div>
              <div className="text-2xl font-bold">
                ${displayData[displayData.length - 1]?.close.toFixed(2) || '0.00'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Volume</div>
              <div className="text-2xl font-bold">
                {displayData[displayData.length - 1]?.volume.toLocaleString() || '0'}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">High</div>
              <div className="text-2xl font-bold text-green-600">
                ${Math.max(...displayData.map(d => d.high)).toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Low</div>
              <div className="text-2xl font-bold text-red-600">
                ${Math.min(...displayData.map(d => d.low)).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
