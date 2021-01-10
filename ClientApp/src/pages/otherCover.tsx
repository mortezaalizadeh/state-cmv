import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Button } from '../components/chromaComponents'
import { Heading } from '../components/chromaComponents'
import { IApplicationState, IApplicationState as ApplicationState } from '../store'
import * as IBusinessTypeStore from '../store/business-type.store'
import * as IInsuranceApplicationStore from '../store/insurance-application.store'
import { IInsuranceApplication } from '../models/insurance-application'

interface otherCoverProps extends RouteComponentProps<any> {
  insuranceApplication: IInsuranceApplication
}
class OtherCover extends React.PureComponent<otherCoverProps> {
  constructor(props: Readonly<otherCoverProps>) {
    super(props)

    this.routeBack = this.routeBack.bind(this)
    this.routeNext = this.routeNext.bind(this)
  }

  private routeBack() {
    this.props.history.push('/businessDetails')
  }

  private routeNext() {
    this.props.history.push('/quote')
  }

  public render() {
    return (
      <React.Fragment>
        <Heading size={2}>Other Cover Options</Heading>
        <Heading size={4}>
          The cover you've chosen only insures your business for certain risks. For broader cover, consider the
          following:
        </Heading>
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

export default withRouter(connect(mapStateToProps, null)(OtherCover as any))
