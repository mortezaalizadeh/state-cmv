import React, { Fragment } from 'react';
import { Row } from '@iag-packages/chroma-react/lib/layouts';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <Fragment>
      <Row>
        <nav className={styles.nav}>
          <div>
            <span>1</span>
            <mark>Quick Quote</mark>
          </div>
          <div>
            <span>2</span>
          </div>
          <div>
            <span>3</span>
          </div>
          <div>
            <span>4</span>
          </div>
          <div>
            <span>5</span>
          </div>
          <div>
            <span>6</span>
          </div>
        </nav>
      </Row>
    </Fragment>
  );
};

export default Navigation;
