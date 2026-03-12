import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useRegionRusWithMagnet } from '@entities/user'
import { RegionsRusList } from '@widgets/regions-rus-list'
import { Checkbox, CheckboxChangeEvent, Flex, Input, Result, Skeleton, Typography } from 'antd'
import { debounce } from '@shared/utils'

const { Title } = Typography

const Home: React.FC = () => {
  const [isMagnetFilter, setIsMagnetFilter] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const { data, isLoading } = useRegionRusWithMagnet()

  const debouncedSetSearchText = useMemo(
    () =>
      debounce((value: string) => {
        setSearchText(value.trim().toLocaleLowerCase())
      }, 300),
    []
  )

  const onSearchInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      debouncedSetSearchText(value)
    },
    [debouncedSetSearchText]
  )

  const handleChangeIsMagnet = useCallback((value: CheckboxChangeEvent) => {
    setIsMagnetFilter(value.target.checked)
  }, [])

  const filteredData = useMemo(() => {
    if (!data) return []

    const searchLower = searchText?.toLowerCase().trim() || ''
    const hasSearch = searchLower.length > 0

    return data.filter(region => {
      // Фильтр по магниту
      if (isMagnetFilter && !region.isMagnet) {
        return false
      }

      // Если есть поиск - проверяем
      if (hasSearch) {
        const searchableString = [
          region.name,
          region.center,
          region.regionCode,
          ...region.searchCodes,
        ]
          .join(' ')
          .toLowerCase()

        return searchableString.includes(searchLower)
      }

      // Прошел магнитный фильтр и нет поиска
      return true
    })
  }, [data, searchText, isMagnetFilter])

  return (
    <div className="home-page">
      <Title level={4} style={{ marginBottom: 16 }}>
        Регионы России
      </Title>

      <Flex gap={10} style={{ marginBottom: 20, alignItems: 'center' }}>
        <Input
          placeholder="Поиск..."
          style={{ maxWidth: 180 }}
          onChange={onSearchInputChange}
          allowClear
        ></Input>
        <Checkbox checked={isMagnetFilter} onChange={handleChangeIsMagnet}>
          Есть магнит
        </Checkbox>
      </Flex>

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : filteredData.length === 0 ? (
        <Result title="Ничего не найдено" subTitle={searchText} />
      ) : (
        <RegionsRusList regions={filteredData} loading={isLoading} />
      )}
    </div>
  )
}

export default Home
