import { CheckCircle, Truck, CreditCard, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"


export default function ConfirmOrder() {
  // Mock order details
  const orderDetails = {
    orderNumber: "ORD-12345-ABCDE",
    date: "October 18, 2024",
    total: "$129.99",
    subtotal: "$119.99",
    tax: "$10.00",
    shipping: "Free",
    paymentMethod: "Visa ending in 1234",
    shippingAddress: "123 Main St, Anytown, ST 12345",
    items: [
      { name: "Premium Widget", quantity: 2, price: "$49.99", total: "$99.98" },
      { name: "Deluxe Gadget", quantity: 1, price: "$30.01", total: "$30.01" },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="text-center border-b">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Order Confirmed
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Order number</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderDetails.orderNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Date placed</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderDetails.date}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Total amount</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderDetails.total}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Payment method</dt>
                <dd className="mt-1 text-sm text-gray-900">{orderDetails.paymentMethod}</dd>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order summary</h3>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-4">Product</th>
                    <th scope="col" className="py-3 px-4">Quantity</th>
                    <th scope="col" className="py-3 px-4">Price</th>
                    <th scope="col" className="py-3 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items.map((item, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="py-4 px-4 font-medium text-gray-900">{item.name}</td>
                      <td className="py-4 px-4">{item.quantity}</td>
                      <td className="py-4 px-4">{item.price}</td>
                      <td className="py-4 px-4">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-white border-b">
                    <td colSpan={3} className="py-4 px-4 font-medium text-gray-900">Subtotal</td>
                    <td className="py-4 px-4">{orderDetails.subtotal}</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td colSpan={3} className="py-4 px-4 font-medium text-gray-900">Tax</td>
                    <td className="py-4 px-4">{orderDetails.tax}</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td colSpan={3} className="py-4 px-4 font-medium text-gray-900">Shipping</td>
                    <td className="py-4 px-4">{orderDetails.shipping}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="py-4 px-4 font-medium text-gray-900">Total</td>
                    <td className="py-4 px-4 font-bold">{orderDetails.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping information</h3>
              <p className="text-sm text-gray-600">{orderDetails.shippingAddress}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t">
            <div className="flex space-x-4">
              <Button asChild variant="outline">
                <Link to="/order-status"><Truck className="mr-2 h-4 w-4" /> Track Order</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/"><CreditCard className="mr-2 h-4 w-4" /> View Invoice</Link>
              </Button>
            </div>
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}