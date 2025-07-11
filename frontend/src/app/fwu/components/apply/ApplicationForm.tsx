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
import { toast } from 'sonner'; // <-- UNCOMMENTED
import {
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Trash2,
  Camera,
  User,
  Users,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

// Define the structure of your form data
interface FormValues {
  applicantName: string;
  email: string;
  phone: string;
  photo: FileList | undefined;
  teamMembers: {
    name: string;
    email: string;
    phone: string;
    photo: FileList | undefined;
  }[];
}

// Component props interface
interface ApplicationFormProps {
  application_id: number;
}

// FormField component props interface
interface FormFieldProps {
  type: string;
  name: Path<FormValues>;
  label: string;
  register: UseFormRegister<FormValues>;
  error?: FieldError;
  placeholder?: string;
  as?: "input" | "textarea";
  rows?: number;
  accept?: string;
  rules?: RegisterOptions<FormValues, Path<FormValues>>;
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
  rules,
}: FormFieldProps) => {
  const inputClasses = `mt-1 block w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${
    error
      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
      : "border-gray-200 bg-white hover:border-gray-300 focus:bg-blue-50/30"
  }`;

  const isRequired = !!rules?.required;

  return (
    <div className="mb-6 group">
      <label
        htmlFor={String(name)}
        className="block text-sm font-semibold text-gray-800 mb-3"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={String(name)}
          rows={rows}
          className={inputClasses}
          placeholder={placeholder}
          {...register(name, rules)}
        />
      ) : (
        <input
          id={String(name)}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          accept={accept}
          {...register(name, rules)}
        />
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error.message}
        </p>
      )}
    </div>
  );
};

// PhotoUpload component props interface
interface PhotoUploadProps {
  name: Path<FormValues>;
  label: string;
  register: UseFormRegister<FormValues>;
  error?: FieldError;
  currentPhoto: string | null;
  rules?: RegisterOptions<FormValues, Path<FormValues>>;
}

const PhotoUpload = ({
  name,
  label,
  register,
  error,
  currentPhoto,
  rules,
}: PhotoUploadProps) => {
  const isRequired = !!rules?.required;
  return (
    <div className="mb-6 group">
      <label
        htmlFor={String(name)}
        className="block text-sm font-semibold text-gray-800 mb-3"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`relative mt-1 flex justify-center px-6 pt-8 pb-8 border-2 ${
          error 
            ? "border-red-400 bg-red-50/50" 
            : "border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50"
        } border-dashed rounded-xl hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 cursor-pointer group-hover:shadow-lg`}
      >
        <div className="space-y-3 text-center">
          <div className="mx-auto h-16 w-16 text-gray-400 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100 group-hover:border-blue-200 transition-all duration-300">
            <Camera className="h-8 w-8 text-blue-500" />
          </div>
          <div className="flex flex-col text-sm text-gray-600">
            <label
              htmlFor={String(name)}
              className="relative cursor-pointer font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span className="bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                Choose Photo
              </span>
              <input
                id={String(name)}
                type="file"
                className="sr-only"
                accept="image/*"
                {...register(name, rules)}
              />
            </label>
            <p className="text-gray-500 mt-2">PNG, JPG up to 2MB</p>
          </div>
        </div>
      </div>
      {currentPhoto && (
        <div className="mt-4 flex items-center text-sm text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Selected: <span className="font-semibold ml-1">{currentPhoto}</span>
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error.message}
        </p>
      )}
    </div>
  );
};

