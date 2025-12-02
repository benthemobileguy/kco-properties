import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: October 31, 2025</p>

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  KCO Properties, LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We collect information that you provide directly to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Submit a rental application</li>
                  <li>Schedule a property tour</li>
                  <li>Contact us through our website</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Create an account or use our tenant portal</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  This information may include your name, email address, phone number, date of birth, Social Security number (last 4 digits), current and previous addresses, employment information, income details, and other information relevant to your rental application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Process and evaluate rental applications</li>
                  <li>Conduct background and credit checks</li>
                  <li>Communicate with you about properties and services</li>
                  <li>Schedule and manage property tours</li>
                  <li>Process payments and maintain financial records</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send you updates about available properties and services</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Background and Credit Checks</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As part of our rental application process, we use TransUnion to conduct background checks and obtain credit reports. We perform soft credit inquiries that will not affect your credit score. By submitting an application, you authorize us to obtain and review this information. All credit and background check information is handled in accordance with the Fair Credit Reporting Act (FCRA) and other applicable laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Service providers who assist us in operating our business (e.g., background check services, payment processors)</li>
                  <li>Property owners or managers when necessary for rental applications</li>
                  <li>Legal authorities when required by law or to protect our rights</li>
                  <li>Professional advisors such as lawyers and accountants</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  All third-party service providers are required to maintain the confidentiality of your information and use it only for the purposes for which it was disclosed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of sensitive data, secure servers, and restricted access to personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. If your rental application is not approved or you choose not to proceed, we will securely destroy your information within a reasonable timeframe, typically within 90 days, unless we are required to retain it for legal or regulatory purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to correct inaccurate or incomplete information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to object to or restrict certain processing of your information</li>
                  <li>The right to withdraw consent where processing is based on consent</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may use cookies and similar tracking technologies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can control cookies through your browser settings, but disabling cookies may limit your ability to use certain features of our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Third-Party Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new privacy policy on this page and updating the "Last Updated" date. Your continued use of our services after any changes indicates your acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  If you have questions or concerns about this privacy policy or our data practices, please contact us at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                  <p className="font-medium">KCO Properties, LLC</p>
                  <p className="text-muted-foreground">123 Main Street</p>
                  <p className="text-muted-foreground">Your City, ST 12345</p>
                  <p className="text-muted-foreground">Email: info@kcoproperties.com</p>
                  <p className="text-muted-foreground">Phone: (123) 456-7890</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Fair Housing Statement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  KCO Properties, LLC is committed to compliance with all federal, state, and local fair housing laws. We do not discriminate on the basis of race, color, religion, sex, national origin, familial status, disability, or any other protected characteristic. All applications are processed in accordance with the Fair Housing Act and applicable state and local laws.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
