import React from 'react';
import { Shield, Mail, FileText, Info, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

type PageType = 'about' | 'contact' | 'privacy' | 'terms';

interface LegalPageProps {
  type: PageType;
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  const renderContent = () => {
    switch (type) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-roblox-accent" />
              <h1 className="text-3xl font-bold text-white">About Us</h1>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300">
              <div className="mb-8 flex justify-center">
                 <Logo size="lg" />
              </div>
              <p className="text-lg leading-relaxed">
                Welcome to <strong>robloxnamegenerator.org</strong>, the premier destination for gamers seeking the perfect identity in the Roblox metaverse. Established with a passion for gaming culture, we understand that a username is more than just a label—it's your digital persona.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-3">Our Mission</h3>
              <p>
                In a platform with over 200 million users, finding a unique name that isn't taken (or just a string of random numbers) is increasingly difficult. Our mission is to solve this by using advanced algorithms that blend <strong>gaming culture trends</strong> (like "Sweaty" PvP terms), <strong>aesthetic vibes</strong>, and <strong>rare "OG" formatting</strong> to generate names that actually look cool.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">Why Choose Us?</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Tailored Algorithms:</strong> Unlike random string generators, we use curated word lists including Japanese terms, Y2K suffixes, and competitive gaming lingo.</li>
                <li><strong>Privacy First:</strong> We respect your data. Your favorites and history are stored locally on your device.</li>
                <li><strong>Community Driven:</strong> We constantly update our database based on the latest Roblox trends, from "Da Hood" styles to "Royale High" aesthetics.</li>
              </ul>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-roblox-accent" />
              <h1 className="text-3xl font-bold text-white">Contact Support</h1>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300">
              <p className="text-lg">
                Have a suggestion, found a bug, or just want to say hello? We'd love to hear from you. At <strong>robloxnamegenerator.org</strong>, we are committed to providing the best user experience possible.
              </p>

              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl my-8">
                <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
                <p className="mb-2"><strong>Email:</strong></p>
                <a href="mailto:info@robloxnamegenerator.org" className="text-roblox-accent hover:underline text-lg font-mono">
                  info@robloxnamegenerator.org
                </a>
                
                <p className="mt-6 mb-2"><strong>Response Time:</strong></p>
                <p>We aim to respond to all inquiries within <strong>24-48 hours</strong>.</p>
              </div>

              <h3 className="text-xl font-semibold text-white mt-6 mb-3">Common Topics</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Feature requests for new name styles.</li>
                <li>Reporting inappropriate generated content (our filters are strict, but we appreciate reports).</li>
                <li>Business inquiries or partnership opportunities.</li>
              </ul>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-roblox-accent" />
              <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300 text-sm md:text-base">
              <p><strong>Effective Date:</strong> January 1, 2026</p>
              <p>
                At <strong>robloxnamegenerator.org</strong>, your privacy is our top priority. This Privacy Policy outlines how we handle your information when you use our website.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">1. Information Collection</h3>
              <p>
                We operate as a client-side application. This means:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We <strong>do not</strong> collect or store your personal data on our servers.</li>
                <li>We <strong>do not</strong> require you to create an account or provide an email address to use the generator.</li>
                <li>Any names you generate, save to favorites, or view in history are stored locally on your device (in your browser's Local Storage).</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">2. Cookies and Analytics</h3>
              <p>
                We may use standard cookies or third-party services (such as Google Analytics) to understand aggregated traffic patterns (e.g., which pages are visited most). This data is anonymized and helps us improve the tool. You can control cookie preferences through your browser settings.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">3. Third-Party Links</h3>
              <p>
                Our site contains links to external websites (e.g., Roblox.com, YouTube.com) to check username availability. We are not responsible for the privacy practices or content of these third-party sites.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">4. Changes to This Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
              </p>
              
              <h3 className="text-xl font-semibold text-white mt-6 mb-2">5. Contact Us</h3>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@robloxnamegenerator.org" className="text-roblox-accent hover:underline">info@robloxnamegenerator.org</a>.
              </p>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6">
             <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-roblox-accent" />
              <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
            </div>
            <div className="prose prose-invert max-w-none text-gray-300 text-sm md:text-base">
              <p><strong>Last Updated:</strong> January 1, 2026</p>
              <p>
                Please read these Terms of Service ("Terms") carefully before using the <strong>robloxnamegenerator.org</strong> website operated by us.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">1. Acceptance of Terms</h3>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">2. Intellectual Property</h3>
              <p>
                The generated names themselves are combinations of words and characters and are provided for your use. However, the unique code, design, logos, and algorithms of robloxnamegenerator.org are our exclusive property.
              </p>
              <p className="mt-2 text-gray-400 italic">
                <strong>Disclaimer:</strong> Roblox is a registered trademark of Roblox Corporation. This website is a fan-made tool and is not affiliated with, endorsed by, sponsored by, or specifically approved by Roblox Corporation.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">3. Use of License</h3>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on robloxnamegenerator.org for personal, non-commercial transitory viewing only.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">4. Limitation of Liability</h3>
              <p>
                In no event shall robloxnamegenerator.org, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">5. Governing Law</h3>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the site operator resides, without regard to its conflict of law provisions.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-fade-in-up min-h-[60vh]">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Generator
      </button>
      
      <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-3xl p-8 shadow-2xl">
        {renderContent()}
      </div>
    </div>
  );
};