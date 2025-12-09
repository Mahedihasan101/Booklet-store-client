import React from 'react';
import { Facebook, Instagram, Linkedin, Github } from "lucide-react";
import { SiX } from "react-icons/si"; // X (Twitter new logo)

const Footer = () => {
    return (
        <footer className="bg-green-700 text-white mt-10 pt-10 pb-6">
            <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li className="cursor-pointer hover:text-gray-300">Home</li>
                        <li className="cursor-pointer hover:text-gray-300">Books</li>
                        <li className="cursor-pointer hover:text-gray-300">Dashboard</li>
                        <li className="cursor-pointer hover:text-gray-300">Login / Register</li>
                    </ul>
                </div>


                {/* Contact Details */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Contact</h2>
                    <p className="text-sm">📍 Dhaka, Bangladesh</p>
                    <p className="text-sm">📞 +880 1234-567890</p>
                    <p className="text-sm">📧 support@bookly.com</p>
                </div>


                {/* Social Icons */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Follow Us</h2>


                    <div className="flex items-center gap-4 mt-2">
                        <a href="#" className="hover:text-gray-300"><SiX size={22} /></a>
                        <a href="#" className="hover:text-gray-300"><Facebook size={22} /></a>
                        <a href="#" className="hover:text-gray-300"><Instagram size={22} /></a>
                        <a href="#" className="hover:text-gray-300"><Linkedin size={22} /></a>
                        <a href="#" className="hover:text-gray-300"><Github size={22} /></a>
                    </div>
                </div>
            </div>


            {/* Copyright */}
            <div className="text-center text-sm mt-8 border-t border-white/30 pt-4">
                © {new Date().getFullYear()} Bookly — All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;