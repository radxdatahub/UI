import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';
import figure1UserReg from '../../images/UserReg/createAccount/figure1UserReg.png';
import figure2UserReg from '../../images/UserReg/createAccount/figure2UserReg.png';
import figure3UserReg from '../../images/UserReg/createAccount/figure3UserReg.png';
import figure4UserReg from '../../images/UserReg/createAccount/figure4UserReg.png';
import figure5UserReg from '../../images/UserReg/createAccount/figure5UserReg.png';

export const userReg = {
    mainTitle: 'User Registration',
    state: 'userReg',
    sections: [
        {
            title: 'Create An Account',
            id: 'create-an-account',
            state: 'userReg',
            content: (
                <>
                    <p>
                        To create a RADx Data Hub account, you will first need a{' '}
                        <a target="_blank" rel="noopener noreferrer" href="https://datascience.nih.gov/researcher-auth-service-initiative">
                            Researcher Auth Service
                        </a>{' '}
                        (RAS) Identity Provider (IdP) account, specifically an {/* eslint-disable-next-line max-len */}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            // eslint-disable-next-line max-len
                            href="https://auth.nih.gov/CertAuthV3/forms/erapivamswexemptMFADOC.aspx?TYPE=33554433&REALMOID=06-b66e745d-53f5-49b3-a3c5-32e7c9d5d6c5&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=nihwamwebagent&TARGET=-SM-HTTPS%3a%2f%2fauth%2enih%2egov%2feRA%2fredirectorexternal%2easp%3ftarget%3dhttps%3a%2f%2fpublic%2eera%2enih%2egov%3a443%2fcommons"
                        >
                            NIH Login
                        </a>{' '}
                        or {' ' /* eslint-disable-next-line max-len */}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            // eslint-disable-next-line max-len
                            href="https://public.era.nih.gov/commonsplus/public/login.era?TARGET=https%3A%2F%2Fpublic.era.nih.gov%3A443%2Fxtract%2FxTractHome.era%3Fmenu_itemPath%3D613"
                        >
                            eRA Commons
                        </a>{' '}
                        account. Once you have an account with either IdP, you can register with the RADx Data Hub following the steps
                        below:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            To register, click “Login” in the top right corner on any RADx Data Hub page. The system will display a modal
                            with a Login/Sign Up using RAS button (Figure 1).
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure1UserReg} alt="Figure 1: Login Modal" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 1: Login Modal</figcaption>
                        <li className={classes.tutorialListItem}>
                            Press “Login/Sign-Up Using RAS,” and you will be directed to the RAS Sign-In page (Figure 2).
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure2UserReg} alt="Figure 2: RAS Login Page" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 2: RAS Login Page</figcaption>
                        <li className={classes.tutorialListItem}>
                            Enter your eRA or NIH Login credentials, and the system will redirect you to the RADx Data Hub User Registration
                            page. (Figure 3).
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure3UserReg} alt="Figure 3: User Registration Form" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 3: User Registration Form</figcaption>
                        <li className={classes.tutorialListItem}>
                            Fill in the required fields. The system automatically displays First Name, Last Name, Middle Initial
                            (M.I.), and Email based on your RAS information. If these are incorrect, please contact RAS.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Click the Institution dropdown and add an institution. If you cannot find your institution, press “Click here
                            to add an institution” under the dropdown. Fill out the required fields (Figure 4) and press “Add Institution.”
                            After that, the institution should appear in the Institution dropdown.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure4UserReg} alt="Figure 4: Add Institution Form" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 4: Add Institution Form</figcaption>
                        <li className={classes.tutorialListItem}>
                            Carefully read the Terms and Conditions (Figure 5) and click the provided box to accept conditions.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure5UserReg} alt="Figure 5: Terms & Conditions" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 5: Terms & Conditions</figcaption>
                        <li className={classes.tutorialListItem}>
                            Press “Submit” to finish registering. The system will automatically log you in, redirect you to the Home page,
                            and send an email confirming the registration.
                        </li>
                    </ol>
                    <i className={classes.tutorialListItem}>
                        Note: RADx Data Hub leverages dbGaP to manage study access. When registering for the RADx Data Hub, register using the same
                        RAS credentials used for dbGaP (or a linked account). Failure to do this will make it impossible for the system to show
                        your authorized studies available in “My Approved Data.”
                    </i>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Login to the RADx Data Hub',
            id: 'login-to-your-account',
            state: 'userReg',
            content: (
                <>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Click “Login” in the top right corner on any RADx Data Hub page. The system will display an additional modal
                            with a login/sign up option (Figure 1).
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure1UserReg} alt="Figure 1: Login/Sign-up Modal" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 1: Login/Sign-up Modal</figcaption>
                        <li className={classes.tutorialListItem}>
                            Press “Login/Sign-Up Using RAS,” and you will be directed to the RAS sign-in page (Figure 2).
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure2UserReg} alt="Figure 2: RAS Sign-in Page" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 2: RAS Sign-In Page</figcaption>
                        <li className={classes.tutorialListItem}>
                            Select the NIH Login or eRA option and enter login credentials. The system will redirect you to the home page
                            after correctly entering your credentials.
                        </li>
                    </ol>
                    <i>
                        Note: If you have a login.gov account linked to an NIH Login or eRA account used for dbGaP, you may use that to login.
                    </i>
                </>
            ),
            subSections: [],
        },
    ],
};
