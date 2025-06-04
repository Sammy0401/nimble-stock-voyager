
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Timer, Database } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Stock Trading Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Interactive backtesting platform with multi-timeframe analysis and real-time data simulation
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8 py-3">
              Launch Dashboard
              <TrendingUp className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Timer className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Multi-Timeframe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Analyze data across 1min, 2min, 5min, and 15min intervals
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Interactive Charts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Real-time price visualization with customizable playback speed
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Strategy Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Backtest your trading strategies with historical data
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Load and analyze your uploaded stock datasets
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Preview */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Dashboard Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">📊 Data Visualization</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Real-time price charts</li>
                  <li>• Volume analysis</li>
                  <li>• OHLC data display</li>
                  <li>• Interactive tooltips</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚡ Playback Controls</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Variable speed playback (0.1x - 10x)</li>
                  <li>• Play, pause, and reset controls</li>
                  <li>• Progress tracking</li>
                  <li>• Timeframe switching</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
