import { Toaster as SonnerToaster } from 'sonner'

export const Toaster = () => {
    return (
        <SonnerToaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: '#E9DDD4',
                    border: '2px solid #DC143C',
                    color: '#000000',
                    borderRadius: '8px',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                }
            }}
        />
    )
}

export { toast } from 'sonner'