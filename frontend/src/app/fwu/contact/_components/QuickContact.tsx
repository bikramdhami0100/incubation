"use client"
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';
import React from 'react';
// Updated data for contact info based on FWU website
const contactDetails = {
  phone: '+977-099-520729',
  email: 'info@fwu.edu.np',
  incubationEmail: 'incubation@fwu.edu.np',
  address: 'FWU line, Campus Rd, Bhimdatta 10400',
  officeHours: [
    { day: 'Sunday - Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 1:00 PM' },
    { day: 'Saturday', hours: 'Closed' },
  ],
mapEmbedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.073374165811!2d80.17771069999999!3d28.95554810000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a1ad7bf92b64bb%3A0x869ed4d319273a66!2sFar-Western%20University!5e0!3m2!1sen!2snp!4v1751455005658!5m2!1sen!2snp"

};




function QuickContact() {
  return (
    <div>
        <section className="py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20 group">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
                <MapPin className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
              <p className="text-gray-600 mb-4">
                {contactDetails.address}
              </p>
              <a
                href="https://maps.app.goo.gl/Ehu1U2FZzjRUsGEB6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors group"
              >
                Get Directions <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20 group">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
                <Phone className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Have questions? Call us directly at:
              </p>
              <a
                href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
                className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors block mb-4"
              >
                {contactDetails.phone}
              </a>
              <p className="text-sm text-gray-500">
                Available during office hours
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20 group">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
                <Mail className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">
                For general inquiries:
              </p>
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-indigo-600 hover:text-indigo-800 transition-colors block mb-4 font-medium"
              >
                {contactDetails.email}
              </a>
              <p className="text-gray-600 mb-2">
                For incubation center:
              </p>
              <a
                href={`mailto:${contactDetails.incubationEmail}`}
                className="text-indigo-600 hover:text-indigo-800 transition-colors block font-medium"
              >
                {contactDetails.incubationEmail}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default QuickContact