import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function OrderPage() {
  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Order Online
        </h1>
        
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-card">
          <h2 className="text-xl font-semibold mb-4">Place Your Order</h2>
          <p className="text-neutral-600 mb-6">
            Welcome to our online ordering system. Please select your items and provide your details below.
          </p>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="items" className="block text-sm font-medium text-neutral-700 mb-2">
                Items to Order
              </label>
              <textarea
                id="items"
                name="items"
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Please describe what you'd like to order..."
                required
              />
            </div>
            
            <div>
              <label htmlFor="pickup-time" className="block text-sm font-medium text-neutral-700 mb-2">
                Pickup Time
              </label>
              <select
                id="pickup-time"
                name="pickup-time"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              >
                <option value="">Select pickup time</option>
                <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
              </select>
            </div>
            
            <div className="flex justify-center">
              <LiquidMetalButton
                type="submit"
                size="lg"
              >
                Submit Order
              </LiquidMetalButton>
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <h3 className="font-medium text-neutral-700 mb-2">Order Information</h3>
            <ul className="text-sm text-neutral-600 space-y-1">
              <li>• Orders must be placed by 9:00 PM for next day pickup</li>
              <li>• Fresh breads available daily starting 6:30 AM</li>
              <li>• We'll call you to confirm your order and total cost</li>
              <li>• Payment can be made at pickup (cash or card accepted)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
