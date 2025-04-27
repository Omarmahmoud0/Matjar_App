
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface AnimatedSelectProps {
  options: Option[]
  onChange: (value: string) => void
  placeholder?: string
}

const AnimatedSelect: React.FC<AnimatedSelectProps> = ({ options, onChange, placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleSelect = (option: Option) => {
    setSelectedOption(option)
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative md:w-48 w-36 z-40 max-md:text-xs"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:px-4 px-2 py-2 text-left text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg  overflow-hidden"
          >
            {options.map((option) => (
              <motion.li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="md:px-4 px-2 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 "
              >
                {option.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AnimatedSelect

