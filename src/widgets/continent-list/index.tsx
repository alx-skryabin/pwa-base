import React from 'react'
import { Card, Flex, Typography } from 'antd'
import type { Continent } from '@entities/guide'
import './index.css'

const { Text } = Typography

interface ContinentListProps {
  continents: Continent[]
  selectedId: number | null
  onSelect: (id: number) => void
  loading?: boolean
}

export const ContinentList: React.FC<ContinentListProps> = ({
  continents,
  selectedId,
  onSelect,
  loading = false,
}) => {
  return (
    <Card title="Континенты" size="small" className="continent-list" loading={loading}>
      <Flex vertical gap={0}>
        {continents.map(item => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            className={`continent-list__item ${selectedId === item.id ? 'continent-list__item_active' : ''}`}
            onClick={() => onSelect(item.id)}
            onKeyDown={e => e.key === 'Enter' && onSelect(item.id)}
          >
            <div className="continent-list__content">
              <Text strong={selectedId === item.id}>{item.name}</Text>
              <Text type="secondary">стран: {item.countries}</Text>
            </div>
          </div>
        ))}
      </Flex>
    </Card>
  )
}
