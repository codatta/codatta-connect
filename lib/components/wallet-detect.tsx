import { useEffect } from 'react'

// Component to detect EIP-6963 compatible wallets
export default function WalletDelete(props: { onFinish?: (wallets: any) => void }) {
  // Function to detect wallets that implement EIP-6963
  function WalletDelete() {
    return new Promise((resolve) => {
      // Array to store detected wallets
      const wallets: any[] = [];
      let timer: NodeJS.Timeout;

      // Listen for wallet announcements
      window.addEventListener("eip6963:announceProvider", (event: any) => {
        if (timer) clearTimeout(timer);
        // Add announced wallet to array
        wallets.push(event.detail);
        // Set timeout to resolve after collecting announcements
        timer = setTimeout(() => resolve(wallets), 200);
      });

      // Initial timeout in case no wallets respond
      timer = setTimeout(() => resolve(wallets), 200);
      // Trigger wallet detection by dispatching event
      window.dispatchEvent(new Event("eip6963:requestProvider"));
    });
  }

  // Initialize wallet detection
  async function init() {
    const wallets = await WalletDelete();
    // Call onFinish callback with detected wallets
    props.onFinish?.(wallets || []);
  }

  // Run detection on component mount
  useEffect(() => {
    init();
  }, []);

  // Render nothing - this is a utility component
  return <></>;
}
