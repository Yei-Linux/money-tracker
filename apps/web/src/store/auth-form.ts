import { INTIAL_STEP, MAX_AUTH_FORM_STEP } from '@moneytrack/web/constants';
import { Popup } from '@moneytrack/web/types/@shared/popup';
import { AuthStatesForm, SwitchStateMethod } from '@moneytrack/web/types/auth';
import { StepFactory } from '@moneytrack/web/types/factories';
import { create } from 'zustand';

type GeneralAuthStep = StepFactory<
  'step',
  'nextStep',
  'previousStep',
  'setStep'
>;
type SignUpStep = StepFactory<
  'signUpStep',
  'nextSignUpStep',
  'previousSignUpStep',
  'setSignUpStep'
>;

type UseAuthFormStore = {
  state: AuthStatesForm;
  switchState: SwitchStateMethod;
} & GeneralAuthStep &
  SignUpStep &
  Popup;

type StepFactoryObjects = {
  stepName: string;
  nextStepName: string;
  previousStepName: string;
  maxStep: number;
  setStepName: string;
  set: (
    partial:
      | UseAuthFormStore
      | Partial<UseAuthFormStore>
      | ((state: UseAuthFormStore) => UseAuthFormStore | Partial<any>),
    replace?: boolean | undefined
  ) => void;
};

const stepFactoryObjects = <T>({
  stepName,
  nextStepName,
  set,
  previousStepName,
  setStepName,
  maxStep,
}: StepFactoryObjects): T =>
  ({
    [stepName]: INTIAL_STEP,
    [nextStepName]: () =>
      set((store) => ({
        [stepName]: Math.min(store.step + 1, maxStep),
      })),
    [previousStepName]: () =>
      set((store) => ({
        [stepName]: Math.max(store.step - 1, INTIAL_STEP),
      })),
    [setStepName]: (stepUpdated: number) =>
      set((store) => ({
        [stepName]: Math.min(Math.max(stepUpdated, INTIAL_STEP), maxStep),
      })),
  } as T);

export const useAuthFormStore = create<UseAuthFormStore>((set) => ({
  open: false,
  state: 'signup',

  setOpen: (value) =>
    set(() => ({
      open: value,
    })),
  switchState: (state) =>
    set((store) => ({
      state: state ?? (store.state === 'signin' ? 'signup' : 'signin'),
    })),

  ...stepFactoryObjects<GeneralAuthStep>({
    stepName: 'step',
    nextStepName: 'nextStep',
    previousStepName: 'previousStep',
    set,
    maxStep: MAX_AUTH_FORM_STEP,
    setStepName: 'setStep',
  }),
  ...stepFactoryObjects<SignUpStep>({
    stepName: 'signUpStep',
    nextStepName: 'nextSignUpStep',
    previousStepName: 'previousSignUpStep',
    set,
    maxStep: MAX_AUTH_FORM_STEP,
    setStepName: 'setSignUpStep',
  }),
}));
