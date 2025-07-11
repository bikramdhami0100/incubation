"use client";
import { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Path,
  FieldError,
  useFieldArray,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import {
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Trash2,
  Camera,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

// Define the structure of your form data
interface FormValues {
  applicantName: string;
  email: string;
  phone: string;
  photo: FileList | undefined; // FileList is the type for file inputs
  teamMembers: {
    name: string;
    email: string;
    phone: string;
    photo: FileList | undefined;
  }[];
  application_title: string;
  application_description: string;
}

// FormField component props interface - FIXED
interface FormFieldProps {
  type: string;
  name: Path<FormValues>; // Ensure name is a valid path in FormValues
  label: string;
  // Type for register function from react-hook-form - FIXED
  register: UseFormRegister<FormValues>;
  error?: FieldError; // Type for error object
  placeholder?: string;
  as?: "input" | "textarea"; // Restrict 'as' to valid HTML elements
  rows?: number;
  accept?: string;
  rules?: RegisterOptions<FormValues, Path<FormValues>>; // ADDED rules prop for validation
}

const FormField = ({
  type,
  name,
  label,
  register,
  error,
  placeholder,
  as = "input",
  rows = 3,
  accept,
  rules, // Destructure rules prop
}: FormFieldProps) => {
  const inputClasses = `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
    error
      ? "border-red-400 bg-red-50"
      : "border-gray-300 bg-white hover:border-gray-400"
  }`;

  // Determine if field is required based on rules. This controls the '*' display.
  const isRequired = !!rules?.required;

  return (
    <div className="mb-6">
      <label
        htmlFor={String(name)}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={String(name)}
          rows={rows}
          className={inputClasses}
          placeholder={placeholder}
          {...register(name, rules)} // Pass rules to register
        />
      ) : (
        <input
          id={String(name)}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          accept={accept}
          {...register(name, rules)} // Pass rules to register
        />
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

// PhotoUpload component props interface - FIXED
interface PhotoUploadProps {
  name: Path<FormValues>; // Ensure name is a valid path in FormValues
  label: string;
  // Type for register function from react-hook-form - FIXED
  register: UseFormRegister<FormValues>;
  error?: FieldError; // Type for error object
  currentPhoto: string | null; // currentPhoto is the file name string for display
  rules?: RegisterOptions<FormValues, Path<FormValues>>; // ADDED rules prop for validation
}

const PhotoUpload = ({
  name,
  label,
  register,
  error,
  currentPhoto,
  rules, // Destructure rules prop
}: PhotoUploadProps) => {
  // Determine if field is required based on rules. This controls the '*' display.
  const isRequired = !!rules?.required;

  return (
    <div className="mb-6">
      <label
        htmlFor={String(name)}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`relative mt-1 flex justify-center px-6 pt-6 pb-6 border-2 ${
          error ? "border-red-400 bg-red-50" : "border-gray-300 bg-gray-50"
        } border-dashed rounded-lg hover:bg-gray-100 transition-colors cursor-pointer`}
      >
        <div className="space-y-2 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Camera className="h-6 w-6" />
          </div>
          <div className="flex flex-col text-sm text-gray-600">
            <label
              htmlFor={String(name)} // Convert Path to string for htmlFor
              className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-700"
            >
              <span>Upload photo</span>
              <input
                id={String(name)} // Convert Path to string for id
                type="file"
                className="sr-only"
                accept="image/*"
                {...register(name, rules)} // Pass rules to register
              />
            </label>
            <p className="text-gray-500">PNG, JPG up to 2MB</p>
          </div>
        </div>
      </div>
      {currentPhoto && (
        <div className="mt-3 flex items-center text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Selected: <span className="font-medium ml-1">{currentPhoto}</span>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

const ApplicationForm = () => {

  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [applicantPhotoName, setApplicantPhotoName] = useState<string | null>(
    null
  );
  const [teamPhotos, setTeamPhotos] = useState<{ [key: number]: string }>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    control, // Added control for useFieldArray
  } = useForm<FormValues>({
    defaultValues: {
      applicantName: "",
      email: "",
      phone: "",
      photo: undefined, // Default for FileList can be undefined
      teamMembers: [{ name: "", email: "", phone: "", photo: undefined }], // Default for FileList can be undefined
      application_title: "",
      application_description: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldUnregister: false,
    shouldFocusError: true,
  });

  // useFieldArray hook to manage dynamic team members
  const { fields, append, remove } = useFieldArray({
    control, // Pass control from useForm
    name: "teamMembers", // Specify the array field name
  });

  // Watch applicant photo and update display name
  const applicantPhoto = watch("photo");
  useEffect(() => {
    if (applicantPhoto && applicantPhoto.length > 0) {
      setApplicantPhotoName(applicantPhoto[0].name);
    } else {
      setApplicantPhotoName(null);
    }
  }, [applicantPhoto]);

  // Watch team member photos and update display names
  const watchedTeamMembers = watch("teamMembers");
  useEffect(() => {
    const newTeamPhotos: { [key: number]: string } = {};
    watchedTeamMembers?.forEach((member, index) => {
      // Use optional chaining to safely access photo and its first element
      if (member?.photo?.[0]) {
        newTeamPhotos[index] = member.photo[0].name;
      }
    });
    setTeamPhotos(newTeamPhotos);
  }, [watchedTeamMembers]); // Add watchedTeamMembers as dependency

  const addTeamMember = () => {
    if (fields.length < 5) {
      // Limit to a maximum of 5 team members
      append({ name: "", email: "", phone: "", photo: undefined }); // Append a new empty team member
    }
  };

  const removeTeamMember = (index: number) => {
    if (fields.length > 1) {
      // Ensure at least one team member remains
      remove(index); // Remove the team member at the specified index
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmissionStatus("submitting");
    HandlerSubmitEmail(data);
    const formData = new FormData();

    formData.append("applicantName", data.applicantName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    // Append applicant photo if available
    if (data.photo && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }

    // Append team members data and their photos individually
    formData.append("teamMembers", JSON.stringify(data.teamMembers));
    data.teamMembers.forEach((member, index) => {
      if (member.photo && member.photo.length > 0) {
        formData.append(`teamMembers[${index}][photo]`, member.photo[0]);
      }
      formData.append(`teamMembers[${index}][name]`, member.name);
      formData.append(`teamMembers[${index}][email]`, member.email);
      formData.append(`teamMembers[${index}][phone]`, member.phone);
    });

    formData.append("application_title", data.application_title);
    formData.append("application_description", data.application_description);

    console.log(formData, "this is form data");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/application`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseBody = await response.json();
       
      console.log("Server Response:", responseBody); // responseBody is already the JSON object
      setSubmissionStatus("success");
      reset(); // Reset form on success
      setApplicantPhotoName(null); // Clear applicant photo display
      setTeamPhotos({}); // Clear team photos display
      toast.success("Application submitted successfully!");

      // Scroll to the top of the page after successful submission
      // window.scrollTo({ top: 0, behavior: "smooth" });
       HandlerSubmitEmail(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
      setSubmissionStatus("error");
      console.error("Submission error:", error);
    }
  };

  const HandlerSubmitEmail=async(data:FormValues)=>{
      const response=(await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send-email`,data))?.data;
      console.log(response);
  }

  // Display success message after submission
  if (submissionStatus === "success") {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-500 text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Application Submitted!
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Thank you for applying. We have received your application and will be
          in touch soon regarding the next steps.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500 mb-2">
            You will receive a confirmation email shortly.
          </p>
          <button
            onClick={() => setSubmissionStatus("idle")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 hover:scale-105 transform"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Application Form
        </h1>
        <p className="text-gray-600">
          Please fill out all required fields to submit your application.
        </p>
      </div>

      <div className="space-y-8">
        {/* Applicant Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 mr-3 text-sm">
                1
              </span>
              Applicant Details
            </h3>
          </div>
          <div className="p-6">
            <FormField
              type="text"
              name="applicantName"
              label="Full Name"
              register={register}
              error={errors.applicantName}
              placeholder="e.g., Fatima Ahmed"
              rules={{ required: "Full name is required." }} // Pass rules here
            />
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                type="email"
                name="email"
                label="Email Address"
                register={register}
                error={errors.email}
                placeholder="you@example.com"
                rules={{
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address.",
                  },
                }}
              />
              <FormField
                type="tel"
                name="phone"
                label="Phone Number"
                register={register}
                error={errors.phone}
                placeholder="e.g., 9767459643"
                rules={{
                  required: "Phone number is required.",
                  pattern: {
                    value: /^[0-9+-]{10,15}$/,
                    message: "Invalid phone number format.",
                  },
                }}
              />
            </div>
            <PhotoUpload
              name="photo"
              label="Your Photo"
              register={register}
              error={errors.photo}
              currentPhoto={applicantPhotoName}
              rules={{
                required: "Your photo is required.",
                validate: {
                  lessThan2MB: (value) => {
                    if (!(value instanceof FileList) || !value[0]) return true;
                    return (
                      value[0].size < 2 * 1024 * 1024 ||
                      "Photo must be less than 2MB."
                    );
                  },
                  isImage: (value) => {
                    if (!(value instanceof FileList) || !value[0]) return true;
                    return (
                      value[0].type.startsWith("image/") ||
                      "Only image files are accepted."
                    );
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Team Member Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 mr-3 text-sm">
                2
              </span>
              Team Details
            </h3>
          </div>
          <div className="p-6">
            {/* Map over fields from useFieldArray */}
            {fields.map((field, index) => (
              <div
                key={field.id} // Use field.id for unique key prop
                className="mb-6 p-6 bg-gray-50 rounded-xl relative border border-gray-100"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-bold text-gray-800 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center mr-2">
                      {index + 1}
                    </span>
                    Team Member {index + 1}
                  </h4>
                  {index > 0 && ( // Allow removing if there's more than one team member
                    <button
                      type="button"
                      onClick={() => removeTeamMember(index)}
                      className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Remove Team Member"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <FormField
                  type="text"
                  name={`teamMembers.${index}.name` as Path<FormValues>} // Type assertion for dynamic path
                  label="Member Name"
                  register={register}
                  error={errors.teamMembers?.[index]?.name} // Access nested error
                  placeholder="e.g., Ali Khan"
                  rules={{
                    required:
                      index === 0
                        ? "First team member's name is required."
                        : false,
                  }}
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    type="email"
                    name={`teamMembers.${index}.email` as Path<FormValues>}
                    label="Email Address"
                    register={register}
                    error={errors.teamMembers?.[index]?.email}
                    placeholder="member@example.com"
                    rules={{
                      required:
                        index === 0
                          ? "First team member's email is required."
                          : false,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address.",
                      },
                    }}
                  />
                  <FormField
                    type="tel"
                    name={`teamMembers.${index}.phone` as Path<FormValues>}
                    label="Phone Number"
                    register={register}
                    error={errors.teamMembers?.[index]?.phone}
                    placeholder="e.g., 9767459643"
                    rules={{
                      required:
                        index === 0
                          ? "First team member's phone is required."
                          : false,
                      pattern: {
                        value: /^[0-9+-]{10,15}$/,
                        message: "Invalid phone number format.",
                      },
                    }}
                  />
                </div>
                <PhotoUpload
                  name={`teamMembers.${index}.photo` as Path<FormValues>}
                  label="Member Photo"
                  register={register}
                  error={errors.teamMembers?.[index]?.photo}
                  currentPhoto={teamPhotos[index]}
                  rules={{
                    required:
                      index === 0
                        ? "First team member's photo is required."
                        : false,
                    // validate: {
                    //   lessThan2MB: (value: any) => {
                    //     if (!(value instanceof FileList) || !value[0]) return true;
                    //     return value[0].size < 2 * 1024 * 1024 || 'Photo must be less than 2MB.';
                    //   },
                    //   isImage: (value: any) => {
                    //     if (!(value instanceof FileList) || !value[0]) return true;
                    //     return value[0].type.startsWith('image/') || 'Only image files are accepted.';
                    //   },
                    // }
                    validate: {
                      lessThan2MB: (value) => {
                        if (!(value instanceof FileList) || !value[0])
                          return true;
                        return (
                          value[0].size < 2 * 1024 * 1024 ||
                          "Photo must be less than 2MB."
                        );
                      },
                      isImage: (value) => {
                        if (!(value instanceof FileList) || !value[0])
                          return true;
                        return (
                          value[0].type.startsWith("image/") ||
                          "Only image files are accepted."
                        );
                      },
                    },
                  }}
                />
              </div>
            ))}
            {fields.length < 5 && ( // Show add button if less than max members
              <button
                type="button"
                onClick={addTeamMember}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium py-2 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
              >
                <PlusCircle className="mr-2" /> Add Another Team Member (Max 5)
              </button>
            )}
          </div>
        </div>

        {/* Application Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 mr-3 text-sm">
                3
              </span>
              Application Details
            </h3>
          </div>
          <div className="p-6">
            <FormField
              type="text"
              name="application_title"
              label="Application Title"
              register={register}
              error={errors.application_title}
              placeholder="e.g., GreenTech Innovations"
              rules={{ required: "Application title is required." }}
            />

            <FormField
              as="textarea"
              type="textarea"
              name="application_description"
              label="Application Description"
              register={register}
              error={errors.application_description}
              placeholder="Provide a detailed description of your application, project, or startup idea..."
              rows={6}
              rules={{
                required: "Application description is required.",
                maxLength: {
                  value: 3000,
                  message: "Description should be less than 3000 characters.",
                },
              }}
            />
          </div>
        </div>

        {/* Submission Button & Error Message */}
        {submissionStatus === "error" && (
          <div
            className="flex items-center p-5 text-sm text-red-700 bg-red-100 rounded-xl border border-red-200"
            role="alert"
          >
            <AlertCircle className="text-xl mr-3 text-red-500" />
            <div>
              <p className="font-bold">Submission Failed</p>
              <p>
                Please check your input and try again. If the problem persists,
                contact our support team.
              </p>
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="button" // Change to type="button" to use handleSubmit(onSubmit) explicitly
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || submissionStatus === "submitting"}
            className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting || submissionStatus === "submitting" ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting Application...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
          <p className="text-center text-gray-500 text-sm mt-4">
            By submitting this application, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
