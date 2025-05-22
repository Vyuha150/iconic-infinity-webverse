
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cookies = () => {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-iconic-blue">Cookie Policy</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                Last Updated: May 22, 2025
              </p>
              
              <p>
                This Cookie Policy explains how ICONIC Infinity Group ("we", "us", or "our") uses cookies and similar technologies when you visit our websites or interact with our online services.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies help provide a better user experience by enabling websites to remember your preferences and understand how people use different features.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Types of Cookies We Use</h2>
              <p>
                We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> These cookies allow a website to remember choices you have made in the past, like what language you prefer or what your username and password are so you can automatically log in.
                </li>
                <li>
                  <strong>Statistics Cookies:</strong> These cookies collect information about how you use a website, like which pages you visited and which links you clicked on. None of this information can be used to identify you.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                </li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Cookies</h2>
              <p>
                We use cookies for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>To provide and maintain our Services</li>
                <li>To understand how you use our Services</li>
                <li>To enhance your user experience</li>
                <li>To personalize content and advertising</li>
                <li>To analyze trends, administer the website, and gather demographic information</li>
                <li>To remember your preferences and settings</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may be placed by:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Analytics providers (like Google Analytics)</li>
                <li>Advertising networks</li>
                <li>Social media platforms</li>
                <li>Content delivery services</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Managing Cookies</h2>
              <p>
                You have the right to choose whether or not to accept cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of our Services.
              </p>
              <p>
                You can manage your cookie preferences through your browser settings:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><a href="https://support.google.com/chrome/answer/95647" className="text-iconic-blue hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-iconic-blue hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-iconic-blue hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" className="text-iconic-blue hover:underline">Microsoft Edge</a></li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date at the top of this page.
              </p>
              <p>
                You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us:
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

export default Cookies;
