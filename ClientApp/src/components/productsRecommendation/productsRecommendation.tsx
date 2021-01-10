import { connect } from 'react-redux'
import { Heading, Card, CardContent, Row, Column, Button, Icon, Checkbox, FormGroup } from '../../components/chromaComponents'
import React, {useEffect, useState} from 'react'

import { IProductInstance, ProductConfig } from '../../models/product'

import './productsRecommendation.css';

const ProductsRecommendation = React.memo(
    (props: {
        products?: IProductInstance[],
        productContentConfig?: ProductConfig[]
    }) => {
        const [allProducts, setAllProducts] = useState<IProductInstance[]>([]);
        useEffect(() => {
                if (props.products) {
                    setAllProducts(props.products);
                }
            },
            [props.products]);
        function getProductTitle(productId: string, productContentConfig?: ProductConfig[]) {
            return productContentConfig?.find((x) => x.id === productId)?.title
        }
        function getProductDescription(productId: string, productContentConfig?: ProductConfig[]) {
            return productContentConfig?.find((x) => x.id === productId)?.description
        }
        function getProductIcon(productId: string, productContentConfig?: ProductConfig[]) {
            return `icon icon--md ${productContentConfig?.find((x) => x.id === productId)?.iconLink}`
        }
        function onProductSelect(event:any, value:any) {
            //todo
        }
        function getProductCategories() {
            const categories: string[] = [];
            props.productContentConfig?.map(productConfig => {
                var findItem = categories.find(x => x === productConfig.category);
                if (!findItem && findItem !== undefined)
                    categories.push(findItem);
            });
            return categories;
        }
        return (
            <>
                {/** Display product */}
                {allProducts?.length > 0 && (
                    <>
                        {allProducts.map((productInstance) => {
                            return (
                                <Card border padding={4} margin={{ bottom: 3 }} key={productInstance.product.id}>
                                    <CardContent padding={9}>
                                        <Row>
                                            <Column xs={2}>
                                                <div className={getProductIcon(productInstance.product.id, props.productContentConfig)} />
                                            </Column>
                                            <Column xs={8}>
                                                <Heading size={4}>{getProductTitle(productInstance.product.id, props.productContentConfig)}</Heading>
                                                <p>{getProductDescription(productInstance.product.id, props.productContentConfig)}</p>
                                            </Column>
                                            <Column xs={2}>
                                                <FormGroup legend="Inline Checkbox example" labelHidden>
                                                    <Checkbox name="checkbox"
                                                        values={[{
                                                            label: '',
                                                            value: 'ACTIVE'
                                                        }]}
                                                            value={[productInstance.status]} />
                                                </FormGroup>
                                            </Column>
                                        </Row>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </>
                )}
            </>
        )
    });

export default connect()(ProductsRecommendation);