import React from 'react'

function TouchpointCard({touchpoint}) {
  return (
    <div>
        {`${touchpoint.date} || ${touchpoint.notes}`}
    </div>
  )
}

export default TouchpointCard