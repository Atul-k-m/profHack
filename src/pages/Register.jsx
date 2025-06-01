import React, { useState,useEffect } from 'react'
import { User, Lock, Briefcase, Check, X } from 'lucide-react'


const Button = ({ children, onClick, variant, className, type, disabled, ...props }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={className}
    {...props}
  >
    {children}
  </button>
)

const FormInput = ({ label, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-xs font-medium text-black tracking-wide">
      {label}
    </label>
    <input
      className={`w-full px-3 py-2 border border-black rounded-none text-black placeholder-gray-500
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
        text-xs shadow-sm font-medium tracking-wide
        ${error ? 'border-red-600 focus:ring-red-600' : 'border-black hover:border-gray-800'}`}
      {...props}
    />
    {error && (
      <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
        <span className="w-1 h-1 bg-red-600 rounded-full"></span>
        {error}
      </p>
    )}
  </div>
)

const StepIndicator = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center space-x-3 mb-6">
    {steps.map((step, index) => (
      <React.Fragment key={step.number}>
        <div className="flex flex-col items-center space-y-1">
          <div
            className={`w-8 h-8 rounded-none border-2 flex items-center justify-center transition-all duration-300 ${
              currentStep >= step.number
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black'
            }`}
          >
            <span className="text-xs font-bold">{step.number}</span>
          </div>
          <span className={`text-xs font-medium tracking-wider uppercase ${
            currentStep >= step.number ? 'text-black' : 'text-gray-500'
          }`}>
            {step.title}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className={`w-12 h-0.5 transition-colors duration-300 ${
            currentStep > step.number ? 'bg-black' : 'bg-gray-300'
          }`} />
        )}
      </React.Fragment>
    ))}
  </div>
)

const SearchableDropdown = ({ label, options = [], value, onChange, placeholder, error, allowClear = true }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (option) => {
    onChange(option)
    setSearchTerm('')
    setIsOpen(false)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange('')
    setSearchTerm('')
    setIsOpen(false)
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setSearchTerm(inputValue)
    setIsOpen(true)
    
    
    if (!inputValue) {
      onChange('')
    }
  }

  return (
    <div className="space-y-2 relative">
      <label className="block text-xs font-medium text-black tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={isOpen ? searchTerm : value || ''}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true)
            setSearchTerm('')
          }}
          placeholder={placeholder}
          className={`w-full px-3 py-2 pr-8 border border-black rounded-none text-black placeholder-gray-500
            transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
            text-xs shadow-sm font-medium tracking-wide
            ${error ? 'border-red-600 focus:ring-red-600' : 'border-black hover:border-gray-800'}`}
        />
        
    
        {allowClear && value && !isOpen && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border-2 border-black shadow-lg max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-3 py-2 text-xs font-medium tracking-wide hover:bg-black hover:text-white cursor-pointer transition-colors duration-200"
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-xs text-gray-500 font-medium">
                No options found
              </div>
            )}
          </div>
        )}
      </div>
      
     
      {isOpen && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => {
            setIsOpen(false)
            setSearchTerm('')
          }}
        />
      )}
      
      {error && (
        <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  )
}

