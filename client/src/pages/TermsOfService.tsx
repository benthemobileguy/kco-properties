import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: October 31, 2025</p>

          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service ("Terms") govern your access to and use of the KCO Properties, LLC website and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Use of Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Provide false, inaccurate, or misleading information</li>
                  <li>Violate any applicable federal, state, or local laws or regulations</li>
                  <li>Infringe upon the rights of others, including intellectual property rights</li>
                  <li>Transmit any harmful code, viruses, or malicious software</li>
                  <li>Attempt to gain unauthorized access to our systems or networks</li>
                  <li>Use our Services for any fraudulent or illegal purpose</li>
                  <li>Harass, abuse, or harm another person or entity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Rental Applications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you submit a rental application through our Services, you certify that all information provided is true, accurate, and complete. You authorize KCO Properties, LLC to verify the information provided and to obtain consumer credit reports and background checks. Submission of an application does not guarantee approval or reservation of any property. Applications are processed in the order received, and approval is subject to verification of all information and satisfactory credit and background checks.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Application Fees</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Application fees, if applicable, are non-refundable and cover the cost of processing your application, including background and credit checks. Payment of an application fee does not guarantee approval of your application or reservation of a property. All fees must be paid at the time of application submission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Property Tours and Scheduling</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Property tours are available by appointment only. By scheduling a tour through our Services, you agree to arrive at the scheduled time and provide advance notice if you need to cancel or reschedule. We reserve the right to cancel or reschedule tours due to property availability, weather conditions, or other circumstances beyond our control.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on our website, including text, graphics, logos, images, and software, is the property of KCO Properties, LLC or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on our website without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you create an account on our website, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent or illegal activity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Disclaimers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our Services will be uninterrupted, error-free, or secure. Property information, including descriptions, photographs, and availability, is subject to change without notice. We make no representations or warranties regarding the accuracy or completeness of property information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, KCO Properties, LLC and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our Services. Our total liability for any claims arising out of or related to these Terms or our Services shall not exceed the amount you paid to us, if any, in the twelve months preceding the claim.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify, defend, and hold harmless KCO Properties, LLC and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or related to your use of our Services, your violation of these Terms, or your violation of any rights of another person or entity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Fair Housing Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  KCO Properties, LLC is committed to compliance with all federal, state, and local fair housing laws. We do not discriminate on the basis of race, color, religion, sex, national origin, familial status, disability, or any other protected characteristic. All rental decisions are made in accordance with the Fair Housing Act and applicable state and local laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any disputes arising out of or related to these Terms or our Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in the county where the property is located or where KCO Properties, LLC maintains its principal office. You agree to waive any right to a jury trial or to participate in a class action lawsuit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the state where KCO Properties, LLC maintains its principal office, without regard to its conflict of law provisions. Any legal action or proceeding related to these Terms shall be brought exclusively in the courts located in that state.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be replaced with a valid provision that most closely reflects the intent of the original provision.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our Services after any changes indicates your acceptance of the updated Terms. If you do not agree to the modified Terms, you must stop using our Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate your access to our Services at any time, with or without cause, and with or without notice. Upon termination, your right to use our Services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Entire Agreement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and KCO Properties, LLC regarding your use of our Services and supersede all prior agreements and understandings, whether written or oral.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  If you have questions about these Terms, please contact us at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-1">
                  <p className="font-medium">KCO Properties, LLC</p>
                  <p className="text-muted-foreground">123 Main Street</p>
                  <p className="text-muted-foreground">Your City, ST 12345</p>
                  <p className="text-muted-foreground">Email: info@kcoproperties.com</p>
                  <p className="text-muted-foreground">Phone: (123) 456-7890</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
