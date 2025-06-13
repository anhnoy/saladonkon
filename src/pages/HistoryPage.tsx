import { motion } from 'framer-motion';

const HistoryPage = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'url(https://i.imgur.com/KP9NhM2.jpeg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1 
              className="text-5xl md:text-6xl font-serif font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Our History
            </motion.h1>
            <motion.p 
              className="max-w-2xl mx-auto text-xl italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              "History creates legends, and legends create history"
            </motion.p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif font-bold text-center mb-8 text-gray-800">Where History and Luxury Meet</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                History and legend are intertwined at Sala Done Khone Boutique Hotel, a beautiful property located on the banks of the Mekong River in Laos. The hotel is built on the site of a former French colonial railway station, and its stunning architecture and rich history make it a must-visit for any traveler interested in Southeast Asia.
              </p>
              <p>
                Seven kilometers southward from the hotel's current position, one can find the remnants of a French colonial pier. It is from this very spot that Ban Khone's contemporary history unfolded.
              </p>
              <p className="italic text-center py-4 text-lg">
                "History creates legends, and legends create history"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mekong River Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://i.imgur.com/vcxqAzk.jpeg" 
                alt="Mekong River" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-serif font-bold mb-6 text-gray-800">The Mekong River's Importance</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  For centuries, the Mekong River has been an important trade route for people living along its banks. However, the river's fluctuating water levels (floods and droughts), as well as its course that is filled with rapids and waterfalls, make navigation on some parts of the river dangerous or impossible.
                </p>
                <p>
                  The Khone Phapheang Falls, a large waterfall, block natural navigation. And due to its location and terrain, Khone Island serves as a connecting point between the lower and middle Mekong river basins.
                </p>
                <p>
                  Khone Island has been in the midst of various kingdoms, but it often served as a natural border line. Control of Khone Island has always been strategically important.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Railway Construction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-800">The Construction of the Khone Island Railway</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <img 
                    src="https://i.imgur.com/xeHhY6k.jpeg" 
                    alt="Khone Island Railway" 
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
                <div className="md:w-1/2 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    At this point, the Mekong River is about 11 kilometers wide, consisting of six main islands and many small rocky islands, which the Lao call this area "Si Phan Done" (4,000 Islands). The river flows swiftly through rapids and a waterfall up to 14 meters high, named "Khone Phapheang Falls", making it impossible to use for cargo transportation.
                  </p>
                  <p>
                    To overcome this natural obstacle to navigation, boaters had to choose Khone Island, as the island's terrain makes it accessible from both the north and south, regardless of the water level. Additionally, the distance for cargo transportation on Khone Island is shorter than on other islands.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Therefore, on April 9, 1896, the construction of the Khone Island Railway began. It was estimated that nearly 2,500 sleepers would be needed. Just three years after laying the first track for the transport of boats Garcerie, Colombert and Trentinian, they were able to cross to Khone Island successfully.
                </p>
                <p>
                  The railway on Khone Island was divided into two phases. The first phase (1896-1920) began from the port at Ban Hang Khone, the southernmost tip of the island (there are still traces of the old port), to Ban Khone North, the northernmost tip of the island.
                </p>
                <p>
                  The purpose was to transport goods, passengers, and military supplies of the French colony with its center in Saigon, up the Mekong River through Cambodia to the port on the southern side of Khone Island. Then, they changed to trains to the port on the northern side of Khone Island, and then changed to boats to go up north to the provinces in the north of Laos. The construction of the first phase was awarded to "the Compagnie Saigonaise de Navigation et de Transport".
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <img 
                  src="https://i.imgur.com/LQrG21S.jpeg" 
                  alt="Historical Railway" 
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
                <img 
                  src="https://i.imgur.com/SZ4DZUx.jpeg" 
                  alt="Historical Site" 
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* French Heritage Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-800">The French Heritage Building</h2>
            
            <div className="space-y-8">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  During this period, many public utilities were built, including ports, railway stations, military headquarters, railway worker's houses and high-ranking officer's houses, shipyards, markets, and more. The legend of the "French Heritage building" began here.
                </p>
                <p>
                  If you sit on the balcony of the heritage house and face west, you will see Sala Done Khone restaurant today. Close your eyes and imagine back to the year 1896, or about 120 years ago. In front of you, about 50 meters away from the Mekong River, you will see the old French-style concrete pier.
                </p>
                <p>
                  The village concrete road is where the railway used to be. If you go north for about 1 km, you will reach the port at the head of Khone Island, and if you go left for about 6 km, you will reach the port at the tail of Khone Island. About 50 meters to the left of you is "the Khone Railway Station".
                </p>
                <p>
                  About 100 meters further is the house of the Khone Island district commander (about 10 years ago, the owner of Sala Done Khone Hotel saw traces of European-style bathtubs and toilets remaining. Today, it has been demolished and replaced by people's houses). Next to it to the left, south (currently Sompamith's Guesthouse), It used to be a shipyard that was transported via train from Ban Hang Khon Pier to be assembled here.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <img 
                  src="https://i.imgur.com/5W58O1F.jpeg" 
                  alt="Heritage Building" 
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
                <img 
                  src="https://i.imgur.com/NF4pZ7w.jpeg" 
                  alt="Historical Building" 
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
                <img 
                  src="https://i.imgur.com/eSWyUzy.png" 
                  alt="Old Building" 
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern History Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://i.imgur.com/p2C8mG1.jpeg" 
                alt="Modern Hotel" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-serif font-bold mb-6 text-gray-800">From Colonial Past to Boutique Hotel</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  "The French heritage building" of Sala Done Khone Hotel, after France granted independence to Laos (around after 1954), was abandoned for about 10 years. Later, it was used as a village health center until 1996, when it was sold to a private company (the current hotel owner) to conserve and develop as the first resort in the Khone Island area, named "Auberge de Sala Done Khone", and later expanded the business to become the "Sala Done Khone boutique hotel" until the present.
                </p>
                <p>
                  After being purchased in 1996, this French heritage house consists of two buildings. The first building in the front has 6 bedrooms. The small building in the back has 3 rooms, one kitchen and two rooms for servants. The condition of the house was very deteriorated both inside and outside, but thanks to the French architect who designed and constructed this building, most of the structure is still very solid and strong.
                </p>
                <p>
                  It is estimated that this building was built to accommodate high-ranking officials of the French Indochina colony who came to work and relax in this area. According to the recorded information, during the years 1900-1920, high-ranking officials such as the colonial governor came to inspect the Four Thousand Islands area.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Today Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-serif font-bold mb-8 text-white">Today's Sala Done Khone Boutique Hotel</h2>
            <div className="space-y-6 leading-relaxed max-w-3xl mx-auto">
              <p>
                Today, Sala Done Khone Boutique Hotel is a popular destination for travelers from all over the world.
              </p>
              <p className="italic text-xl">
                "All things must come into being and pass away over time, but legends will always remain"
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <img 
                src="https://i.imgur.com/EIlmofj.jpeg" 
                alt="Hotel Today" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img 
                src="https://i.imgur.com/TBRIAKE.jpeg" 
                alt="Hotel Grounds" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img 
                src="https://i.imgur.com/rZktNgp.jpeg" 
                alt="Hotel View" 
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Image */}
      <div className="w-full h-96 bg-cover bg-center" style={{ backgroundImage: 'url(https://i.imgur.com/9QN2GfG.jpeg)' }}></div>
    </div>
  );
};

export default HistoryPage;