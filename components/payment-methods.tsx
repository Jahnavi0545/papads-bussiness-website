"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  CreditCard,
  Building2,
  Smartphone,
  Truck,
  Shield,
  Lock,
  CheckCircle,
  Eye,
  EyeOff,
  Edit3,
  Star,
  Trash2,
} from "lucide-react"

interface PaymentMethodsProps {
  totalAmount: number
  onPaymentComplete: (method: string, details: any) => void
  allowMethodChange?: boolean
  showSavedMethods?: boolean
}

interface SavedPaymentMethod {
  id: string
  type: string
  name: string
  details: string
  isDefault: boolean
  lastUsed: string
}

export default function PaymentMethods({
  totalAmount,
  onPaymentComplete,
  allowMethodChange = true,
  showSavedMethods = true,
}: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState("")
  const [selectedSavedMethod, setSelectedSavedMethod] = useState("")
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [showCVV, setShowCVV] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [savePaymentMethod, setSavePaymentMethod] = useState(false)
  const [isEditingMethod, setIsEditingMethod] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  // Mock saved payment methods
  const [savedMethods, setSavedMethods] = useState<SavedPaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "HDFC Credit Card",
      details: "**** **** **** 1234",
      isDefault: true,
      lastUsed: "2024-01-10",
    },
    {
      id: "2",
      type: "wallet",
      name: "Paytm Wallet",
      details: "Balance: ₹2,450",
      isDefault: false,
      lastUsed: "2024-01-08",
    },
  ])

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, RuPay",
      popular: true,
      secure: true,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building2,
      description: "All major banks supported",
      popular: false,
      secure: true,
    },
    {
      id: "wallet",
      name: "Digital Wallets",
      icon: Smartphone,
      description: "Paytm, PhonePe, Google Pay",
      popular: true,
      secure: true,
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: Truck,
      description: "Pay when you receive",
      popular: false,
      secure: false,
    },
  ]

  const walletOptions = [
    { id: "paytm", name: "Paytm", logo: "🎯" },
    { id: "phonepe", name: "PhonePe", logo: "📱" },
    { id: "googlepay", name: "Google Pay", logo: "🔍" },
    { id: "amazonpay", name: "Amazon Pay", logo: "📦" },
  ]

  const bankOptions = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Other",
  ]

  // Set default payment method on load
  useEffect(() => {
    const defaultMethod = savedMethods.find((method) => method.isDefault)
    if (defaultMethod && showSavedMethods) {
      setSelectedSavedMethod(defaultMethod.id)
      setSelectedMethod(defaultMethod.type)
    }
  }, [savedMethods, showSavedMethods])

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const paymentDetails = {
      method: selectedMethod,
      savedMethodId: selectedSavedMethod,
      amount: totalAmount,
      timestamp: new Date().toISOString(),
      saveForFuture: savePaymentMethod,
      ...(selectedMethod === "card" && { cardDetails: { ...cardDetails, cvv: "***" } }),
    }

    // Save new payment method if requested
    if (savePaymentMethod && selectedMethod === "card" && cardDetails.number) {
      const newSavedMethod: SavedPaymentMethod = {
        id: Date.now().toString(),
        type: "card",
        name: `${cardDetails.name.split(" ")[0]} Card`,
        details: `**** **** **** ${cardDetails.number.slice(-4)}`,
        isDefault: savedMethods.length === 0,
        lastUsed: new Date().toISOString().split("T")[0],
      }
      setSavedMethods((prev) => [...prev, newSavedMethod])
    }

    onPaymentComplete(selectedMethod, paymentDetails)
    setIsProcessing(false)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const handleMethodChange = () => {
    setIsEditingMethod(true)
    setSelectedSavedMethod("")
    setSelectedMethod("")
  }

  const deleteSavedMethod = (methodId: string) => {
    setSavedMethods((prev) => prev.filter((method) => method.id !== methodId))
    if (selectedSavedMethod === methodId) {
      setSelectedSavedMethod("")
      setSelectedMethod("")
    }
  }

  const setAsDefault = (methodId: string) => {
    setSavedMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      })),
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Choose Payment Method</h2>
        <p className="text-gray-600">Secure and convenient payment options for your order</p>
        <div className="flex items-center justify-center space-x-2 text-emerald-600">
          <Shield className="w-5 h-5" />
          <span className="text-sm font-medium">256-bit SSL Encrypted</span>
        </div>
      </div>

      {/* Order Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-gray-800">Order Total</h3>
              <p className="text-sm text-gray-600">Including all taxes and charges</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">₹{totalAmount.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Final Amount</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saved Payment Methods */}
      {showSavedMethods && savedMethods.length > 0 && !isEditingMethod && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-emerald-600" />
                <span>Saved Payment Methods</span>
              </CardTitle>
              {allowMethodChange && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMethodChange}
                  className="text-emerald-600 border-emerald-300 hover:bg-emerald-50 bg-transparent"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Change Method
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedSavedMethod}
              onValueChange={(value) => {
                setSelectedSavedMethod(value)
                const method = savedMethods.find((m) => m.id === value)
                if (method) setSelectedMethod(method.type)
              }}
            >
              <div className="space-y-3">
                {savedMethods.map((method) => (
                  <div key={method.id} className="relative">
                    <Label
                      htmlFor={`saved-${method.id}`}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedSavedMethod === method.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <RadioGroupItem value={method.id} id={`saved-${method.id}`} />
                        <div
                          className={`p-2 rounded-lg ${
                            selectedSavedMethod === method.id
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {method.type === "card" && <CreditCard className="w-5 h-5" />}
                          {method.type === "wallet" && <Smartphone className="w-5 h-5" />}
                          {method.type === "netbanking" && <Building2 className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-800">{method.name}</h4>
                            {method.isDefault && (
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{method.details}</p>
                          <p className="text-xs text-gray-500">Last used: {method.lastUsed}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedSavedMethod === method.id && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                        <div className="flex flex-col space-y-1">
                          {!method.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault()
                                setAsDefault(method.id)
                              }}
                              className="text-xs text-blue-600 hover:text-blue-700 h-6 px-2"
                            >
                              Set Default
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault()
                              deleteSavedMethod(method.id)
                            }}
                            className="text-xs text-red-600 hover:text-red-700 h-6 px-2"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="mt-4 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsEditingMethod(true)}
                className="w-full text-emerald-600 border-emerald-300 hover:bg-emerald-50"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Add New Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods Selection */}
      {(isEditingMethod || savedMethods.length === 0 || !showSavedMethods) && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                <span>Select Payment Method</span>
              </CardTitle>
              {isEditingMethod && savedMethods.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditingMethod(false)
                    const defaultMethod = savedMethods.find((method) => method.isDefault)
                    if (defaultMethod) {
                      setSelectedSavedMethod(defaultMethod.id)
                      setSelectedMethod(defaultMethod.type)
                    }
                  }}
                  className="text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Use Saved Methods
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedMethod}
              onValueChange={(value) => {
                setSelectedMethod(value)
                setSelectedSavedMethod("")
              }}
            >
              <div className="grid gap-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div key={method.id} className="relative">
                      <Label
                        htmlFor={method.id}
                        className={`flex items-center space-x-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50 ${
                          selectedMethod === method.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
                        }`}
                      >
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div
                          className={`p-3 rounded-lg ${
                            selectedMethod === method.id
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-800">{method.name}</h4>
                            {method.popular && (
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                                Popular
                              </Badge>
                            )}
                            {method.secure && <Shield className="w-4 h-4 text-emerald-600" />}
                          </div>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        {selectedMethod === method.id && <CheckCircle className="w-6 h-6 text-emerald-600" />}
                      </Label>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Payment Details Forms */}
      {selectedMethod === "card" && (isEditingMethod || !selectedSavedMethod) && (
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    number: formatCardNumber(e.target.value),
                  })
                }
                maxLength={19}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    name: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "")
                    if (value.length >= 2) {
                      value = value.substring(0, 2) + "/" + value.substring(2, 4)
                    }
                    setCardDetails({ ...cardDetails, expiry: value })
                  }}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Input
                    id="cvv"
                    type={showCVV ? "text" : "password"}
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cvv: e.target.value.replace(/\D/g, "").substring(0, 4),
                      })
                    }
                    maxLength={4}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowCVV(!showCVV)}
                  >
                    {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Save Payment Method Option */}
            <div className="flex items-center space-x-2 p-4 bg-blue-50 rounded-lg">
              <Switch id="save-method" checked={savePaymentMethod} onCheckedChange={setSavePaymentMethod} />
              <Label htmlFor="save-method" className="text-sm text-blue-800 cursor-pointer">
                Save this card for future purchases (secure & encrypted)
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === "netbanking" && (isEditingMethod || !selectedSavedMethod) && (
        <Card>
          <CardHeader>
            <CardTitle>Select Your Bank</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose your bank" />
              </SelectTrigger>
              <SelectContent>
                {bankOptions.map((bank) => (
                  <SelectItem key={bank} value={bank.toLowerCase().replace(/\s+/g, "-")}>
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {selectedMethod === "wallet" && (isEditingMethod || !selectedSavedMethod) && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Digital Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {walletOptions.map((wallet) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className="h-20 flex flex-col items-center space-y-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                >
                  <span className="text-2xl">{wallet.logo}</span>
                  <span className="text-sm font-medium">{wallet.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === "cod" && (
        <Card>
          <CardHeader>
            <CardTitle>Cash on Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Truck className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-amber-800">Pay when you receive</h4>
                  <p className="text-sm text-amber-700 mt-1">
                    You can pay in cash to our delivery partner when your order arrives. Please keep exact change ready.
                  </p>
                  <p className="text-sm text-amber-600 mt-2 font-medium">Additional COD charges: ₹25</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-800">Your payment is secure</h4>
              <p className="text-sm text-blue-700">
                We use industry-standard encryption to protect your payment information. Your card details are never
                stored on our servers without encryption.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      <div className="flex justify-center pt-6">
        <Button
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
          className="w-full max-w-md h-14 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing Payment...</span>
            </div>
          ) : (
            `Pay ₹${totalAmount.toFixed(2)}`
          )}
        </Button>
      </div>
    </div>
  )
}
