
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-iconic-blue">Privacy Policy</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                Last Updated: May 22, 2025
              </p>
              
              <p>
                This Privacy Policy describes how ICONIC Infinity Group ("we", "us", or "our") collects, uses, and discloses your information when you use our website, mobile applications, and other online services (collectively, the "Services").
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Information You Provide to Us</h3>
              <p>
                We collect information you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Create or modify your account</li>
                <li>Make a purchase or inquiry</li>
                <li>Fill out a form, including contact or marketing forms</li>
                <li>Subscribe to our newsletters or marketing communications</li>
                <li>Contact customer support</li>
                <li>Apply for employment</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Information We Collect Automatically</h3>
              <p>
                When you access or use our Services, we may automatically collect information about you, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>
                  <strong>Log Information:</strong> We collect log information about your use of the Services, including the type of browser you use, access times, pages viewed, your IP address, and the page you visited before navigating to our Services.
                </li>
                <li>
                  <strong>Device Information:</strong> We collect information about the device you use to access our Services, including information about the device's hardware and operating system.
                </li>
                <li>
                  <strong>Location Information:</strong> We may collect information about your location each time you access or use our Services.
                </li>
                <li>
                  <strong>Cookie Information:</strong> We use cookies and similar technologies to collect information about your interactions with our Services.
                </li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Information</h2>
              <p>
                We use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Provide, maintain, and improve our Services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support and administrative messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Communicate with you about products, services, offers, promotions, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize and improve the Services</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing</h2>
              <p>
                We may share information about you as follows or as otherwise described in this Privacy Policy:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
                <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies</li>
                <li>To protect the rights, property, and safety of ICONIC Infinity Group or others</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
                <li>With your consent or at your direction</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Your Choices</h2>
              <p>
                You have several choices available when it comes to how we use information about you:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>
                  <strong>Account Information:</strong> You may update, correct, or delete your account information at any time by logging into your account or contacting us.
                </li>
                <li>
                  <strong>Cookies:</strong> Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject cookies.
                </li>
                <li>
                  <strong>Promotional Communications:</strong> You may opt out of receiving promotional emails from ICONIC Infinity Group by following the instructions in those emails.
                </li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Data Retention</h2>
              <p>
                We store the information we collect about you for as long as is necessary for the purpose(s) for which we originally collected it, or for other legitimate business purposes.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to this Policy</h2>
              <p>
                We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy, and in some cases, we may provide additional notice.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <address className="not-italic mt-4">
                <strong>ICONIC Infinity Group</strong><br/>
                ICONIC Tower, Tech Park<br/>
                Amaravati, Andhra Pradesh, India<br/>
                Email: privacy@iconicinfinity.com<br/>
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

export default Privacy;
