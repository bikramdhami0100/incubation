// components/contact/ContactFormSection.tsx
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
// Assuming FormField is in a shared location or copy it here if it's specific
// For this example, let's assume a simplified FormField or define inputs directly.

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactFormSection = () => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setSubmissionStatus('submitting');
    console.log("Contact Form Data:", data);

    // --- SIMULATE API CALL ---
    // await new Promise(resolve => setTimeout(resolve, 1500));
    // if (Math.random() > 0.2) { // Simulate success
      // setSubmissionStatus('success');
      // reset();
    // } else { // Simulate error
    //   setSubmissionStatus('error');
    // }
    // --- END SIMULATION ---
    // console.log(first)

      try {
         const response=(await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`,data)).data;

         if(response.success){
           setSubmissionStatus('success');
      reset();
         }
      } catch (error) {
        console.log(error);
        setSubmissionStatus(error ? 'error' : 'success');
      }
  };

  if (submissionStatus === 'success') {
    return (
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl text-center border border-gray-100">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-500 text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Thank you for contacting the FWU Incubation Center. We&apos;ve received your message and will get back to you as soon as possible.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500 mb-2">
            You will receive a confirmation email shortly.
          </p>
          <button
            onClick={() => setSubmissionStatus('idle')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 transform"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:shadow-indigo-100/20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-3 pl-10 border-2 ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
              } rounded-lg ${
                errors.name ? 'focus:ring-red-200' : 'focus:ring-indigo-100'
              } focus:ring-4 outline-none transition-all`}
              placeholder="e.g., Rajesh Sharma"
              {...register("name", { required: "Full name is required." })}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${errors.name ? 'text-red-400' : 'text-indigo-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          {errors.name && (
            <div className="mt-2 flex items-start text-sm text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errors.name.message}</span>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-3 pl-10 border-2 ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
              } rounded-lg ${
                errors.email ? 'focus:ring-red-200' : 'focus:ring-indigo-100'
              } focus:ring-4 outline-none transition-all`}
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address.",
                },
              })}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${errors.email ? 'text-red-400' : 'text-indigo-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          {errors.email && (
            <div className="mt-2 flex items-start text-sm text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errors.email.message}</span>
            </div>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Your Message <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              rows={6}
              className={`w-full px-4 py-3 border-2 ${
                errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-indigo-300'
              } rounded-lg ${
                errors.message ? 'focus:ring-red-200' : 'focus:ring-indigo-100'
              } focus:ring-4 outline-none transition-all`}
              placeholder="Write your message here... Please include details about your inquiry or how we can help you."
              {...register("message", {
                required: "Message is required.",
                minLength: { value: 10, message: "Message must be at least 10 characters." }
              })}
            />
          </div>
          {errors.message && (
            <div className="mt-2 flex items-start text-sm text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errors.message.message}</span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {submissionStatus === 'error' && (
          <div className="flex items-center p-5 text-sm text-red-700 bg-red-100 rounded-xl border border-red-200" role="alert">
            <AlertCircle className="text-xl mr-3 text-red-500" />
            <div>
              <p className="font-bold">Message Not Sent</p>
              <p>There was an error sending your message. Please try again or contact us directly.</p>
            </div>
          </div>
        )}

        {/* Privacy Policy */}
        <div className="text-sm text-gray-500">
          <p>
            By submitting this form, you agree to our <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a> and consent to being contacted regarding your inquiry.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex cursor-pointer justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Message...
            </>
          ) : (
            <>
              <Send className="mr-2" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactFormSection;