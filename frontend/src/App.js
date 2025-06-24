import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Components } from './components';

const {
  Header,
  HeroBanner,
  ContentRow,
  Modal,
  VideoPlayer
} = Components;

// Mock data for Netflix content
const mockData = {
  featured: {
    id: 1,
    title: "Stranger Things",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
    videoUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    year: "2016",
    rating: "TV-14",
    genre: ["Drama", "Fantasy", "Horror"]
  },
  categories: [
    {
      title: "Trending Now",
      movies: [
        {
          id: 2,
          title: "The Matrix",
          image: "https://images.unsplash.com/photo-1575919220112-0d5a2dc6a4b6",
          videoUrl: "https://www.youtube.com/watch?v=vKQi3bIA1HI",
          year: "1999",
          rating: "R",
          genre: ["Action", "Sci-Fi"],
          description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
        },
        {
          id: 3,
          title: "Inception",
          image: "https://images.pexels.com/photos/6091649/pexels-photo-6091649.jpeg",
          videoUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
          year: "2010",
          rating: "PG-13",
          genre: ["Action", "Thriller"],
          description: "A thief who enters people's dreams to steal secrets is given the inverse task of planting an idea into the mind of a C.E.O."
        },
        {
          id: 4,
          title: "Dark",
          image: "https://images.pexels.com/photos/1690081/pexels-photo-1690081.jpeg",
          videoUrl: "https://www.youtube.com/watch?v=rrwycJ08PSA",
          year: "2017",
          rating: "TV-MA",
          genre: ["Drama", "Mystery"],
          description: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families."
        },
        {
          id: 5,
          title: "The Witcher",
          image: "https://images.pexels.com/photos/3379941/pexels-photo-3379941.jpeg",
          videoUrl: "https://www.youtube.com/watch?v=ndl1W4ltcmg",
          year: "2019",
          rating: "TV-MA",
          genre: ["Action", "Adventure"],
          description: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts."
        }
      ]
    },
    {
      title: "Popular Movies",
      movies: [
        {
          id: 6,
          title: "Avengers: Endgame",
          image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3",
          videoUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
          year: "2019",
          rating: "PG-13",
          genre: ["Action", "Adventure"],
          description: "After the devastating events of Infinity War, the Avengers must come together to reverse Thanos's actions and restore balance to the universe."
        },
        {
          id: 7,
          title: "Pulp Fiction",
          image: "https://images.pexels.com/photos/8272144/pexels-photo-8272144.jpeg",
          videoUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
          year: "1994",
          rating: "R",
          genre: ["Crime", "Drama"],
          description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
        },
        {
          id: 8,
          title: "The Godfather",
          image: "https://images.pexels.com/photos/6036202/pexels-photo-6036202.jpeg",
          videoUrl: "https://www.youtube.com/watch?v=UaVTIH8mujA",
          year: "1972",
          rating: "R",
          genre: ["Crime", "Drama"],
          description: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son."
        },
        {
          id: 9,
          title: "Interstellar",
          image: "https://images.unsplash.com/photo-1651404441019-186b4a7c1042",
          videoUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
          year: "2014",
          rating: "PG-13",
          genre: ["Adventure", "Drama"],
          description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
        }
      ]
    },
    {
      title: "Romantic Movies",
      movies: [
        {
          id: 10,
          title: "The Notebook",
          image: "https://images.pexels.com/photos/7119374/pexels-photo-7119374.jpeg",
          videoUrl: "https://www.youtube.com/watch?v=FC6biTjEprw",
          year: "2004",
          rating: "PG-13",
          genre: ["Drama", "Romance"],
          description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated."
        },
        {
          id: 11,
          title: "La La Land",
          image: "https://images.unsplash.com/photo-1701024546790-975eba1c48cf",
          videoUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
          year: "2016",
          rating: "PG-13",
          genre: ["Comedy", "Drama"],
          description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future."
        },
        {
          id: 12,
          title: "Titanic",
          image: "https://images.unsplash.com/photo-1709185163531-2ecdb45ad832",
          videoUrl: "https://www.youtube.com/watch?v=2e-eXJ6HgkQ",
          year: "1997",
          rating: "PG-13",
          genre: ["Drama", "Romance"],
          description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
        }
      ]
    },
    {
      title: "Documentaries",
      movies: [
        {
          id: 13,
          title: "Our Planet",
          image: "https://images.unsplash.com/photo-1538600375473-cdc68cf8bf81",
          videoUrl: "https://www.youtube.com/watch?v=aETNYyrqNYE",
          year: "2019",
          rating: "TV-G",
          genre: ["Documentary"],
          description: "Explores the natural world's remaining wilderness areas and the animal species that inhabit them."
        },
        {
          id: 14,
          title: "Making a Murderer",
          image: "https://images.unsplash.com/photo-1559840644-a8f0bde18dd9",
          videoUrl: "https://www.youtube.com/watch?v=qxgbdYaR_KQ",
          year: "2015",
          rating: "TV-MA",
          genre: ["Documentary", "Crime"],
          description: "Filmed over 10 years, this real-life thriller follows a DNA exoneree who is charged with another serious crime."
        },
        {
          id: 15,
          title: "Free Solo",
          image: "https://images.pexels.com/photos/1595239/pexels-photo-1595239.jpeg",
          videoUrl: "https://www.youtube.com/watch?v=urRVZ4SW7WU",
          year: "2018",
          rating: "PG-13",
          genre: ["Documentary", "Adventure"],
          description: "Follow Alex Honnold as he attempts to become the first person to ever free solo climb Yosemite's 3,000-foot high El Capitan wall."
        }
      ]
    }
  ]
};

function App() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleContentClick = (content) => {
    setSelectedContent(content);
    setShowModal(true);
  };

  const handlePlayVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setShowVideoPlayer(true);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedContent(null);
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
    setCurrentVideo(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className="bg-black min-h-screen text-white">
              <Header />
              <HeroBanner 
                content={mockData.featured} 
                onPlay={handlePlayVideo}
              />
              <div className="px-4 md:px-8 lg:px-16 space-y-8 pb-20">
                {mockData.categories.map((category, index) => (
                  <ContentRow
                    key={index}
                    title={category.title}
                    movies={category.movies}
                    onMovieClick={handleContentClick}
                  />
                ))}
              </div>
              
              {showModal && selectedContent && (
                <Modal
                  content={selectedContent}
                  onClose={closeModal}
                  onPlay={handlePlayVideo}
                />
              )}
              
              {showVideoPlayer && currentVideo && (
                <VideoPlayer
                  videoUrl={currentVideo}
                  onClose={closeVideoPlayer}
                />
              )}
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;