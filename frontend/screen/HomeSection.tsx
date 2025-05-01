"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  Heart,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HomeSection() {
  const [trending, setTrending] = useState<any>([]);
  const [featured, setFeatured] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setTrending([
        {
          id: 1,
          name: "Cosmic Dreamers #4391",
          creator: "0xArtist",
          price: "1.45 ETH",
          image: "/images/nft.jpg",
          likes: 245,
          timeLeft: "2h 51m",
        },
        {
          id: 2,
          name: "Digital Wanderers #112",
          creator: "MetaArtLabs",
          price: "0.89 ETH",
          image: "/images/nft.jpg",
          likes: 189,
          timeLeft: "5h 23m",
        },
        {
          id: 3,
          name: "Neon Genesis #78",
          creator: "CryptoVisionary",
          price: "2.13 ETH",
          image: "/images/nft.jpg",
          likes: 312,
          timeLeft: "1h 12m",
        },
        {
          id: 4,
          name: "Abstract Realms #215",
          creator: "DigitalCanvas",
          price: "3.21 ETH",
          image: "/images/nft.jpg",
          likes: 178,
          timeLeft: "8h 45m",
        },
      ]);

      setFeatured({
        name: "Parallel Universe Collection",
        creator: "NebulaCreator",
        price: "5.85 ETH",
        image: "/images/nft.jpg",
        description:
          "A stunning collection exploring alternate realities and dimensional shifts through vibrant digital art. Each piece offers a window into worlds beyond our comprehension.",
        itemsCount: 15,
        ownersCount: 8,
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  // Fade in animation for content
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      {/* <Navbar /> */}
      <main className="container mx-auto px-4 pb-20">
        {/* Hero Section */}
        <motion.section
          className="py-12 md:py-20 flex flex-col md:flex-row items-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Discover, Collect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                & Sell Extraordinary
              </span>{" "}
              NFTs
            </motion.h1>
            <p className="text-gray-300 text-lg mb-8 md:pr-12">
              NFT Ciao is the premier marketplace for non-fungible tokens.
              Explore, collect, and trade digital art with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                Explore Now <ArrowRight size={18} />
              </button>
              <button className="px-8 py-3 bg-gray-800 rounded-full font-medium hover:bg-gray-700 transition-colors">
                Create NFT
              </button>
            </div>

            <div className="mt-12 flex items-center space-x-8">
              <div>
                <p className="text-3xl font-bold">25K+</p>
                <p className="text-gray-400">Artworks</p>
              </div>
              <div>
                <p className="text-3xl font-bold">18K+</p>
                <p className="text-gray-400">Artists</p>
              </div>
              <div>
                <p className="text-3xl font-bold">12K+</p>
                <p className="text-gray-400">Collectors</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <motion.div
              className="relative z-10 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-80 w-full md:h-96 md:w-96 mx-auto">
                <Image
                  src="/images/nft.jpg"
                  alt="Featured NFT"
                  className="rounded-xl object-cover"
                  layout="fill"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-lg font-medium">
                      Ethereal Dimensions #024
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-300">
                        Current bid: 2.75 ETH
                      </span>
                      <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        12h 30m left
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="absolute -z-10 top-8 right-8 w-full h-full rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 blur-xl"></div>
          </div>
        </motion.section>

        {/* Featured NFT */}
        <motion.section
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Collection</h2>
            <button className="hidden md:flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          {isLoading ? (
            <div className="bg-gray-800/50 rounded-xl h-96 animate-pulse"></div>
          ) : (
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 md:p-10 rounded-xl backdrop-blur-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div
                  className="md:w-1/2 relative rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full aspect-[3/2]"
                  />
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full p-2">
                    <Heart size={20} className="text-red-400" />
                  </div>
                </motion.div>

                <div className="md:w-1/2">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm mr-2">
                      Featured
                    </span>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      New
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{featured.name}</h3>

                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-300">
                      Created by{" "}
                      <span className="text-white">{featured.creator}</span>
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6">{featured.description}</p>

                  <div className="flex gap-6 mb-8">
                    <div>
                      <p className="text-gray-400 text-sm">Collection Price</p>
                      <p className="text-2xl font-semibold">{featured.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Items</p>
                      <p className="text-2xl font-semibold">
                        {featured.itemsCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Owners</p>
                      <p className="text-2xl font-semibold">
                        {featured.ownersCount}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:opacity-90 transition-opacity">
                      View Collection
                    </button>
                    <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                      <Bookmark size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.section>

        {/* Trending NFTs */}
        <motion.section
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <TrendingUp className="text-purple-500 mr-2" size={24} />
              <h2 className="text-3xl font-bold">Trending NFTs</h2>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <ChevronLeft size={20} />
              </button>
              <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800/50 rounded-xl h-80 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trending.map((nft: any) => (
                <motion.div
                  key={nft.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      width={350}
                      height={350}
                      className="w-full aspect-square object-cover"
                    />
                    <button className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart
                        size={18}
                        className="text-white hover:text-red-400"
                      />
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                      {nft.timeLeft}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium mb-1">{nft.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      by {nft.creator}
                    </p>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400">Current Bid</p>
                        <p className="font-semibold">{nft.price}</p>
                      </div>
                      <button className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full transition-colors">
                        Place Bid
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-10">
            <button className="px-8 py-3 bg-transparent border border-purple-500 rounded-full font-medium text-purple-400 hover:bg-purple-500/10 transition-colors">
              View All Trending
            </button>
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Create & Upload",
                description:
                  "Create your artwork and upload it to our marketplace. Set your price and customize listing options.",
                icon: "🎨",
                delay: 0.1,
              },
              {
                title: "List & Promote",
                description:
                  "List your NFT for sale or auction. Share with the community and generate interest in your work.",
                icon: "📊",
                delay: 0.2,
              },
              {
                title: "Sell & Earn",
                description:
                  "Receive payment when your NFT sells. Earn royalties every time your art is resold in the future.",
                icon: "💰",
                delay: 0.3,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.5 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/api/placeholder/1200/400')] opacity-10 mix-blend-overlay"></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Your NFT Journey Today
              </h2>
              <p className="text-gray-300 mb-8 md:text-lg">
                Join thousands of artists and collectors in the world's most
                vibrant digital art marketplace.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:opacity-90 transition-opacity">
                  Connect Wallet
                </button>
                <button className="px-8 py-3 bg-gray-800 rounded-full font-medium hover:bg-gray-700 transition-colors">
                  Browse Marketplace
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
