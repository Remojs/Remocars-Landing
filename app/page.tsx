"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown, Play, Pause, ArrowRight, ArrowLeft, Zap, Gauge, Settings, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Add this new component after the existing imports and before the ArtisticCollage component:

const MinimalistShowcase = ({ car, index }: { car: (typeof cars)[0]; index: number }) => {
  return (
    <motion.section
      className={`min-h-screen relative overflow-hidden ${index % 2 === 0 ? "bg-gray-100" : "bg-gray-900"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Top Header with decorative lines */}
      <motion.div
        className="absolute top-16 left-1/2 transform -translate-x-1/2 flex items-center gap-8 z-30"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className={`w-24 h-px ${index % 2 === 0 ? "bg-black" : "bg-white"}`} />
        <h3 className={`text-lg font-medium tracking-wider ${index % 2 === 0 ? "text-black" : "text-white"}`}>
          Ride of Dreams
        </h3>
        <div className={`w-24 h-px ${index % 2 === 0 ? "bg-black" : "bg-white"}`} />
      </motion.div>

      {/* Giant Brand Typography */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-5"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h1
          className={`text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black leading-none select-none ${
            index % 2 === 0 ? "text-black" : "text-white"
          }`}
          style={{
            letterSpacing: "-0.05em",
            textShadow: index % 2 === 0 ? "0 0 100px rgba(0,0,0,0.1)" : "0 0 100px rgba(255,255,255,0.1)",
          }}
        >
          {car.brand}
        </h1>
      </motion.div>

      {/* Car Image positioned over typography */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-15"
        style={{ transform: "translateY(60px)" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative w-[600px] h-[400px] md:w-[800px] md:h-[500px] lg:w-[1000px] lg:h-[600px]">
          <Image
            src={car.images[0] || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-contain drop-shadow-2xl"
            priority
            style={{
              willChange: 'auto',
              transform: 'translateZ(0)',
            }}
            onLoad={() => {
              // Forzar un repaint después de que la imagen cargue
              if (typeof window !== 'undefined') {
                window.requestAnimationFrame(() => {});
              }
            }}
          />
        </div>
      </motion.div>

      {/* Bottom Left - Model Name */}
      <motion.div
        className="absolute bottom-32 left-8 z-30"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        viewport={{ once: true }}
      >
        <h2 className={`text-4xl md:text-5xl font-light mb-2 ${index % 2 === 0 ? "text-black" : "text-white"}`}>
          {car.brand}
        </h2>
        <h3 className={`text-5xl md:text-6xl font-black ${index % 2 === 0 ? "text-black" : "text-white"}`}>
          {car.model.split(" ")[0]}
        </h3>
      </motion.div>

      {/* Bottom Right - Technical Specs */}
      <motion.div
        className="absolute bottom-32 right-8 z-30"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 gap-8 text-right">
          <div>
            <div className={`text-sm font-medium mb-1 ${index % 2 === 0 ? "text-gray-600" : "text-gray-400"}`}>
              0/100 km/h
            </div>
            <div className={`text-2xl font-bold ${index % 2 === 0 ? "text-black" : "text-white"}`}>
              {car.acceleration}
            </div>
          </div>
          <div>
            <div className={`text-sm font-medium mb-1 ${index % 2 === 0 ? "text-gray-600" : "text-gray-400"}`}>
              Power (PS)
            </div>
            <div className={`text-2xl font-bold ${index % 2 === 0 ? "text-black" : "text-white"}`}>{car.power}</div>
          </div>
          <div>
            <div className={`text-sm font-medium mb-1 ${index % 2 === 0 ? "text-gray-600" : "text-gray-400"}`}>
              Top Speed
            </div>
            <div className={`text-2xl font-bold ${index % 2 === 0 ? "text-black" : "text-white"}`}>{car.topSpeed}</div>
          </div>
          <div>
            <div className={`text-sm font-medium mb-1 ${index % 2 === 0 ? "text-gray-600" : "text-gray-400"}`}>
              Price
            </div>
            <div className={`text-2xl font-bold ${index % 2 === 0 ? "text-black" : "text-white"}`}>{car.price}</div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Description and Logo */}
      <motion.div
        className="absolute bottom-8 left-8 right-8 z-30"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-3 gap-8 items-end">
          <div className="md:col-span-2">
            <p className={`text-sm leading-relaxed ${index % 2 === 0 ? "text-gray-700" : "text-gray-300"}`}>
              {car.description}
            </p>
          </div>
          <div className="flex justify-end">
            <motion.div
              className={`text-3xl font-black ${index % 2 === 0 ? "text-black" : "text-white"}`}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {car.brand}°
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Subtle accent elements */}
      <motion.div
        className="absolute top-1/2 left-4 w-1 h-32 bg-gradient-to-b from-transparent via-current to-transparent opacity-20"
        style={{ color: index % 2 === 0 ? "#000" : "#fff" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        viewport={{ once: true }}
      />

      <motion.div
        className="absolute top-1/2 right-4 w-1 h-32 bg-gradient-to-b from-transparent via-current to-transparent opacity-20"
        style={{ color: index % 2 === 0 ? "#000" : "#fff" }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        viewport={{ once: true }}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className={`h-5 w-5 ${index % 2 === 0 ? "text-black" : "text-white"} opacity-60`} />
      </motion.div>
    </motion.section>
  )
}

// Add these new components after the existing imports and before the cars array:

const ArtisticCollage = ({ car, index }: { car: (typeof cars)[0]; index: number }) => {
  const [currentFrame, setCurrentFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      className={`min-h-screen relative overflow-hidden ${index % 2 === 0 ? "bg-white" : "bg-black"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Background Grid Pattern */}
      <div className={`absolute inset-0 opacity-5 ${index % 2 === 0 ? "text-black" : "text-white"}`}>
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id={`grid-${index}`} width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
        </svg>
      </div>

      {/* Main Brand Typography */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h2
          className={`text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none select-none ${
            index % 2 === 0 ? "text-black/10" : "text-white/10"
          }`}
        >
          {car.brand}
        </h2>
      </motion.div>

      {/* Floating Image Frames */}
      <div className="absolute inset-0 z-20">
        {/* Main Hero Image */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-64 md:w-[500px] md:h-80"
          initial={{ x: -100, opacity: 0, rotate: -5 }}
          whileInView={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <div
            className={`relative w-full h-full border-4 ${index % 2 === 0 ? "border-black" : "border-white"} shadow-2xl`}
          >
            <Image
              src={car.images[1] || "/placeholder.svg"}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover"
            />
            <div
              className={`absolute -bottom-6 -right-6 px-4 py-2 ${index % 2 === 0 ? "bg-black text-white" : "bg-white text-black"} font-bold`}
            >
              {car.model}
            </div>
          </div>
        </motion.div>

        {/* Secondary Frames */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-24 md:w-40 md:h-32"
          initial={{ x: -200, opacity: 0, rotate: 15 }}
          whileInView={{ x: 0, opacity: 1, rotate: 10 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, rotate: 15 }}
        >
          <div className={`relative w-full h-full border-2 ${index % 2 === 0 ? "border-black" : "border-white"}`}>
            <Image
              src={car.images[2] || "/placeholder.svg"}
              alt={`${car.brand} detail`}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-16 w-28 h-20 md:w-36 md:h-28"
          initial={{ x: 200, opacity: 0, rotate: -15 }}
          whileInView={{ x: 0, opacity: 1, rotate: -8 }}
          transition={{ duration: 1, delay: 0.9 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, rotate: -12 }}
        >
          <div className={`relative w-full h-full border-2 ${index % 2 === 0 ? "border-black" : "border-white"}`}>
            <Image src={car.images[3] || "/placeholder.svg"} alt={`${car.brand} wheel`} fill className="object-cover" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 md:w-32 md:h-32"
          initial={{ scale: 0, opacity: 0, rotate: 45 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 25 }}
          transition={{ duration: 1, delay: 1.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.15, rotate: 30 }}
        >
          <div
            className={`relative w-full h-full border-2 ${index % 2 === 0 ? "border-black" : "border-white"} rounded-full overflow-hidden`}
          >
            <Image
              src={car.images[4] || "/placeholder.svg"}
              alt={`${car.brand} interior`}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Technical Icons Sidebar */}
      <motion.div
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 space-y-8"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        viewport={{ once: true }}
      >
        {[Zap, Gauge, Settings, Star].map((Icon, iconIndex) => (
          <motion.div
            key={iconIndex}
            className={`w-12 h-12 border-2 ${index % 2 === 0 ? "border-black" : "border-white"} flex items-center justify-center`}
            whileHover={{ scale: 1.2, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className={`h-6 w-6 ${index % 2 === 0 ? "text-black" : "text-white"}`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Animated Text Elements */}
      <motion.div
        className="absolute bottom-16 left-8 z-30"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        viewport={{ once: true }}
      >
        <div className={`text-sm font-mono mb-2 ${index % 2 === 0 ? "text-black" : "text-white"}`}>
          {car.year} COLLECTION
        </div>
        <div className={`text-xs font-mono ${index % 2 === 0 ? "text-gray-600" : "text-gray-400"}`}>
          ELITE AUTOMOTIVE
        </div>
      </motion.div>

      {/* Barcode Element */}
      <motion.div
        className="absolute top-16 right-8 z-30"
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        viewport={{ once: true }}
      >
        <div className={`text-xs font-mono mb-2 ${index % 2 === 0 ? "text-black" : "text-white"}`}>
          {car.brand.toUpperCase()} {car.year}
        </div>
        <div className={`flex space-x-1 ${index % 2 === 0 ? "text-black" : "text-white"}`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`w-1 bg-current`} style={{ height: `${Math.random() * 20 + 10}px` }} />
          ))}
        </div>
        <div className={`text-xs font-mono mt-1 ${index % 2 === 0 ? "text-black" : "text-white"}`}>
          {Math.floor(Math.random() * 900000000) + 100000000}
        </div>
      </motion.div>

      {/* Geometric Accent Lines */}
      <motion.div
        className="absolute inset-0 z-15"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <svg className="absolute inset-0 w-full h-full">
          <motion.line
            x1="0"
            y1="30%"
            x2="100%"
            y2="30%"
            stroke={index % 2 === 0 ? "#000" : "#fff"}
            strokeWidth="1"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
            viewport={{ once: true }}
          />
          <motion.line
            x1="70%"
            y1="0"
            x2="70%"
            y2="100%"
            stroke={index % 2 === 0 ? "#000" : "#fff"}
            strokeWidth="1"
            opacity="0.2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
            viewport={{ once: true }}
          />
        </svg>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className={`h-6 w-6 ${index % 2 === 0 ? "text-black" : "text-white"}`} />
      </motion.div>
    </motion.section>
  )
}

const cars = [
  {
    id: 1,
    brand: "PORSCHE",
    model: "911 GT3 RS",
    year: "2024",
    price: "$223,800",
    power: "518 HP",
    acceleration: "3.0s",
    topSpeed: "184 mph",
    images: [
      // Imagen principal para MinimalistShowcase
      "https://images-porsche.imgix.net/-/media/1DBDC37E82084CF496EE48FCCE48BE0A_B3C2A87AF66E4046A12F32259A2BA221_911-gt3-side?w=1400&q=85&crop=faces%2Centropy%2Cedges&auto=format",
      // Imágenes para ArtisticCollage
      "https://images-porsche.imgix.net/-/media/B4BFF75D24F94B959F189CF96230348A_A433A79337964421B54DB1AF72E6DD43_CZ25W18IX0011-911-gt3-rear-view?w=768&q=85&auto=format",
      "https://pictures.porsche.com/rtt/iris?COSY-EU-100-1713c6eK12UC31P3T5JOCU%25hjdmiTDDmvMXlHWguCuq6Q44RtRHo9ZAaDjgu5PWI7tGW3rNbIwNKXv9Z7KFrQZtcZdtH4LOLRZUhlO5cwUc7Njm0jIy0TPEapPvlPWhGSTIUFCWh021oagaMSv10bHWTQ2Yeaif7Hv1BDGA9qZrYMP5YAGDpX%259Ol5omc4tDstZEKYirtpoaQlYfBXdlvbEqr",
      "https://pictures.porsche.com/rtt/iris?COSY-EU-100-1713c6eK12UC31P3T5JOCU%25hjdmiTDDmvMXlHWguCuq6Q44RtRHo9ZAaDjgu5PWI7tGW3rNbIwNKXv9L7KFrQZtcZdtH4LOLRZUhlO5cwUc7Njm0jIy0TPEapPvlPWhGSTIUFCWh021oagaMSv10bHWTQ2Yeaif7Hv1BDGA9qZrYMP5YAGDpX%259Ol5omc4tDstZEKYirtpoaQlYfBXdlvbEqr",
      // Imágenes adicionales para CarShowcase (carrusel)
      "https://images-porsche.imgix.net/-/media/0B3F90A75B0141FF8BED694C3C1A323B_7C02423B08CB49C8801E208B2D16A51E_CZ25W18OX0004-911-gt3-white-side?w=1800&q=85&crop=faces%2Centropy%2Cedges&auto=format",
      "https://images-porsche.imgix.net/-/media/6B40E90F01E74657A4F4827FC7A7959F_E6F748D71779489DA12FBF73E9002145_CZ25W18OX0002-911-gt3-white-rear?w=900&q=85&crop=faces%2Centropy%2Cedges&auto=format",
      "https://images-porsche.imgix.net/-/media/04A00A110697442F84092F6E6ACF05CD_77AF125DD84E48C7B950A7ECBD75DEB5_CZ25W18OX0003-911-gt3-white-front?w=900&q=85&crop=faces%2Centropy%2Cedges&auto=format",
      "https://images-porsche.imgix.net/-/media/AE2E7E747A9742099080F0EBD929B5BA_3BFA05845EDD48318262E86415B12D12_CZ25W18OX0006-911-gt3-driving?fp-x=0.5&fp-y=0.5&w=1919&ar=21%3A9&q=85&crop=focalpoint&auto=format",
    ],
    description:
      "The Porsche 911 GT3 RS is a high-performance sports car that blends track-focused engineering with iconic design. Powered by a naturally aspirated 4.0-litre flat-six engine, it delivers razor-sharp responsiveness and an exhilarating 518 horsepower.",
  },
  {
    id: 2,
    brand: "MCLAREN",
    model: "720S",
    year: "2024",
    price: "$310,500",
    power: "710 HP",
    acceleration: "2.8s",
    topSpeed: "212 mph",
    images: [
      // Imagen principal para MinimalistShowcase
      "https://pngimg.com/d/Mclaren_PNG43.png",
      // Imágenes para ArtisticCollage
      "https://cars.mclaren.com/content/dam/mclaren-automotive/models/720s/720s/new-imgs/25_720s_coupe_interior_steerinwheel.jpg",
      "https://cars.mclaren.com/content/dam/mclaren-automotive/models/720s/720s/new-imgs/Power_022.jpg",
      "https://cars.mclaren.com/content/dam/mclaren-automotive/models/720s/720s/sustainment-2021/images/McLaren_720s_Shot_14_Static_Exterior_Coupe_Dead_Rear_R4.jpg",
      // Imágenes adicionales para CarShowcase (carrusel)
      "https://cars.mclaren.com/content/dam/mclaren-automotive/models/720s/720s/sustainment-2021/images/Design_02.png",
      "https://cars.mclaren.com/content/dam/mclaren-automotive/models/720s/720s/sustainment-2021/images/Design_01.png",
      "https://cars.mclaren.com/content/dam/mclaren-automotive/models/720s/720s/sustainment-2021/images/Design_03.png",
      "https://mclaren.scene7.com/is/image/mclaren/McLaren_720s_Shot_18_Static_Exterior_Coupe_Rear_Spoiler_R1:crop-16x9?wid=1786&hei=1005",
    ],
    description:
      "The McLaren 720S represents the pinnacle of supercar engineering, combining lightweight construction with advanced aerodynamics. Its twin-turbo V8 engine delivers breathtaking performance while maintaining everyday usability.",
  },
  {
    id: 3,
    brand: "FERRARI",
    model: "F8 TRIBUTO",
    year: "2024",
    price: "$280,000",
    power: "710 HP",
    acceleration: "2.9s",
    topSpeed: "211 mph",
    images: [
      // Imagen principal para MinimalistShowcase
      "https://www.pngarts.com/files/8/Ferrari-F8-Tributo-PNG-Transparent-Image.png",
      // Imágenes para ArtisticCollage
      "https://cdn.ferrari.com/cms/network/media/img/resize/5d273eaac3f9ec0af647561e-d-interior-1920x1200?width=1920&height=1080",
      "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/e9677798-7b8b-42b1-becf-387235c70b2a/bocxuw/std/488x325/e9677798-7b8b-42b1-becf-387235c70b2a?scalemode=auto",
      "data:image/jpeg;base64,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",
      // Imágenes adicionales para CarShowcase (carrusel)
      "https://hips.hearstapps.com/es.h-cdn.co/cades/contenidos/Ferrari-F8_Tributo-2020-03.jpg?crop=1.00xw:1.00xh;0,0&resize=640:*",
      "https://hips.hearstapps.com/es.h-cdn.co/cades/contenidos/58644/ferrari-f8_tributo-2020-01.jpg?resize=640:*",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl69HNV6gj9ORA8db28x1S6xQlcHi3N24We1w28qeGDKvYf8WEr4HNlDFdcl1uXW2K-a8&usqp=CAU",
      "https://cdn.xsd.cz/resize/6faca8f9c1d2337c96427a416335f71f_resize=1842,1390_.jpg?hash=9c40a1f3194285d2d47a2539eac864a2",
    ],
    description:
      "The Ferrari F8 Tributo is a celebration of Ferrari's racing heritage, featuring a twin-turbo V8 engine that delivers exceptional power and an unmistakable soundtrack. Every detail is crafted for pure driving pleasure.",
  },
  {
    id: 4,
    brand: "PEUGEOT",
    model: "208 GTI",
    year: "2024",
    price: "$28,500",
    power: "208 HP",
    acceleration: "6.7s",
    topSpeed: "143 mph",
    images: [
      // Imagen principal para MinimalistShowcase
      "https://www.peugeot.com.ar/content/dam/peugeot/argentina/b2c/our-range/nuevo-208/color-allurepk-artense.png",
      // Imágenes para ArtisticCollage
      "https://www.peugeot.com.ar/content/dam/peugeot/argentina/b2c/our-range/nuevo-208/allure12.png?imwidth=1920",
      "https://www.peugeot.com.ar/content/dam/peugeot/argentina/b2c/our-range/nuevo-208/allure2.png?imwidth=1920",
      "https://www.peugeot.com.ar/content/dam/peugeot/argentina/b2c/our-range/nuevo-208/allure3.png?imwidth=1920",
      // Imágenes adicionales para CarShowcase (carrusel)
      "https://www.peugeot.com.ar/content/dam/peugeot/argentina/b2c/our-range/nuevo-208/t200dk2.png?imwidth=1920",
      "https://www.peugeot.com.ar/content/dam/peugeot/argentina/b2c/our-range/nuevo-208/ec5dk2.png?imwidth=1920",
      "https://www.peugeot.com.ar/content/dam/peugeot/argentina/b2c/our-range/nuevo-208/excelencia1dk2.png?imwidth=1920",
      "https://www.peugeot.com.ar/content/dam/peugeot/argentina/b2c/our-range/nuevo-208/emocion1dk.png?imwidth=1920",
    ],
    description:
      "The Peugeot 208 GTI brings French flair to the hot hatch segment. With its turbocharged engine, sport-tuned suspension, and distinctive styling, it delivers an engaging driving experience that perfectly balances performance with everyday practicality.",
  },
  {
    id: 5,
    brand: "LAMBORGHINI",
    model: "HURACÁN EVO",
    year: "2024",
    price: "$248,295",
    power: "630 HP",
    acceleration: "2.9s",
    topSpeed: "202 mph",
    images: [
      // Imagen principal para MinimalistShowcase
      "https://www.nicepng.com/png/full/21-218017_sharp-aerodynamic-features-and-italian-craftsmanship-lamborghini-huracan.png",
      // Imágenes para ArtisticCollage
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/0_facelift_2025/model_details/huracan/sterrato/img_txt/Connect.jpg",
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/0_facelift_2025/model_details/huracan/sterrato/img_txt/Interior.jpg",
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/0_facelift_2025/gateway_family/huracan/Design.jpg",
      // Imágenes adicionales para CarShowcase (carrusel)
      "https://acnews.blob.core.windows.net/imgnews/paragraph/NPAZ_dc386e0ae2b04547851a1d4fb02681b0.webp",
      "https://www.qonecta.com/documents/80345/93398/Lamborghini_Huracan_Super_Trofeo_EVO2-01.jpg/97b24049-3ac5-4126-a37c-1645a96cc272",
      "https://legendy.cz/wp-content/uploads/2024/05/Lamborghini-Huracan-SuperTrofeo-EVO2-5.jpg.webp",
      "https://tn.com.ar/resizer/v2/lamborghini-huracan-sterrato-un-lambo-aventurero-FPN4TVOJ25CBPC27DNTDORCFMU.jpg?auth=41afa5c49ec1df85851035f2f789edf750e694da7afd4ab2a7b7c3d182396714&width=767",
    ],
    description:
      "The Lamborghini Huracán EVO represents the evolution of the perfect super sports car. Its naturally aspirated V10 engine delivers an intoxicating soundtrack while advanced aerodynamics and all-wheel drive ensure maximum performance and control.",
  },
  {
    id: 6,
    brand: "BMW",
    model: "M3 COMPETITION",
    year: "2024",
    price: "$73,900",
    power: "503 HP",
    acceleration: "3.8s",
    topSpeed: "180 mph",
    images: [
      // Imagen principal para MinimalistShowcase
      "https://images.dealer.com/ddc/vehicles/2025/BMW/M3/Sedan/trim_Competition_586734/perspective/side-left/2025_76.png",
      // Imágenes para ArtisticCollage
      "https://www.bmw.com.ar/content/bmw/marketLATAM/bmw_com_ar/es_AR/all-models/m-series/m3-sedan/2023/bmw-3-series-sedan-m-automobiles-overview/jcr:content/par/multicontent_f19e/tabs/multicontenttab_8838_1533206893/items/smallteaser_ed9a/image.transform/smallteaser/image.1718035424002.jpg",
      "https://www.bmw.com.ar/content/dam/bmw/common/all-models/m-series/m3-sedan/2023/highlights/bmw-3-series-cs-m-automobiles-gallery-impressions-m3-sedan-02_890.jpg/jcr:content/renditions/cq5dam.resized.img.890.medium.time1669713555891.jpg",
      "https://www.bmw.com.ar/content/dam/bmw/common/all-models/m-series/m3-sedan/2023/highlights/bmw-3-series-cs-m-automobiles-gallery-impressions-m3-sedan-04_890.jpg/jcr:content/renditions/cq5dam.resized.img.890.medium.time1669714018645.jpg",
      // Imágenes adicionales para CarShowcase (carrusel)
      "https://www.bmw.com.ar/content/dam/bmw/common/all-models/m-series/m3-sedan/2023/highlights/bmw-3-series-cs-m-automobiles-mc-product-highlights-m3-competition-hero-desktop.jpg/jcr:content/renditions/cq5dam.resized.img.1680.large.time1669709255975.jpg",
      "https://www.bmw.com.ar/content/dam/bmw/common/all-models/m-series/m3-sedan/2023/highlights/bmw-3-series-cs-m-automobiles-mc-product-highlights-m3-sedan-hero-desktop.jpg/jcr:content/renditions/cq5dam.resized.img.1680.large.time1669710409577.jpg",
      "https://www.bmw.com.ar/content/bmw/marketLATAM/bmw_com_ar/es_AR/all-models/m-series/m3-sedan/2023/bmw-3-series-sedan-m-automobiles-overview/jcr:content/par/multicontent_4ed2/tabs/multicontenttab_8838/items/smallteaser_ed9a/image.transform/smallteaser/image.1718035420541.jpg",
      "https://www.bmw.com.ar/content/dam/bmw/common/all-models/m-series/m3-sedan/2023/highlights/bmw-3-series-cs-m-automobiles-gallery-impressions-m3-sedan-03_890.jpg/jcr:content/renditions/cq5dam.resized.img.890.medium.time1669713693768.jpg",
    ],
    description:
      "The BMW M3 Competition is the ultimate expression of the sports sedan. Its twin-turbo inline-six engine, precision handling, and aggressive styling create a perfect balance between track performance and luxury comfort for the discerning driver.",
  },
]

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <motion.div
          className="text-6xl md:text-8xl font-black text-white mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          REMOCARS
        </motion.div>
        <motion.div
          className="text-xl md:text-2xl text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          CAR COLLECTION
        </motion.div>
        <div className="w-64 h-1 bg-gray-800 mx-auto">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <motion.div
          className="text-white mt-4 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  )
}

const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative h-screen bg-white overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="relative z-20 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-8xl md:text-9xl font-black text-black mb-4">REMOCARS</h1>
            <div className="w-32 h-1 bg-black mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              The best collection in my entire house, quality cars!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
              EXPLORE COLLECTION
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="h-8 w-8 text-black" />
      </motion.div>
    </section>
  )
}

const CarShowcase = ({ car, index }: { car: (typeof cars)[0]; index: number }) => {
  // Use only images 4-7 for the showcase carousel
  const showcaseImages = car.images.slice(4, 8)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % showcaseImages.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, showcaseImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % showcaseImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length)
  }

  return (
    <motion.section
      className={`min-h-screen py-20 ${index % 2 === 0 ? "bg-white" : "bg-black"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
          {/* Content */}
          <motion.div
            className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <motion.h2
                className={`text-7xl md:text-8xl font-black mb-4 ${index % 2 === 0 ? "text-black" : "text-white"}`}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {car.brand}
              </motion.h2>
              <motion.div
                className={`text-2xl md:text-3xl font-light mb-6 ${index % 2 === 0 ? "text-gray-600" : "text-gray-300"}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {car.model} {car.year}
              </motion.div>
              <motion.div
                className={`w-24 h-1 mb-8 ${index % 2 === 0 ? "bg-black" : "bg-white"}`}
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>

            {/* Specs */}
            <motion.div
              className="grid grid-cols-2 gap-6 mb-8"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className={`${index % 2 === 0 ? "text-black" : "text-white"}`}>
                <div className="flex items-center mb-2">
                  <Zap className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">POWER</span>
                </div>
                <div className="text-2xl font-bold">{car.power}</div>
              </div>
              <div className={`${index % 2 === 0 ? "text-black" : "text-white"}`}>
                <div className="flex items-center mb-2">
                  <Gauge className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">0-60 MPH</span>
                </div>
                <div className="text-2xl font-bold">{car.acceleration}</div>
              </div>
              <div className={`${index % 2 === 0 ? "text-black" : "text-white"}`}>
                <div className="flex items-center mb-2">
                  <Settings className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">TOP SPEED</span>
                </div>
                <div className="text-2xl font-bold">{car.topSpeed}</div>
              </div>
              <div className={`${index % 2 === 0 ? "text-black" : "text-white"}`}>
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">PRICE</span>
                </div>
                <div className="text-2xl font-bold">{car.price}</div>
              </div>
            </motion.div>

            <motion.p
              className={`text-lg leading-relaxed mb-8 ${index % 2 === 0 ? "text-gray-600" : "text-gray-300"}`}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {car.description}
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className={`${
                  index % 2 === 0 ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200"
                } px-8 py-4`}
              >
                VIEW DETAILS
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Images */}
          <motion.div
            className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}
            initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                className="relative h-96 mb-6 overflow-hidden rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={showcaseImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Image Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/90 text-black hover:bg-white"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={prevImage}
                    className="bg-white/90 text-black hover:bg-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={nextImage}
                    className="bg-white/90 text-black hover:bg-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-3 gap-4">
                {showcaseImages.slice(1, 4).map((image, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    className="relative h-24 overflow-hidden rounded cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentImageIndex(imgIndex + 1)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${car.brand} detail ${imgIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                  </motion.div>
                ))}
              </div>

              {/* Image Indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {showcaseImages.map((_, imgIndex) => (
                  <button
                    key={imgIndex}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentImageIndex === imgIndex
                        ? index % 2 === 0
                          ? "bg-black"
                          : "bg-white"
                        : index % 2 === 0
                          ? "bg-gray-300"
                          : "bg-gray-600"
                    }`}
                    onClick={() => setCurrentImageIndex(imgIndex)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

const StatsSection = () => {
  const stats = [
    { number: "50+", label: "LUXURY VEHICLES" },
    { number: "15", label: "YEARS EXPERIENCE" },
    { number: "1000+", label: "SATISFIED CLIENTS" },
    { number: "24/7", label: "CONCIERGE SERVICE" },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-4">BY THE NUMBERS</h2>
          <div className="w-32 h-1 bg-white mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-black text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400 font-medium tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const ContactSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-7xl font-black text-black mb-8">READY TO DRIVE?</h2>
          <div className="w-32 h-1 bg-black mx-auto mb-8" />
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Experience the pinnacle of automotive excellence. Our team of experts is ready to help you find your perfect
            match.
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-12 py-6 text-xl">
            SCHEDULE CONSULTATION
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// Update the main component return statement to include the new MinimalistShowcase:

export default function Component() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}</AnimatePresence>

      {!isLoading && (
        <main className="overflow-x-hidden">
          <HeroSection />
          {cars.map((car, index) => (
            <div key={car.id}>
              <MinimalistShowcase car={car} index={index} />
              <ArtisticCollage car={car} index={index} />
              <CarShowcase car={car} index={index} />
            </div>
          ))}
          <StatsSection />
          <ContactSection />
        </main>
      )}
    </>
  )
}
