import React, { useCallback, useState } from 'react'
import { Flex, Typography } from 'antd'
import { useContinents, useCountriesByContinent } from '@entities/guide'
import { ContinentList } from './ui/ContinentList'
import { CountryList } from './ui/CountryList'

const { Title } = Typography

const MapPage: React.FC = () => {
  const [selectedContinentId, setSelectedContinentId] = useState<number | null>(null)

  const { data: continents, isLoading: continentsLoading } = useContinents()
  const { data: countries, isLoading: countriesLoading } =
    useCountriesByContinent(selectedContinentId)

  const handleSelectContinent = useCallback((id: number) => {
    setSelectedContinentId(prev => (prev === id ? null : id))
  }, [])

  const selectedContinent = continents.find(c => c.id === selectedContinentId)

  return (
    <div className="map-page">
      <Title level={4} style={{ marginBottom: 16 }}>
        Карта: континенты и страны
      </Title>
      <Flex gap="middle" wrap="wrap" align="flex-start">
        <div style={{ minWidth: 260, flex: '1 1 260px', maxWidth: 400 }}>
          <ContinentList
            continents={continents}
            selectedId={selectedContinentId}
            onSelect={handleSelectContinent}
            loading={continentsLoading}
          />
        </div>
        <div style={{ minWidth: 260, flex: '1 1 260px', maxWidth: 400 }}>
          <CountryList
            countries={countries}
            continentName={selectedContinent?.name}
            loading={countriesLoading}
          />
        </div>
      </Flex>
    </div>
  )
}

export default MapPage
