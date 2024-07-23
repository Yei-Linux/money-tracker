import { INTIAL_STEP, MAX_AUTH_FORM_STEP } from '@/constants';
import { AuthStatesForm } from '@/types/auth';
import { StepFactory, VoidMethod } from '@/types/factories';
import { create } from 'zustand';

type GeneralAuthStep = StepFactory<'step', 'nextStep', 'previousStep'>;
type SignInStep = StepFactory<
  'signInStep',
  'nextSignInStep',
  'previousSignInStep'
>;

type UseAuthFormStore = {
  state: AuthStatesForm;
  switchState: VoidMethod;
} & GeneralAuthStep &
  SignInStep;

type StepFactoryObjects = {
  stepName: string;
  nextStepName: string;
  previousStepName: string;
  maxStep: number;
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
  maxStep,
}: StepFactoryObjects): T =>
  ({
    [stepName]: INTIAL_STEP,
    [nextStepName]: () =>
      set((store) => ({
        step: Math.min(store.step + 1, maxStep),
      })),
    [previousStepName]: () =>
      set((store) => ({
        step: Math.max(store.step - 1, INTIAL_STEP),
      })),
  } as T);

export const useAuthFormStore = create<UseAuthFormStore>((set) => ({
  state: 'signup',
  switchState: () =>
    set((store) => ({
      state: store.state === 'signin' ? 'signup' : 'signin',
    })),

  ...stepFactoryObjects<GeneralAuthStep>({
    stepName: 'step',
    nextStepName: 'nextStep',
    previousStepName: 'previousStep',
    set,
    maxStep: MAX_AUTH_FORM_STEP,
  }),
  ...stepFactoryObjects<SignInStep>({
    stepName: 'signInStep',
    nextStepName: 'nextSignInStep',
    previousStepName: 'previousSignInStep',
    set,
    maxStep: MAX_AUTH_FORM_STEP,
  }),
}));
