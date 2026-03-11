import React from 'react'
import { useRegionRusWithMagnet } from '@entities/user'
import { RegionsRusList } from '@widgets/regions-rus-list'
import { Typography } from 'antd'

const { Title } = Typography

const Home: React.FC = () => {
  const { data, isLoading } = useRegionRusWithMagnet()

  return (
    <div className="home-page">
      <Title level={4} style={{ marginBottom: 16 }}>
        Регионы России
      </Title>
      <RegionsRusList regions={data} loading={isLoading} />
    </div>
  )
}

export default Home
