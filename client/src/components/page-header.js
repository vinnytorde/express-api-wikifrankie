import React from 'react'
import { Box, Heading } from 'grommet'

export default function PageHeader(props) {
  return (
    <Box
      animation={{
        type: 'slideRight',
        delay: 200,
        duration: 750,
        size: 'small'
      }}
      background="neutral-2"
    >
      <Heading
        margin={{ horizontal: 'xlarge', vertical: 'small' }}
        weight="bold"
        level={2}
        size="small"
      >
        {props.children}
      </Heading>
    </Box>
  )
}
