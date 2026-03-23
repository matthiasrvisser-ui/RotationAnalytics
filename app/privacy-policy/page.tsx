import type { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/Section'
import { Hero } from '@/components/Hero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Rotation Analytics — how we collect, use, disclose, and protect personal information in accordance with PIPEDA and applicable Alberta privacy legislation.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Hero
        headline="Privacy Policy"
        subheadline="How Rotation Analytics collects, uses, discloses, and protects your information."
      />

      <Section contained>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-slate-500 mb-10">
            Last updated: March 20, 2026
          </p>

          {/* 1. Introduction */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            1. Introduction
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            At Rotation Analytics (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;),
            a division of Visser Ventures Corp., we are committed to protecting your privacy and
            safeguarding your personal information in accordance with Canada&rsquo;s{' '}
            <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and
            applicable Alberta privacy legislation, including the{' '}
            <em>Personal Information Protection Act</em> (PIPA).
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            This Privacy Policy explains how we collect, use, disclose, and protect your
            information when you visit our website (https://www.rotationanalytics.ca) or engage
            our rotation schedule analysis services.
          </p>

          {/* 2. Collection and Disclosure */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            2. Collection and Disclosure of Personal Information
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            In accordance with PIPEDA, &ldquo;Personal Information&rdquo; is defined as any
            information that allows an individual to be identified.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Rotation Analytics only collects personal information with your express or
            reasonably implied knowledge and consent. We will only use your personal information
            for the purposes identified in this Policy.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            Personal information that may be collected by Rotation Analytics includes:
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
            <li>Organization name, contact name, email address, and phone number;</li>
            <li>
              Rotation schedule data, shift records, and related staffing documents submitted
              for analysis;
            </li>
            <li>
              Collective agreement provisions and scheduling parameters provided by the
              commissioning party;
            </li>
            <li>
              Website usage data including IP address, browser type, pages visited, and
              timestamps collected automatically when you visit our website.
            </li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-3">
            Rotation Analytics may collect and use personal information for the purposes of:
          </p>
          <ul className="list-disc pl-6 text-slate-700 space-y-2 mb-4">
            <li>
              performing rotation schedule analysis as defined in the applicable service
              agreement;
            </li>
            <li>
              establishing and facilitating communication regarding engagement status and
              deliverables;
            </li>
            <li>responding to enquiries submitted through our website;</li>
            <li>processing payments and transactions;</li>
            <li>meeting legal and regulatory requirements;</li>
            <li>improving our analytical methodology and service delivery; and</li>
            <li>
              any other purpose for which we have your consent.
            </li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            Rotation Analytics will not (i) sell, rent, or trade personal information to
            third parties; (ii) disclose personal information to third parties without consent,
            except where required by law; (iii) retain personal information longer than
            necessary for the fulfilment of stated purposes or legal requirements; (iv) store
            personal information in unsecured or publicly accessible locations; (v) transmit
            sensitive personal information without appropriate security measures; or (vi) use
            personal information for marketing purposes without explicit consent.
          </p>

          {/* 3. Confidentiality of Engagement Data */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            3. Confidentiality of Engagement Data
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            All rotation schedule data, collective agreement provisions, and analytical findings
            are treated as strictly confidential. Findings and deliverables are released only to
            the commissioning party as defined in the service agreement. Disclosure to any other
            party requires explicit written direction from the commissioning party.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            We do not use submitted rotation data or engagement information for any purpose
            beyond the scope defined in the applicable service agreement.
          </p>

          {/* 4. Retention and Disposal */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            4. Retention and Disposal of Personal Information
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Rotation Analytics will retain personal information only as long as necessary
            to fulfil the purposes for which it was collected, or as required by law. When
            information is no longer needed, it will be securely destroyed.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Engagement data, including submitted rotation files and analytical deliverables,
            will be retained for a period of seven (7) years from the date the engagement is
            completed in order to comply with applicable tax and business record regulations.
          </p>

          {/* 5. Consent */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            5. Consent
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            By submitting your personal information to Rotation Analytics, you are giving
            your consent to the collection, use, and disclosure of your personal information in
            accordance with this Policy.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            If you do not consent to the collection, use, and disclosure of your personal
            information in accordance with this Policy, please do not provide any personal
            information to Rotation Analytics Please be aware that if you choose not to
            provide personal information, some services may be unavailable.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            You may withdraw your consent to provide and disclose personal information, subject
            to legal or contractual restrictions and reasonable notice. If consent is withdrawn,
            some services may no longer be available. Once a service agreement has been
            established, you may not be able to withdraw consent until such time as the
            obligations under said agreement have been fulfilled.
          </p>

          {/* 6. Access to Personal Information */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            6. Access to Personal Information
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Rotation Analytics will make all appropriate efforts to ensure the accuracy
            and completeness of your personal information when making a decision or when
            disclosing information to third parties.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Rotation Analytics recognises that personal information belongs to the
            individual and, subject to certain restrictions established by law and proof of
            identification, shall make every reasonable effort to provide you with the right
            to (i) access your personal information upon request; (ii) challenge the accuracy
            and completeness of personal information; and (iii) request inaccurate or
            incomplete personal information be updated and amended as soon as possible and no
            later than thirty (30) days.
          </p>

          {/* 7. Third-Party Applications */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            7. Third-Party Applications
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            While providing our services, Rotation Analytics may use third-party
            applications, software, and services to enhance functionality, improve user
            experience, and support our operations. These third-party applications may collect,
            process, and store personal information for the purposes established within this
            Policy in accordance with their own privacy policies and terms of use.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            We are not responsible for the actions, practices, or policies of any third-party
            service providers and disclaim any liability in connection with the use of such
            third-party services.
          </p>

          {/* 8. Website Privacy */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            8. Website Privacy
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            A &ldquo;cookie&rdquo; is a small text file stored on a user&rsquo;s device when
            they access a website. Our website uses essential cookies necessary for site
            functionality. We do not use third-party advertising cookies or cross-site tracking
            technologies.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Cookies on our website may collect information about your (i) browser type and
            version; (ii) device; (iii) IP address; and (iv) operating system. This information
            is used solely to improve website functionality and understand site usage patterns.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            You can choose to block or disable cookies through your browser settings; however,
            disabling certain cookies may affect the functionality of some parts of our website.
          </p>

          {/* 9. Safeguarding Information */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            9. Safeguarding Information
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Rotation Analytics maintains appropriate safeguards to protect the
            confidentiality of all personal information that it receives and discloses,
            including but not limited to (i) the encryption of sensitive data;
            (ii) the use of secure servers and encrypted communications; and (iii) access
            controls and authentication procedures.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Our services involve the transmission and storage of data over the internet. While
            we implement industry-standard security measures, there remains a degree of risk
            associated with the storage and transmission of information online. By using our
            services, you understand and accept that, despite our best efforts, there is always
            a possibility of unauthorised access, data breaches, or other security threats
            inherent in the use of the internet.
          </p>

          {/* 10. Data Storage */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            10. Data Storage
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Your personal information is primarily stored within Canada. In the event that it
            is necessary to transfer data outside of Canada, Rotation Analytics will take
            appropriate measures to ensure that the transfer is conducted in compliance with
            Canadian privacy laws, including ensuring that third-party service providers adhere
            to privacy and security standards that align with PIPEDA.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            If a privacy breach occurs that poses a real risk of significant harm, Rotation
            Analytics Inc will (i) notify affected individuals via their provided contact
            information as soon as reasonably possible; (ii) report the breach to the Office of
            the Privacy Commissioner of Canada (OPC); and (iii) take immediate corrective
            actions to mitigate risks and prevent future incidents.
          </p>

          {/* 11. Changes to This Policy */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            11. Changes to This Policy
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            This Policy may be updated periodically. The updated Policy will be posted to our
            website with the revision date. Significant changes will be communicated directly
            to affected individuals where possible.
          </p>

          {/* 12. Contact */}
          <h2 className="text-xl font-semibold text-brand-navy mt-10 mb-4">
            12. Contact
          </h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            For questions about this Privacy Policy, to exercise your privacy rights, or to
            submit a complaint, contact us at{' '}
            <a
              href="mailto:hello@rotationanalytics.ca"
              className="text-brand-navy underline hover:text-brand-navy-dark"
            >
              hello@rotationanalytics.ca
            </a>
            .
          </p>
          <p className="text-slate-700 leading-relaxed mb-1">
            <strong>Rotation Analytics</strong>
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            A division of Visser Ventures Corp.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Rotation Analytics will make every reasonable effort to respond to a complaint
            within thirty (30) days of submission.
          </p>

          {/* Footer links */}
          <div className="border-t border-slate-200 mt-12 pt-6">
            <p className="text-sm text-slate-500">
              See also:{' '}
              <Link
                href="/terms-of-service"
                className="text-brand-navy underline hover:text-brand-navy-dark"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
