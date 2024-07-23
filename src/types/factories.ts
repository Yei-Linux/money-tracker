export type VoidMethod = () => void;

export type StepFactory<
  StepName extends string,
  NextStepName extends string,
  PreviousStepName extends string
> = {
  [K in StepName | NextStepName | PreviousStepName]: K extends StepName
    ? number
    : K extends NextStepName
    ? VoidMethod
    : VoidMethod;
};
