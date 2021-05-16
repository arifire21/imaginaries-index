import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const weight_options = [
    { text: 'km',
      value: 'km',
    },
    { text: 'lbs',
      value: 'lbs',
    },
]

const DropdownWeightSelection = () => (
    <div className='dropdown-basic'>
      <Dropdown
        placeholder='select...'
        fluid
        selection
        options={weight_options}
      />
    </div>
  )
  
  export default DropdownWeightSelection