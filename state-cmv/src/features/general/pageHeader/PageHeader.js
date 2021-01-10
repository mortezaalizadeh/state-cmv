import React from 'react';
import { Logo, Icon } from '@iag-packages/chroma-react/lib/components';
import { Column, Header, Row } from '@iag-packages/chroma-react/lib/layouts';

const PageHeader = (props) => {
  return (
    <Header>
      <Row alignItems="center">
        <Column flexGrow={0}>
          <Row>
            <Logo
              link={{
                href: 'https://www.state.co.nz',
              }}
              brand={props.brand}
            />
          </Row>
        </Column>
        <Column>
          <Row justifyContent="end" alignItems="center">
            <div className="phoneIcon">
              <Icon name="i-phone" color="white" fontSize={20} ariaLabel="phone icon" />
            </div>
          </Row>
        </Column>
      </Row>
    </Header>
  );
};

export default PageHeader;
