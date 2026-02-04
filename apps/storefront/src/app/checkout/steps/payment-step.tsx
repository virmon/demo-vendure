'use client';

import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { useCheckout } from '../checkout-provider';
import { StripePayments } from '../stripe-payments';
import React from 'react';
import { createPaymentIntent } from '../actions';

interface PaymentStepProps {
  onComplete: () => void;
}

export default function PaymentStep({ onComplete }: PaymentStepProps) {
  const { paymentMethods, selectedPaymentMethodCode, setSelectedPaymentMethodCode } = useCheckout();

  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedPaymentMethodCode) return;
    onComplete();
  };

  if (paymentMethods.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No payment methods available.</p>
      </div>
    );
  }

React.useEffect(() => {
  const fetchClientSecret = async () => { 
    const result = await createPaymentIntent();
     console.log(result.success);
     console.log(result.data ?? 'no data');
    if (result.success && result.data) {
      setClientSecret(result.data);
    }
  }
  if (clientSecret === null && selectedPaymentMethodCode === 'stripe-payments') {
    fetchClientSecret();
    console.log('Fetching client secret...');

  }
}, [selectedPaymentMethodCode, clientSecret]);

  return (
    <div className="space-y-6">
      <h3 className="font-semibold">Select payment method</h3>

      <RadioGroup value={selectedPaymentMethodCode || ''} onValueChange={setSelectedPaymentMethodCode}>
        {paymentMethods.map((method) => (
          <Label key={method.code} htmlFor={method.code} className="cursor-pointer">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <RadioGroupItem value={method.code} id={method.code} />
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">{method.name}</p>
                  {method.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {method.description}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </Label>
        ))}
      </RadioGroup>

      {selectedPaymentMethodCode === 'stripe-payments' && clientSecret && (
        <StripePayments clientSecret={clientSecret} publishableKey='pk_test_51SrBlyBiO2QlvIadrWFdsJUNwDl6FbrtFUmLsGQ2y0EMWXhiPsCwkE7tErUKzv10ll1GN2d97os58HUsiFuvByYI00AadPappr' orderCode='T8KZ7K5ZMLMYB8HC' />
      )}

      <Button
        onClick={handleContinue}
        disabled={!selectedPaymentMethodCode}
        className="w-full"
      >
        Continue to review
      </Button>
    </div>
  );
}