const ApplicationForm = ({ application_id }: ApplicationFormProps) => {
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [applicantPhotoName, setApplicantPhotoName] = useState<string | null>(null);
  const [teamPhotos, setTeamPhotos] = useState<{ [key: number]: string }>({});
  const [currentStep, setCurrentStep] = useState(0); // 0: Applicant Details, 1+: Team Members
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    control,
    trigger,
  } = useForm<FormValues>({
    defaultValues: {
      applicantName: "",
      email: "",
      phone: "",
      photo: undefined,
      teamMembers: [{ name: "", email: "", phone: "", photo: undefined }],
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
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

  // Watch team member photos, update display names, and show a toast on change
  const watchedTeamMembers = watch("teamMembers");
  useEffect(() => {
    const newTeamPhotos: { [key: number]: string } = {};
    
    watchedTeamMembers?.forEach((member, index) => {
      const newPhotoFile = member?.photo?.[0];
      if (newPhotoFile) {
        const newPhotoName = newPhotoFile.name;
        newTeamPhotos[index] = newPhotoName;

        // If the photo name in our state is different from the new one, it's a change.
        if (teamPhotos[index] !== newPhotoName) {
           toast.success(`Photo for team member ${index + 1} updated!`);
        }
        
      }
    });

    setTeamPhotos(newTeamPhotos);
  }, [watchedTeamMembers, teamPhotos]);


  const addTeamMember = () => {
    if (fields.length < 5) {
      append({ name: "", email: "", phone: "", photo: undefined });
      toast.info("New team member slot added!");
    } else {
      toast.error("You can add a maximum of 5 team members.");
    }
  };

  const removeTeamMember = (index: number) => {
    if (fields.length > 1) {
      remove(index);
      toast.warning(`Team member ${index + 1} has been removed.`);
      // Adjust current step if we're removing a step we're currently on or after
      if (currentStep > index) {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const validateCurrentStep = async () => {
    if (currentStep === 0) {
      // Validate applicant details
      const isValid = await trigger(["applicantName", "email", "phone", "photo"]);
      return isValid;
    } else {
      // Validate current team member
      const memberIndex = currentStep - 1;
      const isValid = await trigger([
        `teamMembers.${memberIndex}.name`,
        `teamMembers.${memberIndex}.email`,
        `teamMembers.${memberIndex}.phone`,
        `teamMembers.${memberIndex}.photo`,
      ]);
      return isValid;
    }
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCompletedSteps(prev => [...prev.filter(step => step !== currentStep), currentStep]);
      if (currentStep < fields.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const isStepCompleted = (step: number) => {
    return completedSteps.includes(step);
  };

  const canProceedToStep = (step: number) => {
    if (step === 0) return true;
    // Can proceed if previous step is completed
    return completedSteps.includes(step - 1);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmissionStatus("submitting");
    
    const formData = new FormData();
    formData.append("application_id", application_id.toString());
    formData.append("applicantName", data.applicantName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    if (data.photo && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }
    
    // RHF `useFieldArray` already provides the correct structure in `data.teamMembers`.
    // We need to append team member photos separately and the rest of the data.
    data.teamMembers.forEach((member, index) => {
        formData.append(`teamMembers[${index}][name]`, member.name);
        formData.append(`teamMembers[${index}][email]`, member.email);
        formData.append(`teamMembers[${index}][phone]`, member.phone);
        if (member.photo && member.photo.length > 0) {
            formData.append(`team_member_photo_${index}`, member.photo[0]);
        }
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/applicant`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

     await response.json();
      setSubmissionStatus("success");
      toast.success("Application submitted successfully!");
      reset();
      setApplicantPhotoName(null);
      setTeamPhotos({});
      setCurrentStep(0);
      setCompletedSteps([]);
    } catch (error) {
      setSubmissionStatus("error");
      toast.error("Submission failed. Please check your details and try again.");
      console.error("Submission error:", error);
    }
  };

  const getTotalSteps = () => fields.length + 1;

  if (submissionStatus === "success") {
    return (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg" role="alert">
            <p className="font-bold">Success!</p>
            <p>Your application has been received. We will get back to you shortly.</p>
        </div>
    );
  }

  return (
    <div className=" mt-4  ">
      <div className=" mx-auto border-2 p-2  rounded-sm  ">
        {/* Header */}
        <div className="text-center   mb-4">
          <h1 className="text-4xl   font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-3">
            Application Form
          </h1>
          <p className="text-gray-600 text-lg">
            Complete your application step by step
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 p-4 border-t-2  border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {getTotalSteps()}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {/* Applicant Step */}
            <div className="flex items-center ">
              <button
                onClick={() => goToStep(0)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentStep === 0
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                    : isStepCompleted(0)
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <User className="h-5 w-5" />
              </button>
              <span className="ml-2 text-sm font-medium text-gray-700">Applicant</span>
            </div>

            {/* Team Member Steps */}
            {fields.map((_, index) => (
              <div key={index} className="flex items-center flex-wrap">
                <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                <button
                  onClick={() => canProceedToStep(index + 1) && goToStep(index + 1)}
                  disabled={!canProceedToStep(index + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    currentStep === index + 1
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                      : isStepCompleted(index + 1)
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                      : canProceedToStep(index + 1)
                      ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Users className="h-5 w-5" />
                </button>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Team {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl  border-gray-100 ">
          {/* Applicant Details Step */}
          {currentStep === 0 && (
            <div>
              <div className="bg-gradient-to-r  border-b-2 rounded-none-tr-md p-8">
                <h3 className="text-2xl font-bold flex items-center">
                  <User className="mr-3 h-6 w-6" />
                  Applicant Details
                </h3>
                <p className=" mt-2">Tell us about yourself</p>
              </div>
              <div className="p-8">
                <FormField
                  type="text"
                  name="applicantName"
                  label="Full Name"
                  register={register}
                  error={errors.applicantName}
                  placeholder="e.g., Fatima Ahmed"
                  rules={{ required: "Full name is required." }}
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
          )}

          {/* Team Member Steps */}
          {fields.map((field, index) => (
             currentStep === index + 1 && (
                <div key={field.id}>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-6 text-white">
                  <h3 className="text-2xl font-bold flex items-center">
                    <Users className="mr-3 h-6 w-6" />
                    Team Member {index + 1}
                  </h3>
                  <p className="text-indigo-100 mt-2">
                    {index === 0 ? "Add your first team member" : "Add another team member"}
                  </p>
                </div>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xl font-bold text-gray-800 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-sm flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        Team Member Details
                      </h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all duration-300"
                          aria-label="Remove Team Member"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                    <FormField
                      type="text"
                      name={`teamMembers.${index}.name` as Path<FormValues>}
                      label="Member Name"
                      register={register}
                      error={errors.teamMembers?.[index]?.name}
                      placeholder="e.g., Bikram Dhami"
                      rules={{
                        required: "Team member's name is required.",
                      }}
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        type="email"
                        name={`teamMembers.${index}.email` as Path<FormValues>}
                        label="Email Address"
                        register={register}
                        error={errors.teamMembers?.[index]?.email}
                        placeholder="bikramdhami@gmail.com"
                        rules={{
                          required: "Team member's email is required.",
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
                          required: "Team member's phone is required.",
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
                      currentPhoto={teamPhotos[index] || null}
                      rules={{
                        required: "Team member's photo is required.",
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
             )
          ))}

          {/* Navigation and Actions */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {/* Add Team Member Button */}
              {currentStep > 0 && currentStep === fields.length && fields.length < 5 && (
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="flex items-center justify-center text-indigo-600 hover:text-indigo-800 font-semibold py-3 px-6 rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 transition-all duration-300 hover:scale-105"
                >
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Another Team Member (Max 5)
                </button>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Previous
                </button>

                {currentStep < fields.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex cursor-pointer items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    Next Step
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting || submissionStatus === "submitting"}
                    className="flex cursor-pointer items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Error Message on Submission Fail */}
        {submissionStatus === "error" && (
          <div className="mt-6 flex items-center p-6 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200">
            <AlertCircle className="h-6 w-6 mr-3 text-red-500" />
            <div>
              <p className="font-bold">Submission Failed</p>
              <p>
                An error occurred. Please review your details and try again.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          By submitting this application, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms & Conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;