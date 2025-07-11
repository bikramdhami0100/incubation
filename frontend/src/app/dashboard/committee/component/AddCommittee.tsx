"use client";
import { useState } from "react";
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
  Users,
  ArrowRight,
  ArrowLeft,
  X,
  ClipboardList,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Committee } from "./CommitteeTable"; // Assuming this type is defined correctly
import { getCookie } from "@/app/fwucontext/CustomCookies";
import axios from "axios";

// Interface for the form values remains the same
interface FormValues {
  committeeName: string;
  committeeDescription: string;
  teamMembers: {
    name: string;
    email: string;
    position: string;
    hierarchy: number;
    photo: FileList | undefined; // FileList is the correct type for file inputs
  }[];
}

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
  min?: number;
  max?: number;
  step?: number;
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
  min,
  max,
  step,
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
          min={min}
          max={max}
          step={step}
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

interface PhotoUploadProps {
  name: Path<FormValues>;
  label: string;
  register: UseFormRegister<FormValues>;
  error?: FieldError;
  currentPhotoName: string | null;
  rules?: RegisterOptions<FormValues, Path<FormValues>>;
}

const PhotoUpload = ({
  name,
  label,
  register,
  error,
  currentPhotoName,
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
      {currentPhotoName && !error && (
        <div className="mt-4 flex items-center text-sm text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Selected: <span className="font-semibold ml-1">{currentPhotoName}</span>
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

interface AddCommitteeProps {
  refetch: () => void;
  /**
   * Prop to manage parent component state.
   * In this component, `setSelectedAction` is used only to close the form.
   * The `item` property is not used, indicating this is an "add-only" component.
   * For "edit" functionality, this component would need to use `selectedAction.item`
   * to populate the form fields.
   */
  selectedAction: { select: string; item: Committee | null };
  setSelectedAction: (action: { select: string; item: Committee | null }) => void;
}

const AddCommittee = ({ setSelectedAction, refetch }: AddCommitteeProps) => {
  const [currentStep, setCurrentStep] = useState(0); // 0: Committee, 1+: Members
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
      committeeName: "",
      committeeDescription: "",
      teamMembers: [{ name: "", email: "", position: "", hierarchy: 1, photo: undefined }],
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  // Watch the entire teamMembers array to get live updates for file names
  const watchedTeamMembers = watch("teamMembers");

  const addTeamMember = () => {
    if (fields.length < 15) {
      append({ name: "", email: "", position: "", hierarchy: fields.length + 1, photo: undefined });
    } else {
      toast.error("You can add a maximum of 15 team members.");
    }
  };

  const removeTeamMember = (index: number) => {
    if (fields.length > 1) {
      remove(index);
      toast.warning(`Team member ${index + 1} has been removed.`);
      // If we are on the step we just removed, go back one step.
      if (currentStep === index + 1) {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const validateCurrentStep = async () => {
    if (currentStep === 0) {
      return await trigger(["committeeName", "committeeDescription"]);
    } else {
      const memberIndex = currentStep - 1;
      // Ensure the member exists before trying to validate
      if(memberIndex < fields.length) {
        return await trigger([
          `teamMembers.${memberIndex}.name`,
          `teamMembers.${memberIndex}.email`,
          `teamMembers.${memberIndex}.position`,
          `teamMembers.${memberIndex}.hierarchy`,
          `teamMembers.${memberIndex}.photo`,
        ]);
      }
      return true; // Should not happen in normal flow
    }
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      if (currentStep < fields.length) { // `fields.length` is the number of member steps
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => setCurrentStep(step);
  const isStepCompleted = (step: number) => completedSteps.includes(step);
  const canProceedToStep = (step: number) => step === 0 || completedSteps.includes(step - 1);
  const getTotalSteps = () => fields.length + 1; // +1 for the main committee details step

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("committeeName", data.committeeName);
    formData.append("committeeDescription", data.committeeDescription);

    // Sanitize team members data before sending, removing the 'photo' FileList object
    const teamMembersData = data.teamMembers.map(member => ({
      name: member.name,
      email: member.email,
      position: member.position,
      hierarchy: member.hierarchy,
    }));
    formData.append("teamMembers", JSON.stringify(teamMembersData));

    // Append each member's photo file with a unique key
    data.teamMembers.forEach((member, index) => {
      if (member.photo && member.photo.length > 0) {
        formData.append(`memberPhoto_${index}`, member.photo[0]);
      }
    });

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/committee`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie('token')}`,
        },
      });

      toast.success("Committee created successfully!");
      refetch();

      setTimeout(() => {
        reset();
        setCurrentStep(0);
        setCompletedSteps([]);
        setSelectedAction({ select: "", item: null });
      }, 1500);

    } catch (error) {
      // Improved error handling to show server-side messages
      let errorMessage = "An unknown error occurred during submission.";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen relative">
       {/* UI Elements remain largely the same, only logic is corrected */}
       <div className="absolute top-4 right-4 z-10">
        <Button onClick={() => setSelectedAction({ select: "", item: null })} variant="ghost" size="icon" className="rounded-full bg-gray-200/50 hover:bg-red-100 text-gray-600 hover:text-red-500" >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-3">
          Create New Committee
        </h1>
        <p className="text-gray-600 text-lg">
          Complete the details step-by-step to form the new committee.
        </p>
      </div>

      <div className="mb-8 p-4 border-y-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {getTotalSteps()}
          </span>
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <div className="flex items-center">
            <button onClick={() => goToStep(0)} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 flex-shrink-0 ${currentStep === 0 ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" : isStepCompleted(0) ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white" : "bg-gray-200 text-gray-600"}`}>
                <ClipboardList className="h-5 w-5" />
            </button>
            <span className="ml-2 text-sm font-medium text-gray-700 whitespace-nowrap">Details</span>
          </div>
          {fields.map((_, index) => (
            <div key={index} className="flex items-center">
              <ArrowRight className="h-4 w-4 text-gray-400 mx-2 flex-shrink-0" />
              <button onClick={() => canProceedToStep(index + 1) && goToStep(index + 1)} disabled={!canProceedToStep(index + 1)} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 flex-shrink-0 ${currentStep === index + 1 ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" : isStepCompleted(index + 1) ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white" : canProceedToStep(index + 1) ? "bg-gray-200 text-gray-600 hover:bg-gray-300" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                  <Users className="h-5 w-5" />
              </button>
              <span className="ml-2 text-sm font-medium text-gray-700 whitespace-nowrap">Member {index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {currentStep === 0 && (
            <div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-6 text-white">
                <h3 className="text-2xl font-bold flex items-center"><ClipboardList className="mr-3 h-6 w-6" />Committee Details</h3>
                <p className="text-indigo-100 mt-2">Define the committee&apos;s name and purpose.</p>
              </div>
              <div className="p-8">
                <FormField type="text" name="committeeName" label="Committee Name" register={register} error={errors.committeeName} placeholder="e.g., Student Council Committee" rules={{ required: "Committee name is required." }} />
                <FormField as="textarea" type="textarea" rows={4} name="committeeDescription" label="Committee Description" register={register} error={errors.committeeDescription} placeholder="Brief description of the committee's purpose" rules={{ required: "A description is required." }} />
              </div>
            </div>
          )}

          {fields.map((field, index) => (
            currentStep === index + 1 && (
              <div key={field.id}>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-8 py-6 text-white">
                  <h3 className="text-2xl font-bold flex items-center"><Users className="mr-3 h-6 w-6" />Team Member {index + 1}</h3>
                  <p className="text-indigo-100 mt-2">Hierarchy: 1 is highest rank, higher numbers are lower.</p>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-bold text-gray-800">Member Information</h4>
                    {index > 0 && (<button type="button" onClick={() => removeTeamMember(index)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all" aria-label="Remove Team Member"><Trash2 size={20} /></button>)}
                  </div>
                  <FormField type="text" name={`teamMembers.${index}.name`} label="Member Name" register={register} error={errors.teamMembers?.[index]?.name} placeholder="e.g., Ali Khan" rules={{ required: "Member name is required." }} />
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField type="email" name={`teamMembers.${index}.email`} label="Email Address" register={register} error={errors.teamMembers?.[index]?.email} placeholder="member@example.com" rules={{ required: "Email is required.", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address." } }} />
                    <FormField type="text" name={`teamMembers.${index}.position`} label="Position" register={register} error={errors.teamMembers?.[index]?.position} placeholder="e.g., Chairperson" rules={{ required: "Position is required." }} />
                  </div>
                  <FormField type="number" name={`teamMembers.${index}.hierarchy`} label="Hierarchy Level" register={register} error={errors.teamMembers?.[index]?.hierarchy} placeholder="1" min={1} max={100} step={1} rules={{ required: "Hierarchy is required.", min: { value: 1, message: "Must be at least 1." }, valueAsNumber: true }} />
                  <PhotoUpload
                    name={`teamMembers.${index}.photo`}
                    label="Member Photo"
                    register={register}
                    error={errors.teamMembers?.[index]?.photo}
                    // *** CORRECTION: Get file name directly from watched RHF state ***
                    currentPhotoName={watchedTeamMembers[index]?.photo?.[0]?.name || null}
                    rules={{
                      required: "Photo is required.",
                      validate: {
                        // lessThan2MB: (v: FileList) => !v || v.length === 0 || v[0].size < 2 * 1024 * 1024 || "Photo must be less than 2MB.",
                        // isImage: (v: FileList) => !v || v.length === 0 || v[0].type.startsWith("image/") || "Only image files are accepted."
                      }
                    }}
                  />
                </div>
              </div>
            )
          ))}

          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {currentStep === fields.length && fields.length < 15 && (
                <button type="button" onClick={addTeamMember} className="flex items-center justify-center text-indigo-600 hover:text-indigo-800 font-semibold py-3 px-6 rounded-xl border-2 border-indigo-200 hover:bg-indigo-50 transition-all hover:scale-105">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add Another Team Member (Max 15)
                </button>
              )}
              <div className="flex justify-between items-center">
                <button type="button" onClick={prevStep} disabled={currentStep === 0} className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${currentStep === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"}`}>
                  <ArrowLeft className="mr-2 h-5 w-5" />Previous
                </button>
                {currentStep < fields.length ? (
                  <button type="button" onClick={nextStep} className="flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all hover:scale-105">
                    Next Step<ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Submitting...</>) : "Create Committee"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCommittee;