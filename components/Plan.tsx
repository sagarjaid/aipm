import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId

const Plan = () => {
  return (
    <section className="overflow-hidden" id="pricing">
      <div className="mx-auto max-w-5xl px-8 pb-24">
        <div className="mb-20 flex w-full flex-col text-center">
          <p className="mb-8 font-medium text-primary">Limited time deals</p>
          <h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
            Pricing plan for everyone
          </h2>
        </div>

        <div className="relative flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-stretch">
          {config.stripe.plans.map((plan) => (
            <div
              key={plan.priceId}
              className="relative w-full min-w-[80px] max-w-lg"
            >
              {plan.isFeatured && plan.name === "MASTER" && (
                <>
                  <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                    <span
                      className={`badge border-0 bg-primary text-xs font-semibold text-primary-content`}
                    >
                      RECOMMENDED
                    </span>
                  </div>
                  <div
                    className={`absolute -inset-[1px] z-10 rounded-[9px] bg-primary`}
                  />
                </>
              )}

              {plan.isFeatured && plan.name === "GOD" && (
                <>
                  <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                    <span
                      className={`badge border-0 bg-blue-300 text-xs font-semibold text-black`}
                    >
                      LIFETIME DEAL!
                    </span>
                  </div>

                  <div
                    className={`absolute -inset-[2px] z-10 rounded-[9px] bg-blue-300`}
                  />
                </>
              )}

              {plan.name === "HOBBY" && (
                <>
                  <div
                    className={`absolute -inset-[1px] z-10 rounded-[9px] bg-black`}
                  />
                </>
              )}

              <div className="relative z-10 flex h-full flex-col gap-5 rounded-lg bg-base-100 p-6 lg:gap-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold lg:text-xl">{plan.name}</p>
                    {plan.description && (
                      <p className="mt-2 text-base-content/80">
                        {plan.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {plan.priceAnchor && (
                    <div className="mb-[4px] flex flex-col justify-end text-lg">
                      <p className="relative">
                        <span className="absolute inset-x-0 top-[53%] h-[1.5px] bg-base-content"></span>
                        <span className="text-base-content/80">
                          ${plan.priceAnchor}
                        </span>
                      </p>
                    </div>
                  )}
                  <p className={`text-5xl font-extrabold tracking-tight`}>
                    ${plan.price}
                  </p>
                  <div className="mb-[4px] flex flex-col justify-end">
                    <p className="text-xs font-semibold uppercase text-base-content/60">
                      USD
                    </p>
                  </div>
                </div>
                {plan.features && (
                  <ul className="flex-1 space-y-2.5 text-base leading-relaxed">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-[18px] w-[18px] shrink-0 opacity-80"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span>{feature.name} </span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="space-y-2">
                  <ButtonCheckout
                    variantId={plan.priceId}
                    planName={plan.name}
                  />

                  {plan.isFeatured && plan.name === "GOD" && (
                    <p className="relative flex items-center justify-center gap-2 text-center text-sm font-medium text-base-content/80">
                      Pay once. Access forever.
                    </p>
                  )}

                  {plan.isFeatured && plan.name === "MASTER" && (
                    <p className="relative flex items-center justify-center gap-2 text-center text-sm font-medium text-base-content/80">
                      Try it for free
                    </p>
                  )}

                  {plan.name === "HOBBY" && (
                    <p className="relative flex items-center justify-center gap-2 text-center text-sm font-medium text-base-content/80">
                      Try it for free
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plan;