// Updated mock data using your JSON format
const mockEmployeeData = [
    {
    "name": "Test1",
    "designation": "Database Administrator",
    "department": "Test"
  },
  {
    "name": "Test2",
    "designation": "Database Administrator",
    "department": "Test"
  },{
    "name": "Test3",
    "designation": "Database Administrator",
    "department": "Test"
  },

    {
    "name": "Atul Kumar",
    "designation": "Database Administrator",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Test 2",
    "designation": "Database Administrator",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Sanjay H A",
    "designation": "Professor & Principal",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Anil G.N",
    "designation": "Professor & Vice-Principal",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Thippeswamy G",
    "designation": "Professor & HOD",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Mahesh G",
    "designation": "Professor & Associate Head Cluster 1",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Satish Kumar T",
    "designation": "Professor & Associate Head Cluster 2",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Radhika K R",
    "designation": "Associate Professor & Associate Head Cluster 3",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Usha B A",
    "designation": "Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Hemamalini B H",
    "designation": "Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Bharati. R",
    "designation": "Associate Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Nagabhushan. S.V",
    "designation": "Associate Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Ashwini N",
    "designation": "Associate Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Ravi Hosur",
    "designation": "Associate Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Arunakumari B N",
    "designation": "Associate Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Vishakha Yadav",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Muneshwara. M.S",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Anand R",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Durga Devi. G.Y",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mr. P. Jagadish",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Durga Bhavani A",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mr. Rajesh N V",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Vidya R",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Ambika G N",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. A. Mari Kirthima",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mr. Guruprasad S",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Shankar R",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Lakshmi B N",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Dhanalakshmi B K",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Ms. Brunda S",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Shilpa M",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Tanya Chandra",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Goutami Chenumalla",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Jai Arul Jose",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. S Packiya Lekshmi",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Mohammed Khurram",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mr. Akshay Arya",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Chandini A",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Priyanka M R",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Arpitha Shivanna",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mr. Beerappa Belasakarge",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Ms. Soujanya S D",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Ms. Shama H M",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Ms. Neetha P U",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Ms. Chaitanya V",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Aruna N",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mr. Ajith S",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mr. Gururaj P",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Anusha K L",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Srujana S N",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Mrs. Belji T",
    "designation": "Assistant Professor",
    "department": "Computer Science & Engineering"
  },
  {
    "name": "Dr. Ambika R",
    "designation": "Professor & Dean-Student Welfare",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. A Shobha Rani",
    "designation": "Professor & HOD",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Jayadeva G S",
    "designation": "Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. M.C. Hanumantharaju",
    "designation": "Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Anil Kumar D",
    "designation": "Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Saneesh Cleatus Thundiyil",
    "designation": "Associate Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Surekha r Gondkar",
    "designation": "Associate Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Vijayalakshmi G V",
    "designation": "Associate Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Anitha V R",
    "designation": "Associate Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Deepa N Reddy",
    "designation": "Associate Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Jagannatha. K.B",
    "designation": "Associate Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Rashmi N",
    "designation": "Associate Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Sabina Rahaman",
    "designation": "Associate Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Mamatha K R",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Mrs. Chandraprabha R",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Laxmisagar H S",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Asha G Hagargund",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Suryakanth B",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Mr. Shivarudraiah",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Thyagaraj T",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Mrs. Shilpa Hiremath",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Mrs. Vinutha B",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Dankan Gowda V",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Anna Merine George",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Asha K",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Paramita Sarkar",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Anitha M",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Ms. Soumya S Vastrad",
    "designation": "Assistant Professor",
    "department": "Electronics & Communication Engineering"
  },
  {
    "name": "Dr. Manjunath T N",
    "designation": "Dean-Career Guidance",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Surekha K B",
    "designation": "Professor & Incharge HOD",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Narasimha Murthy M S",
    "designation": "Associate Professor & Associate Head Cluster 4",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. N Rakesh",
    "designation": "Associate Professor & Associate Head Cluster 5",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. S K Pushpa",
    "designation": "Professor & HOD",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. B.R. Arun Kumar",
    "designation": "Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Bhuvaneshwari C Melinamath",
    "designation": "Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Sheela Kathavate",
    "designation": "Associate Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Geeta Amol Patil",
    "designation": "Associate Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Prakash G L",
    "designation": "Associate Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Shoba M",
    "designation": "Associate Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Veena N",
    "designation": "Associate Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Mohan B A",
    "designation": "Associate Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Chethana C",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Shanthi D L",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mrs. S. Mahalakshmi",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. K T Chandrashekara",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Gireesh Babu C N",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mrs. Ambika Rani Subhash",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Swetha M S",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Vinutha K",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Ravi Kumar B N",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Savitha S",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Basavaraj G N",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Kalaivani Y S",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Harish Kumar N",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. Srinivas B V",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mrs. Bhavya G",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mr. Sonnegowda K",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mr. Vinaykumar Y B",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Ms. Saritha A K",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mrs. Annapareddy Haarika",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Ms. Amulya P",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mrs. Malini M",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mrs. Sowmya K",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mr. Pushpanathan G",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Ms. Spandana L",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Ms. Sanjana V Hunashikatti",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mrs. Shilpa K A",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Mrs. Sneha Sureddy",
    "designation": "Assistant Professor",
    "department": "Information Science & Engineering"
  },
  {
    "name": "Dr. K.M. Sathish Kumar",
    "designation": "Dean-Academics",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Madhu M C",
    "designation": "Assistant Professor & HOD",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Mr. T.N. Praveen Kumar",
    "designation": "Associate Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. G L Anantha Krishna",
    "designation": "Associate Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. O. Gurumoorthy",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Mr. K Chandra Sekhara Reddy",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Shripad Diwakar",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Mrs. Nithya Poornima",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Mr. Sundaresh S",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Jagadeesh Y J",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Keerthi Kumar N",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Kiran M D",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. G Avinash",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Nagamadhu M",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Chethan D",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Srinidhi Acharya S R",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Manjunatha C",
    "designation": "Assistant Professor",
    "department": "Mechanical Engineering"
  },
  {
    "name": "Dr. Prashanth A Athavale",
    "designation": "Assistant Professor & HOD",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Dr. Sanjay Lakshminarayanan",
    "designation": "Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Dr. Narapareddy Ramarao",
    "designation": "Associate Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Mr. H D Kattimani",
    "designation": "Associate Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Dr. Suma Umesh",
    "designation": "Assistant Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Mrs. Manjula B K",
    "designation": "Assistant Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Mr. Vikram Chekuri",
    "designation": "Assistant Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Mr. Babu Naik Gugulothu",
    "designation": "Assistant Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Dr. Manjunatha Babu P",
    "designation": "Assistant Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Mr. Ozwin Dominic D'Souza",
    "designation": "Assistant Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Mrs. Shilpa G",
    "designation": "Assistant Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Dr. Prashanth N A",
    "designation": "Assistant Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Mr. Nagaraj D Chonali",
    "designation": "Assistant Professor",
    "department": "Electrical & Electronics Engineering"
  },
  {
    "name": "Dr. Seema Singh",
    "designation": "Dean-Innovation & Entrepreneurship",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. Mallikarjuna Gowda C.P",
    "designation": "Associate Professor & HOD",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. Raju Hajare",
    "designation": "Professor",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. Banuprakash R",
    "designation": "Associate Professor",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. S Thejaswini",
    "designation": "Associate Professor",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. Sowmya Shree M S",
    "designation": "Associate Professor",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. Sumathi M S",
    "designation": "Associate Professor",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. Siddiq Iqbal",
    "designation": "Assistant Professor",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. Saritha I G",
    "designation": "Assistant Professor",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. Prathiba N",
    "designation": "Assistant Professor",
    "department": "Electronics & Telecommunication Engineering"
  },
  {
    "name": "Dr. G Aruna",
    "designation": "Associate Professor & HOD",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Rajakumara H N",
    "designation": "Professor & HOD",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Rajesh Gopinath",
    "designation": "Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Mrs. Shobha R",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Mrs. Archana K",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Mrs. Shimna Manoharan",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Vinod B R",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Chandrashekharappa Agasnalli",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Deepak M S",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Anupkumar G Ekbote",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Athiyamaan V",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Marsh M Bandi",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Lalit Kumar Gupta",
    "designation": "Assistant Professor",
    "department": "Civil Engineering"
  },
  {
    "name": "Dr. Bharathi Malakreddy A",
    "designation": "Head-Research & Consultancy",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Dr. Anupama H S",
    "designation": "Professor & HOD\nAsso. Head Cluster 1",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Dr. Pradeep K R",
    "designation": "Associate Professor & Associate Head Cluster 2",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Dr. Niranjanamurthy M",
    "designation": "Associate Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Dr. Manoj H M",
    "designation": "Associate Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Dr. Srivani P",
    "designation": "Associate Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Dr. Rajesh I S",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Dr. Archana Bhat",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mr. Yatheesh N G",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mr. Sanjay M Belgaonkar",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mr. Sachin Urabinahatti",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mr. Shobhit Tembhre",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Dr. Kantharaju V",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mr. Chidananda K",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Ms. Amitha S K",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mr. Balaraju G",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Ms. Mayuri",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mrs. Kavitha D",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mrs. Shruthi S",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Ms. Megha S",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mr. Abhishek K L",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mr. Umesh T",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Mrs. Sowmya V L",
    "designation": "Assistant Professor",
    "department": "Artificial Intelligence and Machine Learning"
  },
  {
    "name": "Dr. Vishwa Kiran S",
    "designation": "Associate Professor & Incharge HOD CSBS",
    "department": "Computer Science and Business Systems"
  },
  {
    "name": "Dr. Archana R A",
    "designation": "Associate Professor",
    "department": "Computer Science and Business Systems"
  },
  {
    "name": "Mr. Pradeep Kumar G M",
    "designation": "Assistant Professor",
    "department": "Computer Science and Business Systems"
  },
  {
    "name": "Mr. Udayaprasad",
    "designation": "Assistant Professor",
    "department": "Computer Science and Business Systems"
  },
  {
    "name": "Dr. P Ganesh",
    "designation": "Dean_Planning & Development",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Dr. Muthyala Sridevi",
    "designation": "Assistant Professor & HOD",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Dr. Aparna K",
    "designation": "Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Dr. Drakshaveni G",
    "designation": "Associate Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Dr. P Sudarsanam",
    "designation": "Associate Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Mr. Dwarakanath G V",
    "designation": "Assistant Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Dr. Shivakumara T",
    "designation": "Assistant Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Mrs. Reshma C R",
    "designation": "Assistant Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Mrs. Nirupama B K",
    "designation": "Assistant Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Mr. A Venkatesh",
    "designation": "Assistant Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Ms. Ashwitha K",
    "designation": "Assistant Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Ms. Spurthy S N",
    "designation": "Assistant Professor",
    "department": "Master of Computer Applications"
  },
  {
    "name": "Dr. Chethan A S",
    "designation": "Professor & HOD",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Karabi Sikdar",
    "designation": "Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Annamma Abraham",
    "designation": "Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Jojy Joseph Idicula",
    "designation": "Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Anitha Kiran",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Annapoorna M S",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Kallur V Vijayakumar",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. T K Sreelakshmi",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Arnab Bhattacharyya",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Priyanka Pal",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Aruna Kumara H",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. S Saranya",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Nikki Kedia",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Mr. Puneetha",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Saroj Revankar",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Shankar S Narayan",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Mrs. Neha D S",
    "designation": "Faculty",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Varun V L",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Sumati Thareja",
    "designation": "Assistant Professor",
    "department": "Mathematics"
  },
  {
    "name": "Dr. Dhananjaya N",
    "designation": "Professor & HOD",
    "department": "Physics"
  },
  {
    "name": "Dr. R Lokesh",
    "designation": "Associate Professor",
    "department": "Physics"
  },
  {
    "name": "Dr. C Kavitha",
    "designation": "Associate Professor",
    "department": "Physics"
  },
  {
    "name": "Dr. Yashaswini",
    "designation": "Associate Professor",
    "department": "Physics"
  },
  {
    "name": "Dr. Daruka Prasad B",
    "designation": "Associate Professor",
    "department": "Physics"
  },
  {
    "name": "Dr. Ashwini K R",
    "designation": "Assistant Professor",
    "department": "Physics"
  },
  {
    "name": "Dr. Basavaraj R B",
    "designation": "Assistant Professor",
    "department": "Physics"
  },
  {
    "name": "Dr. Harish Sharma Akkera",
    "designation": "Assistant Professor",
    "department": "Physics"
  },
  {
    "name": "Dr. Chandrashekar Pathak",
    "designation": "Assistant Professor",
    "department": "Physics"
  },
  {
    "name": "Dr. Sandra Dias",
    "designation": "Assistant Professor",
    "department": "Physics"
  },
  {
    "name": "Mrs. Nayana L",
    "designation": "Assistant Professor",
    "department": "Physics"
  },
  {
    "name": "Mrs. Janhavi V",
    "designation": "Assistant Professor",
    "department": "Physics"
  },
  {
    "name": "Dr. Ramakrishnappa T",
    "designation": "Professor & HOD",
    "department": "Chemistry"
  },
  {
    "name": "Dr. Jyothi C Abbar",
    "designation": "Associate Professor",
    "department": "Chemistry"
  },
  {
    "name": "Dr. Sudheer Kumar K H",
    "designation": "Associate Professor",
    "department": "Chemistry"
  },
  {
    "name": "Dr. Bincy Rose Varghese",
    "designation": "Associate Professor",
    "department": "Chemistry"
  },
  {
    "name": "Dr. Swetha G A",
    "designation": "Assistant Professor",
    "department": "Chemistry"
  },
  {
    "name": "Dr. K Suresh Kumar",
    "designation": "Assistant Professor",
    "department": "Chemistry"
  },
  {
    "name": "Dr. Jeevan Chakravarthy A S",
    "designation": "Assistant Professor",
    "department": "Chemistry"
  },
  {
    "name": "Dr. A Vijaya Bhaskar Reddy",
    "designation": "Assistant Professor",
    "department": "Chemistry"
  },
  {
    "name": "Dr. Udayabhanu",
    "designation": "Assistant Professor",
    "department": "Chemistry"
  },
  {
    "name": "Dr. Madhukara Naik",
    "designation": "Assistant Professor",
    "department": "Chemistry"
  },
  {
    "name": "Dr. Manjunatha Kumar K S",
    "designation": "Teaching Assistant",
    "department": "Chemistry"
  },
  {
    "name": "Mrs. Srilaxmi B A",
    "designation": "Assistant Professor",
    "department": "Chemistry"
  },
  {
    "name": "Mrs. B J Tejaswini",
    "designation": "Assistant Professor & In-Charge HOD",
    "department": "Humanities and Social Science"
  },
  {
    "name": "Dr. Kavita Harihar",
    "designation": "Faculty",
    "department": "Humanities and Social Science"
  },
  {
    "name": "Mrs. Chaithanya K R",
    "designation": "Faculty",
    "department": "Humanities and Social Science"
  },
  {
    "name": "Dr. Jyothi E Singh",
    "designation": "Associate Professor & HOD",
    "department": "Master of Business Administration"
  },
  {
    "name": "Dr. Nethravathi N",
    "designation": "Associate Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Dr. Vinay H V",
    "designation": "Associate Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Dr. Vishwanatha M R",
    "designation": "Assistant Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Dr. Divya H N",
    "designation": "Assistant Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Mrs. Seema B",
    "designation": "Assistant Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Dr. Janmitha",
    "designation": "Assistant Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Mr. Sai Niranjan R",
    "designation": "Assistant Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Dr. Reshma M",
    "designation": "Assistant Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Mr. Manoj Kumar S",
    "designation": "Assistant Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Mr. Channakeshava H C",
    "designation": "Assistant Professor",
    "department": "Master of Business Administration"
  },
  {
    "name": "Mrs. Sindhu Ramesh",
    "designation": "Assistant Professor",
    "department": "Master of Business Administration"
  }
]

