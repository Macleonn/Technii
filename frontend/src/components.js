import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  PlusIcon, 
  HandThumbUpIcon, 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/solid';

// Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
        <div className="flex items-center space-x-8">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-red-600 text-2xl md:text-3xl font-bold"
          >
            NETFLIX
          </motion.div>
          <nav className="hidden md:flex space-x-6">
            {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">N</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

// Hero Banner Component
const HeroBanner = ({ content, onPlay }) => {
  return (
    <div className="relative h-screen flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), url(${content.image})`
        }}
      />
      
      <div className="relative z-10 px-4 md:px-8 lg:px-16 max-w-3xl">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {content.title}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {content.description}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlay(content.videoUrl)}
          >
            <PlayIcon className="w-6 h-6" />
            <span>Play</span>
          </motion.button>
          
          <motion.button
            className="flex items-center space-x-2 bg-gray-700/80 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600/80 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusIcon className="w-6 h-6" />
            <span>My List</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

// Movie Card Component
const MovieCard = ({ movie, onMovieClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-48 md:w-64 cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onMovieClick(movie)}
    >
      <motion.div
        className="relative rounded-lg overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-36 md:h-48 object-cover"
        />
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <PlayIcon className="w-12 h-12 text-white mx-auto mb-2" />
                <p className="text-white text-sm font-semibold">{movie.title}</p>
                <p className="text-gray-300 text-xs">{movie.year}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Content Row Component
const ContentRow = ({ title, movies, onMovieClick }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const container = document.getElementById(`row-${title}`);
    const scrollAmount = 300;
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
    setCanScrollLeft(newPosition > 0);
    setCanScrollRight(newPosition < container.scrollWidth - container.clientWidth);
  };

  return (
    <div className="relative group">
      <motion.h2 
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      
      <div className="relative">
        {canScrollLeft && (
          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => scroll('left')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </motion.button>
        )}
        
        {canScrollRight && (
          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => scroll('right')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </motion.button>
        )}
        
        <div
          id={`row-${title}`}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={onMovieClick}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ content, onClose, onPlay }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-64 md:h-80 object-cover rounded-t-lg"
            />
            
            <motion.button
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.button>
            
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{content.title}</h2>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-green-500 font-semibold">98% Match</span>
                <span className="border border-gray-400 px-2 py-1 text-sm">{content.rating}</span>
                <span className="text-gray-300">{content.year}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <div className="flex space-x-4 mb-6">
                  <motion.button
                    className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onPlay(content.videoUrl)}
                  >
                    <PlayIcon className="w-5 h-5" />
                    <span>Play</span>
                  </motion.button>
                  
                  <motion.button
                    className="p-3 border-2 border-gray-400 rounded-full hover:border-white transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <PlusIcon className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    className="p-3 border-2 border-gray-400 rounded-full hover:border-white transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HandThumbUpIcon className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <p className="text-gray-300 text-lg mb-4">{content.description}</p>
              </div>
              
              <div className="md:w-1/3">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-400">Genres: </span>
                    <span className="text-white">{content.genre.join(', ')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Video Player Component
const VideoPlayer = ({ videoUrl, onClose }) => {
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.button
          className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200 z-10"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <XMarkIcon className="w-6 h-6" />
        </motion.button>
        
        <motion.div
          className="w-full max-w-6xl h-full max-h-[80vh] bg-black"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
            title="Video Player"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const Components = {
  Header,
  HeroBanner,
  ContentRow,
  MovieCard,
  Modal,
  VideoPlayer
};