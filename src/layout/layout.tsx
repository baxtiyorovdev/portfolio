import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  FaChevronDown,
  FaGithub,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";
import { CiMail, CiCalendar, CiLocationOn } from "react-icons/ci";
import { IoPhonePortraitOutline } from "react-icons/io5";
import type { PortfolioData } from "../types";
export default function MainLayout() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [showContacts, setShowContacts] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [stuck, setStuck] = useState(false);
  const location = useLocation();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top;
      setStuck(top <= 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth > 1024 && !showContacts) {
        setShowContacts(true);
      }
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, [showContacts]);
  useEffect(() => {
    fetch("/api/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const iconBox =
    "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-accent shadow-soft backdrop-blur-md bg-glass-bg";
  return (
    <div className="max-w-6xl mx-auto px-10 py-16 flex gap-6 min-h-screen flex-col lg:flex-row text-white2">
      {" "}
      {/* SIDEBAR */}{" "}
      <aside
        className={`w-full lg:w-75 transition-all duration-400 overflow-hidden backdrop-blur-md p-4 bg-glass-bg border border-jet rounded-xl2 shadow-soft lg:sticky lg:top-4 lg:p-5 ${showContacts ? "max-h-125 md:max-h-150 lg:max-h-135" : "max-h-29 md:max-h-40"}`}
      >
        {" "}
        {/* HEADER */}{" "}
        <div className="flex items-center gap-4 relative lg:flex-col lg:justify-center">
          {" "}
          <figure className="rounded-xl2 backdrop-blur-md bg-glass-bg w-20 h-20 shrink-0 md:w-30 md:h-30 transition-all duration-300">
            {" "}
            {data?.about?.image ? (
              <img
                src={data?.about?.image}
                alt="avatar"
                className="w-20 h-20 rounded-xl2 object-cover md:w-30 md:h-30 transition-all duration-300"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl2 animate-pulse md:w-30 md:h-30 transition-all duration-300"></div>
            )}{" "}
          </figure>{" "}
          <div className="lg:flex lg:flex-col lg:justify-center">
            {" "}
            <h1 className="text-lg font-medium md:text-2xl transition-all duration-300">
              {" "}
              {data?.about?.name || "Loading..."}{" "}
            </h1>{" "}
            <p className="text-xs px-3 py-1 mt-1 rounded-lg backdrop-blur-md p-4 bg-glass-bg text-white2 w-fit md:text-sm md:mt-3 transition-all duration-300 lg:mx-auto">
              {" "}
              {data?.about?.tag || "Loading..."}{" "}
            </p>{" "}
          </div>{" "}
          <button
            onClick={() => setShowContacts(!showContacts)}
            className="absolute -top-4 -right-4 p-3 rounded-tr-xl2 rounded-bl-xl2 backdrop-blur-md bg-glass-bg text-accent shadow-soft hover:opacity-80 transition lg:hidden"
          >
            {" "}
            <FaChevronDown
              className={`transition-transform ${showContacts ? "rotate-180" : ""} md:hidden block transition-all duration-300`}
              size={12}
            />{" "}
            <span className="absolute opacity-0 md:opacity-100 transition-opacity duration-500 md:static">
              {" "}
              Show Contacts{" "}
            </span>{" "}
          </button>{" "}
        </div>{" "}
        {/* CONTENT */}{" "}
        <div
          className={`transition-all duration-300 ease-in-out ${showContacts ? "opacity-100 mt-4" : "opacity-0 h-0 overflow-hidden"}`}
        >
          {" "}
          <div className="w-full h-px bg-jet my-4"></div> {/* CONTACTS */}{" "}
          <ul className="flex space-y-4 md:flex-wrap md:flex-row flex-col lg:flex-col">
            {" "}
            <li className="flex items-center gap-4 md:w-1/2 lg:w-full">
              {" "}
              <div className={iconBox}>
                {" "}
                <CiMail className="md:size-6" />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-xs text-gray70 uppercase">Email</p>{" "}
                <a className="text-sm">{data?.about?.social?.email}</a>{" "}
              </div>{" "}
            </li>{" "}
            <li className="flex items-center gap-4 md:w-1/2 lg:w-full">
              {" "}
              <div className={iconBox}>
                {" "}
                <IoPhonePortraitOutline className="md:size-6" />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-xs text-gray70 uppercase">Phone</p>{" "}
                <a className="text-sm">{data?.about?.social?.phone}</a>{" "}
              </div>{" "}
            </li>{" "}
            <li className="flex items-center gap-4 md:w-1/2 lg:w-full">
              {" "}
              <div className={iconBox}>
                {" "}
                <CiCalendar className="md:size-6" />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-xs text-gray70 uppercase">Birthday</p>{" "}
                <time className="text-sm">
                  {data?.about?.social?.birthday}
                </time>{" "}
              </div>{" "}
            </li>{" "}
            <li className="flex items-center gap-4 md:w-1/2 lg:w-full">
              {" "}
              <div className={iconBox}>
                {" "}
                <CiLocationOn className="md:size-6" />{" "}
              </div>
              <div>
                {" "}
                <p className="text-xs text-gray70 uppercase">Location</p>
                <address className="text-sm not-italic">
                  {data?.about?.social?.location}
                </address>
              </div>{" "}
            </li>{" "}
          </ul>{" "}
          <div className="w-full h-px bg-jet my-4 lg:w-0 transition-all ease-in-out delay-300"></div>{" "}
          {/* SOCIAL */}{" "}
          <ul className="flex gap-4 pl-1 items-center lg:justify-center">
            {" "}
            <li>
              {" "}
              <a
                className="text-gray70 text-lg hover:text-white2 transition"
                href={data?.about?.social?.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaGithub className="md:size-5" />{" "}
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a
                className="text-gray70 text-lg hover:text-pink-500 transition"
                href={data?.about?.social?.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaInstagram className="md:size-5" />{" "}
              </a>{" "}
            </li>{" "}
            <li>
              {" "}
              <a
                className="text-gray70 text-lg hover:text-blue-400 transition"
                href={data?.about?.social?.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaTelegram className="md:size-5" />{" "}
              </a>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
      </aside>{" "}
      {/* MAIN CONTENT */}{" "}
      <section className="flex-1 flex flex-col gap-6 lg:relative">
        {" "}
        <nav
          ref={ref}
          className={`lg:rounded-2xl ${stuck ? "lg:rounded-tl-none lg:rounded-tr-none" : ""} lg:sticky lg:top-0 w-full bottom-0 flex items-center justify-between left-0 backdrop-blur-md p-4 bg-glass-bg border border-jet text-center lg:h-fit fixed rounded-tl-xl rounded-tr-xl shadow-soft text-sm md:text-base transition-all duration-300 ease-in-out md:px-15 z-1000`}
        >
          {" "}
          <Link
            to="/"
            className={`hover:text-accent transition-colors duration-300 ease-in-out ${location.pathname === "/" ? "text-accent" : ""}`}
          >
            {" "}
            About{" "}
          </Link>{" "}
          <Link
            to="/resume"
            className={`hover:text-accent transition-colors duration-300 ease-in-out ${location.pathname === "/resume" ? "text-accent" : ""}`}
          >
            {" "}
            Resume{" "}
          </Link>{" "}
          <Link
            to="/projects"
            className={`hover:text-accent transition-colors duration-300 ease-in-out ${location.pathname === "/projects" ? "text-accent" : ""}`}
          >
            {" "}
            Projects{" "}
          </Link>{" "}
          <Link
            to="/contact"
            className={`hover:text-accent transition-colors duration-300 ease-in-out ${location.pathname === "/contact" ? "text-accent" : ""}`}
          >
            {" "}
            Contact{" "}
          </Link>{" "}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 px-3 py-1 rounded-lg  backdrop-blur-md p-4 bg-glass-bg text-xs hover:opacity-80 hover:text-accent transition-colors duration-300 ease-in-out md:text-sm hover:cursor-pointer"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>{" "}
        <section className="min-h-1025 backdrop-blur-md bg-glass-bg z-10 border border-jet rounded-xl2 p-6 shadow-card">
          {" "}
          <h1>Main Content</h1>{" "}
          <p>
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis quae
            aliquid dicta perspiciatis quos cupiditate unde! Unde numquam
            consequatur odio facere cupiditate, recusandae ex? Aperiam hic, ea
            recusandae laudantium, adipisci optio accusamus quas non modi saepe,
            doloribus similique veritatis alias debitis est. Sit nesciunt modi
            repellat facere voluptate ex eligendi atque nostrum temporibus
            fugiat. Quidem libero repudiandae nam et vel veritatis soluta
            quisquam facilis debitis laudantium! Suscipit blanditiis voluptas
            amet placeat, ipsa nesciunt ut? Saepe quo, sunt suscipit qui numquam
            fugiat aliquid in repellat nam vero quam earum. Voluptates fugit
            nemo placeat quis autem atque amet totam numquam officia nulla error
            cumque perferendis omnis exercitationem aliquid, fuga animi
            voluptatem soluta quas quo molestiae incidunt saepe. Labore
            voluptates dolorem fuga, totam enim dolor asperiores perferendis
            voluptatem quae, iste praesentium reiciendis obcaecati suscipit
            officiis dolores autem, optio quod fugiat doloribus. Neque, eius
            amet doloribus ratione nulla laudantium in fugiat sed deserunt
            nesciunt praesentium id repudiandae suscipit et animi quae
            necessitatibus vitae. Similique id ratione quis dignissimos numquam
            sapiente, maiores quae illum praesentium blanditiis minus corrupti
            beatae ipsam quos consequatur iste tempore ducimus corporis
            cupiditate dolorum laboriosam doloremque. Aspernatur hic veritatis
            enim! Error, enim, eveniet provident hic saepe iure distinctio
            repudiandae inventore doloremque, nesciunt pariatur exercitationem
            accusantium voluptatibus tempore tenetur repellendus! Ut laudantium
            odio voluptatibus pariatur architecto soluta iusto optio laboriosam
            debitis dolores distinctio iure, nulla sequi deleniti ad nam nostrum
            totam, consectetur magni. Doloremque exercitationem magni
            necessitatibus illo, aut sit nihil dicta fuga aperiam vitae placeat
            reprehenderit maxime earum aliquam dolorum dignissimos architecto
            natus esse, iusto fugiat. Cumque corporis sunt illo. Rerum
            asperiores repellendus recusandae reiciendis consectetur odit ipsam
            quisquam sit, laudantium et. Ut, itaque accusamus explicabo officiis
            excepturi ipsam porro ullam, illo iusto mollitia molestias beatae
            distinctio ipsum, molestiae voluptate iure! Voluptate similique
            nulla debitis. Labore laudantium delectus quasi hic natus ratione
            exercitationem aliquid? Nemo eaque, quos, ipsum hic laborum tenetur
            odio, autem nostrum fuga earum esse quas tempora! Ipsam voluptatum
            repudiandae, ex rem distinctio quo velit voluptates corrupti cum
            molestias quasi iste doloremque vitae vel, temporibus dolorem?
            Praesentium ratione debitis, sunt aut cumque laborum natus aperiam
            eligendi, quasi quo eius non saepe dignissimos labore in culpa atque
            nostrum. Nostrum aperiam autem saepe, quam odit nihil sint ea id ad
            sed veritatis laudantium provident maiores aspernatur voluptatibus
            quo, iusto temporibus, doloremque deserunt laborum. Consequatur
            fugit sint eum, nostrum culpa cum velit repellendus commodi fugiat
            nam modi laborum, ut ullam soluta dicta?{" "}
          </p>{" "}
        </section>{" "}
      </section>{" "}
      {/* EFFECTS */}{" "}
      <div className="blob lg:left-1/10 lg:top-1/6 md:left-0 md:top-0 top-0 bottom-0 left-2/6 transition-all duration-1000" />{" "}
      <div className="blob lg:left-3/5 lg:top-3/6 md:left-100 md:top-100 top-1 bottom-3 left-1/7 transition-all duration-1000" />{" "}
    </div>
  );
}
