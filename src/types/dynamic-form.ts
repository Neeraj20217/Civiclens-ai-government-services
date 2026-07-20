export type FormFieldType = 'text' | 'number' | 'select' | 'date' | 'checkbox' | 'textarea';

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldDefinition {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required: boolean;
  options?: FormFieldOption[];
  helperText?: string;
}

export interface RequiredDocumentDefinition {
  id: string;
  name: string;
  description: string;
  isMandatory: boolean;
  acceptedFormats: string[];
  maxMb: number;
}

export interface ActionStepDefinition {
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime?: string;
  officialPortalUrl?: string;
}

export interface DynamicSchemeForm {
  schemeId: string;
  schemeTitle: string;
  department: string;
  category: string;
  description: string;
  eligibilityCriteria: string[];
  formFields: FormFieldDefinition[];
  requiredDocuments: RequiredDocumentDefinition[];
  actionSteps: ActionStepDefinition[];
  generatedAt: string;
}

export interface AiErrorDiagnosis {
  errorCause: string;
  userFriendlyExplanation: string;
  suggestedAction: string;
  recoverySteps: string[];
  isRecoverable: boolean;
}
