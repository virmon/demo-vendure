import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { CheckoutForm } from './checkout-form-v2';

let _stripe: Promise<Stripe | null>;
function getStripe(publishableKey: string) {
    if (!_stripe) {
        _stripe = loadStripe(publishableKey);
    }
    return _stripe;
}

export function StripePayments({
    clientSecret,
    publishableKey,
    orderCode,
}: {
    clientSecret: string;
    publishableKey: string;
    orderCode: string;
}) {
    const options = {
        // passing the client secret obtained from the server
        clientSecret,
        appearance: {
            theme: 'flat',
            variables: {
                fontFamily: 'Sohne, system-ui, sans-serif',
                fontWeightNormal: '500',
                borderRadius: '8px',
                colorPrimary: '#504316',
                accessibleColorOnColorPrimary: '#1A1B25',
                colorTextPlaceholder: '#ABB2BF',
                logoColor: 'dark'
            },
            rules: {
                '.Input': {
                    // backgroundColor: '#212D63',
                    // border: '1px solid var(--colorPrimary)'
                }
            }
        }
    } as StripeElementsOptions;
    const stripePromise = getStripe(publishableKey);

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm orderCode={orderCode} />
        </Elements>
    );
}