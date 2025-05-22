
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-iconic-blue">Terms of Service</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                Last Updated: May 22, 2025
              </p>
              
              <p>
                Please read these Terms of Service ("Terms") carefully before using any websites, products, or services (collectively, the "Services") operated by ICONIC Infinity Group ("ICONIC", "we", "us", or "our").
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to all the Terms, you may not access or use our Services.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Changes to Terms</h2>
              <p>
                We may modify the Terms at any time, at our sole discretion. If we do so, we will notify you by updating the date at the top of these Terms. Your continued use of our Services after any such change constitutes your acceptance of the new Terms.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Privacy Policy</h2>
              <p>
                Please refer to our Privacy Policy for information on how we collect, use, and disclose information from our users. By using our Services, you agree to our collection, use, and disclosure of information as described in our Privacy Policy.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify us immediately of any breach of security or unauthorized use of your account.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Content and Services</h2>
              <p>
                Our Services may allow you to access content, products, and services provided by third parties. We are not responsible for any third-party content or services, and we make no warranties or representations regarding such content or services.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">6. User Content</h2>
              <p>
                You retain all rights to any content you submit, post, or display on or through our Services ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, distribute, and display such User Content.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property Rights</h2>
              <p>
                The content, organization, graphics, design, compilation, and other matters related to the Services are protected under applicable copyrights, trademarks, and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use, or publication by you of any such matters or any part of the Service is strictly prohibited.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Prohibited Uses</h2>
              <p>
                You agree not to use the Services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks, or interfere with any other party's use of the Services.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Termination</h2>
              <p>
                We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Disclaimer of Warranties</h2>
              <p>
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ICONIC DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">11. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ICONIC, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF, OR IN ANY WAY CONNECTED WITH, YOUR ACCESS TO OR USE OF THE SERVICES.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">12. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of India, without respect to its conflict of laws principles. Any dispute arising from these Terms shall be resolved exclusively in the courts of Andhra Pradesh, India.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">13. Entire Agreement</h2>
              <p>
                These Terms constitute the entire agreement between you and ICONIC regarding our Services, and supersede and replace any prior agreements we might have had between us regarding the Services.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">14. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <address className="not-italic mt-4">
                <strong>ICONIC Infinity Group</strong><br/>
                ICONIC Tower, Tech Park<br/>
                Amaravati, Andhra Pradesh, India<br/>
                Email: legal@iconicinfinity.com<br/>
                Phone: +91 98765 43210
              </address>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
