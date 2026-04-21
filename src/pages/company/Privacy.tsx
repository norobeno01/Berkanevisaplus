import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

export default function Privacy() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-24 overflow-hidden bg-background border-b border-border">
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display text-gradient">
              {t('privacy.title', 'Privacy Policy')}
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              {t('privacy.lastUpdated', 'Last updated: October 2026')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 flex-1">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <Card className="glass-panel border-border">
            <CardContent className="p-8 md:p-12 prose prose-invert max-w-none text-muted-foreground">
              <h2 className="text-foreground font-display text-2xl font-bold mb-4">{t('privacy.introTitle', '1. Introduction')}</h2>
              <p className="mb-6">
                {t('privacy.introText', 'VisaPlus Berkane ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.')}
              </p>

              <h2 className="text-foreground font-display text-2xl font-bold mb-4">{t('privacy.dataCollectTitle', '2. The Data We Collect')}</h2>
              <p className="mb-6">
                {t('privacy.dataCollectText', 'We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:')}
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>{t('privacy.identityDataTitle', 'Identity Data')}</strong> {t('privacy.identityDataText', 'includes first name, last name, username or similar identifier, marital status, title, date of birth, and gender.')}</li>
                <li><strong>{t('privacy.contactDataTitle', 'Contact Data')}</strong> {t('privacy.contactDataText', 'includes billing address, delivery address, email address, and telephone numbers.')}</li>
                <li><strong>{t('privacy.documentDataTitle', 'Document Data')}</strong> {t('privacy.documentDataText', 'includes copies of passports, ID cards, bank statements, and other documents required for visa processing.')}</li>
                <li><strong>{t('privacy.technicalDataTitle', 'Technical Data')}</strong> {t('privacy.technicalDataText', 'includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.')}</li>
              </ul>

              <h2 className="text-foreground font-display text-2xl font-bold mb-4">{t('privacy.useDataTitle', '3. How We Use Your Data')}</h2>
              <p className="mb-6">
                {t('privacy.useDataText', 'We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:')}
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>{t('privacy.useDataList1', 'Where we need to perform the contract we are about to enter into or have entered into with you (e.g., processing your visa application).')}</li>
                <li>{t('privacy.useDataList2', 'Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.')}</li>
                <li>{t('privacy.useDataList3', 'Where we need to comply with a legal obligation.')}</li>
              </ul>

              <h2 className="text-foreground font-display text-2xl font-bold mb-4">{t('privacy.securityTitle', '4. Data Security')}</h2>
              <p className="mb-6">
                {t('privacy.securityText', 'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. All sensitive documents uploaded to our Client Portal are encrypted and stored securely.')}
              </p>

              <h2 className="text-foreground font-display text-2xl font-bold mb-4">{t('privacy.contactTitle', '5. Contact Us')}</h2>
              <p>
                {t('privacy.contactText1', 'If you have any questions about this privacy policy or our privacy practices, please contact us at:')} <a href="mailto:privacy@visaplus-berkane.ma" className="text-primary hover:underline">privacy@visaplus-berkane.ma</a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}