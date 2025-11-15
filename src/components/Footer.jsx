import React from 'react';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-[#0D1821] text-white p-4">
        <aside>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by techGeeks App.</p>
        </aside>
        </footer>
    );
};

export default Footer;