import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bannerImg from '../../../assets/books-1655783_1920.jpg'
import bannerImg2 from '../../../assets/library-1147815_1920.jpg'
import bannerImg3 from '../../../assets/books-2463779_1920.jpg'
import LatestBooks from "../LatestBooks";
import Covarage from "../Covarage";
import AnimatedSection from "../AnimatedSection";
import BestSellers from "../BestSellers";
import Reviews from "../Reviews";




const slides = [
    {
        img: bannerImg ,
        title: "Discover New Worlds",
        desc: "Explore thousands of books from various genres and authors.",
    },
    {
        img: bannerImg2,
        title: "Find Your Next Favorite Read",
        desc: "Hand-picked curated collections just for you.",
    },
    {
        img: bannerImg3,
        title: "Read. Learn. Grow.",
        desc: "Expand your knowledge with our vast digital library.",
    },
];

const Home = () => {
    const [index, setIndex] = useState(0);


    const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);


    useEffect(() => {
        const auto = setInterval(() => nextSlide(), 4000);
        return () => clearInterval(auto);
    }, []);
    return (
        <div className="w-full max-w-6xl mx-auto mt-6 relative overflow-hidden rounded-2xl shadow-lg">
            {/* Slide */}
            <div className="relative w-full h-[380px]">
                <img
                    src={slides[index].img}
                    alt="slide"
                    className="w-full h-full object-cover"
                />


                {/* Content */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8 md:px-16 text-white">
                    <h2 className="text-2xl md:text-4xl font-bold mb-3">{slides[index].title}</h2>
                    <p className="text-sm md:text-base max-w-xl mb-4">{slides[index].desc}</p>
                    <a
                        href="/books"
                        className="bg-green-600 hover:bg-green-700 w-fit px-5 py-2 rounded-md text-sm md:text-base font-medium"
                    >
                        View All Books
                    </a>
                </div>


                {/* Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full backdrop-blur-sm hover:bg-white"
                >
                    <ChevronLeft size={22} />
                </button>


                <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full backdrop-blur-sm hover:bg-white"
                >
                    <ChevronRight size={22} />
                </button>
            </div>


            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-3 pb-3">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${i === index ? "bg-green-600" : "bg-gray-300"
                            }`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
            <LatestBooks></LatestBooks>
            <Covarage></Covarage>
            <AnimatedSection></AnimatedSection>
            <BestSellers></BestSellers>
            <Reviews></Reviews>
        </div>
        
    );
};

export default Home;