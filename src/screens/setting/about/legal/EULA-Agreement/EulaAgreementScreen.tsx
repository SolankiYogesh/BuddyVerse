import React from 'react';
import {View, Text, ScrollView, SafeAreaView, Linking} from 'react-native';
import {ms} from 'react-native-size-matters';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import {colorPalates, fonts} from 'theme';
import EulaAgreementScreenStyle from './EulaAgreementScreenStyle';

const EulaAgreementScreen = () => {
  return (
    <SafeAreaView style={EulaAgreementScreenStyle.container}>
      {/* <SettingHeader title="EULA Agreement" /> */}
      <ScreenHeader isBackVisible={true} title="EULA Agreement" />
      <View style={EulaAgreementScreenStyle.mainContainer}>
        <ScrollView>
          <Text style={EulaAgreementScreenStyle.headerTitle}>
            End User License Agreement
          </Text>
          <Text style={{marginLeft: ms(24), color: colorPalates.grayShade8F}}>
            Last updated on July 2022
          </Text>
          <View>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              This Greenlync Mobile Application End User License Agreement
              ("Agreement") is a binding agreement between you ("End User" or
              "you") and Buzzlync Inc ("Company"). This Agreement governs your
              use of the "Greenlync" APP on the MOBILE PLATFORMS and MOBILE
              DEVICES, (including all related documentation, the "Application").
              The Application is licensed, not sold, to you.
              {'\n\n'}
              BY CLICKING THE "AGREE" BUTTON or by DOWNLOADING/INSTALLING/USING
              THE APPLICATION, YOU (A) ACKNOWLEDGE THAT YOU HAVE READ AND
              UNDERSTAND THIS AGREEMENT; (B) REPRESENT THAT YOU ARE 18 YEARS OF
              AGE OR OLDER/OF LEGAL AGE TO ENTER INTO A BINDING AGREEMENT; AND
              (C) ACCEPT THIS AGREEMENT AND AGREE THAT YOU ARE LEGALLY BOUND BY
              ITS TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT DOWNLOAD/
              INSTALL/USE THE APPLICATION AND DELETE IT FROM YOUR MOBILE DEVICE.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              Important
            </Text>
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
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              User-Generated Content
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
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
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              1.License Grant
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              Subject to the terms of this Agreement, Company grants you a
              limited, non-exclusive and nontransferable license to:
              {'\n\n'}
              (a) download, install and use the Application for your personal,
              non-commercial use on a mobile device owned or otherwise
              controlled by you ("Mobile Device") strictly in accordance with
              the Application's documentation.
              {'\n\n'}
              (b)access, stream, download and use on such Mobile Device the
              Content and Services (as defined in Section 5) made available in
              or otherwise accessible through the Application, strictly in
              accordance with this Agreement and the Terms of Use applicable to
              such Content and Services as set forth in Section 5].
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              2.License Restrictions
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              Licensee shall not:
              {'\n\n'}
              (a)copy the Application, except as expressly permitted by this
              license;
              {'\n\n'}
              (b)modify, translate, adapt or otherwise create derivative works
              or improvements, whether or not patentable, of the Application;
              {'\n\n'}
              (c)reverse engineer, disassemble, decompile, decode or otherwise
              attempt to derive or gain access to the source code of the
              Application or any part thereof;
              {'\n\n'}
              (d)remove, delete, alter or obscure any trademarks or any
              copyright, trademark, patent or other intellectual property or
              proprietary rights notices from the Application, including any
              copy thereof;
              {'\n\n'}
              (e)rent, lease, lend, sell, sublicense, assign, distribute,
              publish, transfer or otherwise make available the Application or
              any features or functionality of the Application, to any third
              party for any reason, including by making the Application
              available on a network where it is capable of being accessed by
              more than one device at any time; [or]
              {'\n\n'}
              (f)remove, disable, circumvent or otherwise create or implement
              any workaround to any copy protection, rights management or
              security features in or protecting the Application; or
              {'\n\n'}
              (g)use the Application in, or in association with, the design,
              construction, maintenance or operation of any hazardous
              environments or systems, including any power generation systems;
              aircraft navigation or communication systems, air traffic control
              systems or any other transport management systems; safety-critical
              applications, including medical or life-support systems, vehicle
              operation applications or any police, fire or other safety
              response systems; and military or aerospace applications, weapons
              systems or environments.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              3.Reservation of Rights
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              You acknowledge and agree that the Application is provided under
              license, and not sold, to you. You do not acquire any ownership
              interest in the Application under this Agreement, or any other
              rights thereto other than to use the Application in accordance
              with the license granted, and subject to all terms, conditions and
              restrictions, under this Agreement. Company and its licensors and
              service providers reserve and shall retain their entire right,
              title and interest in and to the Application, including all
              copyrights, trademarks and other intellectual property rights
              therein or relating thereto, except as expressly granted to you in
              this Agreement.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              4.Collection and Use of Your Information
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              You acknowledge that when you download, install or use the
              Application, Company may use automatic means (including, for
              example, cookies and web beacons) to collect information about
              your Mobile Device and about your use of the Application. You also
              may be required to provide certain information about yourself as a
              condition to downloading, installing or using the Application or
              certain of its features or functionality, and the Application may
              provide you with opportunities to share information about yourself
              with others. All information we collect through or in connection
              with this Application is subject to our Privacy Policy
              https://greenlync.com/greenlync-privacy-policy . By downloading,
              installing, using and providing information to or through this
              Application, you consent to all actions taken by us with respect
              to your information in compliance with the Privacy Policy.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              5.Content and Services
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              The Application may provide you with access to Company's website
              located at greenlync.com (the "Website") and products and services
              accessible thereon, and certain features, functionality and
              content accessible on or through the Application may be hosted on
              the Website (collectively, "Content and Services"). Your access to
              and use of such Content and Services are governed by Website's
              Terms of Use and Privacy Policy located at
              https://greenlync.com/greenlync-terms-of-use/ and
              https://greenlync.com/greenlync-privacy-policy , which are
              incorporated herein by this reference. Your access to and use of
              such Content and Services may require you to acknowledge your
              acceptance of such Terms of Use and Privacy Policy and/or to
              register with the Website and your failure to do so may restrict
              you from accessing or using certain of the Application's features
              and functionality. Any violation of such Terms of Use will also be
              deemed a violation of this Agreement.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              6.Geographic Restrictions
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              The Content and Services are based in England. You acknowledge
              that you may not be able to access all or some of the Content and
              Services from certain countries and that access thereto may not be
              legal by certain persons or in certain countries. If you access
              the Content and Services from outside the England, you are
              responsible for compliance with local laws.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              7.Updates
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              Company may from time to time in its sole discretion develop and
              provide Application updates, which may include upgrades, bug
              fixes, patches and other error corrections and/or new features
              (collectively, including related documentation, "Updates").
              Updates may also modify or delete in their entirety certain
              features and functionality. You agree that Company has no
              obligation to provide any Updates or to continue to provide or
              enable any particular features or functionality. Based on your
              Mobile Device settings, when your Mobile Device is connected to
              the internet either:
              {'\n\n'}
              (a)the Application will automatically download and install all
              available Updates; or
              {'\n\n'}
              (b)you may receive notice of or be prompted to download and
              install available Updates.
              {'\n\n'}
              You shall promptly download and install all Updates and
              acknowledge and agree that the Application or portions thereof may
              not properly operate should you fail to do so. You further agree
              that all Updates will be deemed part of the Application and be
              subject to all terms and conditions of this Agreement.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              8.Third Party Materials
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              The Application may display, include or make available third-party
              content (including data, information, applications, intellectual
              property and other products services and/or materials) or provide
              links to third-party websites or services, including through
              third-party advertising ("Third Party Materials"). You acknowledge
              and agree that Company is not responsible for Third Party
              Materials, including their accuracy, completeness, timeliness,
              validity, copyright compliance, legality, decency, quality or any
              other aspect thereof. Company does not assume and will not have
              any liability or responsibility to you or any other person or
              entity for any Third Party Materials. Third Party Materials and
              links thereto are provided solely as a convenience to you and you
              access and use them at entirely at your own risk and subject to
              such third parties' terms and conditions.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              9.Term and Termination
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              (a)The term of Agreement commences when you download/install the
              Application and will continue in effect until terminated by you or
              Company as set forth in this Section 9.
              {'\n\n'}
              (b)You may terminate this Agreement by deleting the Application
              and all copies thereof from your Mobile Device.
              {'\n\n'}
              (c)Company may terminate this Agreement at any time without notice
              if it ceases to support the Application, which Company may do in
              its sole discretion or in the for OTHER TERMINATION EVENTS. In
              addition, this Agreement will terminate immediately and
              automatically without any notice if you violate any of the terms
              and conditions of this Agreement.
              {'\n\n'}
              (d)Upon termination:
              {'\n\n'}
              (i)all rights granted to you under this Agreement will also
              terminate; and
              {'\n\n'}
              (ii)you must cease all use of the Application and delete all
              copies of the Application from your Mobile Device and account.
              {'\n\n'}
              (e)Termination will not limit any of Company's rights or remedies
              at law or in equity.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              10.Disclaimer of Warranties
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              THE APPLICATION IS PROVIDED TO LICENSEE "AS IS" AND WITH ALL
              FAULTS AND DEFECTS WITHOUT WARRANTY OF ANY KIND. TO THE MAXIMUM
              EXTENT PERMITTED UNDER APPLICABLE LAW, COMPANY, ON ITS OWN BEHALF
              AND ON BEHALF OF ITS AFFILIATES AND ITS AND THEIR RESPECTIVE
              LICENSORS AND SERVICE PROVIDERS, EXPRESSLY DISCLAIMS ALL
              WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, WITH
              RESPECT TO THE APPLICATION, INCLUDING ALL IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND
              NON-INFRINGEMENT, AND WARRANTIES THAT MAY ARISE OUT OF COURSE OF
              DEALING, COURSE OF PERFORMANCE, USAGE OR TRADE PRACTICE. WITHOUT
              LIMITATION TO THE FOREGOING, COMPANY PROVIDES NO WARRANTY OR
              UNDERTAKING, AND MAKES NO REPRESENTATION OF ANY KIND THAT THE
              APPLICATION WILL MEET YOUR REQUIREMENTS, ACHIEVE ANY INTENDED
              RESULTS, BE COMPATIBLE OR WORK WITH ANY OTHER SOFTWARE,
              APPLICATIONS, SYSTEMS OR SERVICES, OPERATE WITHOUT INTERRUPTION,
              MEET ANY PERFORMANCE OR RELIABILITY STANDARDS OR BE ERROR FREE OR
              THAT ANY ERRORS OR DEFECTS CAN OR WILL BE CORRECTED.
              {'\n\n'}
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF OR LIMITATIONS ON
              IMPLIED WARRANTIES OR THE LIMITATIONS ON THE APPLICABLE STATUTORY
              RIGHTS OF A CONSUMER, SO SOME OR ALL OF THE ABOVE EXCLUSIONS AND
              LIMITATIONS MAY NOT APPLY TO YOU.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              11.Limitation of Liability
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
              WILL COMPANY OR ITS AFFILIATES, OR ANY OF ITS OR THEIR RESPECTIVE
              LICENSORS OR SERVICE PROVIDERS, HAVE ANY LIABILITY ARISING FROM OR
              RELATED TO YOUR USE OF OR INABILITY TO USE THE APPLICATION OR THE
              CONTENT AND SERVICES FOR:
              {'\n\n'}
              (a)PERSONAL INJURY, PROPERTY DAMAGE, LOST PROFITS, COST OF
              SUBSTITUTE GOODS OR SERVICES, LOSS OF DATA, LOSS OF GOODWILL,
              BUSINESS INTERRUPTION, COMPUTER FAILURE OR MALFUNCTION OR ANY
              OTHER CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL OR
              PUNITIVE DAMAGES
              {'\n\n'}
              (b)DIRECT DAMAGES IN AMOUNTS THAT IN THE AGGREGATE EXCEED THE
              AMOUNT ACTUALLY PAID BY YOU FOR THE APPLICATION.
              {'\n\n'}
              THE FOREGOING LIMITATIONS WILL APPLY WHETHER SUCH DAMAGES ARISE
              OUT OF BREACH OF CONTRACT, TORT (INCLUDING NEGLIGENCE) OR
              OTHERWISE AND REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE
              OR COMPANY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME
              JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS OF LIABILITY SO
              SOME OR ALL OF THE ABOVE LIMITATIONS OF LIABILITY MAY NOT APPLY TO
              YOU.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              12.Indemnification
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              You agree to indemnify, defend and hold harmless Company and its
              officers, directors, employees, agents, affiliates, successors and
              assigns from and against any and all losses, damages, liabilities,
              deficiencies, claims, actions, judgments, settlements, interest,
              awards, penalties, fines, costs, or expenses of whatever kind,
              including reasonable attorneys' fees, arising from or relating to
              your use or misuse of the Application or your breach of this
              Agreement. Furthermore, you agree that the Compnay assumes no
              responsibility for the content you submit or make available
              through this Application.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              13.Export Regulation
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              The Application may be subject to export control laws. You shall
              not, directly or indirectly, export, re-export or release the
              Application to, or make the Application accessible from, any
              jurisdiction or country to which export, re-export or release is
              prohibited by law, rule or regulation.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              14.US Government Rights
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              The Application is commercial computer software, as such term is
              defined in 48 C.F.R. §2.101. Accordingly, if you are an agency of
              the US Government or any contractor therefor, you receive only
              those rights with respect to the Application as are granted to all
              other end users under license, in accordance with (a) 48 C.F.R.
              §227.7201 through 48 C.F.R. §227.7204, with respect to the
              Department of Defense and their contractors, or (b) 48 C.F.R.
              §12.212, with respect to all other US Government licensees and
              their contractors.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              15.Severability
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              If any provision of this Agreement is illegal or unenforceable
              under applicable law, the remainder of the provision will be
              amended to achieve as closely as possible the effect of the
              original term and all other provisions of this Agreement will
              continue in full force and effect.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              16.Governing Law
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              This Agreement is governed by and construed in accordance with the
              internal laws of the England without giving effect to any choice
              or conflict of law provision or rule. Any legal suit, action or
              proceeding arising out of or related to this Agreement or the
              Application shall be instituted exclusively in the courts of
              England. You waive any and all objections to the exercise of
              jurisdiction over you by such courts and to venue in such courts.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              17.Limitation of Time to File Claims
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR
              RELATING TO THIS AGREEMENT OR THE APPLICATION MUST BE COMMENCED
              WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE,
              SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              18.Entire Agreement
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              This Agreement[, and our Privacy Policy constitute the entire
              agreement between you and Company with respect to the Application
              and supersede all prior or contemporaneous understandings and
              agreements, whether written or oral, with respect to the
              Application.
            </Text>
            <Text style={EulaAgreementScreenStyle.subHeaderTitle}>
              19.Waiver
            </Text>
            <Text style={EulaAgreementScreenStyle.termsOfUseTextContainer}>
              No failure to exercise, and no delay in exercising, on the part of
              either party, any right or any power hereunder shall operate as a
              waiver thereof, nor shall any single or partial exercise of any
              right or power hereunder preclude further exercise of that or any
              other right hereunder. In the event of a conflict between this
              Agreement and any applicable purchase or other terms, the terms of
              this Agreement shall govern.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EulaAgreementScreen;
