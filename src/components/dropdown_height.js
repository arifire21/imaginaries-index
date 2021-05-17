import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const height_options = [
    { text: 'cm',
      value: 'cm',
    },
]

const DropdownWeightSelection = () => (
    <Dropdown
      placeholder='Measurement...'
      fluid
      selection
      options={height_options}
    />
  )
  
  export default DropdownWeightSelection