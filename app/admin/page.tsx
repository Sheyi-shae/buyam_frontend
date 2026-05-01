'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ReactHTMLElement } from 'react';

const revenueData = [
  { month: 'Jan', revenue: 12000, orders: 240 },
  { month: 'Feb', revenue: 19000, orders: 321 },
  { month: 'Mar', revenue: 15000, orders: 288 },
  { month: 'Apr', revenue: 22000, orders: 412 },
  { month: 'May', revenue: 25000, orders: 480 },
  { month: 'Jun', revenue: 28000, orders: 520 },
];

const topProducts = [
  { id: 1, name: 'Wireless Earbuds Pro', sales: 1240, revenue: '$49,600', trend: '+12%' },
  { id: 2, name: 'Designer Handbag', sales: 856, revenue: '$136,960', trend: '+8%' },
  { id: 3, name: 'Smart Watch Series 5', sales: 642, revenue: '$192,600', trend: '+15%' },
  { id: 4, name: 'Running Shoes Elite', sales: 521, revenue: '$67,729', trend: '+5%' },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', vendor: 'TechHub Store', total: '$299.99', status: 'Delivered', date: 'Today' },
  { id: 'ORD-002', customer: 'Jane Smith', vendor: 'Fashion Central', total: '$159.99', status: 'Processing', date: 'Today' },
  { id: 'ORD-003', customer: 'Mike Johnson', vendor: 'Beauty Bliss', total: '$49.99', status: 'Shipped', date: 'Yesterday' },
  { id: 'ORD-004', customer: 'Sarah Williams', vendor: 'Home Essentials', total: '$89.99', status: 'Pending', date: 'Yesterday' },
];

const statusColors = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-amber-100 text-amber-700',
  Pending: 'bg-gray-100 text-gray-700',
};

const StatCard = ({
  icon: Icon,
  title,
  value,
  change,
  trend,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}) => (
  <Card className="border-gray-200 hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className={`text-sm mt-2 flex items-center gap-1 ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {change}
          </p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-emerald-600" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here is your platform overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value="$149,200"
          change="+23% from last month"
          trend="up"
        />
        <StatCard
          icon={ShoppingCart}
          title="Total Orders"
          value="2,861"
          change="+18% from last month"
          trend="up"
        />
        <StatCard
          icon={Package}
          title="Total Products"
          value="12,482"
          change="+42% from last month"
          trend="up"
        />
        <StatCard
          icon={Users}
          title="Active Users"
          value="48,329"
          change="+12% from last month"
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader>
            <CardTitle>Revenue & Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($)" />
                  <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={2} name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Conversion Rate</span>
                <span className="text-lg font-bold text-emerald-600">3.24%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Avg. Order Value</span>
                <span className="text-lg font-bold text-amber-600">$52.14</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                <span className="text-lg font-bold text-blue-600">4.8/5</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Return Rate</span>
                <span className="text-lg font-bold text-red-600">2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Top Products</CardTitle>
            <Button variant="outline" size="sm">
              View All
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{product.revenue}</p>
                    <p className="text-sm text-emerald-600 font-medium">{product.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm">
              View All
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                      {order.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Pending Reviews</h3>
              <p className="text-sm text-gray-600 mt-1">
                You have 24 pending vendor reviews and 12 flagged products that need moderation.
              </p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              Review Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
