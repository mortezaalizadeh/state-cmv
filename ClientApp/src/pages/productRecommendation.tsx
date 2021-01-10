import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Button } from '../components/chromaComponents'
import { Heading, Text } from '../components/chromaComponents'
import { IApplicationState} from '../store'
import * as IInsuranceApplicationStore from '../store/insurance-application.store'

import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import ProductsRecommendation from '../components/productsRecommendation/productsRecommendation'
import { IInsuranceApplication } from '../models/insurance-application'
import { IRemoveProductInstance } from '../models/product'

import { ProductContentConfig } from '../config/product-content.config'

// At runtime, Redux will merge together...
interface ProductRecommendationProps extends RouteComponentProps<any> {
  insuranceApplication: IInsuranceApplication
}

class ProductRecommendation extends React.PureComponent<ProductRecommendationProps> {
  constructor(props: Readonly<ProductRecommendationProps>) {
    super(props)

    this.routeBack = this.routeBack.bind(this)
    this.routeNext = this.routeNext.bind(this)
  }

  public componentDidMount() {
  }


  private routeBack() {
    console.log('off we go to back page!')
    this.props.history.push('/')
  }

  private routeNext() {
    console.log('off we go to next page!')
    this.props.history.push('/businessDetails')
  }

  public render() {
    return (
      <React.Fragment>
        <Heading size={3}>
          Based on the information you've provided, businesses like yours have the following cover*
        </Heading>
        <Text>Select the insurance policies you need for your business</Text>
        <ProductsRecommendation
          products={this.props.insuranceApplication?.productInstances}
          productContentConfig={ProductContentConfig?.find(x=> x.brand === this.props.insuranceApplication?.brand)?.config}
        ></ProductsRecommendation>
            <Button onClick={this.routeBack} margin={{ right: 2 }} maxWidth="xs" primary>
          go to back
        </Button>
            <Button onClick={this.routeNext} maxWidth="xs" primary>
          go to next page
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        removeProductInstance: (productInstanceIds: IRemoveProductInstance, callback: () => void) => dispatch(IInsuranceApplicationStore.actionCreators.removeProducts(productInstanceIds, callback))
    }
}

export default withRouter(
  connect(
    mapStateToProps, 
    null
  )(ProductRecommendation as any)
) 
