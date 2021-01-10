import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Column, Container, Row } from '@iag-packages/chroma-react/lib/layouts';
import { Heading, Text, Price, Input, List, ListItem, ButtonGroup, Button } from '@iag-packages/chroma-react/lib/components';
import { FormGroup } from '@iag-packages/chroma-react/lib/patterns';

import { Navigation } from '../../features/general';
import { selectState as quoteSelectState } from '../../framework/redux/quote/QuoteSlice';
import { selectState as locationSelectState } from '../../framework/redux/location/LocationSlice';

import styles from './Quote.module.css';

const QuoteContainer = ({ history }) => {
  const { quote } = useSelector(quoteSelectState);
  const { city } = useSelector(locationSelectState);
  const policyNumber = '123456';
  const policyName = quote === null ? 'Loading...' : quote.driverDetails.firstName + ' ' + quote.driverDetails.lastName;

  const handleGoBack = () => {
    history.goBack();
  };

  if (quote === null) {
    return <div>Loading...</div>;
  }

  const comprehensiveQuoteTotal = (
    quote.comprehensiveQuote.quotedItemSet.premiumDetails[0].annualisedPremium.totalPremium +
    quote.comprehensiveQuote.quotedItemSet.premiumDetails[0].annualisedPremium.gst
  ).toFixed(2);

  const comprehensiveQuoteMonthly = (comprehensiveQuoteTotal / 12).toFixed(2);

  const thirdPartyTheftAndFireQuoteTotal = (
    quote.thirdPartyTheftAndFireQuote.quotedItemSet.premiumDetails[0].annualisedPremium.totalPremium +
    quote.thirdPartyTheftAndFireQuote.quotedItemSet.premiumDetails[0].annualisedPremium.gst
  ).toFixed(2);

  const thirdPartyTheftAndFireQuoteMonthly = (thirdPartyTheftAndFireQuoteTotal / 12).toFixed(2);

  const thirdPartyQuoteTotal = (
    quote.thirdPartyQuote.quotedItemSet.premiumDetails[0].annualisedPremium.totalPremium +
    quote.thirdPartyQuote.quotedItemSet.premiumDetails[0].annualisedPremium.gst
  ).toFixed(2);

  const thirdPartyQuoteMonthly = (thirdPartyQuoteTotal / 12).toFixed(2);

  return (
    <Fragment>
      <Container fluid>
        <Navigation />
        <Row>
          <Column>
            <Text textAlign="center">Reference number: {policyNumber}</Text>
            <Heading size={2} textAlign="center">
              Thanks, {policyName}! Here’s your Quick Quote
            </Heading>
          </Column>
        </Row>
        <Row>
          <div className={styles.carousel}>
            <div className={styles.inner}>
              <div>
                <div className={styles.planName}>Comprehensive</div>
                <div className={styles.price}>
                  <Price amount={comprehensiveQuoteMonthly} fontSize={40} text="per month" />
                  <Text fontSize={18}>or ${comprehensiveQuoteTotal} per year</Text>
                </div>
                <Text fontSize={14} textAlign="center">
                  Covers you for accidents, theft, fire, vandalism and storm damage. Plus damage you cause to someone else’s car or property.
                </Text>
              </div>
              <div>
                <div className={styles.planName}>Third Party, Fire & Theft</div>
                <div className={styles.price}>
                  <Price amount={thirdPartyTheftAndFireQuoteMonthly} fontSize={40} text="per month" />
                  <Text fontSize={18}>or ${thirdPartyTheftAndFireQuoteTotal} per year</Text>
                </div>
                <Text fontSize={14} textAlign="center">
                  Covers you for fire and theft of your car. Plus damage you cause to someone else’s car or property.
                </Text>
              </div>
              <div>
                <div className={styles.planName}>Third Party</div>
                <div className={styles.price}>
                  <Price amount={thirdPartyQuoteMonthly} fontSize={40} text="per month" />
                  <Text fontSize={18}>or ${thirdPartyQuoteTotal} per year</Text>
                </div>
                <Text fontSize={14} textAlign="center">
                  Covers you for damage you cause to someone else’s car or property but doesn’t include your car.
                </Text>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <Column>
            <Heading size={3} textAlign="center">
              Your Quick Quote is based on the following information:
            </Heading>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormGroup label="Your vehicle’s market value">
              <Input placeholder="market value" onChange={() => {}} autoCapitalize="words" autoComplete="tel" autoCorrect="on" autoFocus value="" />
            </FormGroup>
            <div className={styles.range}>
              <Row>
                <Column>
                  <span className={styles.minRange}>$9,000</span>
                </Column>
                <Column>
                  <span className={styles.maxRange}>$18,000</span>
                </Column>
              </Row>
              <input type="range" className={styles.slider} />
            </div>
          </Column>
        </Row>
        <Row>
          <Column>
            <div className={styles.vehicle}>
              <Text weight={600}>VEHICLE DETAILS</Text>
              <List bullet>
                <ListItem keyProp="1">
                  <Text>{quote.vehicleDetails.registrationNumber}</Text>
                </ListItem>
                <ListItem keyProp="2">
                  <Text>{quote.vehicleDetails.fullDescription}</Text>
                </ListItem>
                <ListItem keyProp="3">
                  <Text>{quote.vehicleDetails.bodyStyle}</Text>
                </ListItem>
                <ListItem keyProp="4">
                  <Text>Driven mostly in: {city}</Text>
                </ListItem>
                <ListItem keyProp="5">
                  <Text>Not used for courier or taxi/rideshare</Text>
                </ListItem>
              </List>
            </div>
          </Column>
        </Row>
        <Row>
          <Column>
            <div className={styles.driver}>
              <Text weight={600}>DRIVER DETAILS</Text>
              <List bullet>
                <ListItem keyProp="1">
                  <Text>Name: {policyName}</Text>
                </ListItem>
                <ListItem keyProp="2">
                  <Text>Licence type: NZ Full</Text>
                </ListItem>
                <ListItem keyProp="3">
                  <Text>Date of birth: {quote.driverDetails.dateOfBirth.substring(0, 10)}</Text>
                </ListItem>
                <ListItem keyProp="4">
                  <Text>Has made a claim: No</Text>
                </ListItem>
              </List>
            </div>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text weight={600} color="black">
              Standard excess is $500. Prices include GST and applicable government levies.
            </Text>
          </Column>
        </Row>
        <Row>
          <Column>
            <ButtonGroup
              maxWidth
              margin={{
                bottom: 3,
              }}
            >
              <Button primary onClick={() => {}}>
                All good! Ready to proceed
              </Button>
              <Button secondary onClick={() => {}}>
                Need to modify the details
              </Button>
              <Button link onClick={handleGoBack}>
                Go back
              </Button>
            </ButtonGroup>
          </Column>
        </Row>
      </Container>
    </Fragment>
  );
};

export default withRouter(QuoteContainer);
