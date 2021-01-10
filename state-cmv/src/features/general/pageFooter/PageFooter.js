import React from 'react';

import { getAssetsPath } from '@iag-packages/chroma-react/lib/utils/cdn';
import { Image } from '@iag-packages/chroma-react/lib/components';
import { Footer } from '@iag-packages/chroma-react/lib/layouts';

import styles from './PageFooter.module.css';

const PageFooter = () => {
  return (
    <Footer>
      <div id="legalFooter">
        <div className={'inner'}>
          <p>
            <span className={`${styles[`menu-links`]}`}>
              <a href="https://www.state.co.nz/about/privacy-policy" tabIndex={1001} rel="noopener noreferrer" target="_blank">
                Privacy policy
              </a>
              <a href="https://www.state.co.nz/about/terms-of-use" tabIndex={1002} rel="noopener noreferrer" target="_blank">
                Terms of use
              </a>
            </span>
          </p>
          <p className={`${styles[`secondLine`]}`}>
            State Insurance is a business division of IAG New Zealand Limited. This information is only intended as a guide. Policy limits and
            exclusions apply. Please refer to the policy wording for full terms and conditions. © IAG New Zealand Limited 2018
          </p>
        </div>
      </div>
      <div className={`${styles[`footerImage`]}`}>
        <Image height="64" src={`${getAssetsPath()}/svgs/backed-by-iag/light.svg`} alt="Backed by IAG" />
      </div>
    </Footer>
  );
};

export default PageFooter;
