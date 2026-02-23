import React from 'react'

const Map: React.FC = () => {
  return (
    <div>
      Map
      <div>
        {[...Array(60)].map((_, i) => (
          <li key={i}>
            <a href={`/item-${i}`}>Пункт меню {i + 1}</a>
          </li>
        ))}
      </div>
    </div>
  )
}

export default Map
