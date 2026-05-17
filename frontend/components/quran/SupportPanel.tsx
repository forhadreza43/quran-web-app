export default function SupportPanel() {
   return (
      <div className="rounded-2xl bg-primary-soft p-4">
         <h3 className="font-semibold text-foreground">
            Help spread the knowledge of Islam
         </h3>
         <p className="mt-2 text-sm text-muted-foreground">
            Your regular support helps us reach our religious brothers and sisters
            with the message of Islam. Join our mission and be part of the big
            change.
         </p>
         <button
            type="button"
            className="mt-3 w-full rounded-full bg-primary py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
         >
            Support Us
         </button>
      </div>
   );
}
