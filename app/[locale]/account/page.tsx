"use client";

import BillingPortalButton from "@/components/BillingPortalButton";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function AccountPage() {
  const t = useTranslations('cta');
  // TODO: Get user data from authentication system
  const user = {
    name: "John Doe",
    email: "john@example.com",
    isPro: false, // Change to true if user has active subscription
    customerId: "cus_example123", // Stripe customer ID
    subscription: {
      status: "active", // active, cancelled, past_due, etc.
      currentPeriodEnd: "2024-02-15",
      planName: "Pro Monthly",
      amount: "$29",
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your subscription and account preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="mt-1 text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Subscription Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Subscription
              </h2>
              
              {user.isPro ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {user.subscription.planName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {user.subscription.amount} per month
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.subscription.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.subscription.status.charAt(0).toUpperCase() + user.subscription.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Next billing date: {user.subscription.currentPeriodEnd}
                  </div>

                  <div className="pt-4">
                    <BillingPortalButton 
                      customerId={user.customerId}
                      className="w-full sm:w-auto"
                    >
                      Manage Subscription
                    </BillingPortalButton>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Free Plan</h3>
                      <p className="text-sm text-gray-600">
                        Basic features included
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      Free
                    </span>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      href="/upgrade"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      {t('upgrade')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Features Access */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Feature Access
              </h2>
              
              <div className="space-y-3">
                {[
                  { name: "Basic Orders", available: true },
                  { name: "Customer Management", available: true },
                  { name: "Unlimited Orders", available: user.isPro },
                  { name: "Advanced Analytics", available: user.isPro },
                  { name: "Priority Support", available: user.isPro },
                  { name: "API Access", available: user.isPro },
                  { name: "Custom Branding", available: user.isPro },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-900">{feature.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      feature.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {feature.available ? 'Available' : 'Pro Only'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block w-full text-left px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Go to Dashboard
                </Link>
                
                <Link
                  href="/orders"
                  className="block w-full text-left px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  View Orders
                </Link>
                
                {/* Temporarily disabled upgrade pro feature */}
                {false && !user.isPro && (
                  <Link
                    href="/upgrade"
                    className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    Upgrade to Pro
                  </Link>
                )}
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:support@yourbakery.com"
                  className="block text-blue-600 hover:text-blue-700"
                >
                  Email Support
                </a>
                <a
                  href="/docs"
                  className="block text-blue-600 hover:text-blue-700"
                >
                  Documentation
                </a>
                <a
                  href="/faq"
                  className="block text-blue-600 hover:text-blue-700"
                >
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
