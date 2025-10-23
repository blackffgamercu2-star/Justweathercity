export const metadata = {
  title: "Privacy Policy - JustWeatherCity",
  description: "Privacy policy for JustWeatherCity weather platform.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>

        <div className="prose max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p>We collect minimal information to provide weather services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Location data (city selection)</li>
              <li>Usage analytics (page views, clicks)</li>
              <li>Device information (browser, OS)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Data</h2>
            <p>Your data is used to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate weather information</li>
              <li>Improve our services</li>
              <li>Analyze usage patterns</li>
              <li>Prevent abuse and fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
            <p>
              We implement industry-standard security measures including HTTPS encryption, secure servers, and regular
              security audits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
            <p>We use third-party services for analytics and weather data. Please review their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
            <p>For privacy concerns, contact us at privacy@justweathercity.com</p>
          </section>

          <p className="text-sm text-gray-600 mt-8">Last updated: October 21, 2025</p>
        </div>
      </div>
    </main>
  )
}
