import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Footer = () => {
  const { i18n, t } = useTranslation(["common", "home"]);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length < 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div>
      <div className="max-w-md mx-auto pt-12 px-4 sm:max-w-7xl sm:px-6 lg:pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-3">
              <img
                className=" h-14 w-auto mr-2"
                src="logo.png"
                alt="Electro Poll Logo"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              {t("home:easyPolls-title")}
            </p>
            <div className="flex space-x-6">
                          <a className="text-blue-600 text-2xl" href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
                       <FaFacebook title="Facebook"></FaFacebook>
                    </a>
                     <a className="text-red-600 text-2xl" href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
                      <FaInstagram title="Instagram"></FaInstagram>
                  </a>
               <a className="text-blue-700 text-2xl" href="https://www.linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer">
  <FaLinkedin title="LinkedIn"></FaLinkedin>
  </a>
                <a className="text-blue-400 text-2xl" href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
  <FaTwitter title="Twitter"></FaTwitter>
  </a>
            </div>

            <div className="flex space-x-2 items-center">
              <svg
                id="languageSelectorIcon"
                className="h-8 w-8 text-gray-600 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                ></path>
              </svg>

              <select
                className="nav-link bg-dark border-0 ml-1 mr-2"
                value={localStorage.getItem("i18nextLng")}
                onChange={handleLanguageChange}
              >
                <option value="en">English</option>

                <option value="bn">বাংলা</option>
              </select>
            </div>
          </div>
          <div className=" mt-32 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
                {t("common:Company")}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      className="text-base text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300"
                      to="/about-us"
                    >
                    {t("common:About")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-base text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300"
                      to="/support"
                    >
                      {t("common:Support")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-base text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300"
                      to="/services"
                    >
               {t("common:Services")}
                    </Link>
                  </li>
                </ul>
              </div>
             
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
                {t("common:ImportantLinks")}
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link  className="text-base text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300" to="/">
                    {t("common:Home")}

                      
                      </Link>
                  </li>
                  <li>
                    <Link  className="text-base text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300" to="/about">
                    {t("common:About")}

                      </Link>
                  </li>
                  <li>
                    <Link  className="text-base text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300" to="/services">
                    {t("common:Services")}
                    </Link>
                  </li>
                  <li>
                    <Link  className="text-base text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300" to="/contact">
                    {t("common:Contact")}
                    </Link>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-300 dark:border-gray-600 py-8">
          <p className="text-base text-gray-600 dark:text-gray-400 xl:text-center">
            {t("common:Copyright")}

          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
