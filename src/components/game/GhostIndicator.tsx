
import React from 'react';
import { motion } from 'framer-motion';
import { Ghost } from 'lucide-react'; // Using lucide Ghost icon for simplicity

interface GhostIndicatorProps {
  isVisible: boolean;
  animateAt: number; // Time in ms when the ghost should "tap"
  gameDuration: number; // Total duration of the "waiting" phase for positioning
}

const GhostIndicator: React.FC<GhostIndicatorProps> = ({ isVisible, animateAt, gameDuration }) => {
  if (!isVisible || gameDuration === 0) return null;

  // Calculate animation duration based on when the ghost taps
  const ghostTapTime = animateAt / 1000; // convert ms to s for Framer Motion duration

  return (
    <motion.div
      className="absolute top-1/2 left-0 w-full h-12 flex items-center"
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ 
        opacity: [0, 0.7, 0.7, 0], 
        x: ["-100%", "50%", "50%", "120%"], // Move across and then off-screen
      }}
      transition={{ 
        duration: ghostTapTime + 0.5, // Total animation time: when ghost taps + little extra to fade out
        times: [0, ghostTapTime / (ghostTapTime + 0.5) * 0.8, ghostTapTime / (ghostTapTime + 0.5), 1], // Control keyframes timing
        ease: "linear" 
      }}
      style={{ y: '-50%' }} // Center vertically
    >
      <div className="p-2 bg-secondary-purple/30 rounded-full shadow-neon-purple animate-pulse-glow">
        <Ghost size={28} className="text-light-purple" />
      </div>
    </motion.div>
  );
};

export default GhostIndicator;
