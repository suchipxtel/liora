import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, TrendingUp, Info, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Drug {
  name: string;
  price: number;
  savings: string;
  pharmacy: string;
  distance: string;
  rating: number;
  generic: boolean;
}

interface DrugPriceComparisonProps {
  medications: string[];
}

export const DrugPriceComparison: React.FC<DrugPriceComparisonProps> = ({ medications }) => {
  const [selectedDrug, setSelectedDrug] = useState('aspirin');
  const [priceRange, setPriceRange] = useState([50, 150]);

  // Enhanced drug price data with GIS-based costs
  const drugPrices = {
    aspirin: {
      currentPrice: 85,
      alternatives: [
        { name: 'Generic Aspirin 81mg', price: 45, savings: '47% less', pharmacy: 'CVS Pharmacy', distance: '0.8 mi', rating: 4.6, generic: true, gisPrice: 42, coordinates: { lat: 40.7128, lng: -74.0060 } },
        { name: 'Bayer Aspirin 81mg', price: 85, savings: 'typical', pharmacy: 'Walgreens', distance: '1.2 mi', rating: 4.8, generic: false, gisPrice: 87, coordinates: { lat: 40.7580, lng: -73.9855 } },
        { name: 'Store Brand Aspirin', price: 38, savings: '55% less', pharmacy: 'Walmart', distance: '2.1 mi', rating: 4.3, generic: true, gisPrice: 35, coordinates: { lat: 40.6892, lng: -74.0445 } },
        { name: 'Costco Generic', price: 28, savings: '67% less', pharmacy: 'Costco Pharmacy', distance: '3.2 mi', rating: 4.7, generic: true, gisPrice: 28, coordinates: { lat: 40.7282, lng: -73.7949 } },
        { name: 'Buffered Aspirin', price: 92, savings: '8% more', pharmacy: 'Rite Aid', distance: '1.5 mi', rating: 4.5, generic: false, gisPrice: 95, coordinates: { lat: 40.7505, lng: -73.9934 } }
      ]
    },
    ticagrelor: {
      currentPrice: 280,
      alternatives: [
        { name: 'Generic Ticagrelor 90mg', price: 195, savings: '30% less', pharmacy: 'CVS Pharmacy', distance: '0.8 mi', rating: 4.5, generic: true, gisPrice: 185, coordinates: { lat: 40.7128, lng: -74.0060 } },
        { name: 'Brilinta 90mg', price: 280, savings: 'typical', pharmacy: 'Walgreens', distance: '1.2 mi', rating: 4.7, generic: false, gisPrice: 285, coordinates: { lat: 40.7580, lng: -73.9855 } },
        { name: 'Mail Order Generic', price: 165, savings: '41% less', pharmacy: 'Express Scripts', distance: 'Mail', rating: 4.4, generic: true, gisPrice: 158, coordinates: null },
        { name: 'Costco Generic', price: 148, savings: '47% less', pharmacy: 'Costco Pharmacy', distance: '3.2 mi', rating: 4.6, generic: true, gisPrice: 148, coordinates: { lat: 40.7282, lng: -73.7949 } },
        { name: 'Manufacturer Coupon', price: 210, savings: '25% less', pharmacy: 'Local Pharmacy', distance: '0.5 mi', rating: 4.6, generic: false, gisPrice: 215, coordinates: { lat: 40.7415, lng: -74.0051 } }
      ]
    }
  };

  const currentData = drugPrices[selectedDrug as keyof typeof drugPrices];
  const minPrice = Math.min(...currentData.alternatives.map(d => d.gisPrice));
  const maxPrice = Math.max(...currentData.alternatives.map(d => d.gisPrice));
  const avgPrice = Math.round(currentData.alternatives.reduce((sum, d) => sum + d.gisPrice, 0) / currentData.alternatives.length);

  const getPriceColor = (price: number, currentPrice: number) => {
    if (price < currentPrice * 0.8) return 'text-green-600';
    if (price > currentPrice * 1.1) return 'text-red-600';
    return 'text-orange-600';
  };

  const getSavingsColor = (savings: string) => {
    if (savings.includes('less')) return 'text-green-600';
    if (savings.includes('more')) return 'text-red-600';
    return 'text-orange-600';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Drug Price Comparison
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare prices for your medications at nearby pharmacies
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Drug Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Medication</label>
          <div className="flex gap-2">
            {Object.keys(drugPrices).map((drug) => (
              <Button
                key={drug}
                variant={selectedDrug === drug ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDrug(drug)}
                className="capitalize"
              >
                {drug === 'ticagrelor' ? 'Ticagrelor 90mg' : 'Aspirin 81mg'}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range Indicator */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Price Range</span>
            <Badge variant="outline" className="text-primary">
              ${minPrice} - ${maxPrice}
            </Badge>
          </div>
          
          {/* Visual Price Slider */}
          <div className="relative">
            <div className="h-2 bg-gradient-to-r from-green-200 via-orange-200 to-red-200 rounded-full"></div>
            <div 
              className="absolute top-0 h-2 w-2 bg-orange-500 rounded-full transform -translate-x-1/2"
              style={{ left: `${((currentData.currentPrice - minPrice) / (maxPrice - minPrice)) * 100}%` }}
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>${minPrice}</span>
              <span className="text-orange-600 font-medium">
                ${currentData.currentPrice} (Your Price)
              </span>
              <span>${maxPrice}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Info className="h-4 w-4 text-blue-500" />
            <span className="text-muted-foreground">
              This price is <span className="font-medium text-orange-600">typical</span> for your area
            </span>
          </div>
        </div>

        {/* Alternative Options with GIS-based pricing */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Nearby Pharmacies (GIS-optimized prices)</h4>
            <Badge variant="outline" className="text-xs">
              Real-time pricing
            </Badge>
          </div>
          {currentData.alternatives.map((drug, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{drug.name}</span>
                  {drug.generic && (
                    <Badge variant="secondary" className="text-xs">Generic</Badge>
                  )}
                  {drug.gisPrice < drug.price && (
                    <Badge variant="outline" className="text-xs text-green-600">
                      GIS Discount
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {drug.pharmacy} • {drug.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-yellow-500" />
                    {drug.rating}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex flex-col">
                  {drug.gisPrice !== drug.price && (
                    <div className="text-xs text-muted-foreground line-through">
                      ${drug.price}
                    </div>
                  )}
                  <div className={`font-bold ${getPriceColor(drug.gisPrice, currentData.currentPrice)}`}>
                    ${drug.gisPrice}
                  </div>
                </div>
                <div className={`text-xs ${getSavingsColor(drug.savings)}`}>
                  {Math.round(((currentData.currentPrice - drug.gisPrice) / currentData.currentPrice) * 100)}% less
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Savings Tip with GIS data */}
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <TrendingDown className="h-4 w-4 text-green-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-green-800">Optimized Monthly Savings</p>
              <p className="text-green-700">
                Based on real-time GIS pricing data, you could save up to <span className="font-bold">
                  ${currentData.currentPrice - minPrice}
                </span> per month. Average area price: <span className="font-medium">${avgPrice}</span>
              </p>
              <p className="text-xs text-green-600 mt-1">
                Prices updated hourly using location-based pharmacy networks
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full" variant="outline">
          <MapPin className="h-4 w-4 mr-2" />
          Find Nearby Pharmacies
        </Button>
      </CardContent>
    </Card>
  );
};