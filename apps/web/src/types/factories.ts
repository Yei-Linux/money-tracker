export type VoidMethod = () => void;
export type SetStepMethod = (step: number) => void;

export type StepFactory<
  StepName extends string,
  NextStepName extends string,
  PreviousStepName extends string,
  SetSetpName extends string
> = {
  [K in
    | StepName
    | NextStepName
    | PreviousStepName
    | SetSetpName]: K extends StepName
    ? number
    : K extends SetSetpName
    ? SetStepMethod
    : VoidMethod;
};
