import Select from 'react-select'
import { timezoneOptions } from './timezones'

const TimezoneSelect = ({ onSelect }) => {
  return (
    <Select
      options={timezoneOptions}
      onChange={(selected) => onSelect(selected)}
      placeholder="Выберите город..."
      isSearchable
    />
  )
}

export default TimezoneSelect
