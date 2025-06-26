import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const menuItems = [
  { src: "/img/1.jpeg", title: "ຕຳໝາກຮຸ່ງ" },
  { src: "/img/2.jpg", title: "ປິ້ງໄກ່" },
  { src: "/img/3.jpg", title: "ເຝີຫຼວງພຣະບາງ" },
  { src: "/img/5.jpg", title: "ເຂົ້າປຽກ" },
  { src: "/img/6.jpg", title: "ເຂົ້າຊອຍ" },
  { src: "/img/7.jpeg", title: "ລາບໄກ່" },
  { src: "/img/8.jpg", title: "ເຂົ້າຜັດ" },
  { src: "/img/9.jpg", title: "ແກງປ່າ" },
  { src: "/img/10.jpg", title: "ກຸ້ງທອດ" },
  { src: "/img/11.jpg", title: "ແກງໜອກໄມ້" },
];

const MenuFood = () => {
  return (
    <div className="p-4">
      <motion.h1
        className="text-3xl font-bold text-center text-shadow-lg/20 mb-8 text-blue-700"
        whileHover={{
          scale: 1.1,
          rotate: -2,
          color: "#2563eb",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        ອາຫານທ້ອງຖິ່ນແຊບໆ
      </motion.h1>
      <div className="text-xl font-bold text-center text-blue-400 m-5">
        <Typewriter
          options={{
            strings: [
              "ສະບາຍດີ!",
              "ຍິນດີຕ້ອນຮັບ!",
              "ອາຫານລາວແມ່ນການສະທ້ອນພິເສດເຖິງວັດທະນະທຳ ແລະ ວິຖີຊີວິດຂອງປະຊາຊົນລາວ...",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 2,
            delay: 3,
          }}
        />
      </div>

      <Marquee pauseOnHover={true} gradient={true} speed={60}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative w-60 h-60 mx-4 rounded-lg shadow-lg overflow-hidden group hover:cursor-pointer"
          >
            <Image
              src={item.src}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="opacity-85 hover:opacity-300 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 text-sm font-semibold backdrop-blur-sm">
              {item.title}
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MenuFood;
