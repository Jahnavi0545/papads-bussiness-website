"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Settings, CreditCard, Edit3 } from "lucide-react"
import PaymentMethods from "./payment-methods"
import { useCart } from "./cart-context"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<"review" | "payment" | "success">("review")
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [showPaymentManagement, setShowPaymentManagement] = useState(false)

  const totalAmount = getTotalPrice()
  const deliveryCharge = totalAmount > 500 ? 0 : 50
  const finalAmount = totalAmount + deliveryCharge

  const handlePaymentComplete = (method: string, details: any) => {
    setPaymentDetails({ method, details })
    setCurrentStep("success")
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart()
    }, 2000)
  }

  const resetCheckout = () => {
    setCurrentStep("review")
    setPaymentDetails(null)
    setShowPaymentManagement(false)
    onClose()
  }

  const handleManagePaymentMethods = () => {
    setShowPaymentManagement(true)
    setCurrentStep("payment")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-emerald-600" />
            <span>
              {currentStep === "review" && "Review Order"}
              {currentStep === "payment" && (showPaymentManagement ? "Manage Payment Methods" : "Payment")}
              {currentStep === "success" && "Order Confirmed"}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {currentStep === "review" && (
            <div className="space-y-6 p-6">
              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Order Summary</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-emerald-600 font-bold">{item.price}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.features.slice(0, 2).map((feature, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      <div className="font-semibold">
                        ₹{(Number.parseFloat(item.price.replace("₹", "")) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                {deliveryCharge === 0 && (
                  <div className="text-sm text-green-600">🎉 Free delivery on orders above ₹500</div>
                )}
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-emerald-600">₹{finalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={() => setCurrentStep("payment")}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              >
                Proceed to Payment
              </Button>
            </div>
          )}

          {currentStep === "payment" && (
            <PaymentMethods
              totalAmount={finalAmount}
              onPaymentComplete={handlePaymentComplete}
              allowMethodChange={true}
              showSavedMethods={!showPaymentManagement}
            />
          )}

          {currentStep === "success" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">Payment Successful!</h3>
                <p className="text-gray-600">Your order has been confirmed and will be processed shortly.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 w-full max-w-md">
                <h4 className="font-semibold mb-3">Order Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-mono">#AVM{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="capitalize">{paymentDetails?.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount Paid:</span>
                    <span className="font-semibold text-emerald-600">₹{finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-blue-600">
                <Truck className="w-5 h-5" />
                <span className="text-sm">Expected delivery: 3-5 business days</span>
              </div>

              {/* Payment Management Options */}
              <div className="w-full max-w-md space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-800 text-sm">Manage Payment Methods</h4>
                      <p className="text-xs text-blue-700">
                        Add, edit, or set default payment methods for faster checkout
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleManagePaymentMethods}
                    className="w-full mt-3 text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Payment Methods
                  </Button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Edit3 className="w-5 h-5 text-emerald-600" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-emerald-800 text-sm">Quick Reorder</h4>
                      <p className="text-xs text-emerald-700">Your payment method is saved for easy future orders</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 w-full max-w-md">
                <Button
                  variant="outline"
                  onClick={handleManagePaymentMethods}
                  className="flex-1 text-emerald-600 border-emerald-300 hover:bg-emerald-50 bg-transparent"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Payment Settings
                </Button>
                <Button
                  onClick={resetCheckout}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
