import {
  FaChevronDown,
  FaGithub,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";
import { CiCalendar, CiLocationOn, CiMail } from "react-icons/ci";
import OnlineStatus from "../online-status/OnlineStatus";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioData } from "../../../types";

type SidebarProps = {
  data: PortfolioData | null;
  showContacts: boolean;
  onToggleContacts: () => void;
};

const iconBoxClassName =
  "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-accent shadow-soft backdrop-blur-md bg-glass-bg";

export default function Sidebar({
  data,
  showContacts,
  onToggleContacts,
}: SidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`w-full lg:w-75 transition-all duration-400 overflow-hidden backdrop-blur-md p-4 bg-glass-bg rounded-xl2 shadow-soft lg:sticky lg:top-4 lg:p-5 ${
        showContacts
          ? "max-h-125 md:max-h-150 lg:max-h-135"
          : "max-h-29 md:max-h-40"
      }`}
    >
      <div className="flex items-center gap-4 relative lg:flex-col lg:justify-center">
        <motion.figure
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl2 backdrop-blur-md bg-glass-bg w-20 h-20 shrink-0 md:w-30 md:h-30 transition-all duration-300"
        >
          {data?.about?.image ? (
            <img
              src={data.about.image}
              alt="avatar"
              className="w-20 h-20 rounded-xl2 object-cover md:w-30 md:h-30 transition-all duration-300"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl2 animate-pulse md:w-30 md:h-30 transition-all duration-300"></div>
          )}
          <div className="absolute -bottom-1 -right-1">
            <OnlineStatus />
          </div>
        </motion.figure>

        <div className="lg:flex lg:flex-col lg:justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-medium md:text-2xl transition-all duration-300"
          >
            {data?.about?.name || "Loading..."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-xs px-3 py-1 mt-1 rounded-lg backdrop-blur-md p-4 bg-glass-bg text-white2 w-fit md:text-sm md:mt-3 transition-all duration-300 lg:mx-auto"
          >
            {data?.about?.tag || "Loading..."}
          </motion.p>
        </div>

        <button
          onClick={onToggleContacts}
          className="absolute -top-4 -right-4 p-3 rounded-tr-xl2 rounded-bl-xl2 backdrop-blur-md bg-glass-bg text-accent shadow-soft hover:opacity-80 transition lg:hidden"
        >
          <motion.div
            animate={{ rotate: showContacts ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden block"
          >
            <FaChevronDown size={12} />
          </motion.div>

          <span className="absolute opacity-0 md:opacity-100 transition-opacity duration-500 md:static">
            Show Contacts
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showContacts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="w-full h-px bg-jet my-4"></div>

            <ul className="flex space-y-4 md:flex-wrap md:flex-row flex-col lg:flex-col">
              <li className="flex items-center gap-4 md:w-1/2 lg:w-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={iconBoxClassName}
                >
                  <CiMail className="md:size-6" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray70 uppercase">Email</p>
                  <a className="text-sm">{data?.about?.social?.email}</a>
                </div>
              </li>

              <li className="flex items-center gap-4 md:w-1/2 lg:w-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={iconBoxClassName}
                >
                  <IoPhonePortraitOutline className="md:size-6" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray70 uppercase">Phone</p>
                  <a className="text-sm">{data?.about?.social?.phone}</a>
                </div>
              </li>

              <li className="flex items-center gap-4 md:w-1/2 lg:w-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={iconBoxClassName}
                >
                  <CiCalendar className="md:size-6" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray70 uppercase">Experience</p>
                  <time className="text-sm">
                    {data?.about?.social?.experience}
                  </time>
                </div>
              </li>

              <li className="flex items-center gap-4 md:w-1/2 lg:w-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={iconBoxClassName}
                >
                  <CiLocationOn className="md:size-6" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray70 uppercase">Location</p>
                  <address className="text-sm not-italic">
                    {data?.about?.social?.location}
                  </address>
                </div>
              </li>
            </ul>

            <div className="w-full h-px bg-jet my-4 lg:w-0 transition-all ease-in-out delay-300"></div>

            <ul className="flex gap-4 pl-1 items-center lg:justify-center">
              <li>
                <motion.a
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray70 text-lg hover:text-white2 transition"
                  href={data?.about?.social?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="md:size-5" />
                </motion.a>
              </li>

              <li>
                <motion.a
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray70 text-lg hover:text-pink-500 transition"
                  href={data?.about?.social?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="md:size-5" />
                </motion.a>
              </li>

              <li>
                <motion.a
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray70 text-lg hover:text-blue-400 transition"
                  href={data?.about?.social?.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegram className="md:size-5" />
                </motion.a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
