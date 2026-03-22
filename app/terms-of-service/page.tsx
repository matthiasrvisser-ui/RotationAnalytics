import type { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { Hero } from '@/components/Hero'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for Rotation Analytics Inc — conditions governing use of our website and rotation schedule analysis services.',
}

export default function TermsOfServicePage() {
  return (
    <>
      <Hero
        headline="Terms of Service"
        subheadline="Conditions governing use of the Rotation Analytics Inc website and services."
      />

      <Section contained>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-slate-500 mb-4">
            Last updated: March 20, 2026
          </p>
          <p className="text-sm text-slate-500 mb-10">
            On this page: Introduction &middot; Language of Service &middot;
            Intellectual Property &middot; Notification of Changes &middot;
            Analytical Findings Disclaimer &middot; Permitted Uses &middot;
            Prohibited Uses &middot; Electronic Communications &middot;
            Third-Party Services &middot; Privacy Policy &middot;
            Term and Termination &middot; Dispute Resolution &middot;
            Disclaimer of Warranties &middot; Indemnity &middot;
            Limitation of Liability &middot; Entire Agreement &middot;
            Miscellaneous &middot; Governing Law &middot; Severability &middot;
            Contact Us
          </p>

          {/* 1. Introduction */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            1. Introduction
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Welcome to Rotation Analytics Inc (&ldquo;we,&rdquo; &ldquo;our,&rdquo;
            or &ldquo;us&rdquo;), a division of Visser Ventures Corp. By accessing or using our
            website (the &ldquo;Site&rdquo;) you agree to be bound by and comply with these terms
            and conditions of use (the &ldquo;Terms&rdquo;). If you do not agree to be bound by,
            and comply with the Terms, you are expressly prohibited from access or use of this
            Site.
          </p>

          {/* 2. Language of Service */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            2. Language of Service
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            These Terms are written in English. If the Terms are made available in other
            languages, the English version will prevail in the event of any inconsistency or
            conflict between the versions. By using this Site, you agree that English is the
            language in which these Terms are provided and interpreted.
          </p>

          {/* 3. Intellectual Property */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            3. Intellectual Property
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We are the owner or the licensee of all intellectual property rights within our
            Site, including all source code, databases, functionality, software, designs, text,
            photographs, and graphics on the Site (collectively, the &ldquo;Content&rdquo;), as
            well as the trademarks, service marks, and logos contained therein (the
            &ldquo;Marks&rdquo;). Our Content and Marks are protected by copyright, trademark
            laws, and other intellectual property rights and unfair competition laws and treaties.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Our proprietary analysis engine, methodology, reporting frameworks, and analytical
            tools are proprietary and confidential. You agree not to modify, distribute,
            reproduce, or create derivative works based on the Content without prior written
            consent from us.
          </p>

          {/* 4. Notification of Changes */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            4. Notification of Changes
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Rotation Analytics Inc reserves the right to update, modify, or revise these Terms
            at any time, at our sole discretion. Any changes will be posted on this page. The
            date of the most recent revision will be indicated at the top of this document.
            Major changes to the Terms will be clearly communicated by notification through the
            Site. By continuing to use the Site after any such revisions, you acknowledge and
            agree to the updated Terms.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            There may be information on the Site that contains typographical errors,
            inaccuracies, or omissions, including descriptions, pricing, availability, and
            various other information. We reserve the right to correct any errors, inaccuracies,
            or omissions and to change or update the information on the Site at any time, without
            prior notice.
          </p>

          {/* 5. Analytical Findings Disclaimer */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            5. Analytical Findings Disclaimer
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Reports, findings, and deliverables produced by Rotation Analytics Inc are provided
            for informational and analytical purposes. Findings constitute analytical
            observations only and are not determinations of legal compliance. They do not
            constitute legal advice, labour relations advice, or formal compliance rulings.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            The commissioning party is responsible for decisions made based on our findings.
            You should seek specific legal advice by consulting your own legal counsel regarding
            your individual concerns. No one should act, or refrain from acting, based solely
            on the findings or Content provided by Rotation Analytics Inc.
          </p>

          {/* 6. Service Description and Engagement Terms */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            6. Service Description and Engagement Terms
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Rotation Analytics Inc provides independent analytical review of rotation schedules.
            Our services include evaluating shift schedules against collective agreement
            provisions, employment standards, and occupational health guidelines. Rotation
            Analytics Inc conducts analysis without structural alignment to any party to the
            scheduling arrangement.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Individual engagements are governed by a separate service agreement executed between
            Rotation Analytics Inc and the commissioning party. These Terms of Service apply to
            general website use and supplement, but do not replace, the terms of any executed
            service agreement.
          </p>

          {/* 7. Permitted Uses */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            7. Permitted Uses
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We grant you a limited, non-exclusive, non-transferable right to access and view
            the Content available on our Site for personal, non-commercial use (the
            &ldquo;Permitted Uses&rdquo;). This includes displaying, saving, downloading, and
            printing copies of the Content, provided that the Content is not modified.
          </p>

          {/* 8. Prohibited Uses */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            8. Prohibited Uses
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You may not access, use, or interact with the Site or its Content in any unlawful
            manner or for any unlawful purpose. Without our prior written consent, you may not
            access or use the Site or its Content for any purpose beyond the scope of Permitted
            Uses, or in a way that infringes upon the rights of our company or any third party.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            Users agree not to:
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
            <li>violate any applicable Canadian laws or regulations;</li>
            <li>attempt to gain unauthorised access to our systems;</li>
            <li>upload or distribute malicious code or harmful Content;</li>
            <li>interfere with other users&rsquo; access to the service;</li>
            <li>misrepresent their identity or their relationship with us;</li>
            <li>
              scrape, harvest, or collect data from our Site without authorisation; or
            </li>
            <li>use our Site for any unauthorised commercial purposes.</li>
          </ul>

          {/* 9. Electronic Communications */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            9. Electronic Communications
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            By visiting the Site, sending us emails, and completing online forms, you constitute
            electronic communications. You consent to receive electronic communications, and you
            agree that all agreements, notices, disclosures, and other communications we provide
            to you electronically, via email and on the Site, satisfy any legal requirement that
            such communication be in writing.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            You hereby agree to the use of electronic signatures, contracts, orders, and other
            records, and to electronic delivery of notices, policies, and records of transactions
            initiated or completed by us or via the Site.
          </p>

          {/* 10. Third-Party Services */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            10. Third-Party Services
          </h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            We may integrate with third-party services that:
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
            <li>have their own terms of service and privacy policies;</li>
            <li>may be located outside of Canada;</li>
            <li>are not under our direct control; and</li>
            <li>may require separate agreements.</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            We are not responsible for the actions, practices, or policies of any third-party
            service providers and disclaim any liability in connection with the use of such
            third-party services.
          </p>

          {/* 11. Privacy Policy */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            11. Privacy Policy
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We care about data privacy and security. By using the Site, you agree to be bound
            by our{' '}
            <Link
              href="/privacy-policy"
              className="text-brand-navy underline hover:text-brand-navy-dark"
            >
              Privacy Policy
            </Link>
            , which is incorporated into these Terms. For more information, please review our
            Privacy Policy.
          </p>

          {/* 12. Term and Termination */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            12. Term and Termination
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            These Terms shall remain in full force and effect while you use or access this Site
            or use any services provided by our company. Your continued use of the Site or our
            services constitutes your acceptance of these Terms, and they will remain binding
            upon you unless terminated or modified by us in accordance with these Terms.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            You agree that Rotation Analytics Inc may, at our sole discretion, suspend or
            terminate your access to all or part of the Site, with or without notice, and for
            any reason, including, without limitation, a breach of these Terms of Service. Any
            suspected fraudulent, abusive, or illegal activity may result in the termination of
            your relationship with us and may be reported to the appropriate law enforcement
            authorities.
          </p>

          {/* 13. Dispute Resolution */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            13. Dispute Resolution
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We take disputes seriously and are committed to resolving any conflicts or claims in
            a fair and timely manner. Any dispute arising out of or in connection with these
            Terms shall first be attempted to be resolved through good faith negotiation between
            the parties. If such negotiation fails, the dispute shall be submitted to the
            exclusive jurisdiction of the courts of the Province of Alberta.
          </p>

          {/* 14. Disclaimer of Warranties */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            14. Disclaimer of Warranties
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The information, Content, and materials available on this Site are provided for
            general informational purposes only. While we strive to ensure the accuracy and
            completeness of the information, we make no representations or warranties of any
            kind, express or implied, regarding the accuracy, reliability, or completeness of
            the Content provided. You acknowledge that any reliance on such information is at
            your own risk.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            We do not guarantee that the Site will be error-free, uninterrupted, or free of
            viruses or other harmful components. We are not liable for any damages arising from
            the use or inability to use the Site, including but not limited to direct, indirect,
            incidental, consequential, or punitive damages.
          </p>

          {/* 15. Indemnity */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            15. Indemnity
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You agree to indemnify, defend, and hold harmless Rotation Analytics Inc, Visser
            Ventures Corp., their affiliates, officers, directors, employees, and agents from
            and against any and all claims, damages, losses, liabilities, costs, and expenses,
            including but not limited to reasonable legal fees, arising from your use of the
            Site, your violation of these Terms, or your infringement of any intellectual
            property or other rights of any third party.
          </p>

          {/* 16. Limitation of Liability */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            16. Limitation of Liability
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            To the maximum extent permitted by law, Rotation Analytics Inc and Visser Ventures
            Corp. shall not be liable for any indirect, incidental, consequential, or punitive
            damages arising from or related to the use of our website or services. Aggregate
            liability is limited to fees paid in the preceding twelve (12) months under the
            applicable service agreement.
          </p>

          {/* 17. Entire Agreement */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            17. Entire Agreement
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            These Terms of Use, together with any other legal notices and agreements published
            by us on the Site, constitute the entire agreement between you and us concerning
            the subject matter hereof. These Terms supersede all prior or contemporaneous
            communications, whether electronic, oral, or written, between you and us with
            respect to the Site and its services.
          </p>

          {/* 18. Miscellaneous */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            18. Miscellaneous
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Our failure to exercise or enforce any right or provision of these Terms shall not
            operate as a waiver of such right or provision. These Terms operate to the fullest
            extent permissible by law. We may assign any or all of our rights and obligations
            to others at any time. We shall not be responsible or liable for any loss, damage,
            delay, or failure to act caused by any cause beyond our reasonable control. There
            is no joint venture, partnership, employment, or agency relationship created between
            you and us as a result of these Terms or use of the Site.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            You agree that these Terms will not be construed against us by virtue of having
            drafted them. You hereby waive any and all defences you may have based on the
            electronic form of these Terms and the lack of signing by the parties hereto to
            execute these Terms.
          </p>

          {/* 19. Governing Law */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            19. Governing Law
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            These Terms shall be governed by and defined following the laws of the Province of
            Alberta and applicable federal laws of Canada. Rotation Analytics Inc and yourself
            irrevocably consent that the courts of the Province of Alberta shall have exclusive
            jurisdiction to resolve any dispute which may arise in connection with these Terms.
          </p>

          {/* 20. Severability */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            20. Severability
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            If any provision or part of a provision of these Terms is determined to be unlawful,
            void, or unenforceable, that provision or part of the provision is deemed severable
            from these Terms and does not affect the validity and enforceability of any remaining
            provisions.
          </p>

          {/* 21. Contact Us */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            21. Contact Us
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            In order to resolve a complaint regarding the Site or to receive further information
            regarding use of the Site, please contact us at{' '}
            <a
              href="mailto:hello@rotationanalytics.ca"
              className="text-brand-navy underline hover:text-brand-navy-dark"
            >
              hello@rotationanalytics.ca
            </a>
            .
          </p>
          <p className="text-slate-700 leading-relaxed mb-1">
            <strong>Rotation Analytics Inc</strong>
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            A division of Visser Ventures Corp.
          </p>

          {/* Footer links */}
          <div className="border-t border-slate-200 mt-12 pt-6">
            <p className="text-sm text-slate-500">
              See also:{' '}
              <Link
                href="/privacy-policy"
                className="text-brand-navy underline hover:text-brand-navy-dark"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
