import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGamepad, FaCoffee, FaBrain, FaInfinity } from 'react-icons/fa'

interface StickyNotesProps {
  isDarkMode: boolean
}

const StickyNotes: React.FC<StickyNotesProps> = ({ isDarkMode }) => {
  const [selectedNote, setSelectedNote] = useState<number | null>(null)

  const notes = [
    {
      id: 1,
      title: "AI & ML builder",
      icon: <FaBrain />,
      color: isDarkMode ? "#10B981" : "#34D399",
      content: "Passionate about building intelligent systems and exploring the frontiers of artificial intelligence.",
      position: { x: 0, y: 0 }
    },
    {
      id: 2,
      title: "Valorant champ 🎮",
      icon: <FaGamepad />,
      color: isDarkMode ? "#F59E0B" : "#FBBF24",
      content: "When I'm not coding, you'll find me climbing the ranks in Valorant. Gaming keeps my reflexes sharp!",
      position: { x: 80, y: 10 }
    },
    {
      id: 3,
      title: "Coffee + Debugging = Peace ☕",
      icon: <FaCoffee />,
      color: isDarkMode ? "#EF4444" : "#F87171",
      content: "The perfect formula for productivity. Nothing beats a good cup of coffee while hunting down bugs.",
      position: { x: 40, y: 60 }
    },
    {
      id: 4,
      title: "Learning never stops 🔁",
      icon: <FaInfinity />,
      color: isDarkMode ? "#8B5CF6" : "#A78BFA",
      content: "Always exploring new technologies and pushing the boundaries of what's possible.",
      position: { x: 120, y: 40 }
    }
  ]

  return (
    <div className="relative w-72 h-48">
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          className={`absolute w-32 h-32 rounded-xl shadow-lg cursor-pointer interactive-cursor`}
          style={{
            backgroundColor: note.color,
            left: note.position.x,
            top: note.position.y,
            zIndex: selectedNote === note.id ? 20 : 10
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 20 - 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: selectedNote === note.id ? 0 : Math.random() * 20 - 10
          }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          onClick={() => setSelectedNote(selectedNote === note.id ? null : note.id)}
        >
          <div className="p-3 h-full flex flex-col items-center justify-center text-center">
            <div className="text-white text-2xl mb-2">
              {note.icon}
            </div>
            <div className="text-white text-sm font-semibold leading-tight">
              {note.title}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Expanded Note Modal */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              className={`w-full max-w-lg mx-4 p-8 rounded-3xl shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white'
              }`}
              style={{
                backgroundColor: notes.find(n => n.id === selectedNote)?.color,
              }}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center text-white">
                <div className="text-5xl mb-6">
                  {notes.find(n => n.id === selectedNote)?.icon}
                </div>
                <h3 className="text-3xl font-bold mb-6">
                  {notes.find(n => n.id === selectedNote)?.title}
                </h3>
                <p className="text-lg leading-relaxed">
                  {notes.find(n => n.id === selectedNote)?.content}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StickyNotes
