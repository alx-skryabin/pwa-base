import React from 'react'
import { Card, Col, Row, Space, Tag, Typography } from 'antd'
import { CodeOutlined, EnvironmentOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons'
import { RegionRusWithMagnet } from '@entities/visits'
import './index.css'

const { Text, Title } = Typography

interface RegionsRusListProps {
  regions: RegionRusWithMagnet[]
  loading?: boolean
}

export const RegionsRusList: React.FC<RegionsRusListProps> = ({ regions, loading = false }) => {
  return (
    <Row gutter={[16, 16]}>
      {regions.map(region => (
        <Col xs={24} sm={12} md={12} lg={8} key={region.id}>
          <Card loading={loading} hoverable style={{ height: '100%' }} className="region-card">
            <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
              {/* Заголовок с названием региона */}
              <Space align="center">
                <EnvironmentOutlined />
                <Title level={5} style={{ margin: 0 }}>
                  {region.name}
                </Title>
              </Space>

              {/* Тип региона с тегом */}
              <div>
                {region.isMagnet && (
                  <Tag color="gold" style={{ margin: '0 5px 5px 0' }} icon={<StarOutlined />}>
                    Есть магнит
                  </Tag>
                )}
                <Tag color="blue">{region.type}</Tag>
              </div>

              {/* Информация о населении */}
              <Space orientation="vertical" size="small" style={{ width: '100%' }}>
                <Space>
                  <TeamOutlined />
                  <Text>
                    Население: <strong>{region.population.toLocaleString()}</strong>
                  </Text>
                </Space>

                <Space>
                  <EnvironmentOutlined />
                  <Text>Центр: {region.center}</Text>
                </Space>

                <Space>
                  <TeamOutlined />
                  <Text>
                    Население центра: <strong>{region.populationCenter.toLocaleString()}</strong>
                  </Text>
                </Space>
              </Space>

              {/* Коды региона */}
              <div>
                <Space align="start">
                  <CodeOutlined style={{ color: '#13c2c2' }} />
                  <div>
                    <div style={{ marginBottom: 5 }}>
                      <Text type="secondary">
                        Основной регион: <strong>{region.regionCode}</strong>
                      </Text>
                    </div>
                    <div>
                      <Text type="secondary">Все регионы: </Text>
                      <Space size={[4, 4]} wrap>
                        {region.searchCodes.map(code => (
                          <Tag key={code} color="cyan">
                            {code}
                          </Tag>
                        ))}
                      </Space>
                    </div>
                  </div>
                </Space>
              </div>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  )
}
