// types/window.d.ts
interface Window {
  PaystackPop: {
    setup: (config: {
      key: string | undefined;
      email: string;
      amount: number;
      ref: string;
      onClose: () => void;
      callback: (response: { reference: string }) => void;
    }) => {
      openIframe: () => void;
    };
  };
}