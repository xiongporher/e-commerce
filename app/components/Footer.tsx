import {
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-lg font-semibold mb-2">ກ່ຽວກັບລະບົບ POS</h3>
          <p>
            ລະບົບ Point of Sale ສໍາລັບຮ້ານຄ້າ ທີ່ອອກແບບມາເພື່ອສະດວກໃນການຂາຍ,
            ບັນທຶກຂໍ້ມູນ ແລະລາຍງານຍອດຂາຍ.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">ຕິດຕໍ່</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" />
              ບ້ານທົ່ງກາງ, ນະຄອນຫຼວງວຽງຈັນ
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-400" />
              02056006722
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-400" />
              xiongporher1.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">ຕິດຕາມພວກເຮົາ</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaFacebook className="text-blue-500" />
              <a
                href="https://facebook.com"
                target="_blank"
                className="hover:underline"
              >
                Facebook
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaYoutube className="text-red-500" />
              <a
                href="https://youtube.com"
                target="_blank"
                className="hover:underline"
              >
                YouTube
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaTiktok className="text-white" />
              <a
                href="https://tiktok.com"
                target="_blank"
                className="hover:underline"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-xs border-t border-gray-700 pt-4">
        © 2025 ລະບົບ POS ລາວ. ສິດທິທັງໝົດຖືກສະຫງວນ.
      </div>
    </footer>
  );
};

export default Footer;
