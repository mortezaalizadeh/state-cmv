import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Button } from '../components/chromaComponents'
import {
  Heading,
  Accordion,
  AccordionItem,
  FormGroup,
  Input,
  List,
  ListItem,
  Select,
  Text,
  SegmentedControl,
} from '../components/chromaComponents'
import { IApplicationState, IApplicationState as ApplicationState } from '../store'
import { IInsuranceApplication } from '../models/insurance-application'

interface BusinessDetailsProps extends RouteComponentProps<any> {
  insuranceApplication: IInsuranceApplication
}
class BusinessDetails extends React.PureComponent<BusinessDetailsProps> {
  constructor(props: Readonly<BusinessDetailsProps>) {
    super(props)

    this.routeBack = this.routeBack.bind(this)
    this.routeNext = this.routeNext.bind(this)
  }

  private routeBack() {
    this.props.history.push('/products')
  }

  private routeNext() {
    this.props.history.push('/otherCover')
  }

  private createMockGeneralQuestion(textToDisplay: string) {
    return (
      <FormGroup label={textToDisplay}>
        <Input />
        <p>sample help text for {textToDisplay}</p>
      </FormGroup>
    )
  }

  private createMockQuestionElement() {
    return (
      <FormGroup
        legend="Does the business involve any of the following?"
        helpText={
          <List
            bullet
            margin={{
              top: 2,
              bottom: 4,
            }}
          >
            <ListItem keyProp="1">
              <Text>Commercial cooking at the house</Text>
            </ListItem>
            <ListItem keyProp="2">
              <Text>Manufacturing or repair work</Text>
            </ListItem>
            <ListItem keyProp="3">
              <Text>Surgery or consulting room</Text>
            </ListItem>
          </List>
        }
      >
        <SegmentedControl
          values={[
            {
              label: 'Yes',
              value: 'yes',
            },
            {
              label: 'No',
              value: 'No',
            },
          ]}
        />
      </FormGroup>
    )
  }
  private createMockDropDownElement() {
    return (
      <FormGroup label="Label">
        <Select
          name="select-1"
          value={'value 1'}
          values={[
            {
              label: 'Please select',
              value: '',
            },
            {
              label: 'Company',
              value: 'value 1',
            },
            {
              label: 'label 2',
              value: 'value 2',
            },
          ]}
        />
      </FormGroup>
    )
  }

  public render() {
    return (
      <React.Fragment>
        <Heading size={2}>Your business details</Heading>
        <Heading size={4}>
          In order to calculate an accurate quote we just need to ask a few questions about your business.
        </Heading>

        <Accordion initial={1}>
          <AccordionItem
            label={{
              text: 'General Details',
              name: 'General Details',
            }}
            content={{
              component: (
                <div>
                  {this.createMockGeneralQuestion("Company name")}
                  {this.createMockGeneralQuestion("Cover start date")}
                </div>
              ),
            }}
            toggleItem={() => {}}
          />

          <AccordionItem
            label={{
              text: 'Liability',
              name: 'Liability',
            }}
            content={{
              component: (
                <div>
                  {this.createMockDropDownElement()}
                  {this.createMockQuestionElement()}
                  {this.createMockQuestionElement()}
                  {this.createMockDropDownElement()}
                  {this.createMockQuestionElement()}
                </div>
              ),
            }}
            toggleItem={() => {}}
          />
        </Accordion>

        <Button onClick={this.routeBack} primary>
          Back and Modify
        </Button>
        <Button onClick={this.routeNext} primary>
          Next
        </Button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    insuranceApplication: store.insuranceApplication?.insuranceApplication,
  }
}

export default withRouter(connect(mapStateToProps, null)(BusinessDetails as any))
