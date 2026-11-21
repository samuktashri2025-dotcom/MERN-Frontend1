import PageHead from '../components/PageHead.jsx';

const terms = [
  ['1. Enrolment', <p key="enrolment">By creating an account or attending a class you agree to these terms. You must be 18 or older to enrol yourself; a parent or guardian must enrol anyone younger.</p>],
  ['2. Payments and refunds', <ul key="payments"><li>Class packs and memberships are paid in advance.</li><li>Cancel a booked class at least 12 hours ahead to keep your credit.</li><li>Unused credits expire 90 days after purchase and are not refundable, except where the law requires.</li></ul>],
  ['3. Health and safety', <p key="health">Tell your teacher about any injury or medical condition before class. You dance at your own risk and should stop if you feel pain. Wear suitable clothing and footwear.</p>],
  ['4. Studio conduct', <p key="conduct">Treat teachers and dancers with respect. We may remove anyone whose behaviour affects the safety or enjoyment of others.</p>],
  ['5. Photos and video', <p key="photos">We may film showcases and share clips. Tell us in writing if you do not want to appear.</p>],
  ['6. Changes to classes', <p key="changes">We may change timetables or teachers, and will give notice by email. If we cancel a class, you receive a credit.</p>],
  ['7. Contact', <p key="contact">Questions about these terms: hello@maplefloordance.example.</p>],
];

const privacy = [
  ['What we collect', <ul key="collect"><li>Account details: name, email and password (stored encrypted).</li><li>Booking and attendance history.</li><li>Health notes you choose to share with teachers.</li><li>Messages you send through our contact form.</li></ul>],
  ['How we use it', <p key="use">We use your information to run classes, process bookings, send timetable updates and answer your questions. We send marketing email only if you opt in.</p>],
  ['Sharing', <p key="sharing">We never sell your data. We share it only with service providers who help us run the studio, such as payment and email services, and when the law requires it.</p>],
  ['Cookies', <p key="cookies">We use essential cookies to keep you logged in. Analytics cookies are used only with your consent.</p>],
  ['Your rights', <p key="rights">You can ask to see, correct or delete your data at any time by emailing hello@maplefloordance.example. We keep records only as long as needed to provide our services or meet legal duties.</p>],
  ['Children', <p key="children">Accounts for children are created and managed by a parent or guardian.</p>],
];

export default function Legal({ type }) {
  const isTerms = type === 'terms';
  const sections = isTerms ? terms : privacy;
  return (
    <>
      <PageHead title={isTerms ? 'Terms and conditions' : 'Privacy policy'}>Last updated: 19 November 2026</PageHead>
      <section>
        <div className="wrap"><div className="doc">
          {sections.map(([heading, content]) => <section key={heading}><h2>{heading}</h2>{content}</section>)}
        </div></div>
      </section>
    </>
  );
}
