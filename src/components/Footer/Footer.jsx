import "./Footer.css";
import { assets } from "../../assets/assets";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>بيتزا بلازا , أفضل إختيار</p>
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com/pizzaplazaeg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://wa.me/201060044426"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>فروعنا</h2>
          <div className="branches-buttons">
            <button
              className="branch-btn"
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/vip1HQhQS82rHxSy8",
                  "_blank"
                )
              }
            >
              🏪 فرع أجا الجديد
            </button>
            <button
              className="branch-btn"
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/Bz3FfNdSAmQ1ctQn9",
                  "_blank"
                )
              }
            >
              🌳 أجا أمام حديقة الطفل
            </button>
            <button
              className="branch-btn"
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/cA9eAQLe4SsiEoXv8",
                  "_blank"
                )
              }
            >
              🏢 بلازا سمنود
            </button>
          </div>
        </div>
        <div className="footer-content-right">
          <h2>تواصل معنا</h2>
          <ul>
            <li>+201060044426</li>
            <li>contact@pizzaplazaeg.com</li>
          </ul>
        </div>
      </div>
      <hr />

      <div className="footer-start-agency">
        <a
          href="https://www.facebook.com/startagencyeg"
          target="_blank"
          rel="noopener noreferrer"
          className="start-agency-link"
        >
          <img
            src={assets.start_agency_logo}
            alt="START Marketing Agency"
            className="start-agency-logo"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