// Updated functions to work with your JSON structure
const getDepartments = () => {
  const departments = [...new Set(mockEmployeeData.map(emp => emp.department))]
  return departments.sort()
}

const getEmployeesByDepartment = (dept) => {
  if (!dept) return []
  return mockEmployeeData
    .filter(emp => emp.department === dept)
    .map(emp => emp.name)
    .sort()
}

const getEmployeeDetails = (name) => {
  return mockEmployeeData.find(emp => emp.name === name)
}

const Register = ({ setCurrentPage = () => {} }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    department: '',
    name: '',
    designation: '',
    email: '',
    skills: '',
    experience: '',
    username: '',
    password: '',
  })
  const [otpSent, setOtpSent] = useState(false)
const [otpVerified, setOtpVerified] = useState(false)
const [otpCode, setOtpCode] = useState('')
const [otpTimer, setOtpTimer] = useState(0)
const [sendingOtp, setSendingOtp] = useState(false)
const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
 useEffect(() => {
  let interval = null
  if (otpTimer > 0) {
    interval = setInterval(() => {
      setOtpTimer(timer => timer - 1)
    }, 1000)
  } else if (otpTimer === 0 && otpSent) {
    setOtpSent(false)
    setOtpCode('')
  }
  return () => clearInterval(interval)
}, [otpTimer, otpSent])

  const departments = getDepartments()
  const availableNames = getEmployeesByDepartment(formData.department)

  const steps = [
    { number: 1, title: 'Department', icon: Briefcase },
    { number: 2, title: 'Personal Info', icon: User },
    { number: 3, title: 'Account Setup', icon: Lock },
  ]

  const handleNameSelect = (selectedName) => {
    const employeeDetails = getEmployeeDetails(selectedName)
    setFormData(prev => ({
      ...prev,
      name: selectedName,
      designation: employeeDetails ? employeeDetails.designation : ''
    }))
  }

