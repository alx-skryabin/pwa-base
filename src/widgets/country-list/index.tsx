import React from 'react'
import { Card, Flex, Typography, Empty } from 'antd'
import type { Country } from '@entities/guide'
import './index.css'

const { Text } = Typography

interface CountryListProps {
  countries: Country[]
  continentName?: string
  loading?: boolean
}

export const CountryList: React.FC<CountryListProps> = ({
  countries,
  continentName,
  loading = false,
}) => {
  const title = continentName ? `Страны: ${continentName}` : 'Страны'

  return (
    <Card title={title} size="small" className="country-list" loading={loading}>
      {!loading && countries.length === 0 ? (
        <Empty description="Выберите континент" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <Flex vertical gap={4}>
          {countries.map(item => (
            <div key={item.id} className="country-list__item">
              {item.flag && <span className="country-list__flag">{item.flag}</span>}
              <Text>{item.name}</Text>
            </div>
          ))}
        </Flex>
      )}
    </Card>
  )
}
