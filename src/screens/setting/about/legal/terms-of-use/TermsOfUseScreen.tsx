import React from 'react';
import {View, Text, ScrollView, SafeAreaView, Linking} from 'react-native';
import {ms} from 'react-native-size-matters';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import {colorPalates, fonts} from 'theme';
import TermsOfUseScreenStyle from './TermsOfUseScreenStyle';

const TermsOfUseScreen = () => {
  return (
    <SafeAreaView style={TermsOfUseScreenStyle.container}>
      {/* <SettingHeader title="Terms of Use" /> */}
      <ScreenHeader isBackVisible={true} title="Terms of Use" />
      <View style={TermsOfUseScreenStyle.mainContainer}>
        <ScrollView>
          <View>
            <Text style={TermsOfUseScreenStyle.headerTitle}>Terms of Use</Text>
            <Text style={{marginLeft: ms(24), color: colorPalates.grayShade8F}}>
              Last updated on July 2022
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              Introduction
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              THESE TERMS OF USE WAIVE SUBSTANTIAL RIGHTS AND INCLUDE A RELEASE
              OF LIABILITY AND A LIMITATION OF DAMAGES. YOU ACKNOWLEDGE THAT YOU
              HAVE THE RIGHT TO REVIEW THESE TERMS OF USE WITH AN ATTORNEY. YOU
              ALSO ACKNOWLEDGE THAT YOU HAVE READ THIS ENTIRE DOCUMENT AND THAT
              YOU ARE AWARE THAT YOU HAVE GIVEN UP SUBSTANTIAL RIGHTS BY
              AGREEING TO THESE TERMS OF USE. YOU HAVE NO OBLIGATION TO USE THE
              PLATFORM/WEBSITE, THE MOBILE APP OR THE SERVICES, OR AGREE TO
              THESE TERMS OF USE, BUT YOU ARE DOING SO VOLUNTARILY AND
              UNDERSTAND THAT GREENLYNC MAY UPDATE THESE TERMS OF USE IN ITS
              DISCRETION. YOUR USE OF THE PLATFORM/WEBSITE AND THE PLATFORM IS
              EXPRESSLY SUBJECT TO YOUR ACCEPTANCE OF THESE TERMS OF USE, AND
              YOU MAY NOT USE THE PLATFORM/WEBSITE UNLESS AND UNTIL YOU HAVE
              ACCEPTED AND AGREED TO BE BOUND BY THESE TERMS OF USE.
              {'\n\n'}
              Welcome to GREENLYNC, a virtual marketplace and social platform.
              GREENLYNC through its Platform (“Platform”) provides you with a
              means to connect with third parties which will enhance your social
              experiences.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>Important</Text>
            <Text
              style={{
                textAlign: 'justify',
                marginHorizontal: ms(24),
                marginTop: 4,
                color: colorPalates.blackShade20,
                fontFamily: fonts.primarySemiBoldFont,
              }}
            >
              We reserve the right, at any time and without prior notice, to
              remove or disable access to content at our discretion for any
              reason or no reason. Some of the reasons we may remove or disable
              access to content may include finding the content objectionable,
              in violation of these Terms or our Community Policy, or otherwise
              harmful to the Services or our users. Our automated systems
              analyze your content (including emails) to provide you personally
              relevant product features, such as customized search results,
              tailored advertising, and spam and malware detection. This
              analysis occurs as the content is sent, received, and when it is
              stored. there is no tolerance for objectionable content or abusive
              users.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              User-Generated Content
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              Users of the Services may be permitted to upload, post or transmit
              (such as via a stream) or otherwise make available content through
              the Services including, without limitation, any text, photographs,
              user videos, sound recordings and the musical works embodied
              therein, including videos that incorporate locally stored sound
              recordings from your personal music library and ambient noise
              (“User Content”). Users of the Services may also extract all or
              any portion of User Content created by another user to produce
              additional User Content, including collaborative User Content with
              other users, that combine and intersperse User Content generated
              by more than one user. Users of the Services may also overlay
              music, graphics, stickers, Virtual Items (as defined and further
              explained Virtual Items Policy) and other elements provided by
              BuzzLync/GreenLync (“BuzzLync/GreenLync Elements”) onto this User
              Content and transmit this User Content through the Services. The
              information and materials in the User Content, including User
              Content that includes BuzzLync/GreenLync Elements, have not been
              verified or approved by us. The views expressed by other users on
              the Services (including through use of the virtual gifts) do not
              represent our views or values. {'\n\n'}Whenever you access or use
              a feature that allows you to upload or transmit User Content
              through the Services (including via certain third party social
              media platforms such as Instagram, Facebook, YouTube, Twitter), or
              to make contact with other users of the Services, you must comply
              with the standards set out at “Your Access to and Use of Our
              Services” above. You may also choose to upload or transmit your
              User Content, including User Content that includes
              BuzzLync/GreenLync Elements, on sites or platforms hosted by third
              parties. If you decide to do this, you must comply with their
              content guidelines as well as with the standards set out at “Your
              Access to and Use of Our Services” above. As noted above, these
              features may not be available to all users of the Services, and we
              have no liability to you for limiting your right to certain
              features of the Services.{'\n\n'}You warrant that any such
              contribution does comply with those standards, and you will be
              liable to us and indemnify us for any breach of that warranty.
              This means you will be responsible for any loss or damage we
              suffer as a result of your breach of warranty. Any User Content
              will be considered non-confidential and non-proprietary. You must
              not post any User Content on or through the Services or transmit
              to us any User Content that you consider to be confidential or
              proprietary. When you submit User Content through the Services,
              you agree and represent that you own that User Content, or you
              have received all necessary permissions, clearances from, or are
              authorised by, the owner of any part of the content to submit it
              to the Services, to transmit it from the Services to other third
              party platforms, and/or adopt any third party content. If you only
              own the rights in and to a sound recording, but not to the
              underlying musical works embodied in such sound recordings, then
              you must not post such sound recordings to the Services unless you
              have all permissions, clearances from, or are authorised by, the
              owner of any part of the content to submit it to the Services{' '}
              {'\n\n'}You or the owner of your User Content still own the
              copyright in User Content sent to us, but by submitting User
              Content via the Services, you hereby grant us an unconditional
              irrevocable, non-exclusive, royalty-free, fully transferable,
              perpetual worldwide licence to use, modify, adapt, reproduce, make
              derivative works of, publish and/or transmit, and/or distribute
              and to authorise other users of the Services and other
              third-parties to view, access, use, download, modify, adapt,
              reproduce, make derivative works of, publish and/or transmit your
              User Content in any format and on any platform, either now known
              or hereinafter invented. {'\n\n'}You further grant us a
              royalty-free license to use your user name, image, voice, and
              likeness to identify you as the source of any of your User
              Content; provided, however, that your ability to provide an image,
              voice, and likeness may be subject to limitations due to age
              restrictions. For the avoidance of doubt, the rights granted in
              the preceding paragraphs of this Section include, but are not
              limited to, the right to reproduce sound recordings (and make
              mechanical reproductions of the musical works embodied in such
              sound recordings), and publicly perform and communicate to the
              public sound recordings (and the musical works embodied therein),
              all on a royalty-free basis. This means that you are granting us
              the right to use your User Content without the obligation to pay
              royalties to any third party, including, but not limited to, a
              sound recording copyright owner (e.g., a record label), a musical
              work copyright owner (e.g., a music publisher), a performing
              rights organization (e.g., ASCAP, BMI, SESAC, etc.) (a “PRO”), a
              sound recording PRO (e.g., SoundExchange), any unions or guilds,
              and engineers, producers or other royalty participants involved in
              the creation of User Content.{' '}
              <Text style={{fontFamily: fonts.primarySemiBoldFont}}>
                Specific Rules for Musical Works and for Recording Artists
              </Text>
              . If you are a composer or author of a musical work and are
              affiliated with a PRO, then you must notify your PRO of the
              royalty-free license you grant through these Terms in your User
              Content to us. You are solely responsible for ensuring your
              compliance with the relevant PRO’s reporting obligations. If you
              have assigned your rights to a music publisher, then you must
              obtain the consent of such music publisher to grant the
              royalty-free license(s) set forth in these Terms in your User
              Content or have such music publisher enter into these Terms with
              us. Just because you authored a musical work (e.g., wrote a song)
              does not mean you have the right to grant us the license in these
              Terms. If you are a recording artist under contract with a record
              label, then you are solely responsible for ensuring that your use
              of the Services is in compliance with any contractual obligations
              you may have to your record label, including if you create any new
              recordings through the Services that may be claimed by your label.{' '}
              {'\n\n'}
              <Text style={{fontFamily: fonts.primarySemiBoldFont}}>
                Through-To-The-Audience Rights.
              </Text>
              All of the rights you grant in your User Content in these Terms
              are provided on a through-to-the-audience basis, meaning the
              owners or operators of third party services will not have any
              separate liability to you or any other third party for User
              Content posted or used on such third party service via the
              Services. {'\n\n'}
              <Text style={{fontFamily: fonts.primarySemiBoldFont}}>
                Waiver of Rights to User Content.
              </Text>
              By posting User Content to or through the Services, you waive any
              rights to prior inspection or approval of any marketing or
              promotional materials related to such User Content. You also waive
              any and all rights of privacy, publicity, or any other rights of a
              similar nature in connection with your User Content, or any
              portion thereof. To the extent any moral rights are not
              transferable or assignable, you hereby waive and agree never to
              assert any and all moral rights, or to support, maintain or permit
              any action based on any moral rights that you may have in or with
              respect to any User Content you Post to or through the Services.{' '}
              {'\n\n'}We also have the right to disclose your identity to any
              third party who is claiming that any User Content posted or
              uploaded by you to our Services constitutes a violation of their
              intellectual property rights, or of their right to privacy. {'\n'}
              We, or authorised third parties, reserve the right to cut, crop,
              edit or refuse to publish, your content at our or their sole
              discretion. We have the right to remove, disallow, block or delete
              any posting you make on our Services if, in our opinion, your post
              does not comply with the content standards set out at “Your Access
              to and Use of Our Services”above. In addition, we have the right –
              but not the obligation – in our sole discretion to remove,
              disallow, block or delete any User Content (i) that we consider to
              violate these Terms, or (ii) in response to complaints from other
              users or third parties, with or without notice and without any
              liability to you. As a result, we recommend that you save copies
              of any User Content that you post to the Services on your personal
              device(s) in the event that you want to ensure that you have
              permanent access to copies of such User Content. We do not
              guarantee the accuracy, integrity, appropriateness or quality of
              any User Content, and under no circumstances will we be liable in
              any way for any User Content. You control whether your User
              Content is made publicly available on the Services to all other
              users of the Services or only available to people you approve. To
              restrict access to your User Content, you should select the
              privacy setting available within the Platform. We accept no
              liability in respect of any content submitted by users and
              published by us or by authorised third parties. {'\n'}If you wish
              to file a complaint about information or materials uploaded by
              other users, {'\n'}contact us at:
              <Text
                style={{color: colorPalates.blueShade02}}
                onPress={() => {
                  Linking.openURL('https://greenlync.com/contact');
                }}
              >
                {' '}
                https://greenlync.com/contact
              </Text>
              . BuzzLync/GreenLync takes reasonable measures to expeditiously
              remove from our Services any infringing material that we become
              aware of.It is BuzzLync/GreenLync’s policy, in appropriate
              circumstances and at its discretion, to disable or terminate the
              accounts of users of the Services who repeatedly infringe
              copyrights or intellectual property rights of others. {'\n\n'}
              While our own staff is continually working to develop and evaluate
              our own product ideas and features, we pride ourselves on paying
              close attention to the interests, feedback, comments, and
              suggestions we receive from the user community. If you choose to
              contribute by sending us or our employees any ideas for products,
              services, features, modifications, enhancements, content,
              refinements, technologies, content offerings (such as audio,
              visual, games, or other types of content), promotions, strategies,
              or product/feature names, or any related documentation, artwork,
              computer code, diagrams, or other materials (collectively
              “Feedback”), then regardless of what your accompanying
              communication may say, the following terms will apply, so that
              future misunderstandings can be avoided. Accordingly, by sending
              Feedback to us, you agree that: BuzzLync/GreenLync has no
              obligation to review, consider, or implement your Feedback, or to
              return to you all or part of any Feedback for any reason; Feedback
              is provided on a non-confidential basis, and we are not under any
              obligation to keep any Feedback you send confidential or to
              refrain from using or disclosing it in any way; and {'\n'}You
              irrevocably grant us perpetual and unlimited permission to
              reproduce, distribute, create derivative works of, modify,
              publicly perform (including on a through-to-the-audience basis),
              communicate to the public, make available, publicly display, and
              otherwise use and exploit the Feedback and derivatives thereof for
              any purpose and without restriction, free of charge and without
              attribution of any kind, including by making, using, selling,
              offering for sale, importing, and promoting commercial products
              and services that incorporate or embody Feedback, whether in whole
              or in part, and whether as provided or as modified.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 1. TERMS OF USE
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              1.1. These Terms of use (“Terms of use”) established by GREENLYNC
              govern your use of our Platform (the “Platform”), our
              Platform/Website, www.GREENLYNC.com and
              https://thehive.GREENLYNC.com/ (the “Platform/Websites”). Although
              you may not be signing a document, your accessing the Platform,
              the Platform/Website and use of the services thereon creates a
              legally binding contract between GREENLYNC, Inc. (“GREENLYNC”,
              “us”, “we” or “our”), and You (“you” or “your”) and (if
              applicable) the corporate entity. Your acceptance of these Terms
              is an express condition of, and governs your access to and use of,
              GREENLYNC’s:
              {'\n\n'}
              (a) Platform
              {'\n\n'}
              (b) Platform/Websites, portals, mobile applications, channels,
              software, social media pages, applications, platforms
              (collectively, the “Platform/Websites”)
              {'\n\n'}
              (c) including any services, features, media, functions, content,
              tools and links contained or offered therein (collectively, the
              “Services”).
              {'\n\n'}
              (d) wholesale and inventory management platform
              {'\n\n'}
              1.2. YOU REPRESENT, WARRANT AND COVENANT TO US THAT YOU ARE AT
              LEAST TWENTY-ONE (21) YEARS OF AGE AND ARE LEGALLY COMPETENT TO
              ENTER INTO AND AGREE TO THESE TERMS OF USE. IF YOU DO NOT ACCEPT
              THE TERMS AND CONDITIONS OF THESE TERMS OF USE, THEN YOU ARE NOT
              AUTHORIZED TO USE THE PLATFORM/WEBSITE OR THE APP.
              {'\n\n'}
              1.3. Some of the Third Parties on the Platform/Websites and
              Services (and your access to or use therein) may have additional
              terms, conditions, policies, rules, and guidelines, which govern
              your access to and use of such Platform/Websites and Services
              (“Additional Terms”). The Additional Terms will be posted on the
              applicable Platform/Website or Services. If there is a difference
              between these Terms and any Additional Terms for a specific
              Platform/Website or Service, the applicable Additional Terms shall
              govern and take precedence over these Terms.
              {'\n\n'}
              1.4. If you are using the Platform/Websites or Services on behalf
              of a business, you certify and declare that you have the authority
              to bind the business to these Terms, the Additional Terms, the
              Privacy Policy, the Data Policy, the Community Standards and any
              other related or pertinent agreements. You and/or the business
              agrees to hold harmless and indemnify GREENLYNC and its
              affiliates, officers, agents, and employees from any claim, suit
              or action arising from or related to the use of the
              Platform/Websites or Services or violation of these terms,
              including any liability or expense arising from claims, losses,
              damages, suits, judgments, litigation costs, and attorneys’ fees.
              If you do not have such authority, you will be held individually
              liable for all actions taken under your user ID.
              {'\n\n'}
              1.5. You have not previously been removed from our Services by us,
              unless you have our express written permission to create a new
              account.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 2. OWNERSHIP OF SERVICE
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              2.1. GREENLYNC is the owner, or authorized licensee, of all
              content displayed on or by the Services, including but not limited
              to text, graphics, visual interfaces, audio interfaces, drawings,
              artwork, photographs, trademarks, copyrights, music, sounds,
              software, and computer code (collectively “Content”).
              {'\n\n'}
              2.2. We may, at any time and within our sole discretion, modify,
              alter, delete, add or otherwise change the Content.
              {'\n\n'}
              2.3. GREENLYNC grants you a limited, non-transferable license to
              use the Services and Content as provided for herein. You may not
              use, modify, duplicate, obscure, rent, lease, loan, sell,
              manipulate, reproduce, copy, republish, download, post, transmit,
              scrape, reverse engineer, distribute, create derivative works or
              adaptations of, publicly display, or in any way exploit any of the
              GREENLYNC Content, Platform/Websites, or the Services or any of
              the IP Rights of GREENLYNC, in whole or in part, unless expressly
              authorized by us in writing. Except as expressly and unambiguously
              provided herein, we do not grant you any express or implied
              rights, and all rights in and to the Platform/Websites and the
              GREENLYNC Content are retained by us.
              {'\n\n'}
              2.4. This license does not include (i) any resale or commercial
              use of the Platform/Websites or Services, or their contents; (ii)
              any collection, scraping, downloading, reproducing, distributing,
              copying or use of any product or GREENLYNC client listings,
              descriptions, prices, or any other Platform/Website Content; (iii)
              any derivative use of any of the Platform/Websites or Services or
              Platform/Website Content; or (iv) any use of data mining, robots,
              or similar data gathering and extraction tools. All rights not
              expressly granted to you in these Terms, any Additional Terms, the
              Privacy Policy, or Data Policy are reserved and retained by
              GREENLYNC. You may not use any meta-tags or any other “hidden
              text” utilizing GREENLYNC’s name or trademarks or other IP Rights
              without the express written consent of GREENLYNC. The licenses
              granted by GREENLYNC shall immediately terminate should you fail
              to comply with these Terms, any Additional Terms, or the Privacy
              Policy.
              {'\n\n'}
              2.5. There may be some applications of the Platform/Website and/or
              the Service that will require you to install and use software made
              available by GREENLYNC. Subject to these Terms, the Additional
              Terms, the Privacy Policy, the Data Policy and Community
              Standards, GREENLYNC grants you a non-transferable, non-exclusive
              license to install and use said software for your mobile devices
              (“Mobile App”), in executable object code format only, solely on
              your own handheld mobile device and for your personal,
              noncommercial use. You acknowledge and agree that the availability
              of the Mobile App is dependent on the third-party app platform
              from which you received the Mobile App (“App Platform”). You
              acknowledge that these Terms concern you and GREENLYNC, and not
              the App Platform. The App Platform is not responsible for the
              Mobile App, the content therein, maintenance, support services,
              and warranty therefore. Each App Platform may have Additional
              Terms to which you must agree before downloading the Mobile App
              from it. You agree to comply with, and your license to use the
              Mobile App is conditioned upon your compliance with, all
              applicable agreements, terms and conditions of use/service, and
              other policies of the applicable App Platform.
              {'\n\n'}
              2.6. There may be occasions when the Services may be interrupted,
              including, without limitation, for scheduled maintenance or
              upgrades, for emergency repairs, or due to failure of
              telecommunications links and/or equipment. GREENLYNC will not be
              held responsible for any such interruptions.
              {'\n\n'}
              2.7. GREENLYNC reserves the right to remove any Content and/or
              User Engagement from the Services for any reason without prior
              notice. Content and/or User Engagement removed from the Services
              may continue to be stored by GREENLYNC including, without
              limitation, in order to comply with certain legal obligations, but
              may not be retrievable without a valid court order. GREENLYNC is
              not a backup service and User agrees that User will not rely on
              the Services for the purposes of content backup or storage.
              GREENLYNC will not be liable to User for any modification,
              suspension, or discontinuation of the GREENLYNC Services or the
              loss of any Content or User Engagement. User also acknowledges
              that the internet may be subject to breaches of security and that
              the submission of User Engagement or other information may not be
              secure. User is expressly and solely responsible for User’s own
              security when using the Services. User Engagement is defined in
              Article 4, Paragraph 4.1 (g).
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 3. USER REGISTRATION,PASSWORDS AND SECURITY
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              3.1. You must register to gain access to the Platform. Registering
              entails providing information that may be deemed personal. Any
              personal information that you provide as part of your use of the
              Services will be held and used in accordance with our Privacy
              Policy.
              {'\n\n'}
              3.2. You are solely responsible for maintaining the
              confidentiality of your password and the other Protected
              Information (as defined below) and for restricting access to your
              account so that others may not access any password-protected
              portion of the Platform/Websites or Services using your Protected
              Information.
              {'\n\n'}
              3.3. If you use Services in a way that requires you to create a
              username and/or password, then you agree that you are solely
              responsible for keeping such information secret and confidential.
              {'\n\n'}
              3.4. You agree to accept responsibility for all activities that
              occur under your username, including but not limited to all
              submissions, comments and other communications.
              {'\n\n'}
              3.5. You are responsible for changing your password if you believe
              that your password has been stolen, lost, compromised or might
              otherwise be misused. You agree to notify GREENLYNC immediately of
              any unauthorized use of your username or password, or if you
              suspect any other security breach. We reserve the right, at any
              time and in our sole discretion, to suspend or terminate your
              ability to access or use the Services.
              {'\n\n'}
              3.6. You may not register a username (or email address) that:
              {'\n\n'}
              (a) is already being used by someone else;
              {'\n\n'}
              (b) may impersonate another person:
              {'\n\n'}
              (c) belongs to another person;
              {'\n\n'}
              (d) violates the intellectual property or other right of any
              person or entity; or
              {'\n\n'}
              (e) is offensive.
              {'\n\n'}
              Violation of any of the above may be a basis for rejection.
              {'\n\n'}
              3.7. You will provide true, accurate, current, and complete
              registration information about yourself in connection with the
              registration process and, as permitted, to maintain and update it
              continuously and promptly to keep it accurate, current, and
              complete. If you provide any information that is untrue,
              inaccurate, outdated, or incomplete, GREENLYNC may suspend or
              terminate your account and refuse you any and all current or
              future access to or use of the Platform/Websites and Services (or
              any portion thereof). If you fail to update your information in a
              timely manner, then GREENLYNC has reasonable grounds to suspect
              that such information is untrue, inaccurate, outdated or
              incomplete, which will allow GREENLYNC to suspend or terminate
              your account and refuse you any and all current or future access
              or use of the Platform/Websites and Services (or any portion
              thereof).
              {'\n\n'}
              3.8. You will not sell, transfer, assign, or provide a copy of
              your account, account rights, user ID, password, API keys, menu
              embed code, or other credentials or access rights (the “Protected
              Information”) for any of the Platform/Websites or Services to any
              other person or entity. You must keep all of the Protected
              Information in strict confidence.
              {'\n\n'}
              3.9. You will not share or allow any third party to utilize your
              account on your behalf or on a time share basis.
              {'\n\n'}
              3.10. You will not create more than one account unless
              specifically authorized to do so.
              {'\n\n'}
              3.11. You will not use Protected Information of others.
              {'\n\n'}
              3.12. GREENLYNC is not liable for any loss or damage (of any kind
              and under any legal theory) to you or any third party arising from
              your inability or failure for any reason to comply with any of the
              foregoing obligations.
              {'\n\n'}
              3.13. If any information that you provide, or if we have
              reasonable grounds to suspect that any information that you
              provide, is false, inaccurate, outdated, offensive, incomplete, or
              violates these Terms, any Additional Terms, the Privacy Policy,
              the Data Policy, the Community Standards, or any applicable law,
              then we may suspend or terminate your account, User Profile, and
              access to and use of the Platform/Websites and Services at our
              sole discretion and without advance notice or liability.
              {'\n\n'}
              3.14. Your User Profile cannot be used to conduct commercial
              activities, including, but not limited to, transactions,
              advertising, fundraising, contests, or other promotions absent our
              prior written consent. We may offer you the ability to set
              preferences relating to your User Profile, but changes to your
              settings may not become effective immediately or be error free,
              and options may change from time-to-time. GREENLYNC assumes no
              responsibility or liability for any issues, problems, or Content
              on your User Profile.
              {'\n\n'}
              3.15. User Profiles may only be set up by an authorized
              representative of the individual or business that is the subject
              of the User Profile. GREENLYNC does not review each User Profile
              to determine if it was created by an appropriate party. In
              addition, GREENLYNC is not responsible for any unauthorized User
              Profiles that may appear on the Services. If you believe that a
              User Profile listed on one of the Platform/Websites is
              unauthorized, fake, fraudulent, or otherwise improper or
              misleading, please send an email to customerservice@GREENLYNC.com
              and/or report it as instructed on the Platform/Website.
              {'\n\n'}
              3.16. You will immediately notify us of any unauthorized use of
              your Protected Information, or any other breach of security.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 4. USER CONTENT
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              4.1. Definitions:
              {'\n\n'}
              (a) “Content” includes all text, images, photos, audio, video,
              graphics, reviews, location data, and all other forms of data,
              communication, or media,
              {'\n\n'}
              (b) “User Content” means Content submitted by or transmitted from
              users on Platform/Websites or Services. This includes but is not
              limited to ratings, reviews, orders, favorites, photos, videos,
              media, messages, social media posts or Services, comments, and
              information that such user publicly displays or displayed in its
              User Profile, and including any electronic data or information
              with respect to a User’s Publics,
              {'\n\n'}
              (c) “GREENLYNC Content” is Content owned and/or is generated by us
              and made available to Users via the Platform/Websites or Services,
              {'\n\n'}
              (d) “Third Party Content” is Content that originates from parties
              other than GREENLYNC or Users on the Platform/Websites or
              Services, and available on the Platform/Websites or Services,
              {'\n\n'}
              (e) “Platform/Website Content” is all of the Content on the
              Platform/Websites or Services, including User Content, Third Party
              Content (and Third Party Material (as defined below), and
              GREENLYNC Content.
              {'\n\n'}
              (f) “User Comments” refer to comments submitted, posted, or
              displayed by Users.
              {'\n\n'}
              (g) “User Engagement” collectively refers to User Submissions and
              User Comments.
              {'\n\n'}
              4.2. You are solely responsible for any event listing, personal
              match information, photo, comment, or other information
              (collectively, “Content”) that you publish or display (“post”) on
              Service and for any material or information that you send to other
              users, if applicable. Content you submit may not, at the
              GREENLYNC’s discretion, be posted by GREENLYNC. Once posted on the
              Platform/Websites or on the Internet, it is not always possible to
              remove, especially if multiple copies exist. When User Content is
              uploaded to the Platform/Websites or Services, or posted on any
              social media platforms with a tag or reference to GREENLYNC, you
              give GREENLYNC complete permission to make it available in
              multiple forms, including, without limitation, on any of our
              social media accounts, email newsletters, or any digital or print
              promotional materials. If any of your User Content is acquired and
              used by a third party in a way that violates these Terms, any
              Additional Terms, the Privacy Policy, the Data Policy and the
              Community Standards, you agree that GREENLYNC can take legal
              action against the third party and that GREENLYNC shall not be
              obligated to distribute any recovered sums to you that may be
              obtained in connection with such legal proceedings.
              {'\n\n'}
              4.3. You agree not violate any applicable laws and/or regulations
              while using the Services.
              {'\n\n'}
              4.4. By posting content on the Service, you grant GREENLYNC a
              non-exclusive, fully paid, worldwide license to use or display
              such Content in whatever way GREENLYNC chooses. This license shall
              remain in effect upon you terminating the use of the Services.
              {'\n\n'}
              4.5. You represent and warrant that:
              {'\n\n'}
              (a) You either own, or have the necessary licenses, rights,
              consents, and/or permissions, for the content and authorize
              GREENLYNC, its applicable affiliates, the Platform/Websites, the
              Services, and all users thereof, to use such User Content as
              necessary to exercise the licenses granted by you hereunder
              (including with respect to all patent, trademark, trade secret,
              copyright, or other intellectual property or proprietary rights to
              your User Content, and to any other works that you incorporate
              into your User Content);
              {'\n\n'}
              (b) Your Content does not violate the privacy, publicity or
              intellectual property rights of any person or entity,
              {'\n\n'}
              (c) You agree to pay for any royalties and/or fees owing any
              person by reason of any Content you post on Service.
              {'\n\n'}
              (d) You are entirely responsible for anything you submit to the
              Platform/Websites or Services and agree that GREENLYNC does not
              have to post or keep posted anything you provide. Once posted on
              the Platform/Websites or on the Internet, it is not always
              possible to remove, especially if multiple copies exist. When User
              Content is uploaded to the Platform/Websites or Services, or
              posted on any social media platforms with a tag or reference to
              GREENLYNC, you give GREENLYNC complete permission to make it
              available in multiple forms, including, without limitation, on any
              of our social media accounts, email newsletters, or any digital or
              print promotional materials. If any of your User Content is
              acquired and used by a third party in a way that violates these
              Terms, any Additional Terms, the Privacy Policy, the Data Policy,
              or the Community Standards you agree that GREENLYNC can take legal
              action against the third party and that GREENLYNC shall not be
              obligated to distribute any recovered sums to you that may be
              obtained in connection with such legal proceedings;
              {'\n\n'}
              (e) the creation, distribution, transmission, public display and
              performance, accessing, downloading, and copying of your User
              Content does not and will not infringe the proprietary rights or
              otherwise cause injury to any other person or entity, including
              any such person or entity using the Platform/Websites, Services,
              or otherwise, and that GREENLYNC is under no obligation to post
              any User Content that you provide and reserves the right to post
              our own versions of your User Content as GREENLYNC Content in our
              sole discretion;
              {'\n\n'}
              (f) You fully assign GREENLYNC the right to pursue enforcement of
              copyright, trademark, trade secret, and other intellectual
              property related claims against third parties that have, without
              receiving proper authorization, and in violation of these Terms,
              any Additional Terms or the Privacy Policy, scraped, manipulated,
              copied, derived, distributed, or otherwise improperly or illegally
              used and benefited from User Content that has been provided to
              GREENLYNC by you;
              {'\n\n'}
              (g) You have the written consent, release, and/or express
              permission of each and every identifiable person in your User
              Content to use such person’s name, likeness, and/or other
              identifiable information in your User Content for any use
              permitted by these Terms, any Additional Terms, and the Privacy
              Policy;
              {'\n\n'}
              (h) You will not post, transmit, broadcast, or otherwise make
              available any User Content that is unlawful, misleading, harmful,
              bigoted, offensive, profane, insensitive, obscene, lewd,
              lascivious, filthy, violent, tortious, libelous, slanderous,
              pornographic, threatening, abusive, harassing, tortious,
              defamatory, vulgar, invasive of another’s privacy or publicity
              rights, hateful, or racially, ethnically, or otherwise
              objectionable (hereinafter, “Offensive Content”);
              {'\n\n'}
              (i) You will not impersonate any person, or misrepresent our
              identity or affiliation with any person or organization;
              {'\n\n'}
              (j) You will not give the impression that any activity engaged in
              by you and not approved by GREENLYNC is from or are endorsed by
              GREENLYNC, or any other person or entity, if that is not the case;
              {'\n\n'}
              (k) that you are at least twenty-one (21) years old, as
              applicable, and you acknowledge that persons under that age may
              not submit User Content to the Platform, the Platform/Websites, or
              the Services; and
              {'\n\n'}
              (l) that GREENLYNC may, in its sole discretion, monitor the User
              Content you submit and any other communications that you may have,
              but is under no obligation to do so.
              {'\n\n'}
              4.6. By submitting User Content, you acknowledge that you may
              expose yourself to liability if, for example, your User Content
              contains material that is false, intentionally misleading or
              defamatory, violates any third-party right, including any
              copyright, trademark, patent, trade secret, moral right, privacy
              right, right of publicity, or any other intellectual property or
              proprietary right, contains material that is unlawful, including
              illegal hate speech or pornography; exploits or otherwise harms
              minors; or violates or advocates the violation of any law or
              regulation.
              {'\n\n'}
              4.7. You irrevocably waive, and cause to be waived, against
              GREENLYNC and its users, any claims and/or objections from
              third-parties with respect to your User Content.
              {'\n\n'}
              4.8. GREENLYNC does not guarantee the accuracy, integrity,
              quality, or authenticity of any User Content. In the event that
              you find any Offensive Content during your use of the
              Platform/Websites and Services unpleasant, indecent, or
              objectionable you acknowledge and agree that GREENLYNC will not be
              liable in any way for any such Offensive Content, including, but
              not limited to, any errors or omissions in any Offensive Content,
              or any loss or damage of any kind incurred as a result of any
              Offensive Content uploaded, posted, transmitted, broadcast,
              transferred, or otherwise made available via GREENLYNC, the
              Platform/Websites, Services, or any related process or venue.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 5. REVIEW AND EDIT OF USER CONTENT
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              5.1. We reserve the right to review and, if necessary, delete any
              Content that in the sole judgment of GREENLYNC would violate these
              Terms of Use or which may be offensive, illegal or violate the
              rights of any other user. Prohibited Content includes Content
              that:
              {'\n\n'}
              (a) is patently offensive and/or promotes racism, bigotry or
              hatred, or promotes violence against any group or individual, or
              otherwise violates any federal, state or local laws or ordinances,
              or
              {'\n\n'}
              (b) harasses or advocates harassment of any group or individual,
              or
              {'\n\n'}
              (c) involves the transmission of junk mail, chain letters, or
              spam, or
              {'\n\n'}
              (d) is known to be false or misleading, or promotes illegal
              activities, or
              {'\n\n'}
              (e) promotes an illegal or unauthorized copy of another’s
              copyrighted work, or
              {'\n\n'}
              (f) contains restricted or password-only access pages or hidden
              pages or images, or
              {'\n\n'}
              (g) provides material that is sexual in nature, or
              {'\n\n'}
              (h) provides instructional information about illegal activities,
              or
              {'\n\n'}
              (i) solicits passwords or personal identifying information for
              commercial or unlawful purposes, or
              {'\n\n'}
              (j) is irrelevant to the stated purpose of GREENLYNC.
              {'\n\n'}
              5.2. If you believe that your Content should not be removed, you
              may submit the basis of your belief to GREENLYNC and it will be
              reviewed for reconsideration. Once Company completes its review,
              you will be notified of the decision. All decisions made by
              Company shall be final.
              {'\n\n'}
              5.3. It is GREENLYNC’s policy, in appropriate circumstances and at
              its discretion, to disable, eliminate access to and/or terminate
              the accounts of users who repeatedly infringe or are repeatedly
              charged with infringing the copyrights of others.
              {'\n\n'}
              5.4. In accordance with the Digital Millennium Copyright Act of
              1998 (“DMCA”), the text of which can be found on the U.S.
              Copyright Office Platform/Website, GREENLYNC will respond
              appropriately to claims and reports of copyright infringement
              taking place on or through the Platform/Websites. You may not
              post, upload, or otherwise place any content or information on the
              Site that belongs to a third party, unless you have the legal
              right to do so. If you believe in good faith that your copyrighted
              work has been reproduced on our Site without authorization in a
              way that constitutes copyright infringement, you may notify our
              designated copyright agent either by mail to Copyright Agent
              (Legal), About, Inc., 28 Liberty Street, 7th Floor, New York, NY,
              10005 or in an email to SafeHarborAgent@About.Com. This contact
              information is only for suspected copyright infringement. Please
              include the following:
              {'\n\n'}
              (a) Your physical or electronic signature.
              {'\n\n'}
              (b) Identification of the copyrighted work you believe to have
              been infringed or, if the claim involves multiple works on the
              Site, a representative list of such works.
              {'\n\n'}
              (c) Identification of the material you believe to be infringing in
              a sufficiently precise manner to allow us to locate that material,
              such as the precise URL (web page) that it appeared on, along with
              any copies you have of that web page.
              {'\n\n'}
              (d) Adequate information by which we can contact you (including
              your name, postal address, telephone number and email address).
              {'\n\n'}
              (e) A statement that you have a good faith belief that use of the
              copyrighted material is not authorized by the copyright owner, its
              agent or the law.
              {'\n\n'}
              (f) A statement, under penalty of perjury, that the information in
              the written notice is accurate and that you are authorized to act
              on behalf of the copyright owner.
              {'\n\n'}
              Please be aware that if you knowingly materially misrepresent that
              material or activity on the Site is infringing your copyright, you
              may be held liable for damages (including costs and attorneys’
              fees).
              {'\n\n'}
              It is the policy of GREENLYNC to disable the accounts of users who
              repeatedly post infringing material on the Site.
              {'\n\n'}
              5.5. If you believe that your User Engagement that was removed (or
              to which access was disabled) is not infringing, or that you have
              the authorization from the copyright owner, the copyright owner’s
              agent, or pursuant to the law, to post and use the material in
              your User Engagement, you may send a counter-notice containing the
              following information to owner’s Copyright Agent:
              {'\n\n'}
              (a) Your physical or electronic signature;
              {'\n\n'}
              (b) Identification of the material that has been removed or to
              which access has been disabled and the location at which the
              material appeared before it was removed or disabled;
              {'\n\n'}
              (c) The following statement: “I swear, under penalty of perjury,
              that I have a good faith belief that the material was removed or
              disabled as a result of mistake or a misidentification of the
              material to be removed or disabled”; and
              {'\n\n'}
              (d) Your name, address, telephone number, and e-mail address, a
              statement that you consent to the jurisdiction the Federal
              District Court for the juridical district in which the User is
              located or, if the User is outside of the United States, for any
              judicial district in which GREENLYNC may be found, and a statement
              that you will accept service of process from the person who
              provided the original DMCA notification of the alleged
              infringement or an agent of such person.
              {'\n\n'}
              5.6. If a counter-notice is received by owner’s Copyright Agent,
              GREENLYNC may send a copy of the counter- notice to the original
              complaining party informing that person that it may replace the
              removed User Engagement or cease disabling it in 10 business days.
              Unless the copyright owner files an action seeking a court order
              against the User who provided the User Engagement, the removed
              User Engagement may be replaced, or access to it restored, in 10
              to 14 business days or more after receipt of the counter-notice,
              at GREENLYNC’s sole discretion.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 6. LICENSE TO USER AND THIRD PARTY CONTENT/DATA
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              6.1. GREENLYNC acknowledges that all User Content you post or make
              available on the Platform/Website or Services are owned by you,
              but you grant GREENLYNC a license in perpetuity and transferable
              rights and licenses:
              {'\n\n'}
              (a) to host, cache, store, archive, index, crawl, create
              algorithms based on, modify, or transcode your User Content to
              media formats, standards, or mediums in any and all forms and by
              whatever means whether now known or hereinafter devised or
              created, and to exploit any and all allied, ancillary, and
              subsidiary rights relating thereto and derived therefrom;
              {'\n\n'}
              (b) to use, license, sell, digitize, stream, store, distribute,
              exhibit, reproduce, commercialize, publicize, display, modify,
              adapt, edit, excerpt, communicate, translate, analyze, remove,
              prepare derivative works and compilations of, compress, transmit,
              integrate, insert, market, and promote your User Content in any
              and all forms and media and by whatever means whether now known or
              hereinafter devised or created, and to exploit any and all allied,
              ancillary, and subsidiary rights relating thereto and derived
              therefrom;
              {'\n\n'}
              (c) to use your User Content, in whole or in part, for
              advertising, promotional, or commercial purposes, including
              without limitation, the right to publicly display, reproduce, and
              distribute your User Content in any and all forms and media and by
              whatever means whether now known or hereinafter devised or
              created, and to exploit any and all allied, ancillary, and
              subsidiary rights relating thereto and derived therefrom; and
              {'\n\n'}
              (d) to grant any rights or licenses to any third parties to do any
              of the foregoing in the above clauses (a) – (c) in connection with
              their own Platform/Websites and media platforms.
              {'\n\n'}
              6.2. You hereby grant GREENLYNC the right and license to use any
              data, images, or information that is pushed or otherwise
              transferred to us through any of our APIs by you or by any third
              party on your behalf (“Licensed Data”) for any purpose relating to
              any of the businesses of GREENLYNC or for any purpose relating to
              the Platform/Websites or Services, including in connection with
              displaying any data, images, or information on the
              Platform/Websites. You acknowledge and agree that we shall have
              the right to reformat, improve, modify, adapt, derive, redisplay,
              and/or reprocess any of the Licensed Data and that we shall
              exclusively own all derivative works, graphical layouts,
              compilations, improvements, modifications, adaptations, analyses,
              and interpretations of the Licensed Data. Interpretations or
              translations of any of the Licensed Data prepared by GREENLYNC
              shall be owned exclusively by us.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 7. USE OF SERVICES
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              You acknowledge that your use of the Platform/Website and Services
              is subject to Federal, State and Local laws and regulations, and
              that you will abide by such.
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              7.1. Cannabis Locator. The Services may include information and/or
              listings showing where cannabis and cannabis goods may be
              available. Any such information and/or listings are provided by
              licensed cannabis businesses and other users of the Services, and
              GREENLYNC may or may not verify such information and/or listings.
              You agree that any information that you post and/or listings that
              you create shall contain true and accurate information and that
              you will update any such information and/or listings in a timely
              manner. Availability, pricing, and other information are subject
              to change at any time. You agree that GREENLYNC is not responsible
              for, and may not be held liable for, checking and/or ensuring the
              accuracy of any information related to the availability of any
              cannabis or cannabis goods that are listed on the Services, and
              that you are solely responsible for your use of locator
              information and/or listings that may be found within the Services.
              {'\n\n'}
              7.2. Cannabis Experience. As part of the Services, users are
              permitted (in accordance with the Terms) to provide descriptions
              of cannabis and cannabis goods, including but not limited to look,
              smell, taste, and effects. Some users may also discuss medicinal
              benefits or side effects that they believe they have experienced
              from the use of cannabis/goods. We do not verify any user claims
              related to cannabis/goods, and you agree that you are responsible
              for obtaining any additional information that you believe may
              impact your choice of cannabis/cannabis goods, including effects,
              price and other factors. If you provide any descriptions,
              experiences, medicinal effects, or other information, then you
              represent that such information is accurate and based on your own
              contact with the cannabis/goods that you are commenting on. You
              agree that Owner is not responsible for, and may not be held
              liable for, the accuracy of any information related to the
              properties and/or effects of cannabis/cannabis goods, nor the
              actual effects that you may experience from cannabis/cannabis
              goods, and that you are solely responsible for your use of
              cannabis/cannabis goods.
              {'\n\n'}
              7.3. User Representations, Warranties, and Covenants Regarding
              Orders. By using Web Orders (third-party, unaffiliated vendors),
              you represent, warrant and covenant that:
              {'\n\n'}
              (a) You will upload and maintain in your User Profile a valid,
              unexpired government-issued identification card and, if you will
              be ordering medical cannabis, a recommendation for medical
              cannabis that is valid in the applicable jurisdiction in which you
              place an order via Web Orders, and that
              {'\n\n'}
              (b) Your use of the Platform/Websites and the Services, including
              Web Orders, does not violate any applicable state or local law,
              including any legal requirements for orders you place through Web
              Orders. Upon delivery or pick-up, as applicable, you agree to
              present a government-issued identification card evidencing your
              age as well as your original recommendation if you order cannabis.
              If you do not comply with these terms regarding Web Orders, you
              agree that cannabis products may not be released to you by the
              applicable Retailer, and you may forfeit the cost of such
              products.
              {'\n\n'}
              7.4. Purchases. Some retailers allow online ordering of
              cannabis/goods, including retailers that allow users to pay for
              purchases through Service. You are solely responsible for ensuring
              that your use of online ordering complies with your state and
              local laws, and you will not utilize the Services in a manner that
              would violate the cannabis laws where you live or where you are
              ordering from/to (in case of delivery). Retailers are responsible
              for ensuring that customers are eligible to place orders, that
              customers are notified of changes to available inventory, and that
              all orders are process in compliance with the laws and regulations
              governing the retailers operations. You agree that GREENLYNC is
              not responsible for, and may not be held liable for, the accuracy
              of menus provided by retailers, the accuracy and functionality of
              online ordering, payment processing, preparation of cannabis/goods
              pursuant to an online order, or any other aspect of the online
              ordering experience. Payments that are made through GREENLYNC are
              governed by the terms of use and privacy policy of the financial
              institution processing the payment.
              {'\n\n'}
              7.5. Third Party Materials. The Platform/Website or Services might
              display, include, or make available Third-Party Content (including
              data, information, articles, applications or other products,
              services, and/or materials) or contain links to third-party
              Platform/Websites, services, and advertisements for third-party
              Offers (as defined below) (collectively, the “Third-Party
              Materials”). You acknowledge and agree that GREENLYNC is not
              responsible for Third-Party Materials, including their accuracy,
              completeness, timeliness, validity, copyright compliance,
              legality, decency, quality, or any other aspect thereof. GREENLYNC
              does not assume and will not have any liability or responsibility
              to you or any other person or user for any Third-Party Materials.
              Third-Party Materials and links thereto are provided solely as a
              convenience to you and you access and use them entirely at your
              own risk. When you link to a Third-Party Material, the applicable
              third-party’s terms and policies apply, including the
              third-party’s privacy and data gathering practices. You should
              make whatever investigation you feel necessary or appropriate
              before proceeding with any transaction in connection with such
              Third-Party Material.
              {'\n\n'}
              7.6. The Platform/Website or Services might display, include, or
              make available coupons, promotional codes, giveaways, samples, and
              other offers from listed dispensaries or other third parties
              (collectively, the “Offers”). Offers constitute “Third-Party
              Materials” under these Terms. GREENLYNC displays these Offers on
              the Platform/Website and Services as a form of advertisement for
              the listing dispensary or other third party (the “Offeror”) only.
              All Offers are made directly by the applicable Offeror, and may be
              subject to additional terms, conditions, or restrictions of the
              Offeror or under applicable law, whether or not such terms,
              conditions, or restrictions are expressly included on the
              Platform/Website or Services. The Offeror, and not GREENLYNC, is
              solely responsible for:
              {'\n\n'}
              (a) redemption of the Offer;
              {'\n\n'}
              (b) compliance of all aspects of the Offer with applicable law
              (including, without limitation, the advertisement, redemption, and
              terms, conditions, and restrictions related thereto); (c) all
              goods and services it provides to you in connection with the
              Offer; and
              {'\n\n'}
              (d) all injuries, illnesses, damages, claims, liabilities, and
              costs it may cause you to suffer, directly or indirectly, in full
              or in part, whether related to the use or redemption of an Offer
              or not.
              {'\n\n'}
              7.7. Social Media. GREENLYNC may also provide users with the
              ability to login to the Platform/Websites or Services with your
              login credentials from certain social networking Platform/Websites
              (e.g., Facebook, LinkedIn). If you log in or otherwise associate
              your User Account with your login credentials from a social
              networking or similar Platform/Website, we may use any information
              about you that is from or otherwise posted on your social
              networking account, in accordance with the terms and conditions
              and related legal and user policies of the relevant social
              networking Platform/Website. If you elect to share your
              information with any number of social networking
              Platform/Websites, we will then share your information with the
              Platform/Websites you name, in accordance with your election, and
              per their terms and conditions.
              {'\n\n'}
              7.8. Event Listings. Our Services allow Organizers to list and
              Users to search for events. Use of the Services are subject to the
              following:
              {'\n\n'}
              (a) GREENLYNC is NOT the creator, organizer or owner of the events
              listed on the Services, unless the event is specifically
              designated a GREENLYNC event. Users agree that GREENLYNC is not
              responsible for, and may not be held liable for, the accuracy of
              any information related to events that are listed on the Services,
              and that Users are solely responsible for checking on the time,
              place, date and other information provided as part of such event
              listing.
              {'\n\n'}
              (b) Reference to “Organizer,” in these Terms means event creators
              using the Services to list events displayed on the Services for
              consumers using our Services (“Consumers”).
              {'\n\n'}
              (c) Organizers, Consumers and third parties using our Services are
              all referred to in these Terms collectively as “Users,” “you” or
              “your.”
              {'\n\n'}
              (d) Any Organizer that posts an event listing represents and
              warrants that such Organizer shall provide accurate information,
              including any limitations on who may attend, and that such
              information shall be updated as needed.
              {'\n\n'}
              (e) Organizers who post event listings are solely responsible for
              the content thereof, and GREENLYNC is not responsible for
              verifying details of any such listings.
              {'\n\n'}
              (f) If you list or participate in an event listed on the Services,
              or you provide event information to another Consumer based on
              information found within the Services, then you agree that
              GREENLYNC is not responsible for any damages that may be incurred
              as a result of your event listing or participation.
              {'\n\n'}
              (g) The Organizer is solely responsible for ensuring that any page
              displaying an event on the Services (and the event itself) meet
              all applicable local, state, provincial, national and other laws,
              rules and regulations, and that the goods and services described
              on the event page are delivered as described and in an accurate
              satisfactory manner.
              {'\n\n'}
              (h) If there is a charge to Consumer for any event listed on the
              Platform, the payment method for Consumer will be arranged by
              Company and Consumer will be directed to the third party payment
              site.
              {'\n\n'}
              (i) If you are an Organizer, you represent, warrant and agree that
              (a) you will at all times comply with all applicable local, state,
              provincial, national and other laws, rules and regulations with
              respect to information you collect from (or receive about)
              consumers, and (b) you will at all times comply with any
              applicable policies posted on the Services with respect to
              information you collect from (or receive about) consumers.
              {'\n\n'}
              (j) GREENLYNC may terminate your right to use the Services at any
              time (i) if you violate or breach these Terms; (ii) if you misuse
              or abuse the Services, or use the Services in a way not intended
              or permitted by GREENLYNC; or (iii) if allowing you to access and
              use the Services would violate any applicable local, state,
              provincial, national and other laws, rules and regulations or
              would expose GREENLYNC to legal liability. GREENLYNC may choose to
              stop offering the Services, or any particular portion of the
              Service, or modify or replace any aspect of the Service, at any
              time. We will use reasonable efforts to provide you with notice of
              our termination of your access to the Services, where, in
              GREENLYNC’s sole discretion, failure to do so would materially
              prejudice you. You agree that GREENLYNC will not be liable to you
              or any third-party as a result of its termination of your right to
              use or otherwise access the Services.
              {'\n\n'}
              (k) You acknowledge that GREENLYNC has no control over and does
              not guarantee the quality, safety, accuracy or legality of any
              event or Content associated with an event, the truth or accuracy
              of any information provided by Users (including the Consumer’s
              personal information shared with Organizers in connection with
              events) or the ability of any User to perform or actually complete
              a transaction. GREENLYNC has no responsibility to you for, and
              hereby disclaims all liability arising from, the acts or omissions
              of any third parties that GREENLYNC requires to provide the
              Services, that an Organizer chooses to assist with an event, or
              that you choose to contract with when using the Services.
              {'\n\n'}
              (l) You understand and agree that some events may carry inherent
              risk, and by participating in those events, you choose to assume
              those risks voluntarily. For example, some events may carry risk
              of illness, bodily injury, disability, or death, and you freely
              and willfully assume those risks by choosing to participate in
              those events.
              {'\n\n'}
              (m) If you are an Organizer, without limiting the generality of
              any representations or warranties provided elsewhere in these
              Terms of use, you represent and warrant to us that:
              {'\n\n\t\t\t\t'} (i) You and your affiliates will obtain, prior to
              the start of ticket sales, all applicable licenses, permits, and
              authorizations (individually and collectively, “Licensure”) with
              respect to events hosted by you or your affiliates on the
              Services. Licensure includes but is not limited to property
              operation permits and fire marshal permits;
              {'\n\n\t\t\t\t'} (ii) You and your affiliates will comply, and
              will ensure that the venues for each event hosted by you or your
              affiliates on the Services will comply, with all applicable laws,
              regulations, rules and ordinances.
              {'\n\n'}7.9. Personal Matches. We offer a forum for users to find
              and make contact with potential personal matches through the
              Services. Any user who wishes to utilize the personal match
              availability agrees that all information uploaded into that
              section of the Services shall be true and accurate, that photos
              posted shall be of the user, and that information will be updated
              as necessary. If you utilize any chat or instant message features
              associated with personal matches, you acknowledge and agree that
              GREENLYNC is not responsible for the content of any message you
              may receive from another user, nor does it guarantee that any such
              content is accurate. You agree that GREENLYNC is not responsible,
              and may not be held liable for, any inaccurate or false
              information that is posted by a user of the Services.{' '}
              <Text style={{fontFamily: fonts.primarySemiBoldFont}}>
                We strongly recommend that you take precautions prior to meeting
                anyone that you meet through the Services, including but not
                limited to notifying friends and family of your expected
                whereabouts and with whom you will be meeting. You agree that
                GREENLYNC is not responsible for any damages that may be
                incurred as a result of your personal match with another user.
              </Text>
              {'\n\n'}
              In addition, You warrant and represent that:
              {'\n\n'}
              (a) You have not been convicted of or pled no contest to a felony
              or indictable offense (or crime of similar severity), a sex crime,
              or any crime involving violence;
              {'\n\n'}
              (b) You are not required to register as a sex offender with any
              state, federal or local sex offender registry;
              {'\n\n'}
              (c) You are not on any list of individuals prohibited from
              conducting business with the United States;
              {'\n\n'}
              (d) You are not prohibited by law from using our services;
              {'\n\n'}
              (e) All content submitted by you was written by you and not
              created by a third party or automatically generated;
              {'\n\n'}
              (f) You will not harass, bully, stalk, intimidate, assault,
              defame, harm or otherwise mistreat any person;
              {'\n\n'}
              (g) You will not solicit money or other items of value from
              another user, whether as a gift, loan, or form of compensation;
              {'\n\n'}
              (h) You will not use our Services in relation to fraud, a pyramid
              scheme, or other similar practice;
              {'\n\n'}
              (i) You will not express or imply that any statements You make are
              endorsed by GREENLYNC; and/or
              {'\n\n'}
              (j) You will not engage in any conduct that may harm the
              reputation of GREENLYNC.
              {'\n\n'}
              The content included on your individual profile should be relevant
              to the intended use of our Services. You may not display any
              personal contact or banking information, whether in relation to
              you or any other person (for example, names, home addresses or
              postcodes, telephone numbers, email addresses, URLs, credit/debit
              card or other banking details). If you choose to reveal any
              personal information about yourself to other users, you do so at
              your own risk. We encourage you to use caution in disclosing any
              personal information online.
              {'\n\n'}
              Other users will also share content on our Services. Member
              Content belongs to the user who posted the content and is stored
              on our servers and displayed at the direction of that user. You do
              not have any rights in relation to Member Content, and you may
              only use Member Content to the extent that your use is consistent
              with our Services’ purpose of allowing use to communicate with and
              meet one another. You may not copy the Member Content or use
              Member Content for commercial purposes, to spam, to harass, or to
              make unlawful threats. We reserve the right to terminate your
              account if you misuse Member Content.
              {'\n\n'}
              7.10. Video images, posts.
              {'\n\n'}
              (a) You shall be solely responsible for your own User Engagement
              as defined in Article 4 above, and the consequences of posting or
              publishing User Engagement.
              {'\n\n'}
              (b) In addition to the general restrictions above, the following
              restrictions and conditions apply specifically to your User
              Comments:
              {'\n\n\t\t\t\t'}
              (i) You may be given the opportunity to review and post User
              Comments on the Services. Your User Comments must adhere to this
              Agreement, any additional applicable terms of the mobile
              application store or marketplace where you have downloaded such
              Services, and, to the extent applicable, foreign, national, state,
              or local laws. If a comment is made using your identity, it will
              be deemed to have been posted by you. GREENLYNC will not accept
              responsibility for User Comments and other information posted in
              the comments. If GREENLYNC receives notice that any User Comments
              are not in compliance with this Agreement or the intended use of
              the User Comments, GREENLYNC may remove such User Comments.
              Additionally, engaging in such conduct may result in you and/or
              your account being banned from the Services.
              {'\n\n\t\t\t\t'}
              (ii) User Comments are made available to you for your information
              and personal use solely as intended through the normal
              functionality of the Services. User Comments are made available AS
              IS and may not be used, copied, reproduced, displayed, sold,
              licensed, downloaded, distributed, transmitted, broadcast, or
              otherwise exploited in any manner not intended by the normal
              functionality of the Services or otherwise as expressly authorized
              under this Agreement.
              {'\n\n'}
              (c) In addition to the general restrictions above, the following
              restrictions and conditions apply specifically to your User
              Submissions–you affirm, represent, and/or warrant that the
              Services may now or in the future permit User Submissions and the
              hosting, sharing, and/or publishing of such User Submissions. You
              understand that whether or not such User Submissions are
              published, GREENLYNC does not guarantee any confidentiality with
              respect to any submissions.
              {'\n\n'}
              (d) You additionally affirm, represent, and warrant that the
              posting and use of your User Engagement on or through the
              GREENLYNC Services does not violate, misappropriate or infringe on
              the rights of any third party, including, without limitation,
              privacy rights, publicity rights, copyrights, trademark and/or
              other intellectual property rights.
              {'\n\n'}
              (e) You agree to pay for all royalties, fees, and any other monies
              owed by reason of your User Engagement that you post on or through
              the Services.
              {'\n\n'}
              (f) GREENLYNC does not endorse any User Engagement or any opinion,
              recommendation, or advice expressed therein, and GREENLYNC
              expressly disclaims any and all liability in connection with User
              Engagement. GREENLYNC does not permit copyright infringing
              activities and infringement of intellectual property rights on its
              Services, and GREENLYNC will remove all Content and User
              Engagement if properly notified that such Content or User
              Engagement infringes on another’s intellectual property rights.
              GREENLYNC may, but has no obligation to, remove, edit, block,
              and/or monitor User Engagement or accounts containing User
              Engagement that GREENLYNC determines in its sole discretion
              violates this Agreement. GREENLYNC will also terminate a User’s
              access to the Services, if they are determined to be a repeat
              infringer. A repeat infringer is a User who has been notified of
              infringing activity more than twice and/or has had User Engagement
              removed from the Services more than twice.
              {'\n\n'}
              (g) GREENLYNC reserves the right to determine in its sole
              discretion whether Content or User Engagement is appropriate and
              complies with this Agreement for violations other than copyright
              infringement and violations of intellectual property law,
              including, but not limited to, pornography, obscene or defamatory
              material, hate speech, or excessive length. GREENLYNC may, at any
              time, without prior notice and in its sole discretion remove such
              User Engagement and/or terminate a User’s access for submitting
              such material in violation of this Agreement.
              {'\n\n'}
              (h) You understand that when using the Services, you will be
              exposed to User Engagement from a variety of sources. GREENLYNC is
              not responsible for the accuracy, usefulness, safety, or
              intellectual property rights of or relating to such User
              Engagement. You understand and agree that GREENLYNC cannot and
              will not be responsible for the User Engagement posted on the
              Services and you use the Services at your own risk. You further
              understand and acknowledge that you may be exposed to User
              Engagement that are inaccurate, offensive, indecent, or
              objectionable, and you agree to waive, and hereby do waive, any
              legal or equitable rights or remedies you have or may have against
              GREENLYNC with respect thereto to the fullest extent permitted by
              law.
              {'\n\n'}
              7.11. Contests. GREENLYNC provides a platform to allow Users to
              participate in various contests. Contests may be created,
              administered and/or controlled by Third Parties. We simply list
              links to them for the value of our Users. We are not a merchant
              and do not deliver anything you find on those sites ourselves. We
              are not responsible for any item found on those sites. We do not
              handle support calls, emails or written requests for those items.
              {'\n\n'}
              (a) Users of those Sites are responsible for complying with the
              tax laws, rules and regulations that may govern the Contests and
              any prizes that may be awarded in any Contest. User acknowledges
              and agrees that Contests are subject to the laws of the state
              where they are created, administered, and/or the residence of the
              User.
              {'\n\n'}
              (b) There may be tax consequences as a result of prizes won in any
              listed contest. User must take all necessary steps to ensure
              compliance with any applicable tax laws or regulations. GREENLYNC
              does not provide tax, investment, or financial services with
              regard to any prizes that may be connected to the Contests. Any
              information regarding prizes and tax implications available
              through contests posted on the Site by third parties is provided
              solely for informational purposes on an “as is” basis at User’s
              sole risk. GREENLYNC makes no warranties or representations with
              regard to said information. GREENLYNC makes no guarantees as to
              the accurateness, quality, or completeness of the information and
              GREENLYNC shall not be responsible or liable for any error,
              omissions, or inaccuracies in the information or for any User’s
              reliance on the information.
              {'\n\n'}
              (c) User is solely responsible for verifying the information as
              being appropriate for user’s personal use, including without
              limitation, seeking the advice of a qualified professional
              regarding any specific financial questions a user may have.
              {'\n\n'}
              (d) Content on the Platform may be provided by independent outside
              Contributors. GREENLYNC does not represent or guarantee that any
              contributor has achieved any particular level of expertise or
              knowledge or has any specific qualifications or credentials,
              without limitation, as to the subject matter to which their
              contributions relate.
              {'\n\n'}
              (e) Any reference to information about the Contributor by
              GREENLYNC is based on information provided by Contributor, and
              does not reflect any opinion by GREENLYNC of the ability or
              veracity of Contributor.
              {'\n\n'}
              (f) GREENLYNC is not obligated to monitor or independently
              research or verify any content of Contributor, nor does GREENLYNC
              represent or warrant the accuracy, completeness or truthfulness of
              the qualifications or credentials of any Contributor, nor of any
              other Users of the Site.
              {'\n\n'}
              (g) Postings on the Platform are intended to be provided for
              general information purposes only and can never take into account
              your unique, personal circumstances and needs. User acknowledges
              and agrees that any reliance or actions you take in violation of
              your agreement with us shall be at your sole and exclusive risk
              and GREENLYNC shall have no responsibility or liability to you
              whatsoever. You also acknowledge and agree that communications on
              or through the Site, whether with Contributors or other users, are
              at your own risk and are not covered by any privilege or
              confidentiality obligation that might apply if you were to obtain
              your own professional advice (e.g., from a financial advisor).
              {'\n\n'}
              7.12. Indemnity and Release. You agree to indemnify and hold
              GREENLYNC (and its directors, managers, officers, partners,
              employees, independent contractors, and agents, and successors and
              assigns of itself or its affiliates) harmless from any and all
              losses, damages, liabilities, claims, actions, judgments, awards,
              penalties, fines, costs, and expenses (including reasonable
              attorneys’ fees) arising from or relating to any claim or demand
              made by any third party due to or arising out of or otherwise
              relating to:
              {'\n\n'}
              (a) Your use or misuse of the Platform/Websites or Services,
              {'\n\n'}
              (b) Your User Content,
              {'\n\n'}
              (c) Your violation of these Terms, any Additional Terms, or the
              Privacy Policy, or
              {'\n\n'}
              (d) Your violation of applicable laws or regulations.
              {'\n\n'}
              GREENLYNC reserves the right, at Your expense, to assume the
              exclusive defense and control of any matter for which You are
              required to indemnify us or any other indemnitee hereunder and You
              agree to cooperate with our defense of these claims. You agree not
              to settle any matter without the prior written consent of
              GREENLYNC. GREENLYNC will use reasonable efforts to notify You of
              any such claim, action, or proceeding upon becoming aware of it.
              {'\n\n'}
              7.13. If there is a dispute between users of the Platform/Websites
              or Services, including between Publics and Retailers (each, a
              “Dispute”), you understand and agree that GREENLYNC and its
              affiliates (including the Platform/Websites and the Services,
              including Web Orders) are under no obligation to become involved
              in such Dispute.
              {'\n\n'}
              7.14. You hereby release and forever discharge GREENLYNC (and its
              directors, managers, officers, partners, employees, independent
              contractors, and agents, and successors and assigns of itself or
              its affiliates) from, and hereby waive and relinquish your rights
              with respect to, each and every past, present, and future dispute,
              claim, controversy, demand, right, obligation, liability, action,
              and cause of action of every kind and nature (including personal
              injuries, death, and property damage), that has arisen or arises
              directly or indirectly out of, or relates directly or indirectly
              to, any interactions with, or act or omission of, other
              Platform/Websites or Services or Third-Party Materials. For the
              avoidance of doubt, this release includes a release of any
              dispute, claim, controversy, demand, right, obligation, liability,
              action, and cause of action arising out of or in any way related
              to a Dispute, regardless of whether such dispute, claim,
              controversy, demand, right, obligation, liability, action, and
              cause of action are known or unknown, suspected or unsuspected,
              disclosed or undisclosed.{' '}
              <Text style={{fontFamily: fonts.primarySemiBoldFont}}>
                If you are a California resident or resident of a state with a
                similar applicable law, you hereby waive California Civil Code
                section 1542 in connection with the foregoing (or such other
                similar applicable law in your state), which states: “a general
                release does not extend to claims which the creditor does not
                know or suspect to exist in his or her favor at the time of
                executing the release, which if known by him or her must have
                materially affected his or her settlement with the debtor.”
              </Text>
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 8. USER CONDUCT
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              8.1. You understand and agree that you are solely responsible for
              compliance with any and all laws, rules and regulations that may
              apply to your use of the Platform/Websites or Services. In
              connection with your access or use of any of the Platform/Websites
              or Services, you may not and will not:
              {'\n\n'}
              (a) upload, post, transmit, broadcast or otherwise make available
              any Offensive Content, including any User Content that is
              unlawful, libelous, defamatory or otherwise objectionable;
              {'\n\n'}
              (b) breach or circumvent any laws, third-party rights or our
              systems, policies, or determinations of your account status;
              {'\n\n'}
              (c) review the information and data on our Platform/Websites,
              and/or utilize our Services if you are not able to form legally
              binding contracts (for example, if you are under the age of 21),
              or are temporarily or indefinitely suspended from using our
              Platform/Websites or Services;
              {'\n\n'}
              (d) upload, post, transmit, broadcast, sell, transfer or otherwise
              make available any User or Platform/Website Content that is
              inauthentic, counterfeit, or that you do not have a right to make
              available under any law or under contractual or fiduciary
              relationships (such as inside information, proprietary and
              confidential information learned or disclosed as part of
              employment relationships or under nondisclosure agreements);
              {'\n\n'}
              (e) register for more than one User Profile on any of the
              Platform/Websites, or register for a User Profile on behalf of an
              individual other than yourself, or a company that you are not
              authorized to represent or legally bind to a contract;
              {'\n\n'}
              (f) manipulate the price of any item or interfere with any other
              user’s listings, reviews, and products;
              {'\n\n'}
              (g) take any action that may undermine the feedback or ratings
              systems of the Platform/Websites or Services;
              {'\n\n'}
              (h) transfer your User Profile to another individual or entity
              without our prior written consent;
              {'\n\n'}
              (i) distribute, promote, advertise, or post spam, unsolicited or
              bulk electronic communications, chain letters, pyramid schemes or
              any related content;
              {'\n\n'}
              (j) interfere with or disrupt any Platform/Website processes,
              servers or networks supporting the Platform/Websites and/or
              GREENLYNC;
              {'\n\n'}
              (k) impair or harm any of our computer or related systems or
              transmit software viruses, worms, or other damaging files;
              {'\n\n'}
              (l) use any robot, spider, scraper, survey, monitor or other
              automated or similar means to access any web page or other asset
              contained in the Platform/Websites, Services or Platform/Website
              Content for any purpose;
              {'\n\n'}
              (m) bypass our robot exclusion headers, interfere with the working
              of our Services, features or tools, or impose an unreasonable or
              disproportionately large load on our infrastructure;
              {'\n\n'}
              (n) export or re-export any GREENLYNC’ application or tool except
              in compliance with the export control laws of any relevant
              jurisdictions and in accordance with all relevant posted rules and
              restrictions;
              {'\n\n'}
              (o) insult, threaten, stalk, harass, mislead or deceive other
              users of the Platform/Websites or Services, or in any way promote
              the discrimination or defamation of other users, or create any
              other objectionable material;
              {'\n\n'}
              (p) intentionally or unintentionally violate any applicable local,
              state, national or international law, rule or ordinance,
              including, but not limited to, regulations promulgated by the U.S.
              Copyright Office, U.S. Patent and Trademark Office, U.S.
              Securities and Exchange Commission, the Internal Revenue Service,
              the European Enforcement Directive of 2004, or any rules of any
              national or other securities exchange, including, without
              limitation, the New York Stock Exchange, the American Stock
              Exchange or the NASDAQ, and any other regulations and/or
              guidelines having the force of law;
              {'\n\n'}
              (q) provide material support or resources (or to conceal or
              disguise the nature, location, source, or ownership of material
              support or resources) to any organization(s) designated by the
              United States government as a foreign terrorist organization
              pursuant to section 219 of the United States Immigration and
              Nationality Act.
              {'\n\n'}
              (r) refuse to acknowledge that GREENLYNC may establish general
              practices and limitations concerning use of the Platform/Websites
              and Services, including without limitation restrictions concerning
              User Content provided by You for use on the Platform/Websites and
              Services, the type and quantity of transactional data stored and
              presented in connection with your account, the maximum disk space
              that will be allotted on GREENLYNC’ servers on Your behalf, and
              the maximum number of times (and the maximum duration for which)
              You may access the Platform/Websites and Services in any given
              period of time;
              {'\n\n'}
              (s) export any Platform/Website Content out of the jurisdiction in
              which it is intended or displayed;
              {'\n\n'}
              (t) access the Platform/Websites or Services in order to build a
              similar or competitive Platform/Website or Service;
              {'\n\n'}
              (u) send electronic transmissions (including but not limited to
              interactive monetary offers, audio-video communications, email,
              search queries, chat and other Internet activities) as interstate
              communications;
              {'\n\n'}
              (v) circumvent any technical measures we use to provide Services;
              {'\n\n'}
              (w) assist any third party with any of the foregoing; and/or
              {'\n\n'}
              (x) post private, confidential or sensitive information, or
              information that is otherwise in breach of the law via the
              Services, including, without limitation, User’s or any other
              person’s credit card information, social security, or national
              identity numbers, non-public phone numbers, addresses, or email
              addresses. User must not submit material that is copyrighted,
              protected by trade secret, or otherwise subject to third partyto
              third party proprietary rights, including privacy and publicity
              rights, unless User is the GREENLYNC of such rights or havs
              permission from their rightful GREENLYNC to post the material and
              to grant to GREENLYNC all of the licensed right granted herein.
              {'\n\n'}
              8.2. You fully understand, acknowledge and agree that GREENLYNC
              may, under certain circumstances and without prior notice,
              immediately terminate your GREENLYNC User Profile and access to
              the Platform/Websites, Services and any other related or
              affiliated applications, functions and tools.
              {'\n\n'}
              8.3. Cause for account termination or suspension shall include,
              but not be limited to:
              {'\n\n'}
              (a) breaches or violations of these Terms or other incorporated
              agreements, guidelines, or rules;
              {'\n\n'}
              (b) requests by law enforcement or other local, state or federal
              government agencies or divisions;
              {'\n\n'}
              (c) any attempts to breach our security, private accounts or other
              protected content on the Platform/Websites;
              {'\n\n'}
              (d) discontinuance or significant modification to the
              Platform/Websites or Services, or any related or affiliated
              Platform/Website owned and/or operated by GREENLYNC (or any part
              thereof);
              {'\n\n'}
              (e) unforeseen technical, electronic, mechanical or any other
              difficulties or security issues;
              {'\n\n'}
              (f) prolonged inactivity of Your account, which shall be
              determined by GREENLYNC;
              {'\n\n'}
              (g) knowing, willing and/or negligent engagement by you in any
              form of deceitful, fraudulent, counterfeit or illegal activities;
              and/or
              {'\n\n'}
              (h) failure by you, or by your representatives, to pay, in full,
              any fees owed by you in connection with the Platform/Websites or
              any related or affiliated Service, business or Platform/Website.
              Termination of a User Profile will deny you access to our
              Services, delay or remove User Content that you submitted or
              commented on, remove any special status associated with your
              account(s), remove and demote listings, reduce or eliminate any
              discounts or special offers, and take technical and/or legal steps
              to prevent you from using our Platform/Websites and Services in
              the future.
              {'\n\n'}
              GREENLYNC has the right to investigate and prosecute violations of
              any of the above to the fullest extent of the law.
              {'\n\n'}
              8.4. User must not change, alter, or modify any part of the
              Services for any reason.
              {'\n\n'}
              8.5. User must not distribute in any medium any part of the
              Services without prior written authorization from GREENLYNC. User
              agrees not to circumvent, disable or otherwise interfere with
              security related features of the Services or features that prevent
              or restrict use or copying of any Content and User Engagement or
              enforce limitations on use of the Services and the Conten and User
              Engagement therein.
              {'\n\n'}
              8.6. User must keep all of User’s User Engagement relevant and “on
              topic” to the particular item of User Engagement open for comments
              or submissions.
              {'\n\n'}
              8.7. The Content and GREENLYNC intellectual property, including,
              but not limited to, the GREENLYNC trademarks, trade names, and
              logos, on the Services are owned by or licensed to GREENLYNC,
              subject to copyright and other intellectual property rights under
              United States and foreign laws and international conventions.
              Content on the Services may not be used, copied, reproduced,
              distributed, transmitted, broadcast, displayed, sold, licensed, or
              otherwise exploited for any other purposes whatsoever without the
              prior written consent of the respective owners. GREENLYNC reserves
              all rights that are not expressly granted in and to the Services
              and the Content. User agrees not to use, copy, or distribute,
              either directly or indirectly, any of the Content other than that
              which is expressly permitted herein, including any use, copying,
              or distribution of User Engagement of third parties obtained
              through the Services for any commercial purposes. If User
              downloads or prints a copy of the Content and/or User Engagement
              for personal use, User must retain all copyright and other
              proprietary notices contained therein. User agrees that GREENLYNC
              holds no responsibility for content posted within the service,
              including, but not limited to, User Engagement. GREENLYNC is not
              obligated to monitor or edit any content posted on Services,
              including, but not limited to, User Engagement. If User’s content
              violates this Agreement, User may bear legal responsibility for
              that content.
              {'\n\n'}
              8.8 User agrees not to use the Services for any commercial purpose
              or use, either direct or indirect, without the prior written
              authorization of GREENLYNC. User may access User Engagement solely
              for User’s information and non-commercial, personal use or as
              otherwise intended through the normal functionality of the
              GREENLYNC Services. GREENLYNC permits User to link to materials on
              the Services for personal, non-commercial purposes only.
              {'\n\n'}
              8.9. User must not solicit for commercial purposes, spam, or send
              harassing communications to any other Users. Additionally, User
              must not collect or harvest any personal information from the
              Services. User must not offer to sell or buy any product or
              service, and User must not post advertisements or solicitations of
              business without the prior consent of GREENLYNC.
              {'\n\n'}
              8.10 User must not attempt to restrict another User from using or
              enjoying the Services and User must not encourage or facilitate
              violations of this Agreement or any other GREENLYNC terms.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 9. COMMUNICATIONS
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              9.1. Your use of or accessing the Platform/Websites or Services
              acknowledges your consent to receive certain communications from
              us electronically. Whether said communication is by e-mail, text,
              in-app push notices, or by posting notices and messages on the
              Platform/Websites or through any of the Services, you willingly
              and knowingly agree that all contracts, notices, disclosures,
              agreements, and other communications that we provide to you
              electronically shall have the same force and effect as if such
              communications be in writing.
              {'\n\n'}
              9.2. GREENLYNC does not endorse or guarantee the content of any
              communication you receive from another user of the Services.
              GREENLYNC may store contents of chats, instant messages and other
              communications that are sent through the Services for the purpose
              of product analysis and improvement. We may also review chats,
              instant messages and other communications to ensure adherence to
              these Terms and as required by court order, subpoena, or other
              legal or administrative process.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 10. DISCLAIMER OF CONTENT;
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              DISCLAIMER OF LIABILITY
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              10.1. GREENLYNC is not responsible for the contents of any Content
              that is posted by a user of the Services or any third party. By
              using the Services, you agree that GREENLYNC provides a forum
              whereby users may communicate with each other. You agree that
              GREENLYNC does not control the information posted on the Services
              and is under no obligation to monitor, edit, change, remove, or
              otherwise modify any Content, and that you will not rely solely on
              any of the content (including Content) that is contained within
              the Services. You further agree that GREENLYNC is not liable for
              any damages that may result as a result of your use of the content
              (including Content) that is contained within the Services, and
              that you will indemnify and hold GREENLYNC harmless pursuant to
              Article 16 of the Terms of use.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 11. DMCA
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              11.1 GREENLYNC deals with copyright infringement in accordance
              with the Digital Millennium Copyright Act (DMCA). You may not
              post, upload, or otherwise place any content or information on the
              Site that belongs to a third party, unless you have the legal
              right to do so. If you believe in good faith that your copyrighted
              work has been reproduced on our Site without authorization in a
              way that constitutes copyright infringement, you may notify our
              designated copyright agent either by mail to Copyright Agent
              (Legal), About, Inc., 28 Liberty Street, 7th Floor, New York, NY,
              10005 or in an email to SafeHarborAgent@About.Com. This contact
              information is only for suspected copyright infringement. Please
              include the following:
              {'\n\n'}
              a) Your physical or electronic signature.
              {'\n\n'}
              b) Identification of the copyrighted work you believe to have been
              infringed or, if the claim involves multiple works on the Site, a
              representative list of such works.
              {'\n\n'}
              c) Identification of the material you believe to be infringing in
              a sufficiently precise manner to allow us to locate that material,
              such as the precise URL (web page) that it appeared on, along with
              any copies you have of that web page.
              {'\n\n'}
              d) Adequate information by which we can contact you (including
              your name, postal address, telephone number and email address).
              {'\n\n'}
              e) A statement that you have a good faith belief that use of the
              copyrighted material is not authorized by the copyright Buzzlync,
              its agent or the law.
              {'\n\n'}
              f) A statement, under penalty of perjury, that the information in
              the written notice is accurate and that you are authorized to act
              on behalf of the copyright Buzzlync.
              {'\n\n'}
              Please be aware that if you knowingly materially misrepresent that
              material or activity on the Site is infringing your copyright, you
              may be held liable for damages (including costs and attorneys’
              fees).
              {'\n\n'}
              11.2 It is the policy of GREENLYNC to disable the accounts of
              users who repeatedly post infringing material on the
              Platform/Website or the Service.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 12. USER LOCATION
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              12.1. In order to use certain aspects of the Services, such as
              finding events and personal matches, you must enable geo-location
              on your mobile device. GREENLYNC uses this location information
              solely to show you location-based listings and information.
              {'\n\n'}
              12.2. GREENLYNC may provide you with the ability to share your
              geographical location with GREENLYNC and other users of the
              Services when using the Services. You may also accept or reject
              any requests from users of the Services to obtain your
              geographical location through the Services. If you share your
              geographical location with your subscribers, you understand and
              agree that your geographical location may appear on a map and that
              subscribers to your GREENLYNC account may be able to determine
              your exact, physical location. If you utilize the Services to post
              User Engagement to the GREENLYNC map feature located within the
              Services, you understand and agree that your geographical location
              may appear on a map and that all users of the GREENLYNC map
              feature located within the Services may be able to determine your
              exact, physical location. GREENLYNC provides you with the
              opportunity to opt-in and opt-out of sharing your geographical
              location within the settings of your mobile device and/or web
              browser, which may provide you with several options for the
              sharing of your geographical location, such as options to share
              your geographical location at all times, only when using the
              iServices, or never. Should you wish to cease the sharing and use
              of your geographic location by GREENLYNC, you are advised to
              disable location services within the settings of your mobile
              device and/or web browser. If you do not share your physical
              location with the Services, you may not use the GREENLYNC map
              feature located within the Services.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 13. NOTIFICATIONS
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              13.1. GREENLYNC may send notifications to your mobile devise to
              alert you of upcoming events, new cannabis goods, and other
              information that we think you may want to be made aware of. If you
              do not wish to receive notifications from GREENLYNC, please update
              the notification settings on your device.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 14. EXTERNAL LINKS
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              14.1. GREENLYNC may provide links to other Platform/Websites
              and/or App that are not maintained or controlled by GREENLYNC
              (“Linked Sites”). The inclusion of any hyperlinks to Linked Sites
              does not imply approval or endorsement by GREENLYNC of those
              Linked Sites, or content, products or services offered on those
              Linked Sites. GREENLYNC expressly disclaims any responsibility for
              the content, legal compliance, accuracy of the information, and/or
              the quality of goods or services provided by or advertised on any
              Linked Sites, and in no event shall GREENLYNC be held responsible
              or directly or indirectly liable for any loss or damage caused or
              alleged to have been caused in connection with the use of or
              reliance on any content, goods or services available on any Linked
              Sites.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 15. REVIEW/FEEDBACK POLICY
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              15.1. An important part of the GREENLYNC community is the feedback
              system. Users have the ability to leave reviews and comments, and
              we want that process to be as open as possible. Part of that
              openness is acknowledging that certain behaviors are not
              acceptable. GREENLYNC retains the right to remove any content
              posted on or submitted through any of its Platform/Websites or
              Services. However, the only User Content likely to be removed is
              that which violates these Terms, any Additional Terms, Privacy
              Policy, Data Policy or Community Standards, or the rules or
              guidelines on the applicable Platform/Website or Service regarding
              reviews, comments, feedbacks and other User Content (the “Review
              Policies”). Please note, the Review Policies of each
              Platform/Website or Service may differ. Please consult the
              relevant Platform/Website or Service to learn about its applicable
              Review Policy.
              {'\n\n'}
              Please note, GREENLYNC is under no obligation to enforce these
              Terms, any Additional Terms, Privacy Policy, Data Policy or the
              Community Standards, or any of the Review Policies on your behalf
              against another user. While GREENLYNC encourages you to let us
              know if you believe another user has violated these Terms, any
              Additional Terms, or the Privacy Policy, or any of the Review
              Policies, we reserve the right to investigate and take appropriate
              action at our sole discretion.
              {'\n\n'}
              15.2. For questions about the GREENLYNC Platform/Websites or any
              of the Services we provide, please feel free to contact our Public
              Service department at Publicservice@GREENLYNC.com.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 16. DISCLAIMER OF WARRANTIES
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              16.1. GREENLYNC makes no representations or warranties about the
              services, the suitability of the information contained on or
              received through the services, or information or products received
              through GREENLYNC. All information and use of GREENLYNC is
              provided “as is” without warranty of any kind, including all
              express, implied, or statutory warranties of merchantability,
              fitness for a particular purpose, title and non-infringement.
              GREENLYNC does not warrant that the contents or any information
              received through the services are accurate, reliable or correct;
              that GREENLYNC will be available at any particular time or
              location; that any defects or errors will be corrected; or that
              the contents or any information received through the services are
              free of viruses or other destructive or harmful components. Your
              use of our services is solely at your own risk. You expressly
              agree that you have relied on no warranties, representations, or
              statements other than in this agreement. Because some
              jurisdictions do not permit the exclusion of certain warranties,
              the exclusions may not apply to you but shall apply to the maximum
              extent permitted by the laws of your jurisdiction.
              {'\n\n'}
              16.2. GREENLYNC and its affiliates, officers, directors, managers,
              shareholders, GREENLYNCs, employees, contractors, consultants, and
              agents make no guarantee or warranty that:
              {'\n\n'}
              (a) the Platform/Websites and services will satisfy your needs and
              requirements or will be compatible with your equipment;
              {'\n\n'}
              (b) the Platform/Websites and services, and all affiliated
              Platform/Websites, features, services, communications, and
              applications, will be comprehensive, uninterrupted, timely,
              secure, or error-free, or be free from loss, destruction,
              corruption, online attack, viruses, worms, or other invasive,
              harmful, or corrupted or other related intrusions;
              {'\n\n'}
              (c) the information, data, or results realized or obtained from
              your use of the Platform/Websites will be accurate, up to date,
              satisfactory or reliable or fit or useful for any specific
              purpose;
              {'\n\n'}
              (d) the quality or value of any properties, services, products,
              information, or other materials purchased or obtained by you
              through the Platform/Websites and services will meet your
              expectations;
              {'\n\n'}
              (e) that any offer made or message sent will be successfully
              transmitted, received, and processed; and
              {'\n\n'}
              (f) any errors in the guidelines, software, or protocols will be
              corrected or resolved.
              {'\n\n'}
              16.3. Any product or program downloaded or otherwise obtained
              through the use of the Platform/Websites and services is accessed
              at your own discretion and risk, and you will be solely
              responsible and fully liable for any damage to your computer
              system or mobile device, loss of data, or any other loss or damage
              that results from the download or use of any such product,
              material, application, feature, or other program.
              {'\n\n'}
              16.4. No advice or information, including medical advice,
              strategy, guidelines, or related content, whether oral or written,
              obtained by you from GREENLYNC or from the Platform/Websites,
              services, or relevant social media pages shall create any
              warranty, guarantee, or strategy not expressly stated in these
              terms.
              {'\n\n'}
              16.5. Vetting by GREENLYNC of each and every document, photograph,
              video, review, related media, posting, or other communication, in
              addition to any other content posted via the Platform/Websites or
              services, may not be possible or realistically practicable. As a
              result, GREENLYNC cannot and does not control any listing reviews,
              comments, photographs, opinions, postings, or other content or
              material posted via the Platform/Websites or services and, as
              such, does not guarantee the accuracy, integrity, quality, safety,
              legality, morality, and/or authenticity of such content, the truth
              or accuracy of users’ content, the ability of listings to confirm
              product availability or pricing, or the ability of users to
              confirm experiences from using or purchasing specific products
              discussed or sold on the Platform/Websites or services.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 17. INDEMNIFICATION; DISCLAIMER;
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              LIMITATION OF LIABILITY
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              17.1. IN NO EVENT SHALL WE BE LIABLE TO YOU OR ANY THIRD PARTY FOR
              ANY DAMAGES, INCLUDING WITHOUT LIMITATION INDIRECT, CONSEQUENTIAL,
              EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM
              YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED IN ADVANCE
              OF THE POSSIBILITY OF SUCH DAMAGES. IN ANY CASE WHERE THE ABOVE
              LIMITATION IS UNENFORCEABLE, YOU AGREE THAT GREENLYNC TOTAL
              LIABILITY TO YOU SHALL NOT EXCEED EITHER:
              {'\n\n'}
              (a) THE TOTAL AMOUNT THAT YOU ACTUALLY PAID TO GREENLYNC DURING
              THE THREE (3) MONTHS PRECEDING THE ACCRUAL OF THE CAUSE OF ACTION;
              OR
              {'\n\n'}
              (b) ONE HUNDRED DOLLARS ($100.00), WHICHEVER IS LESS.
              {'\n\n'}
              17.2. User agrees to indemnify, defend and hold GREENLYNC, its
              affiliates and each of their respective officers, directors,
              employees, representatives and agents harmless from and against
              any and all liabilities, claims, losses, damages, costs and
              expenses (including reasonable attorneys’ fees) arising out of or
              in connection with:
              {'\n\n'}
              (a) any actual or alleged breach of User’s representations,
              warranties and obligations contained in this Agreement; and
              {'\n\n'}
              (b) the negligence, gross negligence or willful misconduct of
              User, its representatives, agents, or any individual or entity
              associated or affiliated with User.
              {'\n\n'}
              17.3. Except for the express representations and warranties set
              forth in this agreement, all information, products and services
              provided by GREENLYNC to User under this Terms of use, including
              the listing services, are provided “as is” and “as available”
              without representation or warranty of any kind, whether express,
              implied, statutory or otherwise, including the implied warranties
              of merchantability and fitness for a particular purpose. Company
              makes no guarantees or assurances of results by purchasing the
              listing service Company does not make any representations,
              warranties or guarantees as to uptime, capacity or functionality
              of:
              {'\n\n'}
              (a) the site;
              {'\n\n'}
              (b) any mobile or application based versions of the site; or
              {'\n\n'}
              (c) the services.
              {'\n\n'}
              User is not entitled to any damages, offsets or reductions in fees
              as a result of any downtime, interruption, or failure of the site
              or any services provided by the company.
              {'\n\n'}
              17.4. You agree that in the event you incur any damages, losses or
              injuries that arise out of GREENLYNC’s acts or omissions, the
              damages, if any, caused to you are not irreparable or sufficient
              to entitle you to an injunction preventing any exploitation of any
              web site, service, property, product or other content owned or
              controlled by GREENLYNC, and you will have no rights to enjoin or
              restrain the development, production, distribution, advertising,
              exhibition or exploitation of any web site, property, product,
              service, or other content owned or controlled by GREENLYNC.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 18. DISPUTE RESOLUTION & ARBITRATION AGREEMENT
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              THIS ARTICLE 18 GOVERNS HOW DISPUTES BETWEEN THE PARTIES ARE
              RESOLVED, AND REQUIRES THAT DISPUTES BE SUBMITTED TO BINDING
              INDIVIDUAL ARBITRATION. PLEASE REVIEW CAREFULLY AS IT LIMITS
              CERTAIN RIGHTS INCLUDING THE RIGHT TO MAINTAIN A COURT ACTION, THE
              RIGHT TO A JURY TRIAL, AND THE RIGHT TO PARTICIPATE IN CLASS OR
              OTHER COLLECTIVE ACTIONS.
              {'\n\n'}
              18.1. Pre-Arbitration Dispute Resolution and Notification. In the
              event a dispute arises out of or relates to this Agreement, the
              Parties, in good faith, agree to first attempt to resolve the
              dispute between them through informal direct discussions prior to
              the initiation of arbitration. If, after a good faith effort to
              negotiate, one Party feels the dispute has not and cannot be
              resolved informally, the Party intending to pursue arbitration
              agrees to notify the other Party via email prior to initiating the
              arbitration.
              {'\n\n'}
              18.2. Agreement to Arbitrate. In the event the Parties cannot
              resolve a dispute through direct informal discussions, the Parties
              mutually agree that any dispute, claim, counterclaim, or
              controversy arising out of or relating to this Agreement—including
              the applicability, breach, termination, validity, enforcement or
              interpretation thereof—or the use of the Site and/or Services
              (collectively, “Disputes”) will be settled by binding individual
              arbitration (the “Arbitration Agreement”). If there is a dispute
              about whether this Arbitration Agreement can be enforced or
              applies to a Dispute, the Parties mutually agree that the
              arbitrator will decide this issue.
              {'\n\n'}
              18.3. Exceptions to Arbitration Agreement. The Parties mutually
              agree that the following claims are exceptions to the Arbitration
              Agreement and will be brought in a judicial proceeding in a court
              of competent jurisdiction:
              {'\n\n'}
              (a) any claim related to actual or threatened infringement,
              misappropriation or violation of a party’s copyrights, trademarks,
              trade secrets, patents, or other intellectual property rights; and
              {'\n\n'}
              (b) any claim seeking emergency injunctive relief based on exigent
              circumstances. Filing of claims under this Section 18.3 shall not
              be deemed a waiver of either Party’s right under the Arbitration
              Agreement to have all other Disputes determined by individual
              arbitration in accordance with the terms of the Arbitration
              Agreement.
              {'\n\n'}
              18.4. Arbitration Rules and Governing Law. This Arbitration
              Agreement shall be governed by the Federal Arbitration Act. The
              arbitration will be administered by the American Arbitration
              Association (“AAA”) in accordance with the AAA Commercial
              Arbitration Rules and/or other AAA arbitration rules determined to
              be applicable by AAA (the “AAA Rules”) then in effect, except as
              modified here. The arbitration will be heard and determined by a
              single arbitrator. The arbitrator’s decision in any such
              arbitration will be final and binding upon the Parties and may be
              enforced in any court of competent jurisdiction. The Parties agree
              that the arbitration will be kept confidential and that the
              existence of the proceeding and any element of it (including,
              without limitation, any pleadings, briefs or other documents
              submitted or exchanged and any testimony or other oral submissions
              and awards) will not be disclosed beyond the arbitration
              proceedings, except as may lawfully be required in judicial
              proceedings relating to the arbitration or by applicable
              disclosure rules and regulations of securities regulatory
              authorities or other governmental agencies. The Parties shall pay
              their own costs related to the arbitration, provided that in the
              final award, the arbitrator may apportion the costs and fees of
              arbitration among the Parties in such amounts as the arbitrator
              deems appropriate.
              {'\n\n'}
              18.5. Jury Trial Waiver. Both User and GREENLYNC acknowledge and
              agree that they are waiving the right to a trial by jury as to all
              disputes subject to arbitration.
              {'\n\n'}
              18.6. No Class Actions or Representative Proceedings. Both User
              and GREENLYNC acknowledge and agree that, to the fullest extent
              permitted by law, each is waiving the right to participate as a
              plaintiff or class member in any purported class action lawsuit,
              class-wide arbitration, collective action, private attorney
              general action, or any other representative proceeding as to all
              Disputes. Disputes may not be arbitrated on a class, collective or
              representative basis. Unless User and GREENLYNC both otherwise
              agree in writing, the arbitrator may not consolidate or join the
              claims of other persons or parties, or otherwise preside over any
              form of class action or representative proceeding. If the “class
              action lawsuit” waiver or the “class-wide arbitration” waiver in
              this Section is held unenforceable with respect to any Dispute,
              then the entirety of the Arbitration Agreement will be deemed void
              with respect to such Dispute and the Dispute must proceed in
              court. If the “collective action” waiver or the “private attorney
              general action” waiver or the “representative proceeding” waiver
              in this Section 17.6 is held unenforceable with respect to any
              Dispute, those waivers may be severed from this Arbitration
              Agreement and the Parties agree that any private attorney general
              claims and representative claims in the Dispute will be severed
              and stayed, pending the resolution of any claims subject to
              arbitration in the Dispute in individual arbitration.
              {'\n\n'}
              18.7. Severability, No Waiver. Except as provided in Section 18.6,
              if any provision of the Arbitration Agreement is found to be
              invalid or unenforceable, then that specific provision shall be of
              no force and effect and shall be severed, but the remainder of the
              Arbitration Agreement shall continue in full force and effect.
              {'\n\n'}
              18.8. Survival Past Termination. Unless superseded by a later
              arbitration agreement between the Parties, this Arbitration
              Agreement will survive the termination of this Agreement.
              {'\n\n'}
              18.9. Jurisdiction/venue. The parties further agree to the
              exclusive jurisdiction of the federal or state courts in Los
              Angeles County, California, as the case may be, for purposes of
              any pre-arbitral injunctive relief, including any application for
              a preliminary injunction or order compelling arbitration, and
              waive any objection to laying venue in any such action or
              proceeding in such courts, or that such courts are an inconvenient
              forum or do not have jurisdiction over such party. Neither the
              parties nor the arbitrators may publicly disclose the existence,
              content or results of any arbitration hereunder without the prior
              written consent of both parties.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 19. PRIVACY STATEMENT
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              19.1 By accessing or using the Platform/Websites or Services, you
              agree that the GREENLYNC Privacy Policy and Data Policy (which may
              be updated from time to time) governs GREENLYNC’s collection and
              use of your personal information. Registration data and certain
              other information about you are subject to our Privacy Policy and
              Data Policy. For more information, please make sure that you
              review our Privacy Policy and Data Policy. You understand that
              through your access or use of the Platform/Websites and any
              Services, you consent to the collection and use (as set forth in
              the Privacy Policy) of this information, including the transfer of
              information to the United States and/or other countries for
              storage, processing and use by GREENLYNC.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 20. CHANGES TO THE TERMS,ADDITIONAL TERMS, PRIVACY
              STATEMENT, DATA POLICY OR COMMUNITY STANDARDS
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              20.1. In the event we make changes to the Terms, the Additional
              Terms, Privacy Policy, Data Policy, or Community Standards we will
              notify you by:
              {'\n\n'}
              (a) sending you an e-mail communication to the e-mail address you
              most recently provided to us,
              {'\n\n'}
              (b) sending a push notification or in-app notification,
              {'\n\n'}
              (c) by prominently posting a notice of the changes on the
              Platform/Websites, or
              {'\n\n'}
              (d) by requiring you to check a box indicating your assent to the
              updated terms. Continued use of any of the Platform/Websites or
              Services following any applicable notice of such material changes
              shall indicate your acknowledgement of such changes and agreement
              to be bound by the terms and conditions of such changes.
            </Text>
            <Text style={TermsOfUseScreenStyle.subHeaderTitle}>
              ARTICLE 21. MISCELLANEOUS
            </Text>
            <Text style={TermsOfUseScreenStyle.termsOfUseTextContainer}>
              21.1. These terms constitute the entire agreement between Users
              and GREENLYNC regarding use of the Services, although additional
              terms may apply to licensed cannabis businesses.
              {'\n\n'}
              21.2. The failure of GREENLYNC to enforce any right or provision
              of these Terms will not constitute a waiver of future enforcement
              of that right or provision. The waiver of any such right or
              provision will be effective only if in writing and signed by a
              duly authorized representative of GREENLYNC. Except as expressly
              set forth in these Terms, the exercise by either party of any of
              its remedies under these Terms will be without prejudice to its
              other remedies under these Terms or otherwise. If for any reason a
              court of competent jurisdiction finds any provision of these Terms
              invalid or unenforceable, that provision will be enforced to the
              maximum extent permissible and the other provisions of these Terms
              will remain in full force and effect.
              {'\n\n'}
              21.3. Should any competent court or arbitrator determine that any
              provision of these Terms is unenforceable as written, then said
              provision shall be deemed to have been rewritten in accordance
              with the law; if that is not possible, then that provision shall
              be deemed to have been stricken from the Terms, and all other
              provisions remain in full force and effect. If you do not agree to
              these Terms, please stop using Service immediately.
              {'\n\n'}
              21.4. These Terms do not and are not intended to confer any rights
              or remedies upon any person other than you and GREENLYNC.
              {'\n\n'}
              21.5. You acknowledge and agree that GREENLYNC will have no
              obligation to provide you with any support or maintenance in
              connection with the Platform/Websites or Services.
              {'\n\n'}
              21.6. You agree that your GREENLYNC account is non-transferable
              and any rights to your Platform/Website user identification or
              contents within your accounts terminate upon your death.
              {'\n\n'}
              21.7. The section titles in these Terms are for convenience only
              and have no legal or contractual effect.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default TermsOfUseScreen;
