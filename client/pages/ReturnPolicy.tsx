import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-jakarta font-bold mb-8">Return Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-jakarta font-bold mb-4">Overview</h2>
            <p className="font-jakarta text-[16px] text-[#7E7E7E] leading-relaxed">
              At The Activerse, we want you to be completely satisfied with your purchase. If you're not happy with your order, we offer a hassle-free return process. Please review our return policy below to understand how to return items and what our conditions are.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-jakarta font-bold mb-4">30-Day Return Window</h2>
            <p className="font-jakarta text-[16px] text-[#7E7E7E] leading-relaxed">
              You have 30 days from the date you receive your order to initiate a return. Items must be unworn, unwashed, and in their original condition with all tags attached.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-jakarta font-bold mb-4">Condition Requirements</h2>
            <ul className="list-disc list-inside space-y-2 font-jakarta text-[16px] text-[#7E7E7E]">
              <li>Items must be unworn and unwashed</li>
              <li>Original tags must be attached</li>
              <li>Items must be in original packaging if possible</li>
              <li>All accessories and components must be included</li>
              <li>No signs of wear, stains, or damage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-jakarta font-bold mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal list-inside space-y-2 font-jakarta text-[16px] text-[#7E7E7E]">
              <li>Log into your account on The Activerse website</li>
              <li>Navigate to "My Orders" and select the order containing the item to return</li>
              <li>Click "Start a Return" and select the item(s) you wish to return</li>
              <li>Choose your reason for return</li>
              <li>Print the prepaid return shipping label</li>
              <li>Pack your item securely and use the provided shipping label</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-jakarta font-bold mb-4">Refund Processing</h2>
            <p className="font-jakarta text-[16px] text-[#7E7E7E] leading-relaxed mb-4">
              Once we receive and inspect your returned item:
            </p>
            <ul className="list-disc list-inside space-y-2 font-jakarta text-[16px] text-[#7E7E7E]">
              <li>We'll inspect the item to ensure it meets our return conditions</li>
              <li>If approved, your refund will be processed within 5-10 business days</li>
              <li>Refunds will be credited to your original payment method</li>
              <li>Shipping costs are non-refundable (unless the return is due to our error)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-jakarta font-bold mb-4">Exceptions</h2>
            <p className="font-jakarta text-[16px] text-[#7E7E7E] leading-relaxed mb-4">
              The following items cannot be returned:
            </p>
            <ul className="list-disc list-inside space-y-2 font-jakarta text-[16px] text-[#7E7E7E]">
              <li>Clearance or final sale items</li>
              <li>Items purchased from third-party vendors (contact vendor directly)</li>
              <li>Items that show signs of wear or damage</li>
              <li>Items without original tags or packaging</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-jakarta font-bold mb-4">Contact Us</h2>
            <p className="font-jakarta text-[16px] text-[#7E7E7E] leading-relaxed">
              If you have any questions about our return policy, please contact us at info@theactiverse.com or call 800# for assistance.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
