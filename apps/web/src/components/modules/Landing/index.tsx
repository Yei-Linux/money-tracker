import { Features } from './Features';
import { GetApp } from './GetApp';
import { Hero } from './Hero';
import { FeaturedOn } from './Hero/FeaturedOn';
import { Plans } from '../@shared/Plans';
import { Testimonials } from './Testimonials';
import { TPricingPlans } from '@moneytrack/web/types/payment';

type TLanding = { plans: TPricingPlans };

export const Landing = ({ plans }: TLanding) => {
  return (
    <div className="flex flex-col gap-28 p-3 max-w-[1300px] mx-auto">
      <Hero />
      <FeaturedOn />
      <Features />
      <Plans plans={plans} />
      <Testimonials />
      <GetApp />
    </div>
  );
};