const sendOtpEmail = async () => {
  setSendingOtp(true)
  setErrors({ ...errors, email: '', otp: '' })
  
  try {
    const response = await fetch('https://profhack-backend.onrender.com/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.name
      }),
    })
    
    const data = await response.json()
    
    if (response.ok) {
      setOtpSent(true)
      setOtpTimer(300)
      setOtpVerified(false)
    } else {
      setErrors({ ...errors, email: data.message })
    }
  } catch (error) {
    console.error('Send OTP error:', error)
    setErrors({ ...errors, email: 'Failed to send OTP. Please check your connection.' })
  } finally {
    setSendingOtp(false)
  }
}

const verifyOtp = async () => {
  if (!otpCode || otpCode.length !== 6) {
    setErrors({ ...errors, otp: 'Please enter the 6-digit OTP code' })
    return
  }
  
  setVerifyingOtp(true)
  setErrors({ ...errors, otp: '' })
  
  try {
    const response = await fetch('https://profhack-backend.onrender.com/api/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        otp: otpCode
      }),
    })
    
    const data = await response.json()
    
    if (response.ok) {
      setOtpVerified(true)
      setOtpSent(false)
      setOtpTimer(0)
    } else {
      setErrors({ ...errors, otp: data.message })
    }
  } catch (error) {
    console.error('Verify OTP error:', error)
    setErrors({ ...errors, otp: 'Failed to verify OTP. Please try again.' })
  } finally {
    setVerifyingOtp(false)
  }
}

