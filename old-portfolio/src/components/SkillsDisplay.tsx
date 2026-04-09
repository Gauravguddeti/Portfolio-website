import { motion } from 'framer-motion'
import { 
  FaPython, FaJava, FaReact, FaHtml5, FaCss3Alt, FaJs, 
  FaGitAlt, FaDocker, FaAndroid, FaDatabase, FaServer, FaMobile
} from 'react-icons/fa'
import { 
  SiCplusplus, SiC, SiMysql, SiFirebase, SiSupabase, 
  SiTailwindcss, SiTensorflow, SiPytorch, SiOpencv, 
  SiStreamlit, SiTypescript, SiNodedotjs, SiExpress, SiMongodb
} from 'react-icons/si'
import { BiBarChart } from 'react-icons/bi'

const SkillsDisplay = () => {
  const skillCategories = [
    {
      category: "Languages",
      icon: <FaServer className="text-2xl" />,
      skills: [
        { name: "Python", icon: <FaPython />, color: "#3776AB", level: 90 },
        { name: "Java", icon: <FaJava />, color: "#ED8B00", level: 85 },
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E", level: 85 },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", level: 80 },
        { name: "C++", icon: <SiCplusplus />, color: "#00599C", level: 75 },
        { name: "C", icon: <SiC />, color: "#A8B9CC", level: 70 },
      ]
    },
    {
      category: "Frontend",
      icon: <FaMobile className="text-2xl" />,
      skills: [
        { name: "React", icon: <FaReact />, color: "#61DAFB", level: 90 },
        { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26", level: 95 },
        { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6", level: 90 },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", level: 85 },
      ]
    },
    {
      category: "Backend & Database",
      icon: <FaDatabase className="text-2xl" />,
      skills: [
        { name: "Node.js", icon: <SiNodedotjs />, color: "#339933", level: 80 },
        { name: "Express", icon: <SiExpress />, color: "#000000", level: 75 },
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1", level: 85 },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", level: 80 },
        { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28", level: 85 },
        { name: "Supabase", icon: <SiSupabase />, color: "#3ECF8E", level: 80 },
      ]
    },
    {
      category: "AI/ML & Data",
      icon: <BiBarChart className="text-2xl" />,
      skills: [
        { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00", level: 85 },
        { name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C", level: 80 },
        { name: "OpenCV", icon: <SiOpencv />, color: "#5C3EE8", level: 85 },
        { name: "Streamlit", icon: <SiStreamlit />, color: "#FF4B4B", level: 80 },
        { name: "Power BI", icon: <BiBarChart />, color: "#F2C811", level: 75 },
      ]
    },
    {
      category: "Tools & DevOps",
      icon: <FaDocker className="text-2xl" />,
      skills: [
        { name: "Git", icon: <FaGitAlt />, color: "#F05032", level: 90 },
        { name: "Docker", icon: <FaDocker />, color: "#2496ED", level: 75 },
        { name: "Android Studio", icon: <FaAndroid />, color: "#3DDC84", level: 80 },
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Skills</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-4 text-white">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span style={{ color: skill.color }} className="text-xl">
                        {skill.icon}
                      </span>
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                    </div>
                    
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 1, 
                            delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3 
                          }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                    
                    <span className="text-sm text-gray-400 font-medium min-w-[3rem] text-right">
                      {skill.level}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8 text-white">
            Also Working With
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'REST APIs', 'GraphQL', 'Microservices', 'Machine Learning', 
              'Deep Learning', 'Computer Vision', 'Natural Language Processing',
              'Agile Development', 'CI/CD', 'Cloud Computing', 'Responsive Design'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-gray-300 text-sm hover:bg-slate-700 hover:border-blue-500 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsDisplay
