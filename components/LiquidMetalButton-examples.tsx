/**
 * Example usage of Transparent LiquidMetalButton in your components
 * 
 * Features:
 * - Transparent glass-like effect with backdrop blur
 * - Subtle liquid metal shader animation
 * - White text with semi-transparency
 * - Glassmorphism design aesthetic
 * - Responsive hover and click interactions
 * - Support for custom icons
 */

import { LiquidMetalButton } from './LiquidMetalButton';
import { MessageCircle, Heart, ShoppingCart, Star } from 'lucide-react';

export function ExampleUsage() {
  return (
    <div className="space-y-6 p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
      <h2 className="text-white text-2xl font-bold mb-6">Transparent Liquid Metal Button Examples</h2>
      
      <div className="space-y-4">
        {/* Text mode with transparent glass effect */}
        <div className="flex items-center space-x-4">
          <LiquidMetalButton
            label="Get Started"
            onClick={() => console.log('Get Started clicked!')}
            viewMode="text"
          />
          <span className="text-white text-sm">Default transparent liquid metal button</span>
        </div>

        {/* Icon mode with default sparkles */}
        <div className="flex items-center space-x-4">
          <LiquidMetalButton
            onClick={() => console.log('Sparkles icon clicked!')}
            viewMode="icon"
          />
          <span className="text-white text-sm">Icon mode with default sparkles</span>
        </div>

        {/* Custom icon - Chat with Star */}
        <div className="flex items-center space-x-4">
          <LiquidMetalButton
            onClick={() => console.log('Chat opened!')}
            viewMode="icon"
            customIcon={<Star size={16} />}
          />
          <span className="text-white text-sm">Custom star icon (like your chat widget)</span>
        </div>

        {/* Custom icon - Heart */}
        <div className="flex items-center space-x-4">
          <LiquidMetalButton
            onClick={() => console.log('Favorited!')}
            viewMode="icon"
            customIcon={<Heart size={16} />}
          />
          <span className="text-white text-sm">Custom heart icon for favorites</span>
        </div>

        {/* Custom icon - Shopping Cart */}
        <div className="flex items-center space-x-4">
          <LiquidMetalButton
            onClick={() => window.location.href = '/en/order'}
            viewMode="icon"
            customIcon={<ShoppingCart size={16} />}
          />
          <span className="text-white text-sm">Custom cart icon for shopping</span>
        </div>

        {/* Menu navigation */}
        <div className="flex items-center space-x-4">
          <LiquidMetalButton
            label="View Menu"
            onClick={() => window.location.href = '/en/menu'}
            viewMode="text"
          />
          <span className="text-white text-sm">Navigate to menu</span>
        </div>

        {/* Order button */}
        <div className="flex items-center space-x-4">
          <LiquidMetalButton
            label="Order Now"
            onClick={() => window.location.href = '/en/order'}
            viewMode="text"
          />
          <span className="text-white text-sm">Navigate to ordering</span>
        </div>
      </div>

      <div className="mt-8 p-4 bg-black/20 rounded-lg backdrop-blur-sm border border-white/10">
        <h3 className="text-white text-lg font-semibold mb-2">Design Features:</h3>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• Glassmorphism aesthetic with backdrop blur</li>
          <li>• Semi-transparent backgrounds and borders</li>
          <li>• White text with high contrast readability</li>
          <li>• Subtle liquid metal shader animation</li>
          <li>• Smooth hover and press interactions</li>
          <li>• Custom icon support for icon mode</li>
          <li>• Works great on colorful or dark backgrounds</li>
          <li>• Perfect for floating action buttons (FABs)</li>
        </ul>
      </div>
    </div>
  );
}