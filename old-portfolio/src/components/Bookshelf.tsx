import { motion } from 'framer-motion'
import { FaLinkedin, FaFilePdf } from 'react-icons/fa'

interface BookshelfProps {
  isDarkMode: boolean
}

const Bookshelf: React.FC<BookshelfProps> = ({ isDarkMode }) => {
  const books = [
    {
      title: "LinkedIn",
      icon: <FaLinkedin />,
      color: "#0077B5",
      url: "https://www.linkedin.com/in/gaurav-guddeti-a2359827b",
      description: "Professional Network"
    },
    {
      title: "Resume",
      icon: <FaFilePdf />,
      color: "#DC2626",
      url: "#", // Add your resume link here
      description: "Download PDF",
      download: true
    }
  ]

  return (
    <motion.div
      className={`w-full max-w-md mx-auto rounded-3xl shadow-2xl p-8 ${
        isDarkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white'
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Bookshelf Header */}
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Connect With Me
        </h3>
        <motion.div 
          className={`w-16 h-1 mx-auto mt-4 rounded-full ${
            isDarkMode ? 'bg-blue-500' : 'bg-blue-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </div>

      {/* Books */}
      <div className="flex gap-6 justify-center">
        {books.map((book, index) => (
          <motion.a
            key={book.title}
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative w-28 h-32 rounded-xl shadow-lg cursor-pointer interactive-cursor overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-white hover:bg-gray-50 border border-gray-200'
            }`}
            style={{
              background: `linear-gradient(135deg, ${book.color}15, ${book.color}25)`
            }}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: `0 10px 30px ${book.color}30`
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Book Spine */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
            
            {/* Book Content */}
            <div className="p-4 h-full flex flex-col justify-center items-center text-center">
              <div 
                className="text-3xl mb-3"
                style={{ color: book.color }}
              >
                {book.icon}
              </div>
              <div className={`text-sm font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {book.title}
              </div>
              <div className={`text-xs opacity-75 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {book.description}
              </div>
            </div>

            {/* Highlight Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>
        ))}
      </div>

      {/* Bookshelf Base */}
      <div className={`mt-8 h-2 rounded-full ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-700 to-gray-800' 
          : 'bg-gradient-to-r from-gray-200 to-gray-300'
      }`} />
    </motion.div>
  )
}

export default Bookshelf
