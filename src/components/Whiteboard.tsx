import { motion } from 'framer-motion'
import { 
  FaPython, FaJava, FaReact, FaHtml5, FaCss3Alt, FaJs, 
  FaGitAlt, FaDocker, FaAndroid 
} from 'react-icons/fa'
import { 
  SiCplusplus, SiC, SiMysql, SiFirebase, SiSupabase, 
  SiTailwindcss, SiTensorflow, SiPytorch, SiOpencv, 
  SiStreamlit 
} from 'react-icons/si'
import { BiBarChart } from 'react-icons/bi'

interface WhiteboardProps {
  isDarkMode: boolean
}

const Whiteboard: React.FC<WhiteboardProps> = ({ isDarkMode }) => {
  const skillCategories = [
    {
      category: "Languages",
      skills: [
        { name: "Python", icon: <FaPython />, color: "#3776AB" },
        { name: "Java", icon: <FaJava />, color: "#ED8B00" },
        { name: "C", icon: <SiC />, color: "#A8B9CC" },
        { name: "C++", icon: <SiCplusplus />, color: "#00599C" },
      ]
    },
    {
      category: "Frontend",
      skills: [
        { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
        { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "React", icon: <FaReact />, color: "#61DAFB" },
      ]
    },
    {
      category: "Backend/DB",
      skills: [
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
        { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
        { name: "Supabase", icon: <SiSupabase />, color: "#3ECF8E" },
      ]
    },
    {
      category: "Tools",
      skills: [
        { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
        { name: "Android Studio", icon: <FaAndroid />, color: "#3DDC84" },
      ]
    },
    {
      category: "AI/ML",
      skills: [
        { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
        { name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C" },
        { name: "OpenCV", icon: <SiOpencv />, color: "#5C3EE8" },
      ]
    },
    {
      category: "Visualization",
      skills: [
        { name: "Power BI", icon: <BiBarChart />, color: "#F2C811" },
        { name: "Streamlit", icon: <SiStreamlit />, color: "#FF4B4B" },
      ]
    }
  ]

  return (
    <motion.div
      className={`w-full max-w-4xl mx-auto rounded-3xl shadow-2xl p-8 ${
        isDarkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white'
      }`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Whiteboard Header */}
      <div className="text-center mb-8">
        <h3 className={`text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-lightNavy'
        }`}>
          Technical Skills
        </h3>
        <motion.div 
          className={`w-20 h-1 mx-auto mt-4 rounded-full ${
            isDarkMode ? 'bg-neonGreen' : 'bg-coffeeBrown'
          }`}
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            className={`p-6 rounded-xl ${
              isDarkMode 
                ? 'bg-gray-700 border border-gray-600' 
                : 'bg-gray-50 border border-gray-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + categoryIndex * 0.1 }}
          >
            <h4 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {category.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${
                    isDarkMode 
                      ? 'bg-gray-600 text-white border border-gray-500' 
                      : 'bg-white text-gray-800 border border-gray-300 shadow-sm'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 1 + categoryIndex * 0.1 + skillIndex * 0.05 
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: isDarkMode ? '#4B5563' : '#F9FAFB',
                    color: skill.color
                  }}
                >
                  <span style={{ color: skill.color }}>
                    {skill.icon}
                  </span>
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated Pen */}
      <motion.div
        className={`absolute top-4 right-4 w-1 h-8 rounded-full ${
          isDarkMode ? 'bg-neonGreen' : 'bg-coffeeBrown'
        }`}
        animate={{ 
          rotate: [0, 10, -10, 0],
          y: [0, -2, 2, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}

export default Whiteboard
