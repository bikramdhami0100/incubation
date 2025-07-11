"use client"
import { ArrowRight, MapPin, Mail, Phone, MessageSquare } from 'lucide-react';
import ContactFormSection from "../components/contact/ContactFormSection";
import ContactInfoSection from "../components/contact/ContactInfoSection";
import MapSection from "../components/contact/MapSection";
import Image from 'next/image';
// import Link from 'next/link';

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

// Information officer details
const infoOfficer = {
  name: "Santosh Bist",
  phone: "9858751161",
  email: "santosh.bist@fwu.edu.np",
  photoUrl: "https://fwu.edu.np/assets/uploads/employee-photo/photo-1624353722-sms.jpg"
};

export default function ContactPage() {
  return (
    <main className="bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100 rounded-full opacity-30 blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full opacity-30 blur-3xl translate-x-1/4 translate-y-1/4"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#4338ca 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      {/* Page Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white overflow-hidden">
        {/* Hero background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-500 opacity-10 animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-500 opacity-10 animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-purple-500 opacity-5 animate-pulse"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 p-2 bg-indigo-800/30 rounded-full">
              <div className="px-4 py-1 bg-indigo-700/50 rounded-full">
                <span className="text-indigo-100 font-medium">FWU Incubation Center</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Touch</span>
            </h1>

            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              We&apos;re here to help and answer any questions you might have about the FWU Incubation Center.
              Connect with us to learn more about our programs and opportunities.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Phone className="text-blue-300 mr-2" />
                <span className="text-white text-sm">{contactDetails.phone}</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Mail className="text-blue-300 mr-2" />
                <span className="text-white text-sm">{contactDetails.email}</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="text-blue-300 mr-2" />
                <span className="text-white text-sm">Mahendranagar, Kanchanpur</span>
              </div>
            </div>

            <a
              href="#contact-form"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 transform"
            >
              Send Message <ArrowRight className="ml-2" />
            </a>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>


      {/* Main Contact Section */}
      <section id="contact-form" className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about our incubation programs or want to learn more? Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid  lg:grid-cols-2 justify-center gap-2 items-start">
            {/* Left Column: Contact Form */}
            <div className="space-y-12 mb-12 md:mb-0">
              <ContactFormSection />
              {/* Map Section */}

            <MapSection embedUrl={contactDetails.mapEmbedUrl} address={contactDetails.address} />              
            </div>
            {/* Right Column: Contact Info & Map */}
            <div className="space-y-12">
              <ContactInfoSection details={contactDetails} />
              {/* Information Officer Card */}
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Information Officer</h3>
                <div className="flex items-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden mr-6 border-2 border-indigo-100">
                    <Image
                      src={infoOfficer.photoUrl}
                      alt={infoOfficer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{infoOfficer.name}</h4>
                    <p className="text-gray-600 mb-2">Information Officer</p>
                    <div className="flex items-center text-indigo-600 mb-1">
                      <Phone className="mr-2 text-sm" />
                      <a href={`tel:${infoOfficer.phone}`} className="hover:text-indigo-800 transition-colors">
                        {infoOfficer.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-indigo-600">
                      <Mail className="mr-2 text-sm" />
                      <a href={`mailto:${infoOfficer.email}`} className="hover:text-indigo-800 transition-colors">
                        {infoOfficer.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    
    </main>
  );
}