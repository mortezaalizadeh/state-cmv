import { FieldRenderProps } from 'react-final-form'
import { ButtonGroup, FormGroup, InputFormat, Select, SegmentedControl } from './chromaComponents'

type Props = FieldRenderProps<string, any>

export const RenderInputFormat: React.FC<Props> = ({ input, meta: { error, touched }, ...rest }: Props) => (
  <FormGroup error={error && touched ? error : ''}>
    <InputFormat {...input} {...rest} />
  </FormGroup>
)

export const RenderSelect: React.FC<Props> = ({ input, meta: { error, touched }, ...rest }: Props) => (
  <FormGroup error={error && touched ? error : ''}>
    <Select {...input} {...rest} />
  </FormGroup>
)

export const RenderSegmentedControl: React.FC<Props> = ({ input, meta: { error, touched }, ...rest }: Props) => (
  <FormGroup error={error && touched ? error : ''}>
    <ButtonGroup>
      <SegmentedControl {...input} {...rest} />
    </ButtonGroup>
  </FormGroup>
)
