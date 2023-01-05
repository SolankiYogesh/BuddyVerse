import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {ms} from 'react-native-size-matters';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import {colorPalates} from 'theme';
import DataPolicyScreenStyle from './DataPolicyScreenStyle';

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={DataPolicyScreenStyle.container}>
      {/* <SettingHeader title="Data policy" /> */}
      <ScreenHeader isBackVisible={true} title="Data Policy" />
      <View style={DataPolicyScreenStyle.mainContainer}>
        <ScrollView>
          <Text style={DataPolicyScreenStyle.headerTitle}>Data Policy</Text>
          <Text style={{marginLeft: ms(24), color: colorPalates.grayShade8F}}>
            Last updated on July 2022
          </Text>
          <View>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE I. INTRODUCTION
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}GREENLYNC, Inc. (hereinafter “Company”) will be collecting
              information which you provide on the GREENLYNC. Platform
              (hereinafter “Platform”), as a result of your use of GREENLYNC’s:
              {'\n\n'}(a) MobileApp
              {'\n\n'}(b) websites, portals, mobile applications, channels,
              software, social media pages, applications, platforms and channels
              (collectively, the “Websites”) and
              {'\n\n'}(c) including any services, features, media, functions,
              content, tools and links contained or offered therein
              (collectively, the “Services”). By accessing or using the Website
              or the App, You expressly accept all of the provisions of this
              Terms of Service.
              {'\n\n'}These are collectively referred to as the “Platform”.
              {'\n\n'}This Privacy Policy sets forth User’s rights with respect
              to User’s information, how to request User’s information and shall
              determine how said information may be used.
              {'\n\n'}A. Definitions: These terms are used throughout this
              Privacy Policy and may not be defined in the sections or
              paragraphs they appear.
              {'\n\n'}1) Consumers: users of our Services.
              {'\n\n'}2) Organizer: event creators using the Services to create
              events for Consumers using our Services
              {'\n\n'}3) Users: Consumers and Third Parties using our Services.
              {'\n\n'}4) Company: GREENLYNC, Inc. (also referred to as “we”,
              “us”)
              {'\n\n'}5) Non Personal Data: any information that does not relate
              to a person and/or cannot be used to identify a person. When you
              interact with the Services, we may collect Non-Personal Data. The
              limitations and requirements in this Privacy Policy on our
              collection, use, disclosure, transfer and storage/retention of
              Personal Data do not apply to Non-Personal Data.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE II. INFORMATION
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Account Information: User shall provide information to
              set up an account (a “UserAccount”). Said information may include,
              but is not limited to:
              {'\n\n\t\t'}1) full name
              {'\n\n\t\t'}2) e-mail address
              {'\n\n\t\t'}3) home address
              {'\n\n\t\t'}4) phone number
              {'\n\n\t\t'}5) gender
              {'\n\n\t\t'}6) profile
              {'\n\n\t\t'}7) date of birth
              {'\n\n'}Users will also be required to submit verification of
              their information. Said verification
              {'\n\n'}may be driver’s licenses, passport, medical marijuana
              card, etc. User warrants and represents that said verification is
              valid and accurate, and acknowledges that Company will rely on
              said verification. To the extent that said verification is not
              valid and accurate, User holds Company harmless from any
              consequences which may result therefrom.
              {'\n\n'}In setting up your account for some Services on the
              Platform, you may also be asked to share details about your
              personality, lifestyle, interests and other details about You, as
              well as content such as photos and videos. Some of the information
              You choose to provide may be considered “special” or “sensitive”
              in certain jurisdictions, for example your racial or ethnic
              origins, sexual orientation and religious beliefs. By choosing to
              provide this information, you consent to our processing of that
              information.
              {'\n\n'}B. Public Content: User acknowledges that the Websites or
              Services provides a means to contribute feedback, experiences,
              posts and other communication such as reviews of products, tips,
              photos, videos, check-ins, comments tips, photos, videos,
              check-ins, comments, likes, posts, events, bookmarks, friends,
              lists, compliments, and User Account name and profile photo that
              will be open to the public (hereinafter “Public Content”).
              {'\n\n'}C. Communications: User acknowledges that Platform
              provides a means to communicate with other Users, Retailers, or
              other brands through the Websites or Services. User acknowledges
              that should User opt in to Platform services, any such
              communication may be collected by Company to provide User with
              better service.
              {'\n\n'}1) Communication may be collected from User’s use of any
              of the Websites or Services on Platform. Said communication may be
              logged and/or stored by Company.
              {'\n\n'}2) Information collected through communication may be used
              to facilitate User’s navigation of the Websites and Services on
              the Platform, and to facilitate customer service and support.
              Collection of such information is necessary to send newsletters,
              surveys, offers, and other promotional materials. User may opt out
              of direct marketing e-mails by following the instructions
              contained within the promotional e-mails. User may also change
              communication preferences on User’s Account.
              {'\n\n'}D. Transactional Information: Conducting a transaction
              through any of the Websites or Services on the Platform (the
              “Transaction Sites”), requires User to submit personal information
              such as name, telephone number, billing address, shipping address,
              and e-mail address.
              {'\n\n'}1) Use of the Transaction Sites to complete credit card
              transactions and order fulfillment are handled by established
              third-party retailers, banking managers, processing agents, and
              distribution institutions. User’s information will be used by said
              third parties to verify and authorize credit card or other payment
              information and to process and ship the order, and are subject to
              their Privacy Policies.
              {'\n\n'}2) Users may submit data that may be considered personal
              medical information, such as medical marijuana recommendations for
              orders placed through the Website or Services. This can include
              order history. Company may use this information to facilitate
              transactions, from receiving orders to sending communications
              about them to User. Some of this information will be shared with
              third parties, such as dispensaries or delivery carriers, to help
              facilitate the transaction.
              {'\n\n'}3) You may participate in promotional campaigns, surveys
              or other events in which you are required to provide your full
              name, phone number, mailing address, e-mail address and other
              personal information.
              {'\n\n'}4) You may utilize location services on our Platform for
              the purposes of finding Services via your mobile device.
              Information about your approximate location from such devices may
              be collected. The Information that may be gathered include, but is
              not limited to:
              {'\n\n'}(a) log in data and device information including browser
              type, domain name,
              {'\n\n'}(b) the website the led you to our Platform
              {'\n\n'}(c) the websites you go after leaving our Platform
              {'\n\n'}(d) the dates and times you access our Platform, device
              ID, and browsing activities within our Platform (e.g., links you
              click, searches you run, searches you run, the date and time of
              your visit or order, the amount of time you spend on the specific
              pages, the businesses you call, e-mail or chat using our Platform
              the orders and purchases you make through our Platform).
              {'\n\n'}E. Activity: Company may collect information about you,
              User, through the use of Websites and Services on the Platform,
              including geographic location, IP address, browser type, domain
              name, and User’s tendencies and preferences while on the Platform.
              The purpose of this gathering of information is to allow Company
              to provide User with Websites and Services that are specific to
              User’s taste and overall lifestyle.
              {'\n\n'}F. Third-party Cannabis Related Businesses: Through our
              platform, you will have access to Retailers/Vendors who can supply
              you product. These Retailers/Vendors will be referred to
              hereinafter as CRBs. Said CRBs may provide us with information
              about you. Said Information may be personal information which may
              include preferences, frequency of use, etc.
              {'\n\n'}1) Your transactions with CRBs may involve the use of
              point of sale providers (hereinafter POS) whose function is to
              enable the CRBs to process and complete your transactions. They
              also help the CRBs manage inventory, maintain records and report
              transactions in compliance with any applicable laws. The POS may
              share Information you give in completing your transactions with us
              to allow us to enrich your use of the Website and Services.
              {'\n\n'}2) The CRBs may obtain other Information about you through
              promotional programs. They may share that information with us.
              {'\n\n'}G. Third-party log in service: If you use a third-party
              log-in service such as Twitter, Facebook, or Google, the provider
              of the third-party log-in service will share personal information
              about you (name, address etc.) with us so we can create your User
              Account.
              {'\n\n'}H. Internet or other electronic network activity: When you
              use the Website and Services, certain information such as browsing
              history, and search history may be collected. Said information is
              obtained from your browser and device using cookies, tags, pixels,
              and other similar technology.
              {'\n\n'}1) Such information is used to enhance your experiences on
              the Platform. The Information allows us to personalize the offers
              available to you.
              {'\n\n'}2) The information is also used by us to conduct market
              research and data analysis to improve the services provided to
              you.
            </Text>

            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE III. USE OF INFORMATION
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Purpose of information: Company may collect and use
              information for the following purposes:
              {'\n\n'}1) To track usage of the Websites and Services, analyze
              system administration, debug and identify repairs, and back up our
              systems to allow for disaster recovery, based on our legitimate
              interest in operating and administering the continued availability
              our Services and Websites.
              {'\n\n'}2) To detect security incidents and protect, investigate,
              prevent, and potentially take action against possible deceptive,
              fraudulent, unauthorized, malicious or illegal activities, and to
              respond to claims that Website content is inauthentic,
              counterfeit, or otherwise violates the rights of third parties,
              based on our legitimate interest in promoting the safety and
              security of the systems and applications used for our Websites and
              Services and in protecting our rights, your rights, and the rights
              of others.
              {'\n\n'}3) To improve, upgrade, and enhance the Websites and
              Services, based on our legitimate interest in providing you and
              other users with an optimal user experience.
              {'\n\n'}4) To enforce our Terms of Use, this Privacy Policy, Data
              Policy, Community Standards, and any other policies governing your
              access to or use of any of the Websites or Services.
              {'\n\n'}5) Any other purpose you consent to either explicitly or
              implicitly by your use of the Platform.
              {'\n\n'}B. Sharing of Information: Company does not generally
              share User’s personal information, but may (as a result of your
              explicit consent or implied consent by virtue of your use of the
              Platform) in the following limited circumstances:
              {'\n\n'}1) With third parties such as dispensaries to fulfill
              orders or requests placed by User on the Platform
              {'\n\n'}(a) conducting a transaction through our Website or
              Services may result in us sharing your Information with CRBs in
              order to complete said transaction.
              {'\n\n'}(b) if as a result of your use of the Website and Services
              you contact a CRB, we may share basic information about your
              contact such as the date and time you contacted them.
              {'\n\n'}2) Company may disclose your information if we believe
              doing so is appropriate or necessary to prevent any liability, or
              fraudulent, abusive, or unlawful uses, or to protect Company, our
              Platform, or any rights, property, or personal safety of Company
              or others.
              {'\n\n'}(a) we may disclose your information to government
              officials, law enforcement or private parties if: i) it is
              reasonably necessary in order to comply with federal, state, or
              local lawful requests; ii) it is reasonable to do in order to
              prevent, investigate, or identify possible wrongful conduct in
              connection with our Platform; iii) it is necessary to do so in
              order to protect our rights, reputation, property, or that of our
              users, affiliates, clients, partners, or the public.
              {'\n\n'}3) In the event that Company is or may be acquired by or
              merged with another company or involved in any other business deal
              (or negotiation of a business deal) involving sale or transfer of
              all or part of our business or assets, we may transfer or assign
              your information as part of or in connection with the transaction
              and such acquirer or merged entity may thereafter utilize your
              personal information in accordance with this Privacy Policy.
              Finally, in the event of insolvency, bankruptcy, or receivership,
              information may be transferred as a business asset. You
              acknowledge and agree that any successor to or acquirer of
              Eventbrite (or its assets) will continue to have the right to use
              your Personal Data and other information in accordance with the
              terms of this Privacy Policy.
              {'\n\n'}4) Company may also share your information with our
              affiliates as described above for any purpose consistent with this
              Privacy Policy.
              {'\n\n'}5) Company may share your information with service
              providers who perform services on our behalf in order to ensure
              maximum efficiency and benefit to users such as communications and
              hosting services, network security, technical and customer
              support, tracking and reporting functions, quality assurance
              testing, payment processing, marketing and promotional features,
              identification verification, product listings, and brand
              management.
              {'\n\n'}6) As a Platform, there are third-party listings on the
              Platform. User acknowledges that they are third parties even if,
              by the appearance on the Platform, they may seem to be part of
              Company. By interacting with said third party, User is sharing
              their personal information with said third parties.
              {'\n\n'}7) If you log in from a third party service such as
              Twitter, Facebook, Google or Apple, we and the third party may
              receive and share information about you and your use of our
              Platform.
              {'\n\n'}(a) You may connect your account to your accounts on third
              party services like Facebook, in which case we may collect, use,
              disclose, transfer and store/retain information relating to your
              account with such third party services in accordance with this
              Privacy Policy. For example, if you connect with Facebook, we
              store your Facebook id, first name, last name, email, location,
              friends list and profile picture and use them to connect with your
              Facebook account to provide certain functionality on the Services,
              like recommending events that your Facebook friends are interested
              in and sharing the events you are interested in, or attending,
              with certain groups of people like your Facebook friends.
              {'\n\n'}(b) In addition, when you “like” or “follow” us on
              Facebook, Instagram, Twitter or other social media sites (to the
              extent we provide that capability), we may collect some
              information from you including your name, email address, and any
              comments or content you post relevant to us. We likewise may
              collect your information if you sign up for one of our promotions
              or submit information to us through social media sites.
              {'\n\n'}8) Company may share your Information in marketing with
              third parties (advertisers, brand managers and content
              distributors).
              {'\n\n'}9) User’s Medical Marijuana Information will NOT be used
              for marketing purposes, except in the aggregate or with your
              consent.
              {'\n\n'}10) When you register for an event, sign up for
              communications, enter a contest, or otherwise input your Personal
              Data (such as through a web form) to communicate with an Organizer
              or participate in an Organizer event, that Organizer will receive
              that information. For instance, if you input your name and email
              address into a web form for an Organizer offer, activity or event,
              the Organizer will receive that information. The Organizer may
              then send you marketing or other communications, which may be
              subject to its own, separate privacy policy. Likewise, if you
              provide your mobile phone number, you may receive information
              messages related to the service, event, activity or information in
              which you’ve expressed interest.
              {'\n\n'}(a) We are not responsible for the actions of these
              Organizers, or their Third Party Organizers (or other downstream
              recipients of your Personal Data), with respect to your Personal
              Data. It is important that you review the applicable policies of
              the Organizers, and if applicable and available, their appointed
              Third Party Organizers, of an event (and the related fundraising
              page, if applicable) before providing Personal Data or other
              information in connection with that event or related fundraising
              page.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE IV. COOKIES
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Company may use cookies, web beacons, tags, scripts,
              local shared objects such as HTML (and all versions thereof),
              advertising identifiers (including mobile identifiers such as
              Apple’s IDFA or Google’s Advertising ID) and similar technology
              (“Cookies”) in connection with the use of the Websites or
              Services. Company may also use third parties, like Google
              Analytics or Optimizely, to help process this information.
              {'\n\n'}B. Cookies collect and transmit information about User,
              such as your use of the Platform; your browser type, search
              preferences, IP address; and the date and time of your use.
              Cookies may have unique identifiers, and reside, among other
              places, on your computer or mobile device, in e-mails Company
              sends to you, and on our web pages.
              {'\n\n'}C. Company may use both session-based and persistent
              Cookies. Session-based Cookies exist only during one session and
              disappear from your device when you close your browser or turn off
              your device. Persistent Cookies remain on your computer or device
              after you close your browser or turn off your computer.
              {'\n\n'}D. Cookies used may be of the following different
              categories of Cookies:
              {'\n\n'}1) Operationally Necessary. Cookies used for the proper
              operation of Websites, Services, and relevant essential
              applications, features, and tools. This includes but is not
              limited to technologies (i) that allow you to access our Services,
              applications, and tools, (ii) that are required to identify
              irregular site behavior, prevent fraudulent activity, and improve
              security, or (iii) that allow you to use our other ancillary
              functions such as shopping carts, saved searches, or similar
              features. If you prevent these cookies, we cannot guarantee that
              the Websites or Services will function.
              {'\n\n'}2) Performance Related. Performance-related cookies
              collect information related to your use of the Website or
              Services, such as web page analytics or error reports. These
              Cookies are used to assess the performance of our Websites,
              Services, and relevant applications, features, and tools, and to
              help understand how people use them.
              {'\n\n'}3) Functionality Related. Functionality-related cookies
              offers enhanced functionality and personalization when accessing
              or using the Platform (Websites, Services, and relevant
              applications, features, and tools). This may include technologies
              (i) that identify you when you sign into our Websites or Services,
              (ii) that keep track of your specified preferences, interests, or
              past items viewed so that we may enhance the presentation of
              content on our Websites or Services, (iii) that determine if you
              have interacted with our messaging and notifications, or (iv) that
              improve upon or create new Website content, applications,
              products, Services, features, or tools.
              {'\n\n'}4) Advertising or Targeting Related. Marketing cookies
              help to deliver content, including ads relevant to your interests,
              on our sites or on third-party sites. This involves using
              technologies to understand data relating to advertisements that
              have been displayed to you or that you have clicked on. This helps
              us determine the usefulness of the advertisements and content that
              has been delivered to you.
              {'\n\n'}a) Company may work with third parties to enhance the
              Platform for User’s benefit, and these companies use their own
              cookies when they serve you content on our site. Company may not
              have access to or control over the Cookies they use.
              {'\n\n'}E. Managing Cookies: It may be possible to delete, block,
              or disable Cookies through your device or browser settings. User
              acknowledges that such action may result in User’s inability to
              access all the features of Platform. The method for disabling
              Cookies may vary by device and browser, but can usually be found
              in preferences or security settings. Please note that disabling a
              cookie or category of cookies does not delete the cookies from
              your browser unless manually completed through your browser
              function.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE V. THIRD PARTIES
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Third parties may receive information about you as
              follows:
              {'\n\n'}1) Advertisers: Company does not disclose your personal
              information to third parties for the purpose of directly marketing
              their services to you unless you first agree to such disclosure.
              However, we may allow third-party Cookies to collect the same type
              of information for the same purposes that Company does for itself.
              In doing so, Company adheres to the Digital Advertising Alliance’s
              Self-Regulatory Principles for Online Behavioral Advertising.
              {'\n\n'}2) Service Providers: Company may rely on third parties to
              provide some of the features and services that are available
              through the Websites or Services, such as communications and
              hosting services, network security, technical and customer
              support, tracking and reporting functions, quality assurance
              testing, payment processing, point-of-sale service providers,
              marketing and promotional features, product listings, and brand
              management. In order to facilitate this, it may be necessary to
              share information from or about you with these third-party
              providers so that they may, for example, complete your requests.
              To the extent that Company uses third parties such as Google Maps
              API, this Privacy Policy shall incorporate theirs by reference.
              {'\n\n'}a) Note that point-of-sale service providers may use your
              order-related information as required to process and report
              cannabis transactions under applicable law. b) There may be
              instances where your information such as location identifiers,
              Medical Marijuana Information, and requested products may be
              shared by us in order to facilitate your order. Such information
              may be necessary to ensure proper handling of your transaction
              under the rules and regulations where you are located.
              {'\n\n'}c) Note that the CRB may share your information with the
              point-of-sale service provider to complete your transaction.
              {'\n\n'}B. Aggregate Information: Company may share user
              information in the aggregate with third parties such as
              advertisers, brand managers, and content distributors. Where
              possible, Company will attempt to keep User anonymous in these
              instances.
              {'\n\n'}C. Businesses on Platform: Company may share information
              from or about User (such as age and gender, devices, and use of
              the Websites and Services) with third-party businesses listed on
              the Websites or Services. Said businesses may see your Public
              Content and receive information about your transactions as defined
              in Section III B above.
              {'\n\n'}D. Unlawful activity: Company does not allow User to
              conduct any unlawful activity on the Platform. In the event User
              does engage in unlawful activity, and/or Company suspects such,
              Company may and disclose information from or about User to third
              parties like law enforcement. Company will only take this action
              based on a good faith belief that such investigation or
              disclosure: (i) is reasonably necessary to comply with federal,
              state, or local legal process and legally binding law enforcement
              instructions and orders, such as a search warrant, subpoena,
              statute, judicial proceeding, or other legal process served on us;
              (ii) is helpful to prevent, investigate, or identify possible
              wrongdoing in connection with the Websites or Services; or (iii)
              protects our rights, reputation, property, or that of our users,
              affiliates, clients, partners, or the public.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE VI. MANAGING AND DELETING INFORMATION
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Right to Access and Manage Your Information: As the
              owner of the Information, User must maintain the accuracy of the
              personal information in the User Account. In order to do so, User
              has the right to access, review or amend/update the information
              contained in the User Account.
              {'\n\n'}1) In order to exercise the right, User must submit a Data
              Request to Company pursuant to the procedure contained herein.
              {'\n\n'}B. Right to delete User information: While User has the
              right to delete certain personal information doing so may affect
              the accuracy and availability of services on Websites or Services.
              {'\n\n'}1) Certain information must be retained for legitimate
              business or legal purposes, or for any purposes authorized under
              this Privacy Policy unless prohibited by law. Such information
              includes, but is not limited to information necessary to establish
              User’s legal standing to use the services provided on Company’s
              Platform, or information Company is legally required to retain to
              prevent, investigate, or identify possible wrongdoing in
              connection with the Websites or Services, or to comply with legal
              obligations. Some information may be retained in a limited
              internal purpose for internal administration, such as in backup
              files maintained for data integrity and disaster recovery. Company
              will take steps to delete information where reasonably possible.
              {'\n\n'}2) We and third-party businesses listed on the Websites or
              Services may be required to maintain records of purchases for a
              limited period pursuant to federal, state, or local law. Also, any
              public postings or other communications you have made on the
              Websites or Services, such as in forums or blogs, generally cannot
              be removed, so please be mindful of the information you include
              there.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE VII. THIRD PARTY USER DATA
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Third-party businesses: Third-party businesses using
              the Websites and/or Services may bring their own Users
              (“Third-party Users”) to Platform and submit electronic data or
              information in their possession about their own Users
              (“Third-party User Data”). Such information may include, but is
              not limited to name, location, email address.
              {'\n\n'}B. Company use: Any use of Third-Party User Data by
              Company is subject to this Privacy Policy, the Terms of Use, the
              Data Policy, the Community Standards, or any applicable laws or
              regulations.
              {'\n\n'}C. Third-party User Access: Third-party Users may access
              their information to revise or delete their data, subject to the
              provisions set forth in Article VI above, by accessing Article VII
              below.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE VIII. ACCESS TO INFORMATION
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Procedure: In the event User desires access to User’s
              Information, the following procedures must be followed.
              {'\n\n'}1) User must notify Company in writing (via email) of
              User’s request.
              {'\n\n'}2) User must verify identity in order to proceed with
              access to User’s Information. Verification shall be of the type
              set forth in Article II A above.
              {'\n\n'}3) User’s personal information will be released ONLY to
              User.
              {'\n\n'}B. Response to request for access: Upon proper request for
              access, Company will arrange for User access.
              {'\n\n'}1) Company shall respond within thirty (30) days of
              Request.
              {'\n\n'}C. Excessive requests: In the event User makes multiple or
              excessive requests for access, Company may charge an
              administrative fee, or in the alternative, if Company determines
              that User has made multiple requests that may be unreasonable and
              burdensome, Company may refuse access.
              {'\n\n'}D. Company contact information: User shall submit Requests
              to: Customerservice@GREENLYNC.com.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE IX. RIGHT TO CANCEL OR MODIFY MARKETING COMMUNICATIONS
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. User right to cancel: User may cancel or modify the
              e-mail marketing communications received from Company.
              {'\n\n'}B. Procedure: User may cancel by following the
              instructions contained within the promotional e-mails or, in some
              cases, by logging into User Account and changing your
              communication preferences.
              {'\n\n'}C. Limited nature of opt out: Canceling or modifying will
              not affect subsequent or different subscriptions–if your opt-out
              preferences are limited to certain types of e-mails, the opt-out
              will be so limited. In addition, User cannot opt out of receiving
              certain administrative, transactional, or legal messages Company
              may send in the course of legitimate business if User has signed
              up for a User Account and/or uses certain features.
              {'\n\n'}1) Such announcements can be terminated by closing the
              User Account.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE X. PRIVACY NOTICE FOR CALIFORNIA RESIDENTS
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. California User rights under the California Consumer
              Privacy Act (“CCPA”): California consumers have certain rights in
              addition to those set forth in this Privacy Policy regarding
              personal information. You have the right to request the following
              information:
              {'\n\n'}1) the categories of personal information (as defined in
              California Civil Code Sec. 1798.80(e)) we have collected;
              {'\n\n'}(a) information collected when you created your User
              Account, used the Website and Services.
              {'\n\n'}2) the categories of sources from which your personal
              information is collected;
              {'\n\n'}3) the business or commercial purpose for collecting or
              selling your personal information;
              {'\n\n'}4) the categories of third parties with whom we share
              personal information;
              {'\n\n'}5) the specific pieces of personal information we have
              collected about you; mailing address, account name, social
              security number, driver’s license number, passport number or any
              other such information.
              {'\n\n'}B. Right to delete: User may request Company delete any of
              the personal information that collected from User as a result of
              use of the Platform and retained, subject to certain exceptions.
              {'\n\n'}C. Exercise rights: To exercise any of the rights listed
              in this section, User must follow the procedures set forth in
              Articles VI – IX above.
              {'\n\n'}1) Any disclosures provided will only cover the 12-month
              period preceding the verifiable Request’s receipt.
              {'\n\n'}2) If Company is unable to comply with a request, User
              will be informed of the reason why.
              {'\n\n'}D. Information Collected: The information collected and
              the use thereof is as set forth in this Privacy Notice above.
              {'\n\n'}1) Information collected generally is not sold (as such
              term is defined in the California Consumer Privacy Act).
              {'\n\n'}(a) If said personal information were to be sold, it will
              not be done without providing User the opportunity to opt out.
              {'\n\n'}(b) “Sold” under California law may include using targeted
              advertising on our Website or Services. It may also include how
              third party services are used on the Website and Services.
              {'\n\n'}E. Cal Civ Code Sec 1998.83 Disclosure: User has the right
              to opt out of information sharing as set forth in Article IX,
              Section C of this Privacy Policy, however as set forth therein
              there are some instances where User cannot opt out or in.
              {'\n\n'}1) With regard to the information obtained for which User
              cannot opt out of, User may request and obtain from Company once a
              year and at no charge, a list of the kinds of personal information
              that the business has disclosed to third parties for direct
              marketing purposes during the preceding calendar year; and the
              names and addresses of all of the third parties that received
              personal information from the business for direct marketing
              purposes during the preceding calendar year. If the nature of the
              third parties’ business cannot be reasonably determined by its
              name, the business must also provide examples of the products or
              services marketed by the third party “sufficient to give the
              customer a reasonable indication of the nature of the third
              parties’ business”, if known by the business.
              {'\n\n'}F. Non-Discrimination Policy: California residents who
              choose to exercise the rights described in this section will not
              be denied any goods or services, charged different prices or
              rates, or be provided a different level or quality of goods or
              services unless those differences are related to your personal
              information.
              {'\n\n'}1) We will not discriminate against you for exercising any
              of the rights set forth herein.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE XI. SECURITY
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Company measures: Company has implemented a number of
              measures to help protect your personal information. These measures
              include, but are not limited to, minimizing access to personal
              information to employees with a need to access it, and encrypting
              personal information provided through the Platform. Said measures
              provide protection to the best of Company’s ability.
              {'\n\n'}B. User’s efforts: User may protect personal information
              by engaging in practices such as choosing a robust password for
              your device and/or account that nobody else knows or can easily
              guess, and keeping your log-in and password private.
              {'\n\n'}1) It is important for User to protect against
              unauthorized access to User’s account, password, and computer. Be
              sure to sign off of your account when finished, especially when
              using a shared computer.
              {'\n\n'}C. Compromise by third-parties: Company is not responsible
              for the actions or activities of unauthorized third parties who
              compromise our security measures, and Company cannot be
              responsible for such unauthorized party’s access, acquisition, or
              distribution of User’s personal information. If Users believe
              personal information has been compromised, User must notify
              Company immediately using the contact information above.
              {'\n\n'}D. Company may retain some personal information about User
              in accordance with our record retention policies, as required by
              law, or as required for the achievement of the purposes of the
              processing as mentioned above (e.g., to enforce any agreements or
              provide a product/service).
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE XII. CHANGES TO PRIVACY POLICY
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Changes: It may become necessary for Company to make
              changes to this Privacy Policy to as a result of changes in the
              market place, advancements in technology, and/or enhancements,
              among other things. When changes are made to this Privacy Policy,
              Company will notify Users by:
              {'\n\n'}1) sending an e-mail to the e-mail address you most
              recently provided; or
              {'\n\n'}2) sending a push notification or in-app notification; or
              {'\n\n'}3) prominently posting a notice of the changes on those
              Websites.
              {'\n\n'}4) in addition, Company will post privacy policies or
              statements on Websites or Services where those additional policies
              apply.
            </Text>
            <Text style={DataPolicyScreenStyle.subHeaderTitle}>
              ARTICLE XIII. EXCLUSIONS
            </Text>
            <Text style={DataPolicyScreenStyle.termsOfUseTextContainer}>
              {'\n\n'}A. Personal Information Provided to Others: This Privacy
              Policy does not apply to any Personal Information that you provide
              to another User or visitor through the Services or through any
              other means, including to Organizers on event pages or information
              posted by you to any public areas of the Services.
              {'\n\n'}B. Third Party Links: This Privacy Policy applies only to
              the Services. The Services may contain links to other websites not
              operated or controlled by us (the “Third Party Sites”). The
              policies and procedures we described here do not apply to the
              Third Party Sites. The links from the Services do not imply that
              we endorse or have reviewed the Third Party Sites. We suggest
              contacting those sites directly for information on their privacy
              policies.
              {'\n\n'}C. Childrens Online Privacy Protections Act: We do not
              knowingly collect Personal Information from children under the age
              of thirteen (13). If you are under the age of thirteen (13), you
              are not authorized to be on the Platform and you must exit
              immediately and please do not submit any Personal Information
              through the Services. We encourage parents and legal guardians to
              monitor their children’s Internet usage and to help enforce our
              Privacy Policy by instructing their children never to provide
              Personal Information through the Services without their
              permission. If you have reason to believe that a child under the
              age of 13 has provided Personal Information to us through the
              Services, please contact us and we will endeavor to delete that
              information from our databases.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default PrivacyPolicyScreen;
