const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.5; 
  audio.play().catch(() => {
    
  });
};
export default playSound;