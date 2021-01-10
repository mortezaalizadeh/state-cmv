import { connect } from 'react-redux'
import { Column, Header, Heading, Link, Logo, Row, Sticky } from '../chromaComponents'
import React from 'react'

const PageHeader = () => (
  <Sticky>
  <Header id="menuHeader">
    <Row alignItems="center">
      <Column flex justifyContent="start">
        <Logo link={{
          href: './'
        }} brand="ami"/>
      </Column>
      <Column flex alignItems="end" justifyContent="end" hidden="xs">
      </Column>
    </Row>
  </Header>
  </Sticky>
);

export default connect()(PageHeader);