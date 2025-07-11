// components/contact/ContactInfoSection.tsx
import { Phone, Mail, Clock, MapPin, Briefcase } from 'lucide-react';

interface ContactDetails {
  phone: string;
  email: string;
  incubationEmail: string;
  address: string;
  officeHours: { day: string; hours: string }[];
}

interface ContactInfoSectionProps {
  details: ContactDetails;
}

const ContactInfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string; href?: string }> = ({ icon, label, value, href }) => (
  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-indigo-50 transition-colors group">
    <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">{label}</h4>
      {href ? (
        <a href={href} className="text-md text-gray-900 hover:text-indigo-700 transition-colors break-words font-medium">
          {value}
        </a>
      ) : (
        <p className="text-md text-gray-900 break-words">{value}</p>
      )}
    </div>
  </div>
);


const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ details }) => {
  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      </div>

      <div className="space-y-2">
        <ContactInfoItem
          icon={<MapPin size={22} />}
          label="Our Address"
          value={details.address}
        />
        <ContactInfoItem
          icon={<Phone size={22} />}
          label="Phone Number"
          value={details.phone}
          href={`tel:${details.phone.replace(/\s+/g, '')}`}
        />
        <ContactInfoItem
          icon={<Mail size={22} />}
          label="General Inquiries"
          value={details.email}
          href={`mailto:${details.email}`}
        />
        <ContactInfoItem
          icon={<Briefcase size={22} />}
          label="Incubation Center"
          value={details.incubationEmail}
          href={`mailto:${details.incubationEmail}`}
        />

        {/* Office Hours */}
        <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-indigo-50 transition-colors group">
          <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
            <Clock size={22} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">Office Hours</h4>
            <div className="space-y-1">
              {details.officeHours.map((oh, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    oh.hours.includes('Closed') ? 'bg-red-400' : 'bg-green-400'
                  }`}></div>
                  <p className="text-md text-gray-900">
                    <span className="font-medium">{oh.day}:</span> {oh.hours}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Connect With Us</h4>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;