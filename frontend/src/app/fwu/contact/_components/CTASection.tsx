import React from 'react'
import Link from 'next/link'
function CTASection() {
  return (
    <div>
          {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-blue-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-indigo-500 opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-500 opacity-10"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Incubation Center?</h2>
            <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
              Apply now to transform your innovative idea into a successful business with our expert mentorship, resources, and collaborative ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/apply"
                className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 transform"
              >
                Apply Now
              </Link>
              <Link
                href="/programs"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 transform"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CTASection