const resendOtp = async () => {
  setSendingOtp(true)
  setErrors({ ...errors, otp: '' })
  
  try {
    const response = await fetch('https://profhack-backend.onrender.com/api/resend-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.name
      }),
    })
    
    const data = await response.json()
    
    if (response.ok) {
      setOtpSent(true)
      setOtpTimer(300)
      setOtpCode('')
    } else {
      setErrors({ ...errors, otp: data.message })
    }
  } catch (error) {
    console.error('Resend OTP error:', error)
    setErrors({ ...errors, otp: 'Failed to resend OTP. Please try again.' })
  } finally {
    setSendingOtp(false)
  }
}

  const validateStep = (step) => {
    const newErrors = {}
    switch (step) {
      case 1:
        if (!formData.department) newErrors.department = 'Please select a department'
        if (!formData.name) newErrors.name = 'Please select your name'
        break
      case 2:
  if (!formData.email) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email'
  } else if (!otpVerified) {
    newErrors.email = 'Please verify your email with OTP'
  }
  if (!formData.skills) newErrors.skills = 'Please describe your skills'
  if (!formData.experience) newErrors.experience = 'Please enter your experience'
  break
      case 3:
        if (!formData.username) newErrors.username = 'Username is required'
        if (!formData.password) {
          newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters'
        }
        break
      default:
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setLoading(true)
    setErrors({})

    try {
      const response = await fetch('https://profhack-backend.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (response.ok) {
        alert('Registration successful! Please login.')
        setCurrentPage('login')
      } else {
        setErrors({ submit: data.message || 'Registration failed' })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ submit: 'Network error. Please check if the server is running.' })
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-black leading-tight">
                Let's Get Started
              </h2>
              <p className="text-sm text-gray-700 font-medium tracking-wide max-w-md mx-auto leading-relaxed">
                Tell us about your role in the organization
              </p>
            </div>

            <div className="space-y-4">
              <SearchableDropdown
                label="Department"
                options={departments}
                value={formData.department}
                onChange={(value) =>
                  setFormData({ ...formData, department: value, name: '', designation: '' })
                }
                placeholder="Select your department"
                error={errors.department}
              />

              {formData.department && (
                <SearchableDropdown
                  label="Your Name"
                  options={availableNames}
                  value={formData.name}
                  onChange={handleNameSelect}
                  placeholder="Search and select your name"
                  error={errors.name}
                />
              )}

              {formData.designation && (
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-black tracking-wide">
                    Designation
                  </label>
                  <div className="w-full px-3 py-2 border border-black rounded-none text-black bg-gray-50 text-xs shadow-sm font-medium tracking-wide">
                    {formData.designation}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-black leading-tight">
                Personal Information
              </h2>
              <p className="text-sm text-gray-700 font-medium tracking-wide max-w-md mx-auto leading-relaxed">
                Help us know you better
              </p>
            </div>

          <div className="space-y-4">
  <div className="space-y-2">
    <FormInput
      label="Email Address"
      type="email"
      value={formData.email}
      onChange={(e) => {
        setFormData({ ...formData, email: e.target.value })
        if (otpSent || otpVerified) {
          setOtpSent(false)
          setOtpVerified(false)
          setOtpCode('')
          setOtpTimer(0)
        }
      }}
      placeholder="your.email@company.com"
      error={errors.email}
      disabled={otpVerified}
    />
    
 
    {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) === false && !otpSent && !otpVerified && (
      <Button
        onClick={sendOtpEmail}
        disabled={sendingOtp}
        type="button"
        className="w-full border-2 border-blue-600 text-blue-600 font-bold tracking-wide
          bg-white hover:bg-blue-600 hover:text-white 
          px-4 py-2 rounded-none uppercase text-xs
          transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sendingOtp ? (
          <>
            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Sending OTP...
          </>
        ) : (
          'Send Verification Code'
        )}
      </Button>
    )}

    {/* OTP Input Section */}
    {otpSent && !otpVerified && (
      <div className="space-y-3 p-4 border-2 border-blue-200 bg-blue-50">
        <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span>Verification code sent to {formData.email}</span>
        </div>
        
        <FormInput
          label="Enter 6-Digit Code"
          type="text"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="000000"
          maxLength="6"
          error={errors.otp}
        />
        
        <div className="flex items-center justify-between">
          <Button
            onClick={verifyOtp}
            disabled={otpCode.length !== 6 || verifyingOtp}
            type="button"
            className="border-2 border-green-600 text-green-600 font-bold tracking-wide
              bg-white hover:bg-green-600 hover:text-white 
              px-4 py-2 rounded-none uppercase text-xs
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {verifyingOtp ? (
              <>
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </Button>
          
          <div className="text-xs text-gray-600">
            {otpTimer > 0 ? (
              <span className="font-medium">
                Expires in {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
              </span>
            ) : (
              <button
                onClick={resendOtp}
                disabled={sendingOtp}
                className="text-blue-600 hover:underline font-medium disabled:opacity-50"
              >
                {sendingOtp ? 'Sending...' : 'Resend Code'}
              </button>
            )}
          </div>
        </div>
      </div>
    )}

 
    {otpVerified && (
      <div className="p-3 border-2 border-green-600 bg-green-50 text-green-700 text-xs font-medium flex items-center gap-2">
        <Check className="w-4 h-4" />
        Email verified successfully!
      </div>
    )}
  </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-black tracking-wide">
                  Skills & Expertise
                </label>
                <textarea
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  className={`w-full px-3 py-2 border border-black rounded-none text-black placeholder-gray-500 resize-none
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent 
                    text-xs leading-relaxed shadow-sm font-medium tracking-wide
                    ${errors.skills ? 'border-red-600 focus:ring-red-600' : 'border-black hover:border-gray-800'}`}
                  rows="3"
                  placeholder="e.g., React, Node.js, Project Management, UI/UX Design..."
                />
                {errors.skills && (
                  <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.skills}
                  </p>
                )}
              </div>

              <FormInput
                label="Years of Experience"
                type="number"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                placeholder="0"
                min="0"
                max="50"
                error={errors.experience}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-black leading-tight">
                Account Setup
              </h2>
              <p className="text-sm text-gray-700 font-medium tracking-wide max-w-md mx-auto leading-relaxed">
                Create your login credentials
              </p>
            </div>

            <div className="space-y-4">
              <FormInput
                label="Username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Choose a unique username"
                error={errors.username}
              />

              <FormInput
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Create a secure password"
                error={errors.password}
              />

              <div className="border border-black p-4 rounded-none bg-gray-50">
                <h4 className="mb-3 text-xs font-bold text-black tracking-wider uppercase">
                  Password Requirements
                </h4>
                <div className="space-y-2 text-xs text-black">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-none flex items-center justify-center transition-all duration-200 ${
                        formData.password.length >= 6
                          ? 'bg-black text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {formData.password.length >= 6 && (
                        <Check className="w-2 h-2" />
                      )}
                    </div>
                    <span
                      className={`font-medium tracking-wide ${
                        formData.password.length >= 6
                          ? 'text-black'
                          : 'text-gray-500'
                      }`}
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-none flex items-center justify-center transition-all duration-200 ${
                        /[A-Z]/.test(formData.password)
                          ? 'bg-black text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {/[A-Z]/.test(formData.password) && (
                        <Check className="w-2 h-2" />
                      )}
                    </div>
                    <span
                      className={`font-medium tracking-wide ${
                        /[A-Z]/.test(formData.password)
                          ? 'text-black'
                          : 'text-gray-500'
                      }`}
                    >
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-none flex items-center justify-center transition-all duration-200 ${
                        /[0-9]/.test(formData.password)
                          ? 'bg-black text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {/[0-9]/.test(formData.password) && (
                        <Check className="w-2 h-2" />
                      )}
                    </div>
                    <span
                      className={`font-medium tracking-wide ${
                        /[0-9]/.test(formData.password)
                          ? 'text-black'
                          : 'text-gray-500'
                      }`}
                    >
                      One number
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Static Grid Background - Always Full Screen */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>
      
     
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-black opacity-15"
            style={{
              width: '40px',
              height: '40px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-6">
        <div className="w-full max-w-2xl border-2 border-black bg-white p-6 md:p-8 shadow-2xl backdrop-blur-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-4 leading-none">
              Account Registration
            </h1>
            <div className="w-16 h-1 bg-black mx-auto mb-4"></div>
          </div>

          <StepIndicator steps={steps} currentStep={currentStep} />

        
          {errors.submit && (
            <div className="mb-6">
              <div className="p-3 border-2 border-red-600 text-red-600 text-xs font-medium tracking-wide">
                {errors.submit}
              </div>
            </div>
          )}

          
          <div>
            <div className="mb-8">{renderStepContent()}</div>

           
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                onClick={
                  currentStep === 1
                    ? () => setCurrentPage('hero')
                    : handlePrevious
                }
                variant="outline"
                className="
                  w-full sm:w-auto min-w-[140px]
                  border-2 border-black text-black font-bold tracking-wide
                  bg-white hover:bg-black hover:text-white 
                  px-6 py-3 rounded-none uppercase text-xs
                  transition-all duration-300 transform hover:scale-105
                "
              >
                {currentStep === 1 ? 'Back to Home' : 'Previous'}
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="
                    w-full sm:w-auto min-w-[140px]
                    border-2 border-black text-white font-bold tracking-wide
                    bg-black hover:bg-white hover:text-black 
                    px-6 py-3 rounded-none uppercase text-xs
                    transition-all duration-300 transform hover:scale-105
                  "
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`
                    w-full sm:w-auto min-w-[140px]
                    border-2 border-black font-bold tracking-wide
                    px-6 py-3 rounded-none uppercase text-xs
                    transition-all duration-300 transform hover:scale-105
                    ${loading 
                      ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-400' 
                      : 'text-white bg-black hover:bg-white hover:text-black'
                    }
                  `}
                >
                  {loading ? (
                    <>
                      <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              )}
            </div>
          </div>

        
          <div className="mt-8 text-center">
            <p className="text-sm text-black font-medium tracking-wide">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="underline hover:text-gray-700 transition-colors duration-200 font-bold"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}

export default Register