import React from "react";
import { motion } from "framer-motion";


const AnimatedSection = () => {
    const reasons = [
        { icon: "📚", title: "Curated Selection", description: "Handpicked books across genres, from classics to bestsellers." },
        { icon: "⚡", title: "Fast Delivery", description: "Swift and reliable delivery to your doorstep." },
        { icon: "💰", title: "Affordable Prices", description: "Special discounts and competitive pricing." },
        { icon: "🌍", title: "Easy Ordering", description: "Simple online browsing and checkout process." },
        { icon: "🤝", title: "Personalized Experience", description: "Tailored recommendations and dedicated support." },
    ];
    return (
        <section className="bg-white py-16 px-6 md:px-16">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto text-center mb-12"
            >
                <h2 className="text-4xl font-bold mb-4">Why Choose Book Courier?</h2>
                <p className="text-gray-600 text-lg">
                    Delivering joy, knowledge, and convenience right to your doorstep.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reasons.map((reason, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.2 }}
                        className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="text-4xl mb-4">{reason.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                        <p className="text-gray-700">{reason.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AnimatedSection;