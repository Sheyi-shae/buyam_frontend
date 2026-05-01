'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  Filter,
  Download,
  MoreVertical,
} from 'lucide-react';
import PageTitle from '@/components/_admin_components/page-title';

const products = [
  {
    id: 1,
    name: 'Wireless Earbuds Pro',
    vendor: 'TechHub Store',
    category: 'Electronics',
    price: '$89.99',
    stock: 245,
    sales: 1240,
    rating: 4.5,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Designer Handbag',
    vendor: 'Fashion Central',
    category: 'Fashion',
    price: '$159.99',
    stock: 89,
    sales: 856,
    rating: 4.8,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Smart Watch Series 5',
    vendor: 'TechHub Store',
    category: 'Electronics',
    price: '$299.99',
    stock: 12,
    sales: 642,
    rating: 4.7,
    status: 'Low Stock',
  },
  {
    id: 4,
    name: 'Running Shoes Elite',
    vendor: 'SportsPro',
    category: 'Sports',
    price: '$129.99',
    stock: 156,
    sales: 521,
    rating: 4.6,
    status: 'Active',
  },
  {
    id: 5,
    name: 'Organic Skincare Set',
    vendor: 'Beauty Bliss',
    category: 'Beauty',
    price: '$49.99',
    stock: 0,
    sales: 432,
    rating: 4.9,
    status: 'Out of Stock',
  },
  {
    id: 6,
    name: 'Coffee Maker Deluxe',
    vendor: 'Home Essentials',
    category: 'Home',
    price: '$79.99',
    stock: 78,
    sales: 298,
    rating: 4.7,
    status: 'Active',
  },
];

const statusColors = {
  Active: 'bg-emerald-100 text-emerald-700',
  'Low Stock': 'bg-amber-100 text-amber-700',
  'Out of Stock': 'bg-red-100 text-red-700',
  Inactive: 'bg-gray-100 text-gray-700',
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  return (
    <div className="space-y-8">
          <PageTitle
              heading='Products'
              description='Manage all marketplace products.'
              buttonTitle='Add Product'
          />

      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Vendor</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Sales</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product.id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter((id) => id !== product.id));
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{product.vendor}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900">{product.price}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : product.stock < 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{product.sales}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        <span className="font-medium text-gray-900">{product.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[product.status as keyof typeof statusColors]}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">1</span> to <span className="font-semibold">6</span> of{' '}
              <span className="font-semibold">12,482</span> products
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 rounded-lg bg-emerald-500 text-white">1</button>
                <button className="px-3 py-1 rounded-lg hover:bg-gray-100">2</button>
                <button className="px-3 py-1 rounded-lg hover:bg-gray-100">3</button>
              </div>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